import { Paragraph, ParagraphPage } from "../../.entities/.MainEntitiesExport";
import { ParagraphJson, ParagraphPageJson } from "../../.constants/MainConstants";
class ParagraphMapper {
    static fromJson(data) {
        return Paragraph.createParagraphFromParams(
            data[ParagraphJson.title], 
            data[ParagraphJson.text], 
            data[ParagraphJson.articleId],
            data[ParagraphJson.id],
            data[ParagraphJson.questionIds] || [],
            data[ParagraphJson.nextParagraphId] || null
        );
    }

    static toJson(paragraph) {
        const json = {};
        
        if (paragraph._title) {
            json[ParagraphJson.title] = paragraph._title;
        }

        if (paragraph._id) {
            json[ParagraphJson.id] = paragraph._id;
        }

        if (paragraph._text) {
            json[ParagraphJson.content] = paragraph._text;
        }

        if (paragraph._articleId) {
            json[ParagraphJson.articleId] = paragraph._articleId;
        }

        if (paragraph._questionIDs) {
            json[ParagraphJson.questionIds] = paragraph._questionIDs;
        }

        if (paragraph._nextParagraphId) {
            json[ParagraphJson.nextParagraphId] = paragraph._nextParagraphId;
        }

        return json;
    }
}

class ParagraphPageMapper {
    static fromJson(data) {
        return ParagraphPage.createParagraphPageFromParams(
            data[ParagraphPageJson.paragraphs].map(paragraph => ParagraphMapper.fromJson(paragraph)),
            data[ParagraphPageJson.count]
        );
    }

    static toJson(paragraphPage) {
        const json = {};
        
        if (paragraphPage._paragraphs) {
            json[ParagraphPageJson.paragraphs] = paragraphPage._paragraphs.map(paragraph => ParagraphMapper.toJson(paragraph));
        }

        if (paragraphPage._count) {
            json[ParagraphPageJson.count] = paragraphPage._count;
        }

        return json;
    }
}

export { ParagraphMapper, ParagraphPageMapper };