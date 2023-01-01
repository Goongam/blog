import { baseUrl } from "../../constants";
import { useQuery } from "react-query";

export function useCategoryList(){
    const fallback = [];
    const { data = fallback} = useQuery('categoryList',async()=> await (await fetch(`${baseUrl}/GetCategoryList`)).json());

    return { data };
}