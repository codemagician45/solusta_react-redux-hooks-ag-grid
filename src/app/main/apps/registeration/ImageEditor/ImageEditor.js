import React, { useState, useEffect } from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import {Button} from '@material-ui/core';
const icona = require("tui-image-editor/dist/svg/icon-a.svg");
const iconb = require("tui-image-editor/dist/svg/icon-b.svg");
const iconc = require("tui-image-editor/dist/svg/icon-c.svg");
const icond = require("tui-image-editor/dist/svg/icon-d.svg");
const download = require("downloadjs");
const myTheme = {
  "menu.backgroundColor": "white",
  "common.backgroundColor": "#151515",
  "downloadButton.backgroundColor": "white",
  "downloadButton.borderColor": "white",
  "downloadButton.color": "black",
  "menu.normalIcon.path": icond,
  "menu.activeIcon.path": iconb,
  "menu.disabledIcon.path": icona,
  "menu.hoverIcon.path": iconc,
};

function HomePage(props) {
    const [imageSrc, setImageSrc] = useState("");
    const [imageInst, setImageInst] = useState(null);
    const [image, setImage] = useState(props.image);
    const imageEditor = React.createRef();
    
    // const imageEditor = React.createRef();
    
    // console.log("ImageEditor",imageEditor);
    // const imageEditorInst = imageEditor && imageEditor.current && imageEditor.current.imageEditorInst;
    // const data = imageEditorInst && imageEditorInst.toDataURL();
    // console.log("data",data)

    useEffect(() => {
      setImageInst(imageEditor.current.imageEditorInst || null);
    }, [imageEditor.current]);

    console.log('here crop data: ', imageInst && imageInst.toDataURL());

    // const saveImageToDisk = () => {
    //   const imageEditorInst = imageEditor.current.imageEditorInst;
    //   console.log("imageEditorInst",imageEditorInst)
    //   const data = imageEditorInst.toDataURL();
    //   console.log("data",data)
    //   // if (data) {
    //   //   const mimeType = data.split(";")[0];
    //   //   const extension = data.split(";")[0].split("/")[1];
    //   //   download(data, `image.${extension}`, mimeType);
    //   // }
    // };

    return (
      <div className="home-page">
        <div className="center">
          {/* <Button className='button' onClick={saveImageToDisk}>Save Image to Disk</Button> */}
        </div>
        <ImageEditor
          includeUI={{
            loadImage: {
              path: image,
              name: 'SampleImage'
            },
            theme: myTheme,
            menu: ["crop", "flip", "rotate", "draw", "shape", "text", "filter"],
            initMenu: "",
            uiSize: {
              height: `calc(100vh - 260px)`,
            },
            menuBarPosition: "bottom",
          }}
          cssMaxHeight={window.innerHeight}
          cssMaxWidth={window.innerWidth}
          selectionStyle={{
            cornerSize: 20,
            rotatingPointOffset: 70,
          }}
          usageStatistics={true}
          ref={imageEditor}
        />
      </div>
    );
  }

  export default HomePage;
  