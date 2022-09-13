import { Box, Button, Card, CardActions, CardContent, Divider, ListItem, ListItemText, Typography } from '@mui/material';
import List from '@mui/material/List';
import { useState, useEffect, memo } from 'react';

function ArticleList(){

    const [articles , setArticles] = useState([]);
    console.log('ArticleList render');
    async function getArticles(){
        const articlelist = await (await fetch("http://localhost:3001/GetArticleList")).json();
    
        setArticles(articlelist);
      }
    
    
      useEffect(()=>{
        getArticles();
      },[]);
//sx={{ mb: 1.5 }} 타이포그래피 하단 간격
    return (
        <>
            <List>
                {articles.map(
                    (article, index)=>
                        <div key={index}>
                            <ListItem key={index}>
                                {/* <ListItemText primary={article.TITLE} /> */}
                                <Card sx={{ minWidth: 1/1, p:0, m:0 }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {article.TITLE}
                                        </Typography>
   
                                        <Box sx={{ display: 'grid', gridAutoColumns: '1fr' }}>
                                        <Typography sx={{gridRow:'1', gridColumn:'1/10'}} color="text.secondary">
                                            {article.CONTENT.length < 30 ? 
                                                article.CONTENT : 
                                                article.CONTENT.substr(0,28)+"..."
                                            }
                                        </Typography>
                                            <Box color="text.secondary" sx={{gridRow:'2', gridColumn:'9/10'}}>
                                                {article.EDITDATE.substr(0, article.EDITDATE.length - 14)}
                                            </Box>
                                        </Box>
                                    </CardContent>
                                    
                                    {/* <CardActions>
                                        <Button size="small">Learn More</Button>
                                    </CardActions> */}
                                </Card>
                            </ListItem>
                            
                            {/* <Divider /> */}
                        </div>
                    
                )}
            </List>
        </>
    );
}

export default memo(ArticleList);