

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import TextField from '@mui/material/TextField';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import {
  useQuery,
  useMutation,
  QueryClient,
} from 'react-query'


import Home from './Home';
import NewArticle from './NewArticle';
import Article from './Article';
import ArticleList from './ArticleList';
import ArticlesOfCategory from './ArticlesOfCategory';


const queryClient = new QueryClient();


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

 function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [isCateInput, setIsCateInput] = React.useState(false);



  const catelistQuery = useQuery('categoryList',async()=> await (await fetch("http://localhost:3001/GetCategoryList")).json(),{
      onSuccess: async(d)=>{
        console.log(d);

      },
      onError:(error)=>{
          console.log("에러코드:"+error.response?.data.code);
      },
      // enabled: false //true상태일때만 실행
      retry: 3, //재시도횟수
      refetchOnMount: true, //쿨타임끝일때 자동 마운팅
      refetchOnWindowFocus: false, //쿨타임끝일때 윈도우 포커스 잡힐경우 자동 마운팅
    });


  function addCategoryClickEvent(e){
    if(e.key === "Enter" && e.target.value !== ""){
      addCategory(e.target.value);
    }
  
  }

  const addcate = useMutation(async (value)=>await (await fetch(`http://localhost:3001/newCategory/${value}`)).json(),{
    onSuccess:()=>{
      console.log('카테고리 추가 성공');
      catelistQuery.refetch(); //queryClient.invalidateQueries 사용?
      
    },
    onError:(e)=>{
      console.log('카테고리 추가 에러 발생:'+e);
    }
  });
  const addCategory = React.useCallback(async (value)=>{
    const message = addcate.mutate(value);
    setIsCateInput(false);
  },[]);
 



  const functionList = [
    {"name":'글 쓰기', 'link':'NewArticle'},
    {'name':'글 목록', 'link':'ArticleList'}
  ];




  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const categoryMemo = React.useMemo(()=> [...categorys], [categorys]);
  console.log('App render')
  return (
    <Box sx={{ display: 'flex' }}>
      <Router>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Goongam Blog
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {functionList.map((func, index) => (
            
              <Link to={`/${func.link}`} key={index}>
              <ListItem key={func.name} disablePadding>
                
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={func.name} />
                </ListItemButton>
                
              </ListItem>
              </Link>
          ))}
        </List>
        <Divider />
        <List>
          {catelistQuery.isLoading ? 'Loading...':
            catelistQuery.isError ? '서버와 연결할 수 없음':
            <>
            {
              catelistQuery.data.map((category, index) => (
              
                <Link to={`/category/${category.CATEGORY}`} key={index}>
                  <ListItem key={index} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={category.CATEGORY} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))
            }

          <ListItem>
              {
                isCateInput ? 
                  <TextField 
                    inputRef={input => {return input && input.focus();}} 
                    onBlur={()=>{setIsCateInput(false)}}
                    onKeyDown={addCategoryClickEvent}
                    id="standard-basic" label="카테고리 입력" variant="standard" /> 
                  :
                  <ListItemButton onClick={()=>{setIsCateInput(true);}}>
                    카테고리추가...
                  </ListItemButton> 
              }
          </ListItem>
          </>
          }
          
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        
        

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/NewArticle' element={<NewArticle categoryList={catelistQuery.data} />} />
            <Route path='/article/:articleid' element={<Article />} />
            <Route path='/ArticleList' element={<ArticleList />} />
            <Route path='/Category/:category' element={<ArticlesOfCategory categoryRefetch={catelistQuery.refetch}/>} />
          </Routes>
        
       

      </Main>
      </Router>
    </Box>
  );
}
export default App;
