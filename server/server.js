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
//     let query = await connection.execute("select * from Posts");
//     console.log(query.rows[0].ID);

//     res.send("aa");
// });

async function insertPost(title, content){
    try {
        await connection.execute("insert into Posts values(postid_seq.NEXTVAL,:title,:content)",[title,content]);
        connection.commit();
        return {"msg":"insert success"};
    } catch (error) {
        console.log(error)
        return {"msg":"INSERT ERROR"}
    }
}

async function getPosts(){
    try {
        const postList = await connection.execute("select id,title from Posts");
        return postList.rows;

    } catch (error) {
        console.log(error);
        return {"msg" : "SELECT Error"};
    }
}

async function getPostContent(id){
    try {
        const postContent = await connection.execute(
            "select title,content from Posts where id = :id",[id]
        );
        
        if(postContent.rows.length === 0) return {"msg" : "No Post"};

        return postContent.rows[0];
    } catch (error) {
        console.log(error);
        return {"msg" : "SELECT Error2"};
    }
}

async function deletePost(id){
    try {
        const result = await connection.execute(
            "delete from Posts where id = :id",[id]
        );
        connection.commit();

        console.log(result);

        return {"msg" : "DELETE success"}
    } catch (error) {
        console.log(error);
        return {"msg" : "DELETE ERROR"};
    }
}


app.post('/NewPost',async (req,res)=>{
   const msg = await insertPost(req.body.title, req.body.content);

   console.log(msg);
   res.send(msg);
});

app.get('/GetPostList',async (req,res)=>{
    const result =  await getPosts();
    res.send(result);
});

app.get('/GetPostContent/:id',async (req,res)=>{
   const result = await getPostContent(req.params.id);
   
   res.send(result);
});

app.get('/deletePost/:id',async (req,res)=>{
   const result = await deletePost(req.params.id);
   res.send(result);
 });

app.listen(3001, function(){
    console.log("start!!");
    connectDB();
});

