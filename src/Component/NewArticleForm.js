import { memo, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import TextEditor from "./TextEditor";
import './css/NewArticle.css';
import { useCategoryList } from "./hooks/useCategoryList";
import { Button, Box } from "@mui/material";

const InputTitleMemo = memo(InputTitle);
function InputTitle({setTitle, title, isTitleError,setisTitleError}){

  return (<>
    <TextField error={isTitleError} value={title} onChange={(e)=>{setisTitleError(false); setTitle(e.target.value)}} className="new_article_title"></TextField><br></br>
  </>);
}

const InputContentMemo = memo(InputContent);
function InputContent({setContent, content, isContentError, setIsContentError}){

  return (
    <TextEditor isContentError={isContentError} setIsContentError={setIsContentError} contents={content} setContents={setContent}/>
  );
}



export default function NewArticleForm({setTitle, title, setContent, content, selectedCate, setSelectedCate, buttonAction}){
  const [isTitleError, setIsTitleError] = useState(false);
  const [isContentError, setIsContentError] = useState(false);

  const {data: categoryList} = useCategoryList();

  const onSubmit = ()=>{
    if(title === '') {
      setIsTitleError(true);
      return;
    }
    if(content === ''){
      setIsContentError(true);
      return;
    }
    buttonAction();
  }

  return (
    <>
        <InputTitle setTitle={setTitle} title={title} isTitleError={isTitleError} setisTitleError={setIsTitleError} sx={{mb:1}} />
        <InputContent setContent={setContent} content={content} isContentError={isContentError} setIsContentError={setIsContentError}/>
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
              <Button variant="contained" onClick={onSubmit} sx={{ml:'auto'}}>작성</Button>
        </Box>
    </>
);
}