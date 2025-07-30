import { Navigate } from "react-router"

type ProtectedRouteProps = {
    user?: {
        userId?:string,
        accessToken?:string
    };
    children: React.ReactNode;
}

const ProtectedRoute = ({user, children} : ProtectedRouteProps) =>{
    if(!user?.userId || !user?.accessToken){
        return <Navigate to="/login" replace />
    }
    console.log(user)
    return children;
}

export default ProtectedRoute;