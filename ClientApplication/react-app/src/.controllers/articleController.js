import { ArticleService } from "../.services/MainServices";
import { StatusHelper } from "../.helpers/MainHelpers";
import { ArticleErrors, ArticlePageErrors } from "../.constants/MainConstants";
import { Article, ArticlePage } from "../.entities/.MainEntitiesExport";
class ArticleController {
    static async Post(Article) {
        try {
            let jsonData = Article.toJson();
            const response = await ArticleService.postArticle(jsonData);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(ArticleErrors.PostError);
            }
            let newArticle = new Article();
            newArticle.fromJson(response.data);
            return newArticle;
        } catch (error) {
            throw error;
        }
    }

    static async Get(id) {
        try {
            const response = await ArticleService.getArticle(id);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(ArticleErrors.GetError);
            }
            let newArticle = new Article();
            newArticle.fromJson(response.data);
            return newArticle;
        } catch (error) {
            throw error;
        }
    }

    static async Put(Article) {
        try {
            let jsonData = Article.toJson();
            const response = await ArticleService.putArticle(jsonData);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(ArticleErrors.PutError);
            }
            let newArticle = new Article();
            newArticle.fromJson(response.data);
            return newArticle;
        } catch (error) {
            throw error;
        }
    }

    static async Delete(id) {
        try {
            const response = await ArticleService.deleteArticle(id);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(ArticleErrors.DeleteError);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async GetPage(page) {
        try {
            const response = await ArticleService.getArticles(page);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(ArticlePageErrors.GetError);
            }
            let newPage = new ArticlePage();
            newPage.fromJson(response.data);
            return newPage;
        } catch (error) {
            throw error;
        }
    }

    static async Search(query) {
        try {
            const response = await ArticleService.getArticleByTitle(query);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(ArticlePageErrors.SearchError);
            }
            let newPage = new ArticlePage();
            newPage.fromJson(response.data);
            return newPage;
        } catch (error) {
            throw error;
        }
    }
}

export default ArticleController;