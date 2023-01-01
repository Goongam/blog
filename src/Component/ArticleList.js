import List from '@mui/material/List';
import { useState, useEffect, memo } from 'react';

import ArticleInList from './ArticleInList.js'

import { useAllArticleList } from './hooks/useAllArticleList.js';

function ArticleList(){

   const { data: articleList , refetch} = useAllArticleList();

//sx={{ mb: 1.5 }} 타이포그래피 하단 간격
    return (
        <>
        
        <List>
            <button onClick={()=>{refetch()}}>새로고침</button>
            {articleList.map(
                (article, index)=> <ArticleInList article={article} index={index} key={index}/> 
            )}
          
        </List>
        
            
        </>
    );
}

export default memo(ArticleList);