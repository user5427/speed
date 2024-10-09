import { ValidationConstants, ValidationPatternConstants } from '../../constants/MainConstants';

const Paragraph = {
    title: {
        type: String,
        required: true,
        minLength: ValidationConstants.MinTitleLength,
        maxLength: ValidationConstants.MaxTitleLength,
        pattern: ValidationPatternConstants.TitlePattern
    },
    text: {
        type: String,
        required: true,
        minLength: ValidationConstants.MinTextLength,
        maxLength: ValidationConstants.MaxTextLength
    },
    articleId: {
        type: String,
        required: true
    },
    questionIDs: {
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
    get text() {
        return this.text;
    },
    set text(value) {
        this.text = value;
    },
    get articleId() {
        return this.articleId;
    },
    set articleId(value) {
        this.articleId = value;
    },
    get questionIDs() {
        return this.questionIDs;
    },
    set questionIDs(value) {
        this.questionIDs = value;
    },
    set paragraph(data){  // based on json data
        this.title = data.title;
        this.text = data.text;
        this.articleId = data.articleId;
    }


}

export default Paragraph;