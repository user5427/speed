import { User } from "../../.entities/.MainEntitiesExport";
import { UserJson } from "../../.constants/MainConstants";
class UserMapper {
    static fromJson(data) {
        return User.createUserFromParams(
            data[UserJson.username],
            data[UserJson.password],
            data[UserJson.email],
            data[UserJson.id],
            data[UserJson.role],
            data[UserJson.token]
        );
    }

    static toJsonLogin(user) {
        const json = {};

        if (user._password) {
            json[UserJson.password] = user._password;
        }

        if (user._email) {
            json[UserJson.email] = user._email;
        }

        return json;
    }

    static toJsonRegister(user) {
        const json = {};

        if (user._username) {
            json[UserJson.username] = user._username;
        }

        if (user._password) {
            json[UserJson.password] = user._password;
        }

        if (user._email) {
            json[UserJson.email] = user._email;
        }

        return json;
    }
}

export { UserMapper };