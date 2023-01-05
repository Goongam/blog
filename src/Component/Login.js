import Grid from "@mui/material/Unstable_Grid2";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { width } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { useQueryClient } from "react-query";
import { baseUrl } from "../constants";
import { useState } from "react";
import { useUser } from "./hooks/useUser";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: 700,
    marginTop: 40
  }));


  async function login(email, password){
    const accessToken = await fetch(`${baseUrl}/login`,{
        credentials: 'include',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "email":email,
          "password":password,
        }),
        
    });
    const tokenJson =  await accessToken.json();
    return tokenJson;
}

export function Login(){

    const queryClient = useQueryClient();

    const [email, setEmail] = useState("aaa@gmail.com");
    const [password, setPassword] = useState('p1');

    const navigate = useNavigate();

    const {data: user} = useUser();

    if(user.ok) return <div>이미 로그인 되어있습니다!</div>;

    return (
        <>
            <Box display='flex' justifyContent='center'>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4 }}>
                    <Grid xs={2} sm={4} md={4}>
                        <Item>
                            <TextField placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}></TextField> <br></br>
                            <TextField placeholder="Password" type={'password'} value={password} onChange={e=>setPassword(e.target.value)}></TextField><br />
                            <Button onClick={async()=>{
                                const accessToken = await login(email, password);

                                if(accessToken.ok){
                                    queryClient.setQueryData(['user'], accessToken);
                                    navigate('/');
                                }else{
                                    console.log('로그인 실패');
                                }
                            }}>로그인</Button>
              
                        </Item>
                    </Grid>
                    
                </Grid>
            </Box>
        </>
    );
}