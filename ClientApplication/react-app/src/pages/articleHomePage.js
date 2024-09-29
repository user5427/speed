import React from "react";
import ArticleList from "../components/article-list-page";
import "../styles/articleHomePage.css";

const ArticleHomePage = () => {
    return (
        <>
            <div className="article-home-page">
                <h2>Article Home Page</h2>
            </div>
            <ArticleList />
        </>

    );
}

export default ArticleHomePage;