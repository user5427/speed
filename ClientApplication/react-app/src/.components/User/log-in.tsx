import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import ErrorPopup from '../.common-components/ErrorPopup';
import SuccessPopup from '../.common-components/SuccessPopup';
import { useTranslation } from 'react-i18next';
import { ValidationConstants, ValidationPatternConstants } from '../../.constants/MainConstants';
import { Link } from 'react-router-dom';
import { UserController } from '../../.controllers/userController';
import { User } from '../../.entities/.MainEntitiesExport';
const LogIn = () => {
  const { t } = useTranslation();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });


  const [validated, setValidated] = useState(false);

  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal

  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to show/hide modal

  // Handle input changes
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      console.log(user);
      let myUser = new User();
      myUser.email = user.email;
      myUser.password = user.password;
      await UserController.Login(myUser);
      setSuccessMessage(t('login.successMessage'));
      setShowSuccessModal(true);
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorModal(true);
      return;
    }
  };

  // Function to close the error modal
  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row>
        <Col>
        <Form.Group controlId="formEmail" className="input">
          <Form.Label>{t('login.email')}</Form.Label>
          <Form.Control
            name="email"
            value={user.email}
            autoComplete="off"
            placeholder={t('login.enterEmail')}
            className="form-control darkInput"
            onChange={handleFieldChange}
            required
            type="email"
            // Uncomment the pattern if you have an email validation pattern
            // pattern={ValidationPatternConstants.EmailPattern.source}
          />
          <Form.Control.Feedback type="invalid">
            {t('login.plsEnterValidEmail')}.
          </Form.Control.Feedback>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="formPassword" className="input">
          <Form.Label>{t('login.password')}</Form.Label>
          <Form.Control
            name="password"
            value={user.password}
            autoComplete="off"
            placeholder={t('login.enterPassword')}
            className="form-control darkInput"
            onChange={handleFieldChange}
            required
            type="password"
            // Uncomment these if you have password length constants
            // minLength={ValidationConstants.MinPasswordLength}
            // maxLength={ValidationConstants.MaxPasswordLength}
          />
          <Form.Control.Feedback type="invalid">
            {t('login.plsEnterPassword')}.
          </Form.Control.Feedback>
        </Form.Group>
        </Col>
        </Row>

        <Button
          className="buttons orange"
          type="submit"
          style={{ marginTop: '10px', width: '100%' }}
        >
          {t('login.logIn')}
        </Button>

        <Row style={{ marginTop: '25px' }}>
            <Col style={{ textAlign: 'center', color: 'grey' }}>
                {t('login.dontHaveAnAccount')}?{' '}
                <Link to="/sign-up" style={{ color: 'var(--color-blue-light)', textDecoration: 'none' }}>
                    {t('signup.signUp')}
                </Link>
            </Col>
        </Row>
      </Form>

      {/* Error Popup */}
      <ErrorPopup
        showErrorModal={showErrorModal}
        errorMessage={errorMessage}
        onClose={closeErrorModal}
      />

      {/* Success Popup */}
      <SuccessPopup
        showCreateModal={showSuccessModal}
        message={successMessage}
        onClose={closeSuccessModal}
      />
    </>
  );
};

export default LogIn;