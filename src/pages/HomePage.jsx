import Header from '../components/Header';
import './HomePage.scss';
import { Link } from 'react-router-dom';

function HomePage() {
    // CommentFetcher();
    return(
        <>
        <section className="bg-img">
        <Header />
            <div className="block">
                <h1 className='title'>FortImagin</h1>
                <h2 className='second-title'>Créer votre propre Battle Pass</h2>
                <p className='paragraph'>Bienvenue sur notre site dédié à l'imagination du passe de combat dans Fortnite ! Ici, votre créativité est la clé. Prenez le temps de visualiser le héros que vous souhaitez incarner et imaginez son histoire épique. Lors de la création de votre passe de combat, n'hésitez pas à mélanger les univers, à inventer des alliances surprenantes et à attribuer des pouvoirs uniques à votre personnage.</p>
                <Link to='/createbattlepass'> <button className='btn-home'> Créer ton Battle Pass</button></Link>
            </div>
        </section>
        </>
    )
}

export default HomePage;