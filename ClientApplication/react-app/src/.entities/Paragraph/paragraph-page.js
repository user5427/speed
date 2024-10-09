const ParagraphPage = {
    paragraphList: [],
    paragraphCount: 0,
    get paragraphList() {
        return this.paragraphList;
    },
    get paragraphCount() {
        return this.paragraphCount;
    },
    set paragraphPage({list, count}) {
        this.paragraphList = list;
        this.paragraphCount = count;
    },
    set paragraphPage(data){ // based on json data
        this.paragraphList = data.paragraphs; 
        this.paragraphCount = data.count;
    }
}

export default ParagraphPage;