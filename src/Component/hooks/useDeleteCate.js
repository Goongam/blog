import { baseUrl } from "../../constants";
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from "react-router-dom";

export function useDeleteCate(category){

    const queryClient = useQueryClient();
    const navigater = useNavigate();

    const deleteCategory = useMutation( async ()=>(await fetch(`${baseUrl}/deleteCategory/${category}`)).json(),{

        onSuccess: ()=>{
            queryClient.invalidateQueries(["categoryList"]);
            navigater('/');
        }
    });

    return deleteCategory;
}