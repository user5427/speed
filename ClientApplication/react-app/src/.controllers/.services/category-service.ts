import { FetchHelper } from "../.dataProcessingHelpers/DataProccessingHelpersExport";
import { SearchSizeConstants } from "../../.constants/SearchSizeConstants/SearchSizeConstants";

const CategoryService = {
    postCategory: async function (category) {
        const requestOptions = FetchHelper.generateRequestOptions("POST", category);
        const apiUrl = process.env.REACT_APP_API_URL + `Category`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    putCategory: async function (category) {
        const requestOptions = FetchHelper.generateRequestOptions("PUT", category);
        const apiUrl = process.env.REACT_APP_API_URL + `Category/${category.id}`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    getCategory: async function (id) {
        const requestOptions = FetchHelper.generateRequestOptions("GET");
        const apiUrl = process.env.REACT_APP_API_URL + `Category/${id}`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    getCategoriesByTitle: async function (search) {
        const requestOptions = FetchHelper.generateRequestOptions("GET");
        const apiUrl = process.env.REACT_APP_API_URL + `Category/search?Search=${search}&PageSize=${SearchSizeConstants.MaxPageSize}`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    getCategoriesByPage: async function (page) {
        const requestOptions = FetchHelper.generateRequestOptions("GET");
        const apiUrl = process.env.REACT_APP_API_URL + `Category/search?PageNumber=${page}&PageSize=${process.env.REACT_APP_PAGING_SIZE}`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    deleteCategory: async function (id) {
        const requestOptions = FetchHelper.generateRequestOptions("DELETE");
        const apiUrl = process.env.REACT_APP_API_URL + `Category/${id}`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    postImage: async function(categoryId, file) {
        const form = new FormData()
        form.append("File", file)
        const requestOptions = FetchHelper.generateImageRequestOptions(form);
        const apiUrl = process.env.REACT_APP_API_URL + `Category/${categoryId}/img`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    },

    /**
     * 
     * @param {categoryId} categoryId 
     * @returns url to image
     */
    getImage: async function(categoryId) {
        const apiUrl = process.env.REACT_APP_API_URL + `Category/${categoryId}/img`;
        return FetchHelper.getImage(apiUrl).then(res => {return res});
    },

    deleteImage: async function(categoryId) {
        const requestOptions = FetchHelper.generateRequestOptions("DELETE");
        const apiUrl = process.env.REACT_APP_API_URL + `Category/${categoryId}/img`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    }
}

export default CategoryService;

