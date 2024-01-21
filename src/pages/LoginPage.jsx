import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import './LoginPage.scss'
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function LoginPage () {
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const handleLogin = async (event) => {
    event.preventDefault();

    const pseudo = event.target.pseudo.value;
    const password = event.target.password.value;

    
    const loginData = {
      pseudo,
      password,
    };

    const loginDataJson = JSON.stringify(loginData);
    

    const loginResponse = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: loginDataJson,
    });


    const loginResponseData = await loginResponse.json();
    const token = loginResponseData.data;

    
    if (token) {
        localStorage.setItem("jwt", token)
        
        const decodedToken = jwtDecode(token)
      
        if(decodedToken.dataRole ===1) {
          navigate("/admin")
        } else {
          setMessage("Vous êtes connectés")
        }
    }
   
    // if(roleId ===1) {
    //     useNavigate("/admin")
    // }
}

const clickLogout = (event) => {
  localStorage.removeItem("jwt")

}
    return(
        <>
        <section className="bg-img">
        <Header />
        <div className="block">
        <h2 className="title-login">Se connecter</h2>
        <form onSubmit={handleLogin} className="form-flex-login" >
            <input type="text" name="pseudo" placeholder="Pseudo" />
            <input type="password" name="password" placeholder="Mot de passe" />
            {message && <p>{message}</p>}
            <input className="btn-login" type="submit" value="Se connecter" />
            <input onClick={clickLogout} className="btn-login" type="submit" value="Se déconnecter" />
        </form>
        </div>
        </section>
        </>
    )
}



export default LoginPage;