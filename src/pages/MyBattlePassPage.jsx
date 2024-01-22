import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { jwtDecode } from "jwt-decode";

function MyBattlePassPage () {
    const token = localStorage.getItem("jwt");

    const { pseudo } = useParams();
    console.log(pseudo);
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
            console.log(battlePassResponseData);
            console.log(jwtDecode(token).data)
        };
        fetchData();
    }, []);

    console.log(battlepasses)

    return(
        <div className="bg-img">
        <Header />
        
        <div className="block">
        
        {battlepasses && battlepasses.length > 0 ? (
            <>
            
            {battlepasses.map((battlepass) => {
                return( 
                <h2>titre {battlepass.title}</h2>
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