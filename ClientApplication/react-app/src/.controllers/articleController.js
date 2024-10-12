import { ArticleService } from "../.services/.MainServices";
import { StatusHelper } from "../.helpers/MainHelpers";
import { ArticleErrors, ArticlePageErrors } from "../.constants/MainConstants";
import { ArticleMapper, ArticlePageMapper } from "./.mappers/articleMapper";
class ArticleController {
    static async Post(Article) {
        try {
            let jsonData = ArticleMapper.toJson(Article);
            const response = await ArticleService.postArticle(jsonData)
            if (!response || StatusHelper.isError(response)) {
                throw new Error(ArticleErrors.PostError());
            }
            return ArticleMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Get(id) {
        try {
            const response = await ArticleService.getArticle(id);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(ArticleErrors.GetError());
            }
            return ArticleMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Put(Article) {
        try {
            let jsonData = ArticleMapper.toJson(Article);
            const response = await ArticleService.putArticle(jsonData);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(ArticleErrors.PutError());
            }
            return ArticleMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Delete(id) {
        try {
            const response = await ArticleService.deleteArticle(id);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(ArticleErrors.DeleteError());
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async GetPage(page) {
        try {
            const response = await ArticleService.getArticles(page);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(ArticlePageErrors.GetError());
            }
            return ArticleMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Search(query) {
        try {
            const response = await ArticleService.getArticleByTitle(query);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(ArticlePageErrors.SearchError());
            }
            return ArticlePageMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }
}

export { ArticleController }