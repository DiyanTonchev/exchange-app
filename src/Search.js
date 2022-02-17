import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Form,
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap'

import { setCryptocurrencyPair } from './redux/actions';

const Search = () => {
  const [cryptoPair, setCryptoPair] = useState('');
  const dispatch = useDispatch();

  const onSearchTextChange = (e) => {
    setCryptoPair(e?.currentTarget.value);
  }

  const onSearch = () => {
    dispatch(setCryptocurrencyPair(cryptoPair.toUpperCase()));
  }

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      onSearch();
    }
  }

  return (
    <Form>
      <InputGroup>
        <FormControl
          placeholder='Search cryptocurrency pair (e.g. BTC/USD)'
          onChange={onSearchTextChange}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant='primary'
          id='search-btn'
          disabled={cryptoPair?.length < 6}
          onClick={onSearch}
        >
          Search
        </Button>
      </InputGroup>
    </Form>
  );
};

export default Search;
