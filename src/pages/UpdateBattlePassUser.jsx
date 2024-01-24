import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

function UpdateBattlePassUser() {

    const { id } = useParams();
    const [battlepasses, setBattlePasses] = useState(null);
    const [message, setMessage] = useState(null)

    useEffect(() => {
        (async () => {
            const battlePassResponse = await fetch("http://localhost:3000/api/battlepass/" + id);
            const battlePassResponseData = await battlePassResponse.json();

            setBattlePasses(battlePassResponseData)
            
        })();
    }, []);

    const handleUpdateBattlePass = async (event) => {
        event.preventDefault();

        const title = event.target.title.value 
        const history = event.target.history.value

        const formData = new FormData();

        formData.append("title", JSON.stringify(title))
        formData.append("history", JSON.stringify(history))

        formData.append("image", event.target.image.files[0]);

        const token = localStorage.getItem("jwt");
        

        const updateBattlePassResponse = await fetch("http://localhost:3000/api/battlepass/withImg/" + id , {
            method: "PUT",
            headers: {
                Authorization : "Bearer " + token,
            },
            body: formData,
        });

        if (updateBattlePassResponse.status === 201) {
            setMessage("Le Battle Pass a bien été mis à jour");
            event.target.submit()
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
            <h2 className="title-bpdetails">{battlepasses.data.title.substr(1, battlepasses.data.title.length - 2)}</h2>
            <img className="img-bpdetails" src={battlepasses.data.imageUrl} alt="image battle pass" />
            <p className="paragraph-bpdetails" dangerouslySetInnerHTML={{ __html: battlepasses.data.history.substr(1, battlepasses.data.history.length - 2) }}></p>
            <form onSubmit={handleUpdateBattlePass}>
                <input type="text" name="title" placeholder="Modifier le titre"/>
                <textarea className="create-bp-text" type="text" name="history" placeholder="Modifie l'histoire" />
                <input type="file" name="image" />
                <input className="btn-create" type="submit" value="Modifier" />
            </form>
            </>
        ) : (
            <p>En cours de chargement</p>
        )}
        </div>
    </div>
       
    )
        
        
        
}

export default UpdateBattlePassUser;