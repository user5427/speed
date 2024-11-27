import { FetchHelperAxios } from "../.dataProcessingHelpers/DataProccessingHelpersExport";

const UserService = {
    postUser: async function (user) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("POST", user);
        const apiUrl = process.env.REACT_APP_API_URL + `Auth/register`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    loginUser: async function (user) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("POST", user);
        const apiUrl = process.env.REACT_APP_API_URL + `Auth/login`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    }
}

export default UserService;