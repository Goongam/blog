import { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
// import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function NewArticle({categoryList, addCategory}){

    const [title,setTitle] =  useState("");
    const [content, setContent] = useState("");
    const [selectedCate, setSelectedCate] = useState("");
  //   const [dialogopen, setDialogOpen] = useState(false);
  //   const [inputCategory, setinputCategory] = useState('');

  //   function handleClose(){
  //     setDialogOpen(false);
  //   }
  //   function DialogAdd(e){
  //     if(inputCategory !== "") addCategory(inputCategory);
  //     setDialogOpen(false);
  //   }
  //  function handleClickOpen(){
  //     setDialogOpen(true);
  //   }
    // useEffect(()=>{
    //   async function getCategory(){
    //     const categoryList = await (await fetch("http://localhost:3001/GetCategoryList")).json();
    //     setCategorys(categoryList);
    //   }
    //   getCategory();
    // },[]);

    async function send(){
        // console.log(title);
        // console.log(content);

       let json = await (await fetch("http://localhost:3001/NewArticle", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "title":title,
              "content":content,
              "category":selectedCate,
            }),
            
          })).json();

        console.log(json);
        // getArticles();
    }

    return (
        <>
            <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}></input><br></br>
            <textarea value={content} onChange={(e)=>{setContent(e.target.value)}}></textarea><br></br>
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
            <button onClick={send}>입력</button>
        </>
    );
}