import { UserService } from "./.services/.MainServices";
import { StatusHelper } from "./.dataProcessingHelpers/DataProccessingHelpersExport";
import { UserErrors } from "../.constants/MainConstants";
import { UserMapper } from "./.mappers/.MainMappersExport";
class UserController {
    static async Post(User) {
        try {
            let jsonData = UserMapper.toJsonRegister(User);
            const response = await UserService.postUser(jsonData)
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${UserErrors.PostError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return UserMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Login(User) {
        try {
            let jsonData = UserMapper.toJsonLogin(User);
            const response = await UserService.loginUser(jsonData)
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${UserErrors.LoginError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return UserMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }
}