import { baseUrl } from "../../constants";
import { useQuery } from "react-query";

export function useArticleContent(articleid){
    const fallback = {};

    const {data = fallback} = useQuery(['article',articleid],
            async ()=> await (await fetch(`${baseUrl}/GetArticleContent/${articleid}`)).json());

    
    return { data };
}
