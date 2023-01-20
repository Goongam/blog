import { baseUrl } from "../../constants";
import { useQuery } from "react-query";

export function useArticleContent(articleid){
    const fallback = {
        TITLE:"",
        CONTENT:"",
        CATEGORY:"",
        EDITDATE:"",
    };

    const {data = fallback} = useQuery(['article',articleid],
            async ()=> await (await fetch(`${baseUrl}/GetArticleContent/${articleid}`)).json());

    
    return { data };
}
