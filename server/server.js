const express = require("express");
const app = express();
const cors = require('cors');
const oracledb = require('oracledb');

app.use(cors({ 
    origin: '*',
}));
app.use(express.json());



let connection;
async function connectDB(){
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    connection = await oracledb.getConnection({
        user          : "ljw",
        password      : "123123",
        connectString : "xe"
    });

}




// app.get('/test',async (req,res)=>{
    
    
//     // let query = await connection.execute("select id from MapleIdList where nickname = :nick",["앙꼬뽀리"]);
//     let query = await connection.execute("select * from Articles");
//     console.log(query.rows[0].ID);

//     res.send("aa");
// });
const today = new Date(); 

async function insertArticle(title, content){
    try {
        let editdate = today.getFullYear() + "/"+ today.getMonth()+"/"+ today.getDate(); 
        await connection.execute("insert into Articles values(articleid_seq.NEXTVAL,:title,:content,:editdate)",[title,content,editdate]);
        connection.commit();
        return {"msg":"insert success"};
    } catch (error) {
        console.log(error)
        return {"msg":"INSERT ERROR"}
    }
}

async function getArticles(){
    try {
        const articleList = await connection.execute("select id,title,content,editdate from Articles");
        return articleList.rows;

    } catch (error) {
        console.log(error);
        return {"msg" : "SELECT Error"};
    }
}

async function getArticleContent(id){
    try {
        const articleContent = await connection.execute(
            "select title,content from Articles where id = :id",[id]
        );
        
        if(articleContent.rows.length === 0) return {"msg" : "No Article"};

        return articleContent.rows[0];
    } catch (error) {
        console.log(error);
        return {"msg" : "SELECT Error2"};
    }
}

async function deleteArticle(id){
    try {
        const result = await connection.execute(
            "delete from Articles where id = :id",[id]
        );
        connection.commit();

        console.log(result);

        return {"msg" : "DELETE success"}
    } catch (error) {
        console.log(error);
        return {"msg" : "DELETE ERROR"};
    }
}


app.post('/NewArticle',async (req,res)=>{
   const msg = await insertArticle(req.body.title, req.body.content);

   console.log(msg);
   res.send(msg);
});

app.get('/GetArticleList',async (req,res)=>{
    const result =  await getArticles();
    res.send(result);
});

app.get('/GetArticleContent/:id',async (req,res)=>{
   const result = await getArticleContent(req.params.id);
   
   res.send(result);
});

app.get('/deleteArticle/:id',async (req,res)=>{
   const result = await deleteArticle(req.params.id);
   res.send(result);
 });

app.listen(3001, function(){
    console.log("start!!");
    connectDB();
});

