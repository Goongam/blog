import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ArticlesOfCategory(){
    const category = useParams().category;

    const [articleList, setArticleList] = useState([]);
    const [isError, setIsError] = useState(false);

    useEffect(()=>{
        async function getArticles(){
            const json = await fetch(`http://localhost:3001/Category/${category}`)
            .catch((err)=>{
                setArticleList([]);
                setIsError(true);
            });
            
            const articlejson = await json.json();
            setArticleList(articlejson);

            // if(articlejson?.msg !== 'SELECT Error3'){
            //     setArticleList(articlejson);
            //     setIsError(false);
            // }
            // else
            //     setIsError(true);
        }
        setIsError(false);
        getArticles();

    },[category]);

    return (
        <>
            {
            isError ? 
                "서버와 연결할 수 없음" :
                articleList.map((article,index) => 
                    <div key={index}>
                        {article.TITLE} / {article.CONTENT} / {article.CATEGORY}
                    </div>
                )
            }
        </>
    );
}