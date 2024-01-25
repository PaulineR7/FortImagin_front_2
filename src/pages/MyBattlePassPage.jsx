import './MyBattlePassPage.scss';
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

function MyBattlePassPage () {
    const token = localStorage.getItem("jwt");

    
    const [battlepasses, setBattlePasses] = useState();

    useEffect(() => {
        async function fetchData () {
            const battlePassResponse = await fetch("http://localhost:3000/api/battlepass/users/" + jwtDecode(token).data, 
            { 
            headers: {
                Authorization : "Bearer " + token,
            }
        })  
        
            const battlePassResponseData = await battlePassResponse.json();
           
            setBattlePasses(battlePassResponseData)
            
        };
        fetchData();
    }, []);

    const handleDeleteBattlePass = async (event, battlePassId) => {
        await fetch("http://localhost:3000/api/battlepass/" + battlePassId, {
          method: "DELETE",
          headers: { Authorization: "Bearer " + token },
        });
    
        const battlePassResponse = await fetch("http://localhost:3000/api/battlepass");
        const battlePassResponseData = await battlePassResponse.json();
        setBattlePasses(battlePassResponseData);

    }

   
    return(
        <div className="bg-img">
        <Header />
        
        <div className="block">
            <h2 className='titlepage'>Bienvenue {jwtDecode(token).data}</h2>
        {battlepasses && battlepasses.length > 0 ? (
            <>
            <h3>Vos battle Pass : </h3>
            {battlepasses.map((battlepass) => {
                return( 
                <div className="flexmybp">
                    <img className='imgmybp' src={battlepass.imageUrl} alt="" />
                    <p className='titlemybp'>{battlepass.title}</p>
                    <button className='btnmybp'><Link to={`/updatebp/${battlepass.id}`}>Modifier</Link></button>
                    <button className='btnmybp' onClick={(event) => handleDeleteBattlePass (event, battlepass.id)}>Supprimer</button>
                </div>
                )
            })}
            </>
        ) : (
            <p>En cours de chargement</p>
        )}
            <Link to='/createbattlepass'><button className='btn'> Créer ton Battle Pass</button></Link>

        </div>
        </div>
    )
}

export default MyBattlePassPage;