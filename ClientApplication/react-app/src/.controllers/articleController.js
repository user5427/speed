import { ArticleService } from "./.services/.MainServices";
import { StatusHelper } from "./.dataProcessingHelpers/DataProccessingHelpersExport";
import { ArticleErrors, ArticlePageErrors } from "../.constants/MainConstants";
import { ArticleMapper, ArticlePageMapper } from "./.mappers/articleMapper";
class ArticleController {
    static async Post(Article) {
        try {
            let jsonData = ArticleMapper.toJson(Article);
            const response = await ArticleService.postArticle(jsonData)
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${ArticleErrors.PostError()}. Details ${StatusHelper.getErrorMessage(response)}`);
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
                throw new Error(`${ArticleErrors.GetError()}. Details ${StatusHelper.getErrorMessage(response)}`);
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
                throw new Error(`${ArticleErrors.PutError()}. Details ${StatusHelper.getErrorMessage(response)}`);
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
                throw new Error(`${ArticleErrors.DeleteError()}. Details ${StatusHelper.getErrorMessage(response)}`);
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
                throw new Error(`${ArticlePageErrors.GetError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return ArticlePageMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Search(query) {
        try {
            const response = await ArticleService.getArticleByTitle(query);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${ArticlePageErrors.SearchError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return ArticlePageMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }
}

export { ArticleController }