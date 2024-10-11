import { QuestionService } from "../.services/.MainServices";
import { StatusHelper } from "../.helpers/MainHelpers";
import { QuestionErrors, QuestionPageErrors } from "../.constants/MainConstants";
import { Question, QuestionPage } from "../.entities/.MainEntitiesExport";
import { QuestionMapper, QuestionPageMapper } from "./.mappers/questionMapper";
class QuestionController {
    static async Post(Question) {
        try {
            let jsonData = QuestionMapper.toJson(Question);
            const response = await QuestionService.postQuestion(jsonData);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(QuestionErrors.PostError);
            }
            return QuestionMapper.fromJson(response.data);
        } catch (error) {
            throw error;
        }
    }

    static async Get(id) {
        try {
            const response = await QuestionService.getQuestion(id);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(QuestionErrors.GetError);
            }
            return QuestionMapper.fromJson(response.data);
        } catch (error) {
            throw error;
        }
    }

    static async Put(Question) {
        try {
            let jsonData = QuestionMapper.toJson(Question);
            const response = await QuestionService.putQuestion(jsonData);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(QuestionErrors.PutError);
            }
            return QuestionMapper.fromJson(response.data);
        } catch (error) {
            throw error;
        }
    }

    static async Delete(id) {
        try {
            const response = await QuestionService.deleteQuestion(id);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(QuestionErrors.DeleteError);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async Search(query) {
        try {
            const response = await QuestionService.searchQuestions(query);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(QuestionPageErrors.SearchError);
            }
            return QuestionPageMapper.fromJson(response.data);
        } catch (error) {
            throw error;
        }
    }
}

export default QuestionController;