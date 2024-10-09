import { ValidationConstants, ValidationPatternConstants } from '../../constants/MainConstants';

const Question = {
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
    paragraphId: {
        required: true
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
    get paragraphId() {
        return this.paragraphId;
    },
    set paragraphId(value) {
        this.paragraphId = value;
    },
    set question(data){  // based on json data
        this.title = data.title;
        this.text = data.text;
        this.paragraphId = data.paragraphId;
    }

}

export default Question;