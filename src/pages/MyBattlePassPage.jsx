import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

function MyBattlePassPage () {
    const token = localStorage.getItem("jwt");

    const { pseudo } = useParams();

    const [battlepasses, setBattlePasses] = useState();

    useEffect(() => {
        async function fetchData () {
            const battlePassResponse = await fetch("http://localhost:3000/api/battlepass/users/" + pseudo, 
            { 
            headers: {
                Authorization : "Bearer " + token,
            }
        })  
        
            const battlePassResponseData = await battlePassResponse.json();
            console.log('ici')
            setBattlePasses(battlePassResponseData)
        };
        fetchData();
    }, []);

    console.log(battlepasses)

    return(
        <div className="bg-img">
        <Header />
        
        <div className="block">
        
        {battlepasses ? (
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