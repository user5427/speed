import { FetchHelperAxios } from "../.dataProcessingHelpers/DataProccessingHelpersExport";
import { SearchSizeConstants } from "../../.constants/SearchSizeConstants/SearchSizeConstants";

const ArticleSessionService = {
    postArticleSession: async function(articleSession) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("POST", articleSession);
        const apiUrl = process.env.REACT_APP_API_URL + `article-sessions`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    }
}

export default ArticleSessionService;