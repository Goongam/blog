import { memo } from "react";
import { useUser } from "./hooks/useUser";
import { useQueryClient } from "react-query";
import { baseUrl } from "../constants";
function Home(){
    const queryClient = useQueryClient();
    const { data: user } = useUser();

    async function setNewToken(){
        const res = await fetch(`${baseUrl}/login`);
        const json = await res.json();
        localStorage.setItem("user",JSON.stringify(json));
        queryClient.setQueryData(['user'], json);
    }

    // console.log(user);

    return (
        <>
            Blog home
            {
                user.ok ? <button onClick={setNewToken}>로그아웃</button> :
                <button onClick={setNewToken}>로그인</button>

            }
        </>
    );
}

export default Home;