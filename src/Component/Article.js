import React, { useEffect, useState, memo, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import { baseUrl } from "../constants";
import { useArticleContent } from "./hooks/useArticleContent";
import { useDeleteArticle } from "./hooks/useDeleteArticle";
import { Box, Button } from "@mui/material";

function Article(){

    const articleid = useParams().articleid;
    
    const contentRef = useRef();

    const navi = useNavigate();

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
                    <p>
                        {
                        data.CATEGORY === null ? 
                            "(카테고리 없음)" : 
                            <Link to={`/category/${data.CATEGORY}`}>
                                <Button variant="contained" disableElevation>{data.CATEGORY}</Button>
                            </Link>
                        }
                    </p>


                    <Box color="text.secondary" display="flex" justifyContent="flex-end">
                        <Button 
                            onClick={()=>{navi(`/editArticle/${articleid}`)}} 
                            variant="contained" 
                            color="secondary">
                                글 수정
                        </Button>
                        <Button 
                            onClick={()=>{deleteArticle.mutate(articleid)}} 
                            variant="contained" 
                            color="error"
                            sx={{ml:1}}>
                                글 삭제
                        </Button>
                    </Box>
                </div>
            }
        </>
        );
}

export default Article;