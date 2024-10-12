import React, { useEffect, useState } from 'react';
import ArticleItem from './article-item';
import ReactPaginate from 'react-paginate';

import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons form react-icons
import { IconContext } from "react-icons";
import "../../../styles/stylesPaginator.css"; // stylesheet
import { ArticleController } from '../../../.controllers/.MainControllersExport';

const ArticleList = ({ settings }) => {
    const [articles, setArticles] = useState(null)
    const [articleCount, setArticleCount] = useState(0)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(0)
    useEffect(() => {
        // get all tests
        getArticles();
    }, [page]) // [] if empty, will load for only the first and only first time

    const getArticles = async () => {
        try {
            let articlePage = await ArticleController.GetPage(page + 1);
            setArticles(articlePage.articles)
            setArticleCount(articlePage.count)
            setPageSize(() => {
                return Math.ceil(articlePage.count / process.env.REACT_APP_PAGING_SIZE)
            })
        } catch (error) {
            alert(error);
        }
    }

    const handlePageClick = (pageIndex) => {
        setPage(pageIndex.selected)
    }

    return (
        <>
            <div>
                {articles && articles.length > 0 ? (
                    articles.map((m, i) => (
                        <div key={i}>
                            <ArticleItem data={m} settings={settings} />
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
        </>
    )
}

export default ArticleList;