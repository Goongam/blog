

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

import Home from './Component/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClientProvider,
  QueryClient,
} from 'react-query'

import css from './App.css';

import NewArticle from './Component/NewArticle';
import Article from './Component/Article';
import ArticleList from './Component/ArticleList';
import ArticlesOfCategory from './Component/ArticlesOfCategory';


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
  const [articles, setArticles] = React.useState([]);
  const [isCateInput, setIsCateInput] = React.useState(false);
  const [categorys, setCategorys] = React.useState([]);

  // async function getArticles(){
  //   const articlelist = await (await fetch("http://localhost:3001/GetArticleList")).json();

  //   setArticles(articlelist);
  // }
  async function getCategory(){
    const categoryList = await (await fetch("http://localhost:3001/GetCategoryList")).json();
    setCategorys(categoryList);
  }

  function addCategoryClickEvent(e){
    if(e.key === "Enter" && e.target.value !== ""){
      addCategory(e.target.value);
    }
  
  }

  const addCategory = React.useCallback(async (value)=>{
    const message = await (await fetch(`http://localhost:3001/newCategory/${value}`)).json();
    setIsCateInput(false);
    getCategory();
  },[]);
 

  React.useEffect(()=>{
    // getArticles();
    getCategory();
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

  const categoryMemo = React.useMemo(()=> [...categorys], [categorys]);
  console.log('App render')
  return (
    <QueryClientProvider client={queryClient}>
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
          {categorys.map((category, index) => (
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
          ))}
          <ListItem>
            {
              isCateInput ? 
                <TextField 
                  inputRef={input => {console.log(input); return input && input.focus();}} 
                  onBlur={()=>{setIsCateInput(false)}}
                  onKeyDown={addCategoryClickEvent}
                  id="standard-basic" label="카테고리 입력" variant="standard" /> 
                :
                <ListItemButton onClick={()=>{setIsCateInput(true);}}>
                  카테고리추가...
                </ListItemButton> 
            }
            

          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        
        

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/NewArticle' element={<NewArticle categoryList={categoryMemo} addCategory={addCategory} />} />
            <Route path='/article/:articleid' element={<Article />} />
            <Route path='/ArticleList' element={<ArticleList />} />
            <Route path='/Category/:category' element={<ArticlesOfCategory />} />
          </Routes>
        
       

      </Main>
      </Router>
    </Box>
    </QueryClientProvider>
  );
}
export default App;
