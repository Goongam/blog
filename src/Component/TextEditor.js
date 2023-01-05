import ReactQuill from "react-quill";
import { useState, useRef, useMemo, createElement } from "react";

import 'react-quill/dist/quill.snow.css';
// import './css/textEditor.css';
import { baseUrl } from "../constants";


function TextEditor({isContentError, setIsContentError, setContents, contents}){
    
    

    const QuillRef = useRef();
    // const [contents, setContents] = useState("");
    

    const handler = ()=>{
      const input = document.createElement("input");
      const formData = new FormData();
      let url = "";
  
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = async ()=>{

        const file = input.files;

        if (file !== null) {
            formData.append("image", file[0]);
            console.log(file[0]);  
        //   url = "http://localhost:3001/imgs";
       
            url = await fetch(`${baseUrl}/uploadImage`,{
                method: 'POST',
                body: formData,
            }).then((data)=>data.json())
            .then((json)=>json.imgURL);
            // console.log(url);


            const range = QuillRef.current?.getEditor().getSelection()?.index;
            if (range !== null && range !== undefined) {
                let quill = QuillRef.current?.getEditor();

                quill?.setSelection(range, 1);

                quill?.clipboard.dangerouslyPasteHTML(
                    range,
                    `<img src=${url} crossOrigin="" />`
                );
            }
            return ;
        }
      }

    }
    const modules = useMemo(
        () => ({
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ size: ["small", false, "large", "huge"] }, { color: [] }],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
                { align: [] },
              ],
              ["image", "video"],
            ],
            handlers: {
              image: handler,
            },
          },
        }),
        []
      );


  return (
        <ReactQuill
          ref={QuillRef}
          value={contents}
          onChange={(e)=>{setContents(e); setIsContentError(false);}}
          modules={modules}
          className={isContentError ? 'error' : null}
          theme="snow"
          placeholder="내용을 입력해주세요."/>
  );
}
export default TextEditor;