import { memo } from "react";
import { useUser } from "./hooks/useUser";
import { useMutation, useQueryClient } from "react-query";
import { baseUrl } from "../constants";

async function login(){
    const accessToken = await fetch(`${baseUrl}/login`,{
        credentials: 'include'
    });
    const tokenJson =  await accessToken.json();
    return tokenJson;
}

async function logout(){
    fetch(`http://localhost:3001/logout`,{
        credentials: 'include',
    });
}

function Home(){
    const queryClient = useQueryClient();
    const { data: user } = useUser();

    return (
        <>
            Blog home
            {
                user.ok ? 
                
                    <button onClick={()=>{
                        queryClient.setQueryData(['user'], {
                            ok: false,
                            accessToken: null,
                        });
                        logout();
                    }}>로그아웃</button> 

                :

                    <button onClick={ async()=>{
                        const accessToken = await login();
                        queryClient.setQueryData(['user'], accessToken);
                    }}>로그인</button>

            }
        </>
    );
}

export default Home;