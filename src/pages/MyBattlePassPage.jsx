import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

function MyBattlePassPage () {
    const token = localStorage.getItem("jwt");

    // const { pseudo } = useParams();
    
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
            <h2>Bienvenue {jwtDecode(token).data}</h2>
        {battlepasses && battlepasses.length > 0 ? (
            <>
            <h3>Vos battle Pass : </h3>
            {battlepasses.map((battlepass) => {
                return( 
                <>
                <p>{battlepass.title}</p>
                <img src={battlepass.imageUrl} alt="" />
                <button><Link to={`/updatebp/${battlepass.id}`}>Modifier</Link></button>
                <button onClick={(event) => handleDeleteBattlePass (event, battlepass.id)}>Supprimer</button>
                </>
                )
            })}
            </>
        ) : (
            <p>En cours de chargement</p>
        )}

        </div>
        </div>
    )
}

export default MyBattlePassPage;