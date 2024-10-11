import { Question, QuestionPage } from "../../.entities/.MainEntitiesExport";
import { QuestionJson, QuestionPageJson } from "../../.constants/MainConstants";

class QuestionMapper {
    static fromJson(data) {
        return Question.createQuestionFromParams(
            data[QuestionJson.title], 
            data[QuestionJson.text], 
            data[QuestionJson.id], 
            data[QuestionJson.articleId],
            data[QuestionJson.paragraphId] || null,
            data[QuestionJson.answerChoices] || []
        );
    }

    static toJson(question) {
        const json = {};
        
        if (question._title) {
            json[QuestionJson.title] = question._title;
        }

        if (question._text) {
            json[QuestionJson.text] = question._text;
        }

        if (question._id) {
            json[QuestionJson.id] = question._id;
        }

        if (question._articleId) {
            json[QuestionJson.articleId] = question._articleId;
        }

        if (question._paragraphId) {
            json[QuestionJson.paragraphId] = question._paragraphId;
        }

        if (question._answerChoices) {
            json[QuestionJson.answerChoices] = question._answerChoices;
        }

        return json;
    }
}

class QuestionPageMapper {
    static fromJson(data) {
        return QuestionPage.createQuestionPageFromParams(
            data[QuestionPageJson.questions].map(question => QuestionMapper.fromJson(question)),
            data[QuestionPageJson.count]
        );
    }

    static toJson(questionPage) {
        const json = {};
        
        if (questionPage._questions) {
            json[QuestionPageJson.questions] = questionPage._questions.map(question => QuestionMapper.toJson(question));
        }

        if (questionPage._count) {
            json[QuestionPageJson.count] = questionPage._count;
        }

        return json;
    }
}

export { QuestionMapper, QuestionPageMapper };