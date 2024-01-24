import { useEffect, useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function DashboardAdmin() {
    
    const [battlepasses, setBattlePasses] = useState(null);
    const token = localStorage.getItem("jwt");
    const decodedToken = jwtDecode(token)
    const navigate = useNavigate()


    if(decodedToken.dataRole > 1 ) {
        navigate('/login')
    }

    useEffect(() => {
      (async () => {
        const battlePassResponse = await fetch("http://localhost:3000/api/battlepass");
        const battlePassResponseData = await battlePassResponse.json();
        setBattlePasses(battlePassResponseData);
        
      })();
    }, []); 
    
    const handleDeleteBattlePass = async (event, battlePassId) => {
      
  
        await fetch("http://localhost:3000/api/battlepass/" + battlePassId, {
          method: "DELETE",
          headers: { Authorization: "Bearer " + token },
        });
    
        const battlePassResponse = await fetch("http://localhost:3000/api/battlepass");
        const battlePassResponseData = await battlePassResponse.json();
        setBattlePasses(battlePassResponseData);
        
      };
    
    return(
        <div className="bg-img">
        <HeaderAdmin />
        
                <div className="block">
                    {battlepasses ? (
                        <>
                        {battlepasses.map((battlepass) => {
                            return(
                                <div>
                                    <h3>{battlepass.title}</h3>
                                    <button onClick={(event) => handleDeleteBattlePass (event, battlepass.id)} >Supprimer</button>
                                </div>
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

export default DashboardAdmin;