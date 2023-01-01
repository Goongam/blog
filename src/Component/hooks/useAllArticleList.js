import { baseUrl } from "../../constants";
import { useQuery } from 'react-query';

export function useAllArticleList(){
    const fallback = [];

    const {data = fallback, refetch} = useQuery('articlelist',
        async ()=>await(await fetch(`${baseUrl}/GetArticleList`)).json());

    return { data, refetch };
}