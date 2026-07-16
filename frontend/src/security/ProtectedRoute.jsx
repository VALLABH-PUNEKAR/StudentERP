import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({allowedrole}) {
    // 1. Check if the user's JWT token exists in the browser storage
    const token = localStorage.getItem("userToken");
    const role=localStorage.getItem("role");

    // 2. If the token is missing, redirect them back to the login page cleanly
    if (!token) {
        return <Navigate to="/" replace />;
    }
    if(allowedrole && !allowedrole.includes(role))
    {
        return <Navigate to={role=="Student"?"/StudentDashboard":"/FacultyDashboard"}/>
    }
    
    

    // 3. If a token is found, render the requested nested sub-pages safely
    return <Outlet />;
}