import { useEffect, useState, memo } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
// import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

function NewArticle({categoryList}){

    const Nevigate = useNavigate();

    const [title,setTitle] =  useState("");
    const [content, setContent] = useState("");
    const [selectedCate, setSelectedCate] = useState("");
    const [titleBorderColor, setTitleBorderColor] = useState('black');

    const createArticle = useMutation(async ()=> await (await fetch("http://localhost:3001/NewArticle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "title":title,
        "content":content,
        "category":selectedCate,
      }),
      
    })).json(),{
      onSuccess: (e)=>{
        console.log("생성성공");
        Nevigate(`/Article/${e.id}`);
      },
      onError: ()=>{console.log('생성실패')}
    })

    function submit(){
      if(title === '') setTitleBorderColor('red');
      else createArticle.mutate();
    }


    return (
        <>
            {/*Memo를 사용한 input rerender방지*/}
            {/* <input type="text" onChange={(e)=>{setTitle(e.target.value)}}></input><br></br> */}
            {/* <textarea value={content} onChange={(e)=>{setContent(e.target.value)}}></textarea><br></br> */}
            <InputTitleMemo setTitle={setTitle} title={title} titleBorderColor={titleBorderColor} setTitleBorderColor={setTitleBorderColor}/>
            <InputContentMemo setContent={setContent} content={content} />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCate}
                label="Age"
                onChange={(e)=>{setSelectedCate(e.target.value)}}
              >
                
                {
                  categoryList === undefined ? '' :
                  categoryList.map( (category,index)=>
                    <MenuItem key={index} value={category.CATEGORY}>{category.CATEGORY}</MenuItem>)
                }

              </Select>
            </FormControl>
            <button onClick={submit}>입력</button>
        </>
    );
}

const InputTitleMemo = memo(InputTitle);
function InputTitle({setTitle, title, titleBorderColor, setTitleBorderColor}){
  console.log('t render')
  return (<>
    <input style={{'borderColor': titleBorderColor}} type="text" value={title} onChange={(e)=>{setTitleBorderColor('black'); setTitle(e.target.value)}}></input><br></br>
  </>);
}

const InputContentMemo = memo(InputContent);
console.log('c redere');
function InputContent({setContent, content}){
  return (
    <>
      <textarea value={content} onChange={(e)=>{setContent(e.target.value)}}></textarea><br></br>
    </>
  );
}

export default NewArticle;