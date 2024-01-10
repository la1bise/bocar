import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Menu = () => {
    const auth = useAuth();
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.logout();
        navigate("/")

    }
    return (
        <nav>
             <ul>
                {
                    auth.user ?  (
                        //Le lien sera dispo que si l'utilisateur est connecter
                    <li><button onClick={handleLogout}>Se déconnecter</button></li>
                    ) : (
                        <>
                    <li><NavLink to={"/inscription"}>S'inscrire</NavLink></li>
                    <li><NavLink to={"/se-connecter"}>Se connecter</NavLink></li>
                        </>
                    )
                }

                <li><NavLink to={"/articles"}>Mes articles</NavLink></li>
                <li><NavLink to={"/produit"}>Mes produits</NavLink></li>
                {
                    auth.user && auth.user.role === "admin" && (
                        //Le lien sera visisble que par les admin
                        <>
                        <li><NavLink to={"/creer-article"}>Créer un nouvelle article</NavLink></li>
                        <li><NavLink to={"/ajouter-produit"}>Ajouter un produit</NavLink></li>
                        </>
                        
                    )
                }
                
            </ul>
        </nav>
    );
};

export default Menu;