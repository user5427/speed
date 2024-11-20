import React, { useEffect, useState } from 'react';
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons form react-icons
import { IconContext } from "react-icons";
import { CategoryController } from '../../.controllers/.MainControllersExport';
import ErrorPopup from '../.common-components/ErrorPopup';
import CategoryItem from './Listing/category-item';

const ShowCategory = ({ id, sendArticleIds, settings }) => {
    const [category, setCategory] = useState<any>(null);

    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const [showErrorModal, setShowErrorModal] = useState(false); // State to show/hide modal

    useEffect(() => {
        if (id) getCategory();
    }, [id]) // [] if empty, will load for only the first and only first time

    const getCategory = async () => {
        try {
            let category = await CategoryController.Get(id);
            setCategory(category);
            sendArticleIds(category?.articleIds || []);
        } catch (error) {
            setErrorMessage(error.message);
            setShowErrorModal(true);
        }
    }

    const closeErrorModal = () => {
        setShowErrorModal(false);
    }

    return (
        <>
            {category ? (<div>
                <CategoryItem
                    data={category}
                    settings={settings}
                    selectThis={() => { }}
                    editThis={() => { }}
                />
            </div>) : ""}
            


            {/* Error Popup */}
            <ErrorPopup
                showErrorModal={showErrorModal}
                errorMessage={errorMessage}
                onClose={closeErrorModal}
            />
        </>
    )
}

export default ShowCategory;