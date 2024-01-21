import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import { jwtDecode } from 'jwt-decode';


function Header () {
    


    return(
        <nav>
            <ul className='flex-list'>
                <li><img className='logo' src="assets/images/Fortnite_F_lettermark_logo-removebg-preview.png" alt="logo" /></li>
                <li><Link to='/'>Accueil</Link></li>
                <li><Link to="/battlepass">Battle Pass</Link></li>
                <li><Link to="/mybattlepass/:pseudo">Mes Battle Pass</Link></li>
                <li className="menu-with-submenu"><img className='img-user' src="assets/icones/user.png" alt="utilisateur" />
                    <ul className="sub-menu">
                                <li><Link className="menu-link" to="/accountcreate">S'inscrire</Link></li>
                                <li><Link className="menu-link"  to="/login">Se connecter</Link></li>
                            </ul>
                </li> 
            
                 
            </ul>
        </nav>
    )
}

export default Header;