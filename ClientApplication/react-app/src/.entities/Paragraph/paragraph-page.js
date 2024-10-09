class ParagraphPage {
    constructor(paragraphList = [], paragraphCount = 0) {
        // Check if paragraphList is an object (JSON data) or an array
        if (typeof paragraphList === 'object' && !Array.isArray(paragraphList)) {
            // Initialize from JSON data
            this._paragraphList = paragraphList.paragraphs || [];
            this._paragraphCount = paragraphList.count || 0;
        } else {
            // Initialize from individual parameters
            this._paragraphList = paragraphList;
            this._paragraphCount = paragraphCount;
        }
    }

    // Getter for paragraphList
    get paragraphList() {
        return this._paragraphList;
    }

    // Getter for paragraphCount
    get paragraphCount() {
        return this._paragraphCount;
    }

    // Setter for paragraphPage (accepts { list, count })
    set paragraphPage({ list, count }) {
        if (Array.isArray(list) && typeof count === 'number') {
            this._paragraphList = list;
            this._paragraphCount = count;
        } else {
            throw new Error("Invalid data for paragraphPage. List must be an array and count must be a number.");
        }
    }

    // Setter for paragraphPage from JSON data (accepts data object with paragraphs and count)
    set fromJson(data) {
        if (data && Array.isArray(data.paragraphs) && typeof data.count === 'number') {
            this._paragraphList = data.paragraphs;
            this._paragraphCount = data.count;
        } else {
            throw new Error("Invalid data format. Must contain paragraphs (array) and count (number).");
        }
    }
}

export default ParagraphPage;
