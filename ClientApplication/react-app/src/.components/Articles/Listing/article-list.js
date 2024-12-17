import React, { useEffect, useState } from 'react';
import ArticleItem from './article-item';
import ReactPaginate from 'react-paginate';

import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons form react-icons
import { IconContext } from "react-icons";
import "../../../styles/stylesPaginator.css"; // stylesheet
import { ArticleController } from '../../../.controllers/.MainControllersExport';
import ErrorPopup from '../../.common-components/ErrorPopup';
import { ThreeDots } from 'react-loader-spinner';
import DeletePopup from '../../.common-components/DeletePopup';


const ArticleList = ({ settings, getSelected, update, getEditing, getPlay, userId}) => {
    const [articles, setArticles] = useState(null)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(0)

    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal

    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deleteMessage , setDeleteMessage] = useState("");
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        getArticles();
    }, [update, page]) // [] if empty, will load for only the first and only first time

    const getArticles = async () => {
        try {
            let articlePage = await ArticleController.GetPage(page + 1, userId);
            setArticles(articlePage.articles)
            setPageSize(() => {
                return Math.ceil(articlePage.count / process.env.REACT_APP_PAGING_SIZE)
            })
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setShowErrorModal(true); // Show modal
        }
    }

    const handlePageClick = (pageIndex) => {
        setPage(pageIndex.selected)
    }

    // Function to close the error modal
    const closeErrorModal = () => {
        setShowErrorModal(false);
    };

    const getDeleting = async () => {
        try {
            await ArticleController.Delete(deleteId);
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setShowErrorModal(true); // Show modal
        }

        getArticles();
    }

    const cancelDelete = () => {
        setShowDeletePopup(false);
    }

    const Delete = (id) => {
        setShowDeletePopup(true);
        setDeleteMessage("Are you sure you want to delete this article?");
        setDeleteId(id);
    }

        

    return (
        <>
            <div>
                {articles && articles.length > 0 ? (
                    articles.map((m, i) => (
                        <div key={i}>
                            <ArticleItem 
                            data={m} 
                            settings={settings}
                            selectThis={() => getSelected(m.id)}
                            editThis={() => getEditing(m.id)}
                            playThis={() => getPlay(m.id)}
                            deleteThis={() => Delete(m.id)}
                            />
                        </div>
                    ))
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <ThreeDots 
                      height="50" 
                      width="50" 
                      radius="9"
                      color="white" 
                      ariaLabel="three-dots-loading" 
                      visible={true}
                    />
                  </div>
                )}
            </div>

            <div className="d-flex justify-content-center">
                <ReactPaginate
                    previousLabel={
                        <IconContext.Provider value={{ color: "#2992a4", size: "36px" }}>
                            <AiFillLeftCircle />
                        </IconContext.Provider>
                    }
                    nextLabel={
                        <IconContext.Provider value={{ color: "#2992a4", size: "36px" }}>
                            <AiFillRightCircle />
                        </IconContext.Provider>
                    }
                    breakLabel={'...'}
                    pageCount={pageSize}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    pageClassName={"page-item"}
                    activeClassName={'active'} />
            </div>

             {/* Error Popup */}
             <ErrorPopup 
                showErrorModal={showErrorModal} 
                errorMessage={errorMessage} 
                onClose={closeErrorModal} 
            />

            <DeletePopup 
                showDeleteModal={showDeletePopup}
                message={deleteMessage}
                onClose={cancelDelete}
                onDelete={getDeleting}
            
            />
        </>
    )
}

export default ArticleList;