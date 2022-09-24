import { Box, Button, Card, CardActions, CardContent, Divider, ListItem, ListItemText, Typography } from '@mui/material';
import List from '@mui/material/List';
import { useState, useEffect, memo } from 'react';
import { useQuery } from 'react-query';

function ArticleList(){


    

   const {data, isError, isLoading, refetch} = useQuery('articlelist',
        async ()=>await(await fetch("http://localhost:3001/GetArticleList")).json(),
        {
            staleTime: 0, //fetch쿨타임 시간(ms)
            onSuccess: async(d)=>{
                console.log("성공");
            },
            onError:(error)=>{
                console.log("에러:"+error);
            },
            // enabled: false //true상태일때만 실행
            retry: 3, //재시도횟수
            refetchOnMount: true, //쿨타임끝일때 자동 마운팅
            refetchOnWindowFocus: false, //쿨타임끝일때 윈도우 포커스 잡힐경우 자동 마운팅

        }
    )
    console.log('ArticleList render');

//sx={{ mb: 1.5 }} 타이포그래피 하단 간격
    return (
        <>
        {isLoading ? 'Loading...':
            isError ? '서버와 연결할 수 없음':
            
            <List>
                <button onClick={()=>{refetch()}}>새로고침</button>
            {data.map(
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
        }
            
        </>
    );
}

export default memo(ArticleList);