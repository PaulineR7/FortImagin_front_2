import { useState } from "react";
import Header from "../components/Header";
import './CreateAnAccountPage.scss'

function CreateAnAccountPage() {
    const [message, setMessage] = useState(null);

    const handleCreateAnAccount = async (event) => {
        event.preventDefault();

        const pseudo = event.target.pseudo.value 
        const password = event.target.password.value
        const email = event.target.email.value

        const createUserData = {
            pseudo: pseudo,
            password: password,
            email: email,
            //par défaut l'utilisateur se voit donner le role édit
            roleId: 2,
        };

          const createUserDataJson = JSON.stringify(createUserData);
        

        const createBattlePassResponse = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: createUserDataJson,
        });

        

        

        if (createBattlePassResponse.status === 201) {
            setMessage("L'utilisateur a bien été créé, veuillez vous connecter");
        } else {
            setMessage("Erreur !");
        }

    }
    return(
        <>
        <section className="bg-img">
        <Header />
        <div className="block">
            <h2 className="title-create">Créer un compte</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleCreateAnAccount} className="form-flex">
                <input type="text" name="pseudo" placeholder="Pseudo" />
                <input type="password" name="password" placeholder="Mot de passe" />
                <input type="email" name="email" placeholder="Email" />
                <input className="btn-create" type="submit" value="S'inscrire" />
            </form>
        </div>
        </section>
        </>
    )
}

export default CreateAnAccountPage;