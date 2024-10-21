import { React, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import QuestionItem from './questionItem';

import "../../../styles/stylesPaginator.css"; // stylesheet
import { ParagraphController, QuestionController } from '../../../.controllers/.MainControllersExport';
import ErrorPopup from '../../.common-components/ErrorPopup';

import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons form react-icons
import { IconContext } from "react-icons";
import ReactPaginate from 'react-paginate';

const listOfQuestions = ({paragraphId, getSelected, update}) => {
    const [questions, setQuestions] = useState(null)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(0)

    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal

    useEffect(() => {
        getQuestions();
    }, [update])

    useEffect(() => {
        // get all tests
        getQuestions();
    }, [page]) // [] if empty, will load for only the first and only first time

    const getQuestions = async () => {
        const maxPageSize = process.env.REACT_APP_PAGING_SIZE;
        let allParagraphQuestions = [];

        try {
            let paragraph = await ParagraphController.Get(paragraphId);
            allParagraphQuestions = paragraph.questionIDs;
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setShowErrorModal(true); // Show modal
            return;
        }

        setPageSize(() => {
            return Math.ceil(allParagraphQuestions.length / maxPageSize)
        })

        // leave only specified number of questions
        allParagraphQuestions = allParagraphQuestions.slice(page * maxPageSize, page * maxPageSize + maxPageSize);

        // get each question individually
        try {
            let questions = await Promise.all(allParagraphQuestions.map(async (questionId) => {
                return await QuestionController.Get(questionId);
            }));
            setQuestions(questions);
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setShowErrorModal(true); // Show modal
        }
    }

    const handlePageClick = (pageIndex) => {
        setPage(pageIndex.selected)
    }

    const closeErrorModal = () => {
        setShowErrorModal(false);
    }

    return (
        <>
            <div>
                {questions && questions.length > 0 ? (
                    questions.map((m, i) => (
                        <div key={i}>
                            <QuestionItem 
                                data={m}
                                editThis={() => getSelected(m.id)}
                            />
                        </div>
                    ))
                ) : (
                    ""
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
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>

            {/* Error Popup */}
            <ErrorPopup
                errorMessage={errorMessage}
                show={showErrorModal}
                handleClose={closeErrorModal}
            />
        </>
    )
}

export default listOfQuestions;