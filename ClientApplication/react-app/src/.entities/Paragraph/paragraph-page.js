import { ParagraphPageJson } from "../../.constants/MainConstants";

class ParagraphPage {
    constructor(paragraphList = [], paragraphCount = 0) {
        this.#createEmptyParagraphPage();
    }

    #createEmptyParagraphPage() {
        this._paragraphList = [];
        this._paragraphCount = 0;
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
