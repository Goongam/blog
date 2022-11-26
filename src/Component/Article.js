import React, { useEffect, useState, memo, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";

function Article(){

    const articleid = useParams().articleid;
    const Nevigate = useNavigate();
    const contentRef = useRef();

    const {data,isError,isLoading} = useQuery(['article',articleid],
            async ()=> await (await fetch(`http://localhost:3001/GetArticleContent/${articleid}`)).json(),
            {
                staleTime: 0, //fetch쿨타임 시간(ms)
                onSuccess: async(d)=>{
                    console.log("성공");
    
                },
                onError:(error)=>{
                    console.log("에러코드:"+error.response?.data.code);
                },
                // enabled: false //true상태일때만 실행
                retry: 3, //재시도횟수
                refetchOnMount: true, //쿨타임끝일때 자동 마운팅
                refetchOnWindowFocus: false, //쿨타임끝일때 윈도우 포커스 잡힐경우 자동 마운팅
    
            });




    const deleteArticle = useMutation(async(id)=>{await fetch(`http://localhost:3001/deleteArticle/${id}`)},{
        onSuccess:()=>{
            console.log('삭제성공');
            Nevigate('/');
        },
        onError:()=>{
            console.log('삭제에러');
        }
    });

    return (
        <>
            {
            isLoading? "Loading...":
            isError? '서버와 연결할 수 없음':
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