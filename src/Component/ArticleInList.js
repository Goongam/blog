import { Box, Button, Card, CardActions, CardContent, Divider, ListItem, ListItemText, Typography, Link, ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ArticleInList({article, index}){
    const navigater = useNavigate();
    const CONTENT = article.CONTENT.replace(/(<([^>]+)>)/gi, "");
    function getBetweenTime(EDITDATE){
        return  ((new Date()).getTime() - new Date(EDITDATE).getTime()) / (1000 * 60 * 60)
    }

    return <div>          
                <ListItem>
                
                    {/* <ListItemText primary={article.TITLE} /> */}
                    <Card sx={{ minWidth: 1/1, p:0, m:0 }}>
                    <ListItemButton onClick={()=>{navigater(`/Article/${article.ID}`)}}>
                        <CardContent sx={{ minWidth: 1/1, p:0, m:0 }}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                
                            </Typography>
                            <Typography variant="h5" component="div">
                                {article.TITLE}
                            </Typography>

                            <Box>
                                <Typography sx={{gridRow:'1', gridColumn:'1/10'}} color="text.secondary">
                                    {CONTENT.length < 30 ? 
                                        CONTENT : 
                                        CONTENT.substr(0,28)+"..."
                                    }
                                </Typography>
                                <Box color="text.secondary" display="flex" justifyContent="flex-end">

                                    { 
                                        //현재시각 - 글 생성시각 < 24시간
                                        getBetweenTime(article.EDITDATE) < 24 ? //24시간 이내
                                            +getBetweenTime(article.EDITDATE) < 1 ? //1시간 이내
                                                Math.floor(+getBetweenTime(article.EDITDATE) * 60)+ "분 전":
                                                Math.floor(+getBetweenTime(article.EDITDATE))+"시간 전":
                                                article.EDITDATE.substr(0, article.EDITDATE.length - 14)
                                    }


                                </Box>
                            </Box>
                        </CardContent>
                        
                        {/* <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                        </ListItemButton>
                    </Card>
                    
                </ListItem>
                {/* <Divider /> */}
            </div>
}

export default ArticleInList;