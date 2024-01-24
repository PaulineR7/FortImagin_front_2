import { useEffect, useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";

function CommentsAdmin () {

    const [comments, setComments] = useState();

    useEffect(() => {
        (async () => {
          const commentResponse = await fetch("http://localhost:3000/api/comment");
          const commentResponseData = await commentResponse.json();
          setComments(commentResponseData);
          
        })();
      }, []); 

    return(
        <div className="bg-img">
        <HeaderAdmin />
        
        <div className="block">
            <p>Listes des commentaires</p>
        {comments ? (
            <>
            {comments.map((comment) => {
                return(
                    <div>
                        <h3>{comment.reviews}</h3>
                        <button>Supprimer</button>
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

export default CommentsAdmin;