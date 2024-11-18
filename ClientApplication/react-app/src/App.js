import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from './logo.svg';
import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { CgProfile } from "react-icons/cg";

import LanguageSelector from './.components/LanguageSelector/LanguageSelector';

// font:
import '@fontsource/fredoka';
import '@fontsource/fredoka/300.css';
import '@fontsource/fredoka/700.css';

import Landing from './pages/HomePage/homePage';
import Categories from './pages/Categories/categories';
import ArticleHomePage from './pages/Articles/articleManagementPage';
import Exercise from './pages/Exercise/exercise';
import CreateArticle from './pages/CreatePages/createArticlePage';
import CreateParagraph from './pages/CreatePages/createParagraphPage';
import CreateQuestion from './pages/CreatePages/createQuestionPage';
import EditArticleParagraphQuestion from './pages/EditPages/editAll';
import EditParagraphQuestion from './pages/EditPages/editParagraphQuestionPage';
import EditQuestion from './pages/EditPages/editQuestionPage';
import CreateCategory from './pages/Categories/createCategoryPage';
import SignUpPage from './pages/UserPages/signUpPage';
import LogInPage from './pages/UserPages/logInPage';


function App() {

  const { t } = useTranslation();

  return (
    <Container>
        <Navbar bg="dark" variant="dark" style={{ borderRadius: '15px', fontSize: '20px' }} className='navBar'>
          <Navbar.Brand as={Link} to="/" className='siteLogo'>
            <img src={logo} alt="logo" style={{ width: '60px', height: '60px' }}/>
          </Navbar.Brand>
          <Navbar.Brand as={Link} to="/" className='siteName'>Speedreader.com</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">{t('homepage.home')}</Nav.Link> 
            <Nav.Link as={Link} to="/about">{t('homepage.about')}</Nav.Link>
            <Nav.Link as={Link} to="/sign-up">Sign up</Nav.Link>
            <Nav.Link as={Link} to="/log-in">Log in</Nav.Link>

          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/" style={{ marginRight: '5px' }}>Jonas Jonaitis <CgProfile data-testid="profile-icon" size={30}/></Nav.Link>
          </Nav>
          <Nav style={{ marginRight: '10px' }}>
          <LanguageSelector data-testid="language-selector"/> 
          </Nav>
        </Navbar>
        <Routes>
          <Route exact path="/" Component={() => <Landing/>} />
          <Route exact path="/categories" Component={() => <Categories/>} />
          <Route exact path="/articles" Component={() => <ArticleHomePage/>} />
          <Route exact path="/exercise" Component={() => <Exercise/>} />
          <Route exact path="/create-article" Component={() => <CreateArticle/>} />
          <Route exact path="/create-paragraph" Component={() => <CreateParagraph/>} />
          <Route exact path="/create-question" Component={() => <CreateQuestion/>} />
          <Route exact path="/edit-all" Component={() => <EditArticleParagraphQuestion/>} />
          <Route exact path="/edit-paragraph-question" Component={() => <EditParagraphQuestion/>} />
          <Route exact path="/edit-question" Component={() => <EditQuestion/>} />
          <Route exact path="/create-category" Component={() => <CreateCategory/>} />
          <Route exact path="/sign-up" Component={() => <SignUpPage/>} />
          <Route exact path="/log-in" Component={() => <LogInPage/>} />
        </Routes>
    </Container>
  );
}

export default App;
