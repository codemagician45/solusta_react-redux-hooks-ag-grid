import React, { useState, useEffect } from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import {Button} from '@material-ui/core';

const icona = require("tui-image-editor/dist/svg/icon-a.svg");
const iconb = require("tui-image-editor/dist/svg/icon-b.svg");
const iconc = require("tui-image-editor/dist/svg/icon-c.svg");
const icond = require("tui-image-editor/dist/svg/icon-d.svg");
// const download = require("downloadjs");

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
    const [image, setImage] = useState(props.image);
    const imageEditor = React.createRef();

    useEffect(() => {
      setImage(props.image);
    }, [props]);

    useEffect(() => {
      props.onCrop(image);
    }, [props, image]);

    const saveImageToDisk = () => {
      const { imageEditorInst } = imageEditor.current;
      const data = imageEditorInst.toDataURL();
      setImage(data);
    };

    console.log('here inside the image editor hook: ', image);

    return (
      <React.Fragment>
        <Button className='button' onClick={saveImageToDisk}>Save Image to Disk</Button>
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
      </React.Fragment>
    );
  }

  export default HomePage;
  