import { useEffect, useState, memo } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useMutation } from "react-query";
// import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

function NewArticle({categoryList}){

    const [title,setTitle] =  useState("");
    const [content, setContent] = useState("");
    const [selectedCate, setSelectedCate] = useState("");

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
      onSuccess: ()=>{console.log("생성성공")},
      onError: ()=>{console.log('삭제실패')}
    })


    return (
        <>
            {/*Memo를 사용한 input rerender방지*/}
            {/* <input type="text" onChange={(e)=>{setTitle(e.target.value)}}></input><br></br> */}
            {/* <textarea value={content} onChange={(e)=>{setContent(e.target.value)}}></textarea><br></br> */}
            <InputTitleMemo setTitle={setTitle} title={title} />
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
                  categoryList.map( (category,index)=>
                    <MenuItem key={index} value={category.CATEGORY}>{category.CATEGORY}</MenuItem>)
                }

              </Select>
            </FormControl>
            <button onClick={createArticle.mutate}>입력</button>
        </>
    );
}

const InputTitleMemo = memo(InputTitle);
function InputTitle({setTitle, title}){
  console.log('t render')
  return (<>
    <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}></input><br></br>
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