import { useEffect, useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function CommentsAdmin () {

    const [comments, setComments] = useState();
    const token = localStorage.getItem("jwt");
    const decodedToken = jwtDecode(token)
    const navigate =useNavigate();
    
    useEffect(() => {
        (async () => {
          const commentResponse = await fetch("http://localhost:3000/api/comment");
          const commentResponseData = await commentResponse.json();
          setComments(commentResponseData);
          
        })();
      }, []); 

      if(decodedToken.dataRole > 1 ) {
        navigate('/login')
    }
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