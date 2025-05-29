import { useState } from "react";
import axios from "axios";



const apiUrl = "https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts"



const postInitialData = {
    author: "",
    title: "",
    body: "",
    public: false,
}
const alertMessageInitialData = {
    text: "",
    type: ""
}



export default function Main () {

    const [postData, setPostData] =  useState(postInitialData);
    const [alertMessage, setAlertMessage] =  useState(alertMessageInitialData);

    // console.debug(postData);
    
    const handleInputChange = (e) => {
        // console.log(e.target.value);
        // console.log(e.target.type);
        // console.log(e.target.checked);

        if (e.target.type === "checkbox") return setPostData({ ...postData, [e.target.name]: e.target.checked})

        setPostData({ ...postData, [e.target.name]: e.target.value})
    } 
    const handleSubmit = (e) => {
        // todo: RISOLVERE LA PROBLEMATICA CON IL PREVENTDEFAULT (ATTUALMENTE LO MANTENGO ANCHE SE NON FUNZIONA IL REQUIRED)
        // * NB: USARE IL PREVENTDEFAULT IMPEDISCE ANCHE IL CONTROLLO DELL'ATTRIBUTO REQUIRED SUGLI INPUT, MA SE NON LO USO (E I CAMPI NON SONO VUOTI) LA RICHIESTA DA ERRORE PERCHE LA CONNESSIONE E STATA ABORTITA (GIUSTAMENTE, LA PAGINA E STATA RICARICATA)
        e.preventDefault();

        if (postData.author === "" || postData.title === "" || postData.body === "" ) return setAlertMessage({text: "Per favore compila tutti i campi contrassegnati da *", type: "warning"});

        // console.debug(postData);
        setAlertMessage({text: "Creazione del nuovo post in corso", type: "info"});

        axios
            .post(apiUrl, postData)
            .then(response => {
                console.log(response.data);
                setAlertMessage({text: "Post creato con successo! (Vedi console.log, UI in sviluppo)", type: "success"});
                setPostData(postInitialData);
                setTimeout(() => {setAlertMessage(alertMessageInitialData)}, 3000)
            })
            .catch(error => {
                setAlertMessage({text:"Errore durante la creazione del post! (Vedi console.log, UI in sviluppo)", type: "danger"});
                console.error(error)
            })
    } 

    return (
        <main>
            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <h2 className="mb-3">
                            Add new post
                        </h2>
                        <form className="mb-3">
                            <div className="mb-3">
                                <label htmlFor="postAuthor" className="form-label">
                                    * Post author
                                </label>
                                <input 
                                    value={postData.author}
                                    onChange={handleInputChange}
                                    name="author"
                                    required

                                    type="text" 
                                    className="form-control" 
                                    id="postAuthor" 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="postTitle" className="form-label">
                                    * Post title
                                </label>
                                <input 
                                    value={postData.title}
                                    onChange={handleInputChange}
                                    name="title"
                                    required

                                    type="text" 
                                    className="form-control" 
                                    id="postTitle" 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="postBody" className="form-label">
                                    * Post content
                                </label>
                                <textarea 
                                    value={postData.body}
                                    onChange={handleInputChange}
                                    name="body"
                                    required

                                    className="form-control" 
                                    id="postBody" 
                                    rows="3"
                                >
                                </textarea>
                            </div>
                            <div className="mb-3 form-check">
                                <input 
                                    // value={postData.public}
                                    checked={postData.public}
                                    onChange={handleInputChange}
                                    name="public"
                                    // required

                                    type="checkbox" 
                                    className="form-check-input" 
                                    id="postIsPublic" 
                                />
                                <label className="form-check-label" htmlFor="postIsPublic">
                                    Public
                                </label>
                            </div>
                            <button 
                                onClick={handleSubmit}

                                type="submit" 
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                        </form>

                        {
                            alertMessage.text.length > 0 ?
                            <div className={`alert alert-${alertMessage.type}`}>
                                {alertMessage.text}      
                            </div>
                            :
                            ""
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}