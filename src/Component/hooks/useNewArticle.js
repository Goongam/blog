import { baseUrl } from "../../constants";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export function useNewArticle(title, content, selectedCate){
    const Nevigate = useNavigate();
    
    const createArticle = useMutation(async ()=> await (await fetch(`${baseUrl}/NewArticle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "title":title,
          "content":content,
          "category":selectedCate,
        }),
        
      })).json(),{
        onSuccess: (e)=>{
          Nevigate(`/Article/${e.id}`);
        },
      });

      return createArticle;
}