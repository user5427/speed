import { ParagraphService } from "../.services/.MainServices";
import { StatusHelper } from "../.helpers/MainHelpers";
import { ParagraphErrors, ParagraphPageErrors } from "../.constants/MainConstants";
import { ParagraphMapper, ParagraphPageMapper } from "./.mappers/paragraphMapper";
class ParagraphController {
    static async Post(Paragraph) {
        try {
            let jsonData = ParagraphMapper.toJson(Paragraph);
            const response = await ParagraphService.postParagraph(jsonData);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(ParagraphErrors.PostError());
            }
            return ParagraphMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Get(id) {
        try {
            const response = await ParagraphService.getParagraph(id);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(ParagraphErrors.GetError());
            }
            return ParagraphMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Put(Paragraph) {
        try {
            let jsonData = ParagraphMapper.toJson(Paragraph);
            const response = await ParagraphService.putParagraph(jsonData);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(ParagraphErrors.PutError());
            }
            return ParagraphMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Delete(id) {
        try {
            const response = await ParagraphService.deleteParagraph(id);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(ParagraphErrors.DeleteError());
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async Search(query) {
        try {
            const response = await ParagraphService.searchParagraphs(query);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(ParagraphPageErrors.SearchError());
            }
            return ParagraphPageMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }
}

export { ParagraphController }