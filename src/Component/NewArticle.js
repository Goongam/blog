import { useState, memo } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import TextEditor from "./TextEditor";
import './css/NewArticle.css';
import { Button, Box } from "@mui/material";
// import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useNewArticle } from "./hooks/useNewArticle";
import { useCategoryList } from "./hooks/useCategoryList";

function NewArticle(){

    const [title,setTitle] =  useState("");
    const [content, setContent] = useState("");
    const [selectedCate, setSelectedCate] = useState("");
    const [isTitleError, setIsTitleError] = useState(false);
    const [isContentError, setIsContentError] = useState(false);

    const createArticle = useNewArticle(title, content, selectedCate);
    const { data: categoryList } = useCategoryList();

    const submit = async ()=>{
      // if(selectedCate === ''){setcategoryBorderColor('red'); return;}
      if(title === '') {
        setIsTitleError(true);
        return;
      }
      if(content === ''){
        setIsContentError(true);
        return;
      }
      
      createArticle.mutate();
    }

    return (
        <>
            {/*Memo를 사용한 input rerender방지*/}
            {/* <input type="text" onChange={(e)=>{setTitle(e.target.value)}}></input><br></br> */}
            {/* <textarea value={content} onChange={(e)=>{setContent(e.target.value)}}></textarea><br></br> */}
            <InputTitleMemo setTitle={setTitle} title={title} isTitleError={isTitleError} setisTitleError={setIsTitleError} sx={{mb:1}} />
            <InputContentMemo setContent={setContent} content={content} isContentError={isContentError} setIsContentError={setIsContentError}/>
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
            <Box display="flex" sx={{mt:2}}>
              <Button variant="contained" onClick={submit} sx={{ml:'auto'}}>작성</Button>
            </Box>
        </>
    );
}

const InputTitleMemo = memo(InputTitle);
function InputTitle({setTitle, title, isTitleError,setisTitleError}){
  console.log('t render')
  return (<>
    <TextField error={isTitleError} value={title} onChange={(e)=>{setisTitleError(false); setTitle(e.target.value)}} className="new_article_title"></TextField><br></br>
  </>);
}

const InputContentMemo = memo(InputContent);
function InputContent({setContent, content, isContentError, setIsContentError}){
  console.log("content")
  return (
    <TextEditor isContentError={isContentError} setIsContentError={setIsContentError} contents={content} setContents={setContent}/>
  );
}

export default NewArticle;