import apiRoutes from "../apiRoutes"
import client from "../utils/client"

export const AuthApi = {
    checkEmailBeforeLogin: async function (email: string) {
        return client.post(apiRoutes.user.checkEmail, { email: email });
    }
}