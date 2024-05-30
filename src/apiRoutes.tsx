const apiRoutes = {
    user: {
        checkEmail: "/check_email_before_login",
        register: "/users",
        login: "/login",
        verifyToken: "/verify_token",
        resendVerificationEmail: "/resend_verification_email",
        forgotPasswordEmail: "/forgot_password",
        resetPassword: "/reset_password"
    }
}

export default apiRoutes
