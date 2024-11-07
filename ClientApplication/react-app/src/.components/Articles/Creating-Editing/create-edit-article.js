import React, { useState, useEffect } from 'react';
import { Button, Form, Image, Col, Row } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import NoImage from '../../../no-image.png';
import {
  ValidationConstants,
  ValidationPatternConstants,
} from '../../../.constants/MainConstants';
import { Article } from '../../../.entities/.MainEntitiesExport';
import { ArticleController } from '../../../.controllers/.MainControllersExport';
import ErrorPopup from '../../.common-components/ErrorPopup';
import SuccessPopup from '../../.common-components/SuccessPopup';
import DeletePopup from '../../.common-components/DeletePopup';
import { GrRevert } from 'react-icons/gr';
import LanguageSelectInput from '../../LanguageSelector/LanguageSelectInput';

import { useTranslation } from 'react-i18next';



const EditArticle = ({
  existingArticleId = undefined,
  sendCreatedId = undefined,
  redirect = true,
  sendUpdate = undefined,
}) => {
  const { t } = useTranslation();

  const [article, setArticle] = useState(new Article());
  const [validated, setValidated] = useState(false);
  const [update, setUpdate] = useState(false);

  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to show/hide modal

  const [MyRedirect, setRedirect] = useState(redirect);

  const [imageFileUrl, setImageUrl] = useState(NoImage);
  const [imageFile, setImageFile] = useState(undefined);
  const [updateImageFile, setUpdateImageFile] = useState(false);

  const [deleteMessage, setDeleteMessage] = useState(''); // State for delete message
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to show/hide modal
  const [deleteRequest, setDeleteRequest] = useState(null);

  // Trigger setArticleFromExisting when component mounts or existingArticleId changes
  useEffect(() => {
    setArticleFromExisting(existingArticleId);
  }, [existingArticleId]);

  useEffect(() => {
    setRedirect(redirect);
  }, []);

  useEffect(() => {
    if (article && article.imageFileName) {
      getArticleImage(); // Fetch image when the article is updated
    }
  }, [article.imageFileName]);

  useEffect(() => {
    updateArticleImage();
  }, [article.id]);

  const handleLanguageSelect = (code) => {
    setArticle((prevArticle) => ({
      ...prevArticle,
      language: code,
    }));
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (file) {
      setImageFile(file);
      setUpdateImageFile(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Set the image to the data URL
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  const getArticleImage = async () => {
    try {
      if (article.imageFileName) {
        let imageURL = await ArticleController.GetImage(article.id);
        setImageUrl(imageURL);
        setImageFile(undefined);
        setUpdateImageFile(false);
      }
    } catch (error) {
      setErrorMessage(error.message); // Set error message
      setShowErrorModal(true); // Show modal
    }
  };

  const updateArticleImage = async () => {
    try {
      if (article.id === null) {
        return;
      }
      if (article.imageFileName === null && imageFile) {
        await ArticleController.PostImage(article.id, imageFile);
        article.imageFileName = 'hasImage';
      } else if (article.imageFileName && imageFile && updateImageFile) {
        await ArticleController.DeleteImage(article.id);
        await ArticleController.PostImage(article.id, imageFile);
        article.imageFileName = 'hasImage';
        imageFile === undefined;
        setUpdateImageFile(false);
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteArticleImage = () => {
    if (!article.imageFileName) {
      return;
    }
    setDeleteRequest(1);
    setShowDeleteModal(true);
    setDeleteMessage('Are you sure you want to delete the image?');
  };

  const deleteConfirmed = async () => {
    setShowDeleteModal(false);
    if (deleteRequest === 1) {
      try {
        if (article.imageFileName) {
          await ArticleController.DeleteImage(article.id);
          article.imageFileName = null;
          imageFile === undefined;
          setImageUrl(NoImage);
        }
      } catch (error) {
        setErrorMessage(error.message); // Set error message
        setShowErrorModal(true); // Show modal
      }
    }
    setDeleteRequest(null);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteRequest(null);
  };

  const handleSave = async (event) => {
    event.preventDefault(); // We do not want the page to reload.
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return; // Stop execution if the form is not valid
    }

    try {
      let newArticle;
      if (update) {
        newArticle = await ArticleController.Put(article);
        setRedirect(false);
        setSuccessMessage('Updated article successfully.');
        setShowSuccessModal(true);
        updateArticleImage();
        if (sendUpdate) {
          sendUpdate();
        }
      } else {
        newArticle = await ArticleController.Post(article);
        setSuccessMessage('Created article successfully.');
        setShowSuccessModal(true);
        setUpdate(true);
      }
      setArticle(newArticle);
    } catch (error) {
      setErrorMessage(error.message); // Set error message
      setShowErrorModal(true); // Show modal
    }
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setArticle((prevArticle) => {
      const newArticle = Article.createArticleFromCopy(prevArticle);

      // Use the hasField method to check if the field exists
      if (newArticle.hasField(name)) {
        newArticle[name] = value; // Use setter for the corresponding field
      }

      return newArticle;
    });
  };

  // Function to close the error modal
  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  const setArticleFromExisting = async (exArtId) => {
    if (!exArtId) {
      return;
    }

    try {
      const existingArticle = await ArticleController.Get(exArtId);
      setArticle(existingArticle);
      setUpdate(true);
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorModal(true);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    if (MyRedirect) {
      window.location.href = `/edit-all?articleId=${article.id}`;
    }
    if (sendCreatedId) {
      sendCreatedId(article.id);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <Form validated={validated} onSubmit={handleSave}>
            <Form.Group controlId="formtestTitle" className="input">
              <Form.Label>{t('articles.createEdit.articleTitle')}</Form.Label>
              <Form.Control
                name={Article.varTitleName()}
                value={article.title}
                required
                type="text"
                autoComplete="off"
                placeholder={t('articles.createEdit.enterArticleTitle')}
                className="form-control darkInput"
                onChange={handleFieldChange}
                minLength={ValidationConstants.MinTitleLength}
                maxLength={ValidationConstants.MaxTitleLength}
                pattern={ValidationPatternConstants.TitlePattern.source}
              />
              <Form.Control.Feedback type="invalid">
                {t('articles.createEdit.plsEnterArticleTitle')}
              </Form.Control.Feedback>
            </Form.Group>

          <Form.Group controlId="formtestCategory" className="input">
              <Form.Label>{t('articles.createEdit.articleCategory')}</Form.Label>
              <Form.Control
                name={Article.varCategoryTitleName()}
                value={article.categoryTitle}
                required
                type="text"
                placeholder={t('articles.createEdit.enterArticleCategory')}
                className="form-control darkInput"
                onChange={handleFieldChange}
                pattern={ValidationPatternConstants.ArticleCategoryPattern.source}
              />
              <Form.Control.Feedback type="invalid">
                {t('articles.createEdit.plsEnterArticleCategory')}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formArticleAuthor" className="input">
              <Form.Label>{t('articles.createEdit.articleAuthor')}</Form.Label>
              <Form.Control
                name="author"
                value={article.author || ''}
                type="text"
                placeholder={t('articles.createEdit.enterAuthor')}
                className="form-control darkInput"
              />
              <Form.Control.Feedback type="invalid">
                {t('articles.createEdit.plsEnterAuthor')}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formArticlePublisher" className="input">
              <Form.Label>{t('articles.createEdit.articlePublisher')}</Form.Label>
              <Form.Control
                name="publisher"
                value={article.publisher || ''}
                type="text"
                placeholder={t('articles.createEdit.enterPublisher')}
                className="form-control darkInput"
              />
              <Form.Control.Feedback type="invalid">
                {t('articles.createEdit.plsEnterPublisher')}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formArticleLink" className="input">
              <Form.Label>{t('articles.createEdit.articleLink')}</Form.Label>
              <Form.Control
                name="link"
                value={article.link || ''}
                type="url"
                placeholder={t('articles.createEdit.enterLink')}
                className="form-control darkInput"
              />
              <Form.Control.Feedback type="invalid">
                {t('articles.createEdit.plsEnterLink')}
              </Form.Control.Feedback>
            </Form.Group>


          </Form>

          <ErrorPopup
            showErrorModal={showErrorModal}
            errorMessage={errorMessage}
            onClose={closeErrorModal}
          />

          <SuccessPopup
            showCreateModal={showSuccessModal}
            message={successMessage}
            onClose={closeSuccessModal}
          />

          <DeletePopup
            showDeleteModal={showDeleteModal}
            message={deleteMessage}
            onClose={closeDeleteModal}
            onDelete={deleteConfirmed}
          />
        </Col>

        <Col>
          <Form>


          <Form.Group controlId="formArticleLanguage" className="input">
              <Form.Label>{t('articles.createEdit.articleLanguage')}</Form.Label>
              <LanguageSelectInput
                selectedLanguage={article.language}
                onSelectLanguage={handleLanguageSelect}
              />
              <Form.Control.Feedback type="invalid">
                {t('articles.createEdit.plsSelectArticleLanguage')}
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group
              className="d-flex justify-content-center"
              style={{ marginBottom: '20px', marginTop:"25px" }}
            >
              <Image height="200" src={imageFileUrl} alt="Uploaded Image" />
            </Form.Group>
            <Form.Group
              className="d-flex justify-content-center"
              style={{ marginBottom: '20px' }}
            >
              <input
                className="form-control darkInput"
                type="file"
                onChange={handleFileUpload}
              />
            </Form.Group>
            {article.imageFileName && (
              <>
                <Button
                  onClick={getArticleImage}
                  className="mb-2"
                  style={{ fontSize: '1rem', width: '100%' }}
                >
                  <GrRevert /> {t('commonUIelements.resetImg')}
                </Button>
                <Button
                  variant="danger"
                  onClick={deleteArticleImage}
                  style={{ fontSize: '1rem', width: '100%' }}
                >
                  <MdDelete /> {t('commonUIelements.deleteImg')}
                </Button>
              </>
            )}
          </Form>
        </Col>

        <Form
          validated={validated}
          onSubmit={handleSave}
          style={{  }}
        >
          <Button className='subjectButtons' type="submit" style={{ marginTop: '10px', width: '100%', backgroundColor: '#739900', borderColor: '#4d6600' }}>
            {update ? t('commonUIelements.update') : t('commonUIelements.create')}
          </Button>
        </Form>
      </Row>
    </>
  );
};

export default EditArticle;
