import List from '@mui/material/List';
import { useState, useEffect, memo } from 'react';
import { useQuery } from 'react-query';
import ArticleInList from './ArticleInList.js'
function ArticleList(){

   const {data, isError, isLoading, refetch} = useQuery('articlelist',
        async ()=>await(await fetch("http://localhost:3001/GetArticleList")).json(),
        {
            staleTime: 0, //fetch쿨타임 시간(ms)
            onSuccess: async(d)=>{
                console.log("성공");
            },
            onError:(error)=>{
                console.log("에러:"+error);
            },
            // enabled: false //true상태일때만 실행
            retry: 3, //재시도횟수
            refetchOnMount: true, //쿨타임끝일때 자동 마운팅
            refetchOnWindowFocus: false, //쿨타임끝일때 윈도우 포커스 잡힐경우 자동 마운팅

        }
    )




//sx={{ mb: 1.5 }} 타이포그래피 하단 간격
    return (
        <>
        {isLoading ? 'Loading...':
            isError ? '서버와 연결할 수 없음':
            
            <List>
                <button onClick={()=>{refetch()}}>새로고침</button>
            {data.map(
                (article, index)=> <ArticleInList article={article} index={index}/> 
            )}
          
        </List>
        }
            
        </>
    );
}

export default memo(ArticleList);