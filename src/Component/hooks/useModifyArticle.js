import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const modifyArticle = async ({articleid, title, content, selectedCate}) => {
    return fetch('http://localhost:3001/ModifyArticle',{
        method:'post',
        headers: {
            "Content-Type": "application/json",
            },
        body:JSON.stringify({
            id: articleid,
            title: title,
            content: content,
            category: selectedCate
        })
    }).then(res => res.json());
}

export function useModifyArticle(articleid){

    const navi = useNavigate();


    const modifyMutation = useMutation(modifyArticle,
        {
            onSuccess: (e) => {
                navi(`/Article/${articleid}`);
            }
        }
    );

    return modifyMutation;
}