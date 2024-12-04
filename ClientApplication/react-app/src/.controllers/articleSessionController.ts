import { ArticleSessionService } from "./.services/.MainServices";
import { StatusHelper } from "./.dataProcessingHelpers/DataProccessingHelpersExport";
import { ArticleSessionErrors } from "../.constants/MainConstants";
import { ArticleSessionMapper } from "./.mappers/.MainMappersExport";
import { ArticleSession } from "../.entities/.MainEntitiesExport";

class ArticleSessionController {
    static async Post(ArticleSession: ArticleSession) {
        try {
            let jsonData = ArticleSessionMapper.toJson(ArticleSession);
            const response = await ArticleSessionService.postArticleSession(jsonData)
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${ArticleSessionErrors.PostError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
        } catch (error) {
            throw error;
        }
    }
}

export { ArticleSessionController };