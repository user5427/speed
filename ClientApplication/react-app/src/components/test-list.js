import React, { useEffect, useState } from 'react';
import TestItem from './test-item';
import ReactPaginate from 'react-paginate';
const TestList = () => {
    const[tests, setTests] = useState(null)
    const[testCount, setTestCount] = useState(0)
    const[page, setPage] = useState(0)
    useEffect(() => {
        // get all tests
        getTests();
    }, [page]) // [] if empty, will load for only the first and only first time

    const getTests = () => {
        fetch(process.env.REACT_APP_API_URL + "Articles?pageIndex=" + page + "&pageSize=" + process.env.REACT_APP_PAGING_SIZE)
        .then(res => res.json())
        .then(res => {
            res.status = true; // fix this
            if (res.status === true && res.data.articles > 0){
                setTests(res.data.articleList);
                setTestCount(Math.ceil(res.data.articles / process.env.REACT_APP_PAGING_SIZE));
            }

            if (res.data.articles === 0){
                alert("There is no test data in the system.");
            }


        }).catch(err => alert("Error getting data"));
    }

    const handlePageClick = (pageIndex) => {
        setPage(pageIndex.selected)
    }

    return (
        <>
            {tests && tests !== [] ? 
            tests.map((m, i) => <TestItem key={i} data={m}/>) 
            : ""}

            <div className="d-flex justify-content-center">
                <ReactPaginate 
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'page-link'}
                pageCount={testCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-link'}
                nextClassName={'page-link'}
                activeClassName={'active'}/>
            </div>
        </>
    )
}

export default TestList;