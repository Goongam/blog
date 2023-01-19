import { Button, List } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import { useParams } from "react-router-dom";
import ArticleInList from "./ArticleInList";
import { useArticleListWithCate } from "./hooks/useArticleListWithCate";
import { useDeleteCate } from "./hooks/useDeleteCate";

function ArticlesOfCategory(){

    const category = useParams().category;
    
    
    const { data: articleList, fetchNextPage, hasNextPage, isLoading, refetch } = useArticleListWithCate(category);
    const deleteCategory = useDeleteCate(category);
    
    function deleteEvent(){
        deleteCategory.mutate();

    }

    if(isLoading) return <>Loading...</>;

    return (
        <>
            <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
                <Button onClick={deleteEvent}>이 카테고리 삭제</Button>
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

export default ArticlesOfCategory;