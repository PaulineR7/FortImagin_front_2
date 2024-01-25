import { Link, useNavigate} from 'react-router-dom';
import './Header.scss';
import { jwtDecode } from 'jwt-decode';


function Header () {
    const navigate = useNavigate()
    const token = localStorage.getItem("jwt")
    
    const clickLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("jwt")
        navigate("/")
      
    }
    return(
        <nav>
            <ul className='flex-list'>
                <li><img className='logo' src="assets/images/Fortnite_F_lettermark_logo-removebg-preview.png" alt="logo" /></li>
                <Link to='/'><li>Accueil</li></Link>
                <li><Link to="/battlepass">Battle Pass</Link></li>
                { token && <li><Link to={`/mybattlepass/${jwtDecode(token).data}`}>Mes Battle Pass</Link></li>}
                <li className="menu-with-submenu"><img className='img-user' src="assets/icones/user.png" alt="utilisateur" />
                    <ul className="sub-menu">
                        {token ? (
                            <li><Link onClick={clickLogout}>Se déconnecter</Link></li>
                        ) : (
                            <>
                                <li><Link className="menu-link" to="/accountcreate">S'inscrire</Link></li>
                                <li><Link className="menu-link"  to="/login">Se connecter</Link></li>
                            </>
                        )}
                            </ul>
                        
                </li> 
            
                 
            </ul>
        </nav>
    )
}

export default Header;