import React, { useEffect, useState, memo, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import { baseUrl } from "../constants";
import { useArticleContent } from "./hooks/useArticleContent";
import { useDeleteArticle } from "./hooks/useDeleteArticle";

function Article(){

    const articleid = useParams().articleid;
    
    const contentRef = useRef();

    const { data } = useArticleContent(articleid);


    const deleteArticle = useDeleteArticle();

    

    return (
        <>
            {

            data.msg === 'No Article'? 'NO POST':
                <div>
                    <p>{data.TITLE}</p>
                    {/* <div className="article_content" dangerouslySetInnerHTML={{__html:data.CONTENT}}>{data.CONTENT}</div> */}
                    <ReactQuill 
                        value={data.CONTENT}
                        readOnly={true}
                        theme={"bubble"}
                    />
                    <p>카테고리:{data.CATEGORY === null ? "(카테고리 없음)" : data.CATEGORY}</p>
                    <button onClick={()=>{deleteArticle.mutate(articleid)}}>글 삭제</button>
                </div>
            }
        </>
        );
}

export default Article;