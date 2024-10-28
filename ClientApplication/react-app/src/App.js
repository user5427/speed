import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from './logo.svg';
import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { CgProfile } from "react-icons/cg";

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

import { LanguagesConstants } from './.constants/MainConstants';

function App() {
  const { i18n, t } = useTranslation(); 

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Container>
      <BrowserRouter>
        <Navbar bg="dark" variant="dark" style={{ borderRadius: '15px', fontSize: '20px' }} className='navBar'>
          <Navbar.Brand as={Link} to="/" className='siteLogo'>
            <img src={logo} alt="logo" style={{ width: '60px', height: '60px' }}/>
          </Navbar.Brand>
          <Navbar.Brand as={Link} to="/" className='siteName'>Speedreader.com</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">{t('home')}</Nav.Link>  {/* Translated "Home" */}
            <Nav.Link as={Link} to="/about">{t('about')}</Nav.Link> {/* Translated "About us" */}


          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/" style={{ marginRight: '5px' }}>Jonas Jonaitis <CgProfile size={30}/></Nav.Link>
            <select  style={{ marginRight: '15px' }} value={i18n.language} onChange={handleLanguageChange}> {/* Bind value to i18n.language */}
              {LanguagesConstants.map(({ code, label }) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
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
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
