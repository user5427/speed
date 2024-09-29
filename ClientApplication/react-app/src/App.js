import logo from './logo.svg';
import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Landing from './pages/landing'
import { CgProfile } from "react-icons/cg";

//font:
import '@fontsource/fredoka';
import '@fontsource/fredoka/300.css';
import '@fontsource/fredoka/700.css';

import Categories from './pages/categories'
import ArticleHomePage from './pages/Articles/articleHomePage';
import Exercise from './pages/exercise';
import CreateArticle from './pages/Articles/createArticle';



function App() {
  return (
   
    <Container>
      <BrowserRouter>
        <Navbar bg="dark" variant="dark" style={{ borderRadius: '15px', fontSize: '20px' }} className='navBar'>
          <Navbar.Brand as={Link} to="/" className='siteName'>Speedreader.com</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/">About us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/" style={{ marginRight: '20px' }}>Jonas Jonaitis <CgProfile size={30}/></Nav.Link>
          </Nav>
        </Navbar>
        <Routes>
          <Route exact path="/" Component={() => <Landing/>} />
          <Route exact path="/categories" Component={() => <Categories/>} />

          <Route exact path="/articles" Component={() => <ArticleHomePage/>} />
          <Route exact path="/exercise" Component={() => <Exercise/>} />
          <Route exact path="/create-article" Component={() => <CreateArticle/>} />
          </Routes>
      </BrowserRouter>
    </Container>
  
  );
}

export default App;
