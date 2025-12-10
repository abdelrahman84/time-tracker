const routes = {
  timerDashboard: {
    main: '/timer-dashboard',
  },
  auth: {
    register: '/register',
    login: '/login',
    forgotPassword: '/forgot-password',
    verifyEmail: '/verify-email/:token',
    resetPassword: '/reset-password/:token',
  },
};

export default routes;
