const express = require("express");
const app = express();
const cors = require('cors');
const oracledb = require('oracledb');
const fs = require('fs');
const multer = require('multer');
const multiparty = require('multiparty');
const path=require("path");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const { ok } = require("assert");

dotenv.config();

const whitelist = ['http://localhost:3000'];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

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


const users = [
    {
        id:'g1',
        email:'aaa@gmail.com',
        name:'goongam'
    }
];

function createToken(user){
    return jwt.sign(user, process.env.EXPRESS_SECRET,{
        expiresIn: '15s', // 만료시간 15분
        issuer: '토큰발급자',
      });
}

const token = {
    getexpireTime: ()=>{
        const expire = new Date();
        return expire.setDate(Date.now() + 1000 * 60 * 10); //10분
    },
    accessToken: (user) => {
        return jwt.sign(user, process.env.EXPRESS_SECRET,{
            expiresIn: '15s', // 만료시간 15분
            issuer: '토큰발급자',
        });
    },
    refreshToken: (user) => {
        return jwt.sign(user, process.env.EXPRESS_SECRET,{
            expiresIn: '1h', // 만료시간 15분
            issuer: '토큰발급자',
        });
    },
    verifyRefresh: (token) => {
        try {
            jwt.verify(token, process.env.EXPRESS_SECRET);
            return true;
        } catch (error) {
            return false;
        }
    }
}

app.get('/login', async (req, res)=>{

    const loginCheck = true;
    const user = users[0];

    if(!loginCheck) res.send({message:'login Failed'});

    const refreshToken = token.refreshToken(user);
    const accessToken = token.accessToken(user);

    res.cookie("refreshtoken", refreshToken,{
        httpOnly: true,
        // path:'/',
        // expires: expire,
    });
    res.status(200).send(
        {
            ok: true,
            accessToken,
        }
    );
});

const auth = (req, res, next) => {
    // 인증 완료
    try {
        // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰을 req.decoded에 반환
        req.decoded = jwt.verify(req.headers.authorization, process.env.EXPRESS_SECRET);
        return next();
    }
    // 인증 실패
    catch (error) {
        // 유효시간이 초과된 경우
        if (error.name === 'TokenExpiredError') {
            if(token.verifyRefresh(req.cookies.refreshtoken)){//refresh토큰이 유효한 경우
                return next();
            }else{  //
                return res.status(419).json({
                    code: 419,
                    message: '토큰이 만료되었습니다. 다시 로그인 해주세요',
                    ok: false,
                });
            }

            
        }
        // 토큰의 비밀키가 일치하지 않는 경우
        if (error.name === 'JsonWebTokenError') {
            if(token.verifyRefresh(req.cookies.refreshtoken)){//refresh토큰이 유효한 경우
                return next();
            }else{  //
                return res.status(401).json({
                    code: 401,
                    message: '유효하지 않은 토큰입니다. 다시 로그인 해주세요',
                    ok: false,
                });
            }
            
        }
    }
}

app.get('/user/:id',auth, async (req, res)=>{
    const id = req.params.id;
    const user = users.find(user => user.id === id);
    if(!user){
        res.send({
            ok: false,
            msg: "해당 유저가 없습니다"
        });
        return;
    }

    const accessToken = createToken(user);
    res.send(
        {
            ok: true,
            accessToken
        }
    );
});

app.get('/logout', (req, res)=>{
    res.cookie("refreshtoken", "",{
        httpOnly: true,
    });
    res.send("logout!");
})

app.post('/TestNewArticle',async (req,res)=>{
    // const msg = await insertArticle(req.body.title, req.body.content, req.body.category);
    console.log(req.body.content);
    // res.send(msg);
 });

app.listen(3001, function(){
    console.log("start!!");
    connectDB();

   
});

