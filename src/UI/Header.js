import { Toolbar,IconButton, Typography, Box, Grid, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useUser } from "../Component/hooks/useUser";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";

async function logout(){
    fetch(`http://localhost:3001/logout`,{
        credentials: 'include',
    });
}


export function Header({open, handleDrawerOpen}){

    const { data: user } = useUser();
    const queryClient = useQueryClient();
    return (


    <Toolbar>
        <Box display='flex' sx={{flex: 1}} alignItems='center'>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
                <MenuIcon />
            </IconButton>

            <Box variant="h6" noWarp>
                Goongam Blog
            </Box>
        </Box>

        {
            user.ok ? 
                <Box>
                    {user.user.id}
                    <Button color="info" variant="contained" sx={{ml:2}}
                        onClick={()=>{
                            queryClient.setQueryData(['user'], {
                                ok: false,
                                accessToken: null,
                            });
                            logout();
                        }}>로그아웃</Button>
                </Box>
                :
                <Link to={'/login'}>
                    <Button color="info" variant="contained">로그인</Button>
                </Link>
                
        }
        
        
    </Toolbar>




    // <Toolbar>
    //     <IconButton
    //         color="inherit"
    //         aria-label="open drawer"
    //         onClick={handleDrawerOpen}
    //         edge="start"
    //         sx={{ mr: 2, ...(open && { display: 'none' }) }}
    //     >
    //         <MenuIcon />
    //     </IconButton>

    //     <Typography variant="h6" noWrap>
    //         Goongam Blog
    //     </Typography>

    //     <Box >
    //         <Box>asd</Box>
    //     </Box>
    // </Toolbar>
    );
}