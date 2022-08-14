import { useState } from "react";

export default function NewArticle({getArticles}){

    const [title,setTitle] =  useState("");
    const [content, setContent] = useState("");
    
    

    async function send(){
        // console.log(title);
        // console.log(content);

       let json = await (await fetch("http://localhost:3001/NewArticle", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "title":title,
              "content":content,
            }),
            
          })).json();

        console.log(json);
        getArticles();
    }

    return (
        <>
            <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}></input><br></br>
            <textarea value={content} onChange={(e)=>{setContent(e.target.value)}}></textarea><br></br>
            <button onClick={send}>입력</button>
        </>
    );
}