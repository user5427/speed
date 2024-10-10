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
        if (data && Array.isArray(data.paragraphs) && typeof data.count === 'number') {
            this._paragraphList = data.paragraphs;
            this._paragraphCount = data.count;
        } else {
            throw new Error("Invalid data format. Must contain paragraphs (array) and count (number).");
        }
    }
}

export default ParagraphPage;
