import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Container,
  Row,
  Col
} from 'react-bootstrap'

import Search from './Search';
import PricesGrid from './PricesGrid';
import { setCryptocurrencyPair } from './redux/actions';

const Home = () => {
  const dispatch = useDispatch();
  const { pair } = useParams();

  useEffect(() => {
    if (pair) {
      dispatch(setCryptocurrencyPair(pair.toUpperCase()));
    }
  }, [pair]);

  return (
    <Container>
      <Row className='justify-content-md-center mt-4 mb-3'>
        <Col xs='6'>
          <Search />
        </Col>
      </Row>
      <Row className='justify-content-md-center mt-4 mb-3'>
        <Col xs='6'>
          <PricesGrid />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
