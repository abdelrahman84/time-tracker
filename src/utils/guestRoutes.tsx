import React from "react";
import { Navigate } from "react-router-dom";

import routes from "../routes";

interface GuestRouteProps {
    children: JSX.Element
}

function GuestRoute({ children }: GuestRouteProps) {
    const isAuthenticated = React.useMemo(() => {
        const user = localStorage.getItem('user');
        return !!user;
    }, []);

    return (
        isAuthenticated ? <Navigate to={routes.timerDashboard.main} /> : children
    )
}

export default GuestRoute;
