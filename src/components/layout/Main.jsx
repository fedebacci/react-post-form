import { useState } from "react";



const apiUrl = "https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts"



const postInitialData = {
    author: "",
    title: "",
    body: "", // todo: USARE TEXTAREA (VALUE TROVATO DENTRO AL TAG INVECE CHE COME ATTRIBUTO)
    public: false,
}



export default function Main () {

    const [postData, setPostData] =  useState(postInitialData);

    console.debug(postData);
    
    const handleInputChange = (e) => {
        // console.log(e.target.value);
        // console.log(e.target.type);
        // console.log(e.target.checked);

        if (e.target.type === "checkbox") return setPostData({ ...postData, [e.target.name]: e.target.checked})

        setPostData({ ...postData, [e.target.name]: e.target.value})
    } 
    const handleSubmit = (e) => {
        e.preventDefault()
    } 

    return (
        <main>
            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <h2 className="mb-3">
                            Add new post
                        </h2>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="postAuthor" className="form-label">
                                    Post author
                                </label>
                                <input 
                                    value={postData.author}
                                    onChange={handleInputChange}
                                    name="author"

                                    type="text" 
                                    className="form-control" 
                                    id="postAuthor" 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="postTitle" className="form-label">
                                    Post title
                                </label>
                                <input 
                                    value={postData.title}
                                    onChange={handleInputChange}
                                    name="title"

                                    type="text" 
                                    className="form-control" 
                                    id="postTitle" 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="postBody" className="form-label">
                                    Post content
                                </label>
                                <textarea 
                                    value={postData.body}
                                    onChange={handleInputChange}
                                    name="body"

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
                    </div>
                </div>
            </div>
        </main>
    );
}