import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Post({getPosts}){

    const postid = useParams().postid;
    const Nevigate = useNavigate();

    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [msg, setMsg] = useState("");

    async function getPostContent(){
        const post = await (await fetch(`http://localhost:3001/GetPostContent/${postid}`)).json();
        
        
        setMsg(post?.msg);
        setPostTitle(post.TITLE);
        setPostContent(post.CONTENT);
    }
    
    useEffect(()=>{
        getPostContent();
    },[postid]);

    async function deletePost(){
        await fetch(`http://localhost:3001/deletePost/${postid}`);
        getPosts();
        Nevigate('/');
    }

    return (
        <>
            {
            msg === "No Post"? "NO POST":
                <div>
                    <p>{postTitle}</p>
                    <p>{postContent}</p>
                    <button onClick={deletePost}>글 삭제</button>
                </div>
            }
        </>
        );
}