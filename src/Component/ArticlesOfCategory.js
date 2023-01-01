import { memo, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import ArticleInList from "./ArticleInList";
import { baseUrl } from "../constants";
import { useArticleListWithCate } from "./hooks/useArticleListWithCate";
import { useDeleteCate } from "./hooks/useDeleteCate";

function ArticlesOfCategory(){

    const category = useParams().category;
    
    
    const { data: ArticleList } = useArticleListWithCate(category);
    const deleteCategory = useDeleteCate(category);
    
    function deleteEvent(){
        deleteCategory.mutate();

    }

    return (
        <>
            {
                (
                    <div>
                        <button onClick={deleteEvent}>이 카테고리 삭제</button>
                        {
                            ArticleList.map((article,index) => <ArticleInList article={article} index={index} key={index} /> )
                        }
                    </div>
                )
                
                
                    
                
            }
        </>
    );
}

export default ArticlesOfCategory;