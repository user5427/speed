import { Article, ArticlePage } from "../../.entities/.MainEntitiesExport";
import { ArticleJson, ArticlePageJson } from "../../.constants/MainConstants";
class ArticleMapper {
    static fromJson(data) {
        return Article.createArticleFromParams(
            data[ArticleJson.title], 
            data[ArticleJson.categoryTitle], 
            data[ArticleJson.coverImage] || null, 
            data[ArticleJson.paragraphIds]  || [],
            data[ArticleJson.id]
        );
    }

    static toJson(article) {
        const json = {};
        
        if (article._title) {
            json[ArticleJson.title] = article._title;
        }

        if (article._categoryTitle) {
            json[ArticleJson.categoryTitle] = article._categoryTitle;
        }

        if (article._id) {
            json[ArticleJson.id] = article._id;
        }

        if (article._coverImage) {
            json[ArticleJson.coverImage] = article._coverImage;
        }

        if (article._paragraphIDs) {
            json[ArticleJson.paragraphIds] = article._paragraphIDs;
        }

        return json;
    }
}

class ArticlePageMapper {
    static fromJson(data) {
        return ArticlePage.createArticlePageFromParams(
            data[ArticlePageJson.articles].map(article => ArticleMapper.fromJson(article)),
            data[ArticlePageJson.count]
        );
    }

    static toJson(articlePage) {
        const json = {};
        
        if (articlePage._articles) {
            json[ArticlePageJson.articles] = articlePage._articles.map(article => ArticleMapper.toJson(article));
        }

        if (articlePage._count) {
            json[ArticlePageJson.count] = articlePage._count;
        }

        return json;
    }
}

export { ArticleMapper, ArticlePageMapper };