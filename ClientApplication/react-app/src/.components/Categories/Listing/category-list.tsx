import React, { useEffect, useState } from 'react';
import CategoryItem from './category-item';
import { CategoryPage } from '../../../.entities/.MainEntitiesExport';
import ReactPaginate from 'react-paginate';
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons form react-icons
import { IconContext } from "react-icons";
import "../../../styles/stylesPaginator.css"; // stylesheet
import { CategoryController } from '../../../.controllers/.MainControllersExport';
import ErrorPopup from '../../.common-components/ErrorPopup';

const CategoryList = ({settings, getSelected, update, getEditing}) => {
    const [categories, setCategories] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(0)

    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal

    useEffect(() => {
        getCategories();
    }, [update, page]) // [] if empty, will load for only the first and only first time

    const getCategories = async () => {
        try {
            let categoryPage = await CategoryController.GetPage(page+1);
            if (categoryPage === undefined) {

                return;
            }
            setCategories(categoryPage.categories || []);
            setPageSize(() => {
                const pagingSize = Number(process.env.REACT_APP_PAGING_SIZE) || 1;
                return Math.ceil((categoryPage.count ?? 0) / pagingSize);
            })
        } catch (error) {
            setErrorMessage(error.message);
            setShowErrorModal(true);
        }
    }

    const handlePageClick = (data) => {
        setPage(data.selected);
    }

    const closeErrorModal = () => {
        setShowErrorModal(false);
    }

    return (
        <>
            <div>
                {categories && categories.length > 0 ? (
                    categories.map((m, i) => (
                        <div key={i}>
                            <CategoryItem 
                            data={m} 
                            settings={settings}
                            selectThis={() => getSelected(m.id)}
                            editThis={() => getEditing(m.id)}
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
                    pageClassName={"page-item"}
                    activeClassName={'active'} />
            </div>

             {/* Error Popup */}
             <ErrorPopup 
                showErrorModal={showErrorModal} 
                errorMessage={errorMessage} 
                onClose={closeErrorModal} 
            />
        </>
    )
}

export default CategoryList;