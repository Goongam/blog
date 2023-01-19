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
import { useUser } from "./hooks/useUser";
import NewArticleForm from "./NewArticleForm";

function NewArticle(){

    const [title,setTitle] =  useState("");
    const [content, setContent] = useState("");
    const [selectedCate, setSelectedCate] = useState("");

    const createArticle = useNewArticle(title, content, selectedCate);

    const submit = async ()=>{
      createArticle.mutate();
    }

    useUser();

    return (
        <NewArticleForm 
          setTitle = {setTitle}
          title = {title}
          setContent = {setContent}
          content = {content}
          selectedCate = {selectedCate}
          setSelectedCate = {setSelectedCate}
          buttonAction = {submit}>
        </NewArticleForm>
    );
}

// const InputTitleMemo = memo(InputTitle);
// function InputTitle({setTitle, title, isTitleError,setisTitleError}){
//   console.log('t render')
//   return (<>
//     <TextField error={isTitleError} value={title} onChange={(e)=>{setisTitleError(false); setTitle(e.target.value)}} className="new_article_title"></TextField><br></br>
//   </>);
// }

// const InputContentMemo = memo(InputContent);
// function InputContent({setContent, content, isContentError, setIsContentError}){
//   console.log("content")
//   return (
//     <TextEditor isContentError={isContentError} setIsContentError={setIsContentError} contents={content} setContents={setContent}/>
//   );
// }

export default NewArticle;