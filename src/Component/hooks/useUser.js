import { useQuery } from "react-query";
import { baseUrl } from '../../constants';

async function getUser(user){
    
        console.log(user);
        const res = await fetch(`${baseUrl}/user/g1`,{
            headers:{
                authorization: user.accessToken
            },
            credentials: 'include',
        });
        return res.json();
    
}

// function getStorageData(){
//     const storedUser = localStorage.getItem('user');
//     return storedUser ? JSON.parse(storedUser) : null;
// }

export function useUser(){
    const { data = {} } = useQuery(['user'], ()=>getUser(data),{
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
    });
    
    return { data };
}