import { ArticleService } from "../.services/.MainServices";
import { StatusHelper } from "../.helpers/MainHelpers";
import { ArticleErrors, ArticlePageErrors } from "../.constants/MainConstants";
import { Article, ArticlePage } from "../.entities/.MainEntitiesExport";
import { ArticleMapper, ArticlePageMapper } from "./.mappers/articleMapper";
class ArticleController {
    static async Post(Article) {
        try {
            let jsonData = ArticleMapper.toJson(Article);
            const response = await ArticleService.postArticle(jsonData);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(ArticleErrors.PostError);
            }
            return ArticleMapper.fromJson(response.data);
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
            return ArticleMapper.fromJson(response.data);
        } catch (error) {
            throw error;
        }
    }

    static async Put(Article) {
        try {
            let jsonData = ArticleMapper.toJson(Article);
            const response = await ArticleService.putArticle(jsonData);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(ArticleErrors.PutError);
            }
            return ArticleMapper.fromJson(response.data);
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
            return ArticleMapper.fromJson(response.data);
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
            return ArticlePageMapper.fromJson(response.data);
        } catch (error) {
            throw error;
        }
    }
}

export default ArticleController;