import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Row, Col } from 'react-bootstrap'

import { setCryptocurrencyPair } from './redux/actions';
import {
  fetchTradesBinance,
  fetchTradesBitfinex,
  fetchTradesHuobi,
  fetchTradesKraken
} from './exchanges.api';
import { EXHANGES } from './constants';

const GridWrapper = ({ children, wrapInContainer }) => (
  wrapInContainer ? (
    <Container>
      <Row className='justify-content-md-center mt-4'>
        <Col xs='6'>
          {children}
        </Col>
      </Row>
    </Container>
  ) : (
    <>{children}</>
  )
);

const MarketTrades = () => {
  const [rows, setRows] = useState([]);

  const {
    cryptocurrencyPair,
    selectedExchange
  } = useSelector((state) => ({
    cryptocurrencyPair: state.cryptocurrencyPair,
    selectedExchange: state.selectedExchange
  }));
  const dispatch = useDispatch();
  const { pair: pairUrlParams } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const pair = cryptocurrencyPair?.replace(/\W/, '');
      const binancePair = cryptocurrencyPair.match(/\W/) ? cryptocurrencyPair?.replace(/\W/, 'B') : cryptocurrencyPair;
      let data = [];
      switch (selectedExchange?.toLowerCase()) {
        case EXHANGES.BINANCE:
          data = await fetchTradesBinance(binancePair)
          break;
        case EXHANGES.BITFINEX:
          data = await fetchTradesBitfinex(pair)
          break;
        case EXHANGES.HUOBI:
          data = await fetchTradesHuobi(pair.toLowerCase())
          break;
        case EXHANGES.KRAKEN:
          data = await fetchTradesKraken(pair)
          break;
        default:
          data = await Promise.all([
            fetchTradesBinance(binancePair),
            fetchTradesBitfinex(pair),
            fetchTradesHuobi(pair),
            fetchTradesKraken(pair)
          ]);
          break;
      }

      setRows(data.flat());
    }

    if (!cryptocurrencyPair && pairUrlParams) {
      dispatch(setCryptocurrencyPair(pairUrlParams.toUpperCase()));
    }

    if (cryptocurrencyPair) {
      fetchData();
    }

    const interval = setInterval(() => {
      if (cryptocurrencyPair) {
        fetchData();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [cryptocurrencyPair, pairUrlParams]);

  const [first, second] = cryptocurrencyPair?.split(/\W/);

  const columns = [
    {
      field: 'price',
      headerName: `Price ${second ? `(${second})` : ''}`,
      width: 130,
      editable: false,
      renderCell: ({ value, row }) => {
        return <span className={row?.isBuyerMaker ? 'link-success' : 'link-danger'}>{value}</span>
      }
    },
    {
      field: 'amount',
      headerName: `Amount  ${first && second ? `(${first})` : ''}`,
      width: 150,
      editable: false,
    },
    {
      field: 'time',
      headerName: 'Time',
      editable: false,
    },
    {
      field: 'isBuyerMaker',
      headerName: 'Buy/Sell',
      width: 80,
      renderCell: ({ value }) => {
        return (
          <span className={value ? 'link-success' : 'link-danger'}>
            {value ? 'Buy' : 'Sell'}
          </span>)
      },
      editable: false,
    }
  ];

  const isDetailsPage = pathname?.split(/\W/)?.includes('details');
  return (
    <>
      {isDetailsPage && <h3 className='mt-4 text-center'>Market Trades</h3>}
      <GridWrapper wrapInContainer={isDetailsPage}>
        <div style={{ height: 380, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      </GridWrapper>
    </>
  );
};

export default MarketTrades;
