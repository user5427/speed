import { ParagraphPageJson } from "../../.constants/MainConstants";

class ParagraphPage {
    constructor(paragraphList = [], paragraphCount = 0) {
        this.#createEmptyParagraphPage();
    }

    static createParagraphPageFromParams(paragraphList = [], paragraphCount = 0) {
        const paragraphPage = new ParagraphPage();
        paragraphPage.#createParagraphPageFromParams(paragraphList, paragraphCount);
        return paragraphPage;
    }

    #createEmptyParagraphPage() {
        this._paragraphList = [];
        this._paragraphCount = 0;
    }

    #createParagraphPageFromParams(paragraphList = [], paragraphCount = 0) {
        this._paragraphList = paragraphList;
        this._paragraphCount = paragraphCount;
    }

    // Getter for paragraphList
    get paragraphList() {
        return this._paragraphList;
    }

    // Getter for paragraphCount
    get paragraphCount() {
        return this._paragraphCount;
    }

    // Setter for paragraphPage from JSON data (accepts data object with paragraphs and count)
    /**
     * @deprecated This method is deprecated and will be removed in future versions.
     * @param {*} data 
     */
    fromJson(data) {
        if (data && Array.isArray(data[ParagraphPageJson.paragraphs]) && typeof data[ParagraphPageJson.count] === 'number') {
            this._paragraphList = data[ParagraphPageJson.paragraphs];
            this._paragraphCount = data[ParagraphPageJson.count];
        } else {
            throw new Error("Invalid data format. Must contain paragraphs (array) and count (number).");
        }
    }
}

export default ParagraphPage;
