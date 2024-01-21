import { useState } from "react";
import Header from "../components/Header";
import './CreateBattlePassPage.scss'
import { useVerifyIfUserIsLogged } from "./utils/security-utils";

function CreateBattlePassPage () {
    useVerifyIfUserIsLogged();

    const [message, setMessage] = useState(null);

    const handleCreateBattlePass = async (event) => {
        event.preventDefault();

        const title = event.target.title.value 
        const history = event.target.history.value

        const formData = new FormData();

        formData.append("title", JSON.stringify(title))
        formData.append("history", JSON.stringify(history))

        formData.append("image", event.target.image.files[0]);

        const token = localStorage.getItem("jwt");
        

        const createBattlePassResponse = await fetch("http://localhost:3000/api/battlepass/withImg", {
            method: "POST",
            headers: {
                Authorization : "Bearer " + token,
            },
            body: formData,
        });

        

        if (createBattlePassResponse.status === 201) {
            setMessage("Le Battle Pass a bien été créé");
        } else {
            setMessage("Erreur !");
        }

    }
    return(
        <>
        <section className="bg-img">
        <Header />
        <div className="block-create-bp">
        <h2 className="title-create-bp">Créer ton battle pass</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleCreateBattlePass} className="form-flex">
            <input className="create-bp-title" type="text" name="title" placeholder="Titre" />
            <textarea className="create-bp-text" type="text" name="history" placeholder="Imagine ton battle pass" />
            <input type="file" name="image" />
            
            <input className="btn-create" type="submit" value="Envoyer" />
        </form>
        </div>
        </section>
        </>
    )
}

export default CreateBattlePassPage;