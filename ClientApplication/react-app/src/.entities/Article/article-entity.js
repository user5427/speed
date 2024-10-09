
import { ValidationConstants, ValidationPatternConstants } from '../../constants/MainConstants';

const Article = {
    title: {
        type: String,
        required: true,
        minLength: ValidationConstants.MinTitleLength,
        maxLength: ValidationConstants.MaxTitleLength,
        pattern: ValidationPatternConstants.TitlePattern
    },
    categoryTitle: {
        type: String,
        required: true,
        pattern: ValidationPatternConstants.ArticleCategoryPattern
    },
    coverImage: {
        type: String,
        required: false
    },
    paragraphIDs: {
        type: [],
        required: false
    },
    // getters and setters
    get title() {
        return this.title;
    },
    set title(value) {
        this.title = value;
    },
    get categoryTitle() {
        return this.categoryTitle;
    },
    set categoryTitle(value) {
        this.categoryTitle = value;
    },
    get coverImage() {
        return this.coverImage;
    },
    set coverImage(value) {
        this.coverImage = value;
    },
    get paragraphIDs() {
        return this.paragraphIDs;
    },
    set paragraphIDs(value) {
        this.paragraphIDs = value;
    },
    set article(data){  // based on json data
        this.title = data.title;
        this.categoryTitle = data.categoryTitle;
        // this.coverImage = data.coverImage;
    }

}

export default Article;