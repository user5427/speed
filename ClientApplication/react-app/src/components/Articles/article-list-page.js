import React, { useEffect, useState } from 'react';
import ArticleItem from './article-item';
import ReactPaginate from 'react-paginate';

import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; // icons form react-icons
import { IconContext } from "react-icons";
import "../../styles/stylesPaginator.css"; // stylesheet

const ArticleList = () => {
    const [articles, setArticles] = useState(null)
    const [articleCount, setArticleCount] = useState(0)
    const [page, setPage] = useState(0)
    useEffect(() => {
        // get all tests
        getArticles();
    }, [page]) // [] if empty, will load for only the first and only first time

    const getArticles = () => {
        fetch(process.env.REACT_APP_API_URL + "Articles?pageIndex=" + page + "&pageSize=" + process.env.REACT_APP_PAGING_SIZE)
            .then(res => res.json())
            .then(res => {
                res.status = true; // fix this
                if (res.status === true && res.data.articles > 0) {
                    setArticles(res.data.articleList);
                    setArticleCount(Math.ceil(res.data.articles / process.env.REACT_APP_PAGING_SIZE));
                }

                if (res.data.articles === 0) {
                    alert("There is no article data in the system.");
                }


            }).catch(err => alert("Error getting data"));
    }

    const handlePageClick = (pageIndex) => {
        setPage(pageIndex.selected)
    }

    return (
        <>
            <div>
                {articles && articles !== [] ?
                    articles.map((m, i) => <ArticleItem key={i} data={m} />)
                    : ""}
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
                    pageCount={articleCount}
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