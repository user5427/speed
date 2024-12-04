import { ArticleSession } from "../../.entities/.MainEntitiesExport";
import { ArticleSessionJson } from "../../.constants/MainConstants";
import ParagraphSessionMapper from "./paragraphSessionMapper";

class ArticleSessionMapper {
    static toJson(articleSession: ArticleSession): { [key: string]: any } {
        const json: { [key: string]: any } = {};
        
            json[ArticleSessionJson.articleId] = articleSession.getArticleId;
            json[ArticleSessionJson.paragraphSession] = articleSession.getParagraphSessions().map(paragraphSession => ParagraphSessionMapper.toJson(paragraphSession));

        return json;
    }
}

export { ArticleSessionMapper };