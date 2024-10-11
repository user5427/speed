import { ParagraphService } from "../.services/.MainServices";
import { StatusHelper } from "../.helpers/MainHelpers";
import { ParagraphErrors, ParagraphPageErrors } from "../.constants/MainConstants";
import { Paragraph, ParagraphPage } from "../.entities/.MainEntitiesExport";
import { ParagraphMapper, ParagraphPageMapper } from "./.mappers/paragraphMapper";
class ParagraphController {
    static async Post(Paragraph) {
        try {
            let jsonData = ParagraphMapper.toJson(Paragraph);
            const response = await ParagraphService.postParagraph(jsonData);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(ParagraphErrors.PostError);
            }
            return ParagraphMapper.fromJson(response.data);
        } catch (error) {
            throw error;
        }
    }

    static async Get(id) {
        try {
            const response = await ParagraphService.getParagraph(id);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(ParagraphErrors.GetError);
            }
            return ParagraphMapper.fromJson(response.data);
        } catch (error) {
            throw error;
        }
    }

    static async Put(Paragraph) {
        try {
            let jsonData = ParagraphMapper.toJson(Paragraph);
            const response = await ParagraphService.putParagraph(jsonData);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(ParagraphErrors.PutError);
            }
            return ParagraphMapper.fromJson(response.data);
        } catch (error) {
            throw error;
        }
    }

    static async Delete(id) {
        try {
            const response = await ParagraphService.deleteParagraph(id);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(ParagraphErrors.DeleteError);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async Search(query) {
        try {
            const response = await ParagraphService.searchParagraphs(query);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(ParagraphPageErrors.SearchError);
            }
            return ParagraphPageMapper.fromJson(response.data);
        } catch (error) {
            throw error;
        }
    }
}

export default ParagraphController;