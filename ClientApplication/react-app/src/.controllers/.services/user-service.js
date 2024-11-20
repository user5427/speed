import { FetchHelper } from "../.dataProcessingHelpers/DataProccessingHelpersExport";
import { FetchHelperAxios } from "../.dataProcessingHelpers/DataProccessingHelpersExport";

const UserService = {
    postUser: async function (user) {
        const requestOptions = FetchHelper.generateRequestOptions("POST", user);
        const apiUrl = process.env.REACT_APP_API_URL + `Auth/register`;
        return FetchHelper.fetchEntityNoReturn(apiUrl, requestOptions).then(res => {return res});
    },

    loginUser: async function (user) {
        const requestOptions = FetchHelper.generateRequestOptions("POST", user);
        const apiUrl = process.env.REACT_APP_API_URL + `Auth/login`;
        return FetchHelper.fetchEntity(apiUrl, requestOptions).then(res => {return res});
    }
}

export default UserService;