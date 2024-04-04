import React, { useEffect } from "react";
import { useState } from "react";

import { Navigate, Route } from "react-router-dom";
import routes from "../routes";
import Login from "../components/Auth/Login";

interface GuardedRouteProps {
    children: JSX.Element
}

function GuardedRoute({ children }: GuardedRouteProps) {
    const isAuthenticated = React.useMemo(() => {
        const user = localStorage.getItem('user');
        return !!user;
    }, []);

    return (
        isAuthenticated ? children : <Navigate to={routes.auth.login} />
    )
}

export default GuardedRoute;



