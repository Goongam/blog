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

async function insertArticle(title, content,category){
    try {

        await connection.execute("insert into Articles values(articleid_seq.NEXTVAL,:title,:content,to_timestamp(to_char(SYSDATE,'YYYY-MM-DD HH24:MI:SS')), :category)",[title,content,category]);
        connection.commit();
        return {"msg":"insert success"};
    } catch (error) {
        console.log(error)
        return {"msg":"INSERT ERROR"}
    }
}
//
async function getArticles(){
    try {
        const articleList = await connection.execute("select id,title,content,editdate from Articles order by editdate desc");
        console.log(articleList.rows);
        return articleList.rows;

    } catch (error) {
        console.log(error);
        return {"msg" : "SELECT Error"};
    }
}

async function getCategoryList(){
    try {
        const categoryList = await connection.execute("select category from Categorys");
        return categoryList.rows;
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

async function getCategoryArticle(category){
    try {
        const articleList = await connection.execute('select * from Articles where category = :category',[category]);
        // console.log(articleList.rows);
        return articleList.rows;
    } catch (error) {
        console.log(error);
        return {"msg" : "SELECT Error3"};
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

async function addCategory(category){
    try {
        connection.execute("insert into Categorys values(category_seq.nextval, :category)",[category]);
        connection.commit();
        return {"msg":"insert success"};
    } catch (error) {
        return {"msg":"insert ERROR"};
    }
}

app.post('/NewArticle',async (req,res)=>{
   const msg = await insertArticle(req.body.title, req.body.content, req.body.category);

   console.log(msg);
   res.send(msg);
});

app.get('/GetArticleList',async (req,res)=>{
    const result =  await getArticles();
    res.send(result);
});
app.get('/GetCategoryList', async (req,res)=>{
    const result = await getCategoryList();
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

app.get('/newCategory/:category',async (req,res)=>{
    const result = await addCategory(req.params.category);
    res.send(result);
});

app.get('/Category/:category',async (req,res)=>{
    const result = await getCategoryArticle(req.params.category);
    res.send(result);
});

app.listen(3001, function(){
    console.log("start!!");
    connectDB();
});

