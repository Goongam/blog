import List from '@mui/material/List';
import { memo } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import ArticleInList from './ArticleInList.js'

import { useAllArticleList } from './hooks/useAllArticleList.js';

function ArticleList(){

   const { data: articleList , fetchNextPage, hasNextPage, isLoading, refetch} = useAllArticleList();

   if(isLoading) return <>Loading...</>;

    return (
        <>
        <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
            <List>
                {/* <button onClick={()=>{refetch()}}>새로고침</button> */}
                {
                articleList.pages.map(
                    (pageData) =>
                    pageData.data.map((article, index) => 
                        <ArticleInList article={article} index={index} key={index}/> 
                    )
                )
                
                }
            
            </List>
        
        </InfiniteScroll>
        </>
    );
}

export default memo(ArticleList);