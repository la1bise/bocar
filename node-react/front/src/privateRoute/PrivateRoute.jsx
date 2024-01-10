import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const PrivateRoute = ({roles}) => {
   
    const {user} = useAuth();
    // Verified si l'utilisateur est connecté et récupérer son role
    const isAuthorized = user &&  roles.includes(user.role);

    // si l'utilisateur n'a pas le bon role 
    if(!isAuthorized){
        // rediriger l'utilisateur vers la page d'accueil 
        return <Navigate to={"/"} replace />
    }

    
    return <Outlet />
};

export default PrivateRoute;