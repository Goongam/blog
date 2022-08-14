import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Article({getArticles}){

    const articleid = useParams().articleid;
    const Nevigate = useNavigate();

    const [articleTitle, setArticleTitle] = useState("");
    const [articleContent, setArticleContent] = useState("");
    const [msg, setMsg] = useState("");


    
    useEffect(()=>{
        async function getArticleContent(){
            const article = await (await fetch(`http://localhost:3001/GetArticleContent/${articleid}`)).json();
            
            
            setMsg(article?.msg);
            setArticleTitle(article.TITLE);
            setArticleContent(article.CONTENT);
        }
        getArticleContent();
    },[articleid]);

    async function deleteArticle(){
        await fetch(`http://localhost:3001/deleteArticle/${articleid}`);
        getArticles();
        Nevigate('/');
    }

    return (
        <>
            {
            msg === "No Article"? "NO POST":
                <div>
                    <p>{articleTitle}</p>
                    <p>{articleContent}</p>
                    <button onClick={deleteArticle}>글 삭제</button>
                </div>
            }
        </>
        );
}