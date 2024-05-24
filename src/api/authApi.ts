import apiRoutes from "../apiRoutes"
import client from "../utils/client"

export const AuthApi = {
    checkEmailBeforeLogin: async function (email: string) {
        return client.post(apiRoutes.user.checkEmail, { email: email });
    },

    verifyToken: async function (token: string) {
        return client.post(apiRoutes.user.verifyToken, { verify_token: token });
    },

    resendVerificationEmail: async function(email: string) {
        return client.post(apiRoutes.user.resendVerificationEmail, {email: email});
    },

    forgotPasswordEmail: async function(email: string) {
        return client.post(apiRoutes.user.forgotPasswordEmail, {email: email});
    }
}