import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import './BattlePassDetailPage.scss';

function BattlePassDetailPage () {
    const { id } = useParams();

    const [battlepasses, setBattlePasses] = useState(null);
    const [message, setMessage] = useState(null);

    const token = localStorage.getItem("jwt");

    useEffect(() => {
        (async () => {
            const battlePassResponse = await fetch("http://localhost:3000/api/battlepass/" + id);
            const battlePassResponseData = await battlePassResponse.json();

            setBattlePasses(battlePassResponseData)
        })();
    }, []);

    const createComment = async(event) => {
        event.preventDefault();

        const review = event.target.comment.value 
        
        const reviewToCreate = {
            review: review
          };
      
          const reviewToCreateJson = JSON.stringify(reviewToCreate);
      
          
            const reviewResponse = await fetch("http://localhost:3000/api/comment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              body: reviewToCreateJson,
            });
        

            
        if (reviewResponse.ok) {
            setMessage("Le commentaire a bien été créé");
        } else {
            setMessage("Erreur !");
        }

    }

    return(
        <div className="bg-img">
        <Header />
        <div className="block">
        {battlepasses ? (
            <>
            <h2 className="title-bpdetails">{battlepasses.data.title}</h2>
            <img className="img-bpdetails" src={battlepasses.data.imageUrl} alt="" />
            <p className="paragraph-bpdetails"  dangerouslySetInnerHTML={{ __html: battlepasses.data.history }}></p>
            </>
        ) : (
            <p>En cours de chargment</p>
        )}
        

        <form onSubmit={createComment}>
            {message && <p>{message}</p>}
            <textarea className="create-bp-text" type="text" name="comment" placeholder="Donne nous ton avis en laissant un commentaire" />
            <input className="btn-comment" type="submit" value="Commenter" />
        </form>
        </div>
        </div>
    )
}

export default BattlePassDetailPage;