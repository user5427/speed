import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap'; // Import Row and Col
import CategoryItem from './category-item';
import ReactPaginate from 'react-paginate';
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons from react-icons
import { IconContext } from "react-icons";
import "../../../styles/stylesPaginator.css"; // stylesheet
import { CategoryController } from '../../../.controllers/.MainControllersExport';
import ErrorPopup from '../../.common-components/ErrorPopup';
import { ThreeDots } from 'react-loader-spinner';

interface CategoryListProps {
    settings?: {
        showSelectButton?: boolean;
        showDeleteButton?: boolean;
        showEditButton?: boolean;
        showPlayButton?: boolean;
    };
    getSelected: (id: string) => void;
    update: any;
    getEditing: (id: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ settings, getSelected, update, getEditing }) => {
    const [categories, setCategories] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(0);

    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal

    useEffect(() => {
        getCategories();
    }, [update, page]); // Reload when update or page changes

    const getCategories = async () => {
        try {
            let categoryPage = await CategoryController.GetPage(page + 1);
            if (categoryPage === undefined) {
                return;
            }
            setCategories(categoryPage.categories || []);
            setPageSize(() => {
                const pagingSize = 9; // Assuming default page size
                return Math.ceil((categoryPage.count ?? 0) / pagingSize);
            });
        } catch (error: any) {
            setErrorMessage(error.message);
            setShowErrorModal(true);
        }
    };

    const handlePageClick = (data: { selected: number }) => {
        setPage(data.selected);
    };

    const closeErrorModal = () => {
        setShowErrorModal(false);
    };

    return (
        <>
            <div>
                {categories && categories.length > 0 ? (
                    <Row>
                        {categories.map((m) => (
                            <Col key={m.id} xs={12} md={4} className="mb-4">
                                <CategoryItem 
                                    data={m} 
                                    settings={settings}
                                    selectThis={() => getSelected(m.id)}
                                    editThis={() => getEditing(m.id)}
                                    deleteThis={() => { /* Implement delete logic if needed */ }}
                                    // Add other handlers if needed
                                />
                            </Col>
                        ))}
                    </Row>
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

            <div className="d-flex justify-content-center mt-4">
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
                    activeClassName={'active'} 
                />
            </div>

             {/* Error Popup */}
             <ErrorPopup 
                showErrorModal={showErrorModal} 
                errorMessage={errorMessage} 
                onClose={closeErrorModal} 
            />
        </>
    );
};

export default CategoryList;
