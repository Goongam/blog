import { useQuery } from "react-query";
import { baseUrl } from '../../constants';

async function getUser(user){
    
        console.log(user);
        const res = await fetch(`${baseUrl}/userAccess`,{
            headers:{
                authorization: user.accessToken
            },
            credentials: 'include',
        });
        return res.json();
    
}


export function useUser(){
    const { data = {}, refetch } = useQuery(['user'], ()=>getUser(data),{
        // initialData: getStorageData,
        // onSuccess: (received) => {
        //     if (!received) {
        //     //   clearStoredUser();
        //     } else {
        //         localStorage.setItem("user",JSON.stringify(received));
        //     }
        // },
        staleTime:100,
        refetchOnWindowFocus:false,
        refetchOnMount: true,
        refetchInterval: 1000 * 60 * 30 //30분 마다 재발급
    });
    
    return { data, refetch };
}