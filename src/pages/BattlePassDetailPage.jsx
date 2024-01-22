import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import './BattlePassDetailPage.scss';

function BattlePassDetailPage () {
    const { id } = useParams();
    const BpId = id;
    

    const [battlepasses, setBattlePasses] = useState(null);
    const [message, setMessage] = useState(null);
    

    const token = localStorage.getItem("jwt");

    useEffect(() => {
        (async () => {
            const battlePassResponse = await fetch("http://localhost:3000/api/battlepass/" + id);
            const battlePassResponseData = await battlePassResponse.json();

            setBattlePasses(battlePassResponseData)
            console.log(battlePassResponseData)
        })();
    }, []);

    const createComment = async(event) => {
        event.preventDefault();

        const review = event.target.comment.value 
        
        const reviewToCreate = {
            reviews: review,
            BattleId: BpId
          };
          console.log(review)
          const reviewToCreateJson = JSON.stringify(reviewToCreate);
      
          
            const reviewResponse = await fetch("http://localhost:3000/api/comment/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              body: reviewToCreateJson,
            });
        

            
        if (reviewResponse.ok) {
            setMessage("Le commentaire a bien été créé");
            event.target.submit()
        } else {
            setMessage("Erreur !");
        }
        console.log(reviewToCreateJson);
       
    }

    return(
        <div className="bg-img">
        <Header />
        <div className="block">
        {battlepasses ? (
            <>
            <h2 className="title-bpdetails">{battlepasses.data.title.substr(1,battlepasses.data.title.length-2)}</h2>
            <img className="img-bpdetails" src={battlepasses.data.imageUrl} alt="" />
            <p className="paragraph-bpdetails"  dangerouslySetInnerHTML={{ __html: battlepasses.data.history.substr(1,battlepasses.data.history.length-2) }}></p>
            <p>Les commmentaires : </p>
            
            {battlepasses.data.comments.map((comment) => {
                return(
                    <p>{comment.reviews}</p>
                )
            })}
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