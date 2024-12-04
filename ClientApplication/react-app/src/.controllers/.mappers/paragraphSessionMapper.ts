import { ParagraphSession, QuestionSession }  from "../../.entities/.MainEntitiesExport";
import { ParagraphSessionJson } from "../../.constants/MainConstants";  

class ParagraphSessionMapper {
    static toJson(paragraphSession: ParagraphSession): { [key: string]: any } {
        const json: { [key: string]: any } = {};
        
        json[ParagraphSessionJson.paragraphId] = paragraphSession.getParagraphId;
        json[ParagraphSessionJson.duration] = paragraphSession.getDuration;
        json[ParagraphSessionJson.wpm] = paragraphSession.getWpm;
        json[ParagraphSessionJson.correctQuestionCount] = paragraphSession.getQuestionSessions().filter(questionSession => questionSession.getCorrect).length;

        return json;
    }
}

export default ParagraphSessionMapper;