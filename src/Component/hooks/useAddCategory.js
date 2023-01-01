import { baseUrl } from "../../constants";
import { useMutation, useQueryClient } from "react-query";

export function useAddCategory(){

    const queryClient = useQueryClient();

    const addcate = useMutation(async (value)=>await (await fetch(`${baseUrl}/newCategory/${value}`)).json(),{
        onSuccess:()=>{
          queryClient.invalidateQueries(['categoryList']);
        },
      });

      return addcate;
}