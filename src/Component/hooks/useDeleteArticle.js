import { baseUrl } from "../../constants";
import { useQuery, useMutation } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

export function useDeleteArticle(){
    const Nevigate = useNavigate();

    const deleteArticle = useMutation(async(id)=>{await fetch(`${baseUrl}/deleteArticle/${id}`)},{
        onSuccess:()=>{
            Nevigate('/');
        },
    });

    return deleteArticle;
}