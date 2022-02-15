import React from 'react';
import { Navbar, Container } from 'react-bootstrap'

const Header = () => (
  <Navbar bg='primary' variant='dark'>
    <Container>
      <Navbar.Brand href='/'>Crypto Exchange</Navbar.Brand>
    </Container>
  </Navbar>
);

export default Header;
