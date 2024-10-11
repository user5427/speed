import { QuestionService } from "../.services/MainServices";
import { StatusHelper } from "../.helpers/MainHelpers";
import { QuestionErrors, QuestionPageErrors } from "../.constants/MainConstants";
import { Question, QuestionPage } from "../.entities/.MainEntitiesExport";

class QuestionController {
    static async Post(Question) {
        try {
            let jsonData = Question.toJson();
            const response = await QuestionService.postQuestion(jsonData);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(QuestionErrors.PostError);
            }
            let newQuestion = new Question();
            newQuestion.fromJson(response.data);
            return newQuestion;
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
            let newQuestion = new Question();
            newQuestion.fromJson(response.data);
            return newQuestion;
        } catch (error) {
            throw error;
        }
    }

    static async Put(Question) {
        try {
            let jsonData = Question.toJson();
            const response = await QuestionService.putQuestion(jsonData);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(QuestionErrors.PutError);
            }
            let newQuestion = new Question();
            newQuestion.fromJson(response.data);
            return newQuestion;
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
                throw new Error(QuestionErrors.SearchError);
            }
            let newQuestionPage = new QuestionPage();
            newQuestionPage.fromJson(response.data);
            return newQuestionPage;
        } catch (error) {
            throw error;
        }
    }
}

export default QuestionController;