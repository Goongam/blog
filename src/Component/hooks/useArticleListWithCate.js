import { baseUrl } from "../../constants";
import { useQuery } from "react-query";

export function useArticleListWithCate(category){

    const fallback = [];

    const {data = fallback} =  useQuery(['category',category],
            async()=> await(await fetch(`${baseUrl}/Category/${category}`)).json());

    return { data };
}