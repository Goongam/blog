import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useArticleContent } from "./hooks/useArticleContent";
import { useModifyArticle } from "./hooks/useModifyArticle";
import NewArticleForm from "./NewArticleForm";

export default function ModifyArticle(){

    const articleid = useParams().articleid;

    const {data: ArticleData} = useArticleContent(articleid);

    const [title,setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedCate, setSelectedCate] = useState('');

    useEffect(()=>{
        setTitle(ArticleData.TITLE);
        setContent(ArticleData.CONTENT);
        setSelectedCate(ArticleData.CATEGORY);
    },[ArticleData.TITLE, ArticleData.CONTENT, ArticleData.CATEGORY]);

    const modifyArticle = useModifyArticle(articleid);
    

    const submit = useCallback(async()=>{
        modifyArticle.mutate({articleid, title, content, selectedCate});
    },[modifyArticle,articleid, title, content, selectedCate]);

    return (
        <>
        <p>{ArticleData.TITLE}</p>
        <NewArticleForm 
            setTitle = {setTitle}
            title = {title}
            setContent = {setContent}
            content = {content}
            selectedCate = {selectedCate}
            setSelectedCate = {setSelectedCate}
            buttonAction = {submit}
        />
        </>
    );
}