import { ParagraphService } from "./.services/.MainServices";
import { StatusHelper } from "./.dataProcessingHelpers/DataProccessingHelpersExport";
import { ParagraphErrors, ParagraphPageErrors } from "../.constants/MainConstants";
import { ParagraphMapper, ParagraphPageMapper } from "./.mappers/paragraphMapper";
class ParagraphController {
    static async Post(Paragraph) {
        try {
            let jsonData = ParagraphMapper.toJson(Paragraph);
            const response = await ParagraphService.postParagraph(jsonData);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${ParagraphErrors.PostError()}. Details ${StatusHelper.getErrorMessage(response)}`);
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
                throw new Error(`${ParagraphErrors.GetError()}. Details ${StatusHelper.getErrorMessage(response)}`);
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
                throw new Error(`${ParagraphErrors.PutError()}. Details ${StatusHelper.getErrorMessage(response)}`);
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
                throw new Error(`${ParagraphErrors.DeleteError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async Search(query) {
        try {
            const response = await ParagraphService.getParagraphsByTitle(query);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${ParagraphPageErrors.SearchError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return ParagraphPageMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }
}

export { ParagraphController }