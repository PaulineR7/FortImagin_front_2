import { Link } from "react-router-dom";
import Header from "../components/Header";
import './BattlePassPage.scss';
import React, { useEffect, useState } from "react";

function BattlePassPage() {

    const [battlepasses, setBattlePasses] = useState(null);

  useEffect(() => {
    (async () => {
      const battlePassResponse = await fetch("http://localhost:3000/api/battlepass");
      const battlePassResponseData = await battlePassResponse.json();
      setBattlePasses(battlePassResponseData);
      
    })();
  }, []);

  

  
   

    return(
        <section className="bg-img">
            <Header />
            <div className="block">
                <h2 className="title-bp">Les battles pass</h2>
                <h3 className="second-title-bp">Découvrez tous les battles pass</h3>
                <div className="flex-battlepass">
                    {battlepasses ? (
                        <>
                        {battlepasses.map((battlepass) => {
                            return(
                                <div className="battlepass">
                                    <img className="img-bp" src={battlepass.imageUrl} alt="image" />
                                    <h3 className="title-article"><Link to={`/battlepassdetails/${battlepass.id}`}>{battlepass.title}</Link></h3>
                                </div>
                            )
                        })}
                        </>
                    ) : (
                        <p>En cours de chargement</p>
                    )} 
                        
                </div>
            </div>
        </section>
    )
}

export default BattlePassPage;