import { ParagraphService } from "../.services/MainServices";
import { StatusHelper } from "../.helpers/MainHelpers";
import { ParagraphErrors, ParagraphPageErrors } from "../.constants/MainConstants";
import { Paragraph, ParagraphPage } from "../.entities/.MainEntitiesExport";

class ParagraphController {
    static async Post(Paragraph) {
        try {
            let jsonData = Paragraph.toJson();
            const response = await ParagraphService.postParagraph(jsonData);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(ParagraphErrors.PostError);
            }
            let newParagraph = new Paragraph();
            newParagraph.fromJson(response.data);
            return newParagraph;
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
            let newParagraph = new Paragraph();
            newParagraph.fromJson(response.data);
            return newParagraph;
        } catch (error) {
            throw error;
        }
    }

    static async Put(Paragraph) {
        try {
            let jsonData = Paragraph.toJson();
            const response = await ParagraphService.putParagraph(jsonData);
            if (StatusHelper.isError(response.data) || !response.data) {
                throw new Error(ParagraphErrors.PutError);
            }
            let newParagraph = new Paragraph();
            newParagraph.fromJson(response.data);
            return newParagraph;
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
                throw new Error(ParagraphErrors.SearchError);
            }
            let newParagraphPage = new ParagraphPage();
            newParagraphPage.fromJson(response.data);
            return newParagraphPage;
        } catch (error) {
            throw error;
        }
    }
}

export default ParagraphController;