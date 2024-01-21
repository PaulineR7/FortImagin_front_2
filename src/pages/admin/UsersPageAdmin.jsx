import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";

function UsersPageAdmin () {

    const [users, setUsers] = useState(null);
    const token = localStorage.getItem("jwt");
    const decodedToken = jwtDecode(token)

    useEffect(() => {
      (async () => {
        const userResponse = await fetch("http://localhost:3000/api/users/");
        const userResponseData = await userResponse.json();
        setUsers(userResponseData);
        
      })();
    }, []); 
    
    const handleDeleteUser = async (event, userId) => {
      
  
        await fetch("http://localhost:3000/api/users/" + userId, {
          method: "DELETE",
          headers: { Authorization: "Bearer " + token },
        });
    
        const userResponse = await fetch("http://localhost:3000/api/users/");
        const userResponseData = await userResponse.json();
        setUsers(userResponseData);
        
      };

    return(
        <>
        <HeaderAdmin />
        <div>
            <p>Listes des utilisateurs</p>
        {users ? (
            <>
            {users.map((user) => {
                return(
                    <div>
                        <h3>{user.pseudo}</h3>
                        <button onClick={(event) => handleDeleteUser (event, user.id)} >Supprimer</button>
                    </div>
                )
            })}
            </>
        ) : (
            <p>En cours de chargement</p>
        )} 
            
    </div>
    </>
    )
}

export default UsersPageAdmin