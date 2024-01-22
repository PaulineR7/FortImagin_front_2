import { Link, useNavigate } from "react-router-dom";
function HeaderAdmin() {

    const navigate = useNavigate()
    const handleLogout = (event) => {
        localStorage.removeItem("jwt")
        navigate("/")
    }

    return(
        <nav>
            <ul>
                <li><Link to="/">Accueil site</Link></li>
                <li><Link to="/admin">Liste Battle Pass</Link></li>
                <li><Link to="/useradmin">Liste utilisateurs</Link></li>
                <li><Link to="">Liste des commentaires</Link></li>
                <button onClick={handleLogout}>Se déconnecter</button>
            </ul>
        </nav>
    )
}

export default HeaderAdmin;