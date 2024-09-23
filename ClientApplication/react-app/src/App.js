import logo from './logo.svg';
import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Landing from './pages/landing'

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/">Speedreader</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Tests</Nav.Link>
          </Nav>
        </Navbar>
        <Routes>
          <Route exact path="/" Component={() => <Landing/>} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
