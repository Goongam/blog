import { memo, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

function ArticlesOfCategory(){

    const category = useParams().category;

    const {data, isError, isLoading, refetch} = 
        useQuery(['category',category],
            async()=> await(await fetch(`http://localhost:3001/Category/${category}`)).json() ,
            {
                staleTime: 0, //fetch쿨타임 시간(ms)
                onSuccess: async(d)=>{
                    console.log("성공");
                },
                onError:(error)=>{
                    console.log("에러코드:"+error.response?.data.code);
                },
                // enabled: false //true상태일때만 실행
                retry: 2, //재시도횟수
                refetchOnMount: true, //쿨타임끝일때 자동 마운팅
                refetchOnWindowFocus: false, //쿨타임끝일때 윈도우 포커스 잡힐경우 자동 마운팅
            });

    return (
        <>
            {
            isError ? "서버와 연결할 수 없음" :
            isLoading ? "Loading...":
                data.map((article,index) => 
                    <div key={index}>
                        {article.TITLE} / {article.CONTENT} / {article.CATEGORY}
                    </div>
                )
            }
        </>
    );
}

export default ArticlesOfCategory;