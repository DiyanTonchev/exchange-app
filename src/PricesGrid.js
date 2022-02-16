import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Modal } from 'react-bootstrap'

import MarketTrades from './MarketTrades';

import {
  fetchPriceBinance,
  fetchPriceBitfinex,
  fetchPriceHuobi,
  fetchPriceKraken
} from './exchanges.api';
import { setExchange } from './redux/actions';

const PricesGrid = () => {
  const [rows, setRows] = useState([])

  const {
    cryptocurrencyPair,
    selectedExchange
  } = useSelector((state) => ({
    cryptocurrencyPair: state.cryptocurrencyPair,
    selectedExchange: state.selectedExchange
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const pair = cryptocurrencyPair?.replace('/', '');
      try {
        const data = await Promise.all([
          fetchPriceBinance(cryptocurrencyPair?.replace('/', 'B')),
          fetchPriceBitfinex(pair),
          fetchPriceHuobi(pair.toLowerCase()),
          fetchPriceKraken(pair)
        ]);

        setRows(data);
      } catch (e) {
        setRows([]);
      }
    };

    if (cryptocurrencyPair) {
      fetchData();
    }

    const interval = setInterval(() => {
      if (cryptocurrencyPair) {
        fetchData();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [cryptocurrencyPair])

  const onPriceClick = (exhange) => {
    dispatch(setExchange(exhange));
  };

  const closeModal = () => {
    dispatch(setExchange(null));
  };

  const columns = [
    {
      field: 'exhange',
      headerName: 'Exhange',
      sortable: false,
      width: 260,
      editable: false,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 260,
      renderCell: ({ value, row }) => {
        const [first, second] = cryptocurrencyPair?.split('/');
        const price = Number(value).toFixed(3)
        return <>
          {value ?
            (<a
              className='link-primary'
              role='button'
              aria-hidden
              onClick={() => onPriceClick(row?.exhange)}
            >
              {second ? `1 ${first} = ${price} ${second}`: price}
            </a>) : 'Pair is not supported '}
        </>
      },
      editable: false,
    }
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[4]}
        disableSelectionOnClick
      />
      <Modal show={!!selectedExchange?.length} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Market Trades</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MarketTrades />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PricesGrid;
