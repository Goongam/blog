const express = require("express");
const app = express();
const cors = require('cors');
const oracledb = require('oracledb');
const fs = require('fs');
const multer = require('multer')
const path=require("path");

app.use(cors({ 
    origin: '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


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
        const nextval = await connection.execute('select articleid_seq.NEXTVAL from dual');
        console.log("n:",nextval.rows[0].NEXTVAL);
        await connection.execute("insert into Articles values(:id,:title,:content,to_timestamp(to_char(SYSDATE,'YYYY-MM-DD HH24:MI:SS')), :category)",[nextval.rows[0].NEXTVAL,title,content,category]);
        connection.commit();
        return {"id":nextval.rows[0].NEXTVAL};
    } catch (error) {
        console.log('insertArticle ',error)
        return {"error":"INSERT ERROR"}
    }
}
//
async function getArticles(){
    try {
        const articleList = await connection.execute("select id,title,content,editdate from Articles order by editdate desc");
        return articleList.rows;

    } catch (error) {
        console.log('getArticles ',error);
        return {"error" : "SELECT Error"};
    }
}

async function getCategoryList(){
    try {
        const categoryList = await connection.execute("select category from Categorys");
        return categoryList.rows;
    } catch (error) {
        console.log('getCategoryList ',error);
        return {"error" : "SELECT Error"};
    }
}

async function getArticleContent(id){
    try {
        const articleContent = await connection.execute(
            "select title,content,category from Articles where id = :id",[id]
        );
        if(articleContent.rows.length === 0) return {"msg" : "No Article"};

        return articleContent.rows[0];
    } catch (error) {
        console.log('getArticleContent ',error);
        return {"error" : "SELECT Error2"};
    }
}

async function getCategoryArticle(category){
    try {
        const articleList = await connection.execute('select * from Articles where category = :category',[category]);
        // console.log(articleList.rows);
        return articleList.rows;
    } catch (error) {
        console.log('getCategoryArticle ',error);
        return {"error" : "SELECT Error3"};
    }
}

async function deleteArticle(id){
    try {
        const result = await connection.execute(
            "delete from Articles where id = :id",[id]
        );
        connection.commit();
        return {"msg" : "DELETE success"}
    } catch (error) {
        console.error('deleteArticle ',error);
        return {"error" : "DELETE ERROR"};
    }
}

async function addCategory(category){
    try {
        await connection.execute("insert into Categorys values(category_seq.nextval, :category)",[category]);
        await connection.commit();
        return {"msg":"insert success"};
    } catch (error) {
        console.error('addCategory ',error);
        return {"error":"insert ERROR"};
    }
}

async function deleteCategory(category){
    try {
        const a = await connection.execute('update articles SET category = null where category = :category',[category]);
        await connection.execute('delete categorys where category = :category',[category]);
        await connection.commit();
        console.log(category);
        return {"msg":"delete success"};
    } catch (error) {
        console.error('deleteCategory',error);
        return {'error':'delete error'};
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

app.get('/deleteCategory/:category', async (req, res)=>{
    const result = await deleteCategory(req.params.category);
    res.send(result)
})


const upload = multer({
    storage: multer.diskStorage({ // 저장한공간 정보 : 하드디스크에 저장
        destination(req, file, done) { // 저장 위치
            done(null, '../../imgs/'); // uploads라는 폴더 안에 저장
        },
        filename(req, file, done) { // 파일명을 어떤 이름으로 올릴지
            const ext = path.extname(file.originalname);
            done(null, file.fieldname + '-' + Date.now() + ext);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 } // 5메가로 용량 제한
});
app.post('/uploadImage', upload.single('image'), async(req,res)=>{
    res.send({imgURL:"http://localhost:3001/Image/"+req.file.filename});
});

app.get('/Image/:img', async(req, res)=>{
    fs.readFile(`../../imgs/${req.params.img}`,(err,data)=>{
        if(err) {res.send();}
        res.send(data);
    });
});


app.listen(3001, function(){
    console.log("start!!");
    connectDB();
});

