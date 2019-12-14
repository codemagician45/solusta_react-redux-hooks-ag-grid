import React, { useState, useEffect } from "react";

// import {Button} from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";

// import redux
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';

const icona = require("tui-image-editor/dist/svg/icon-a.svg");
const iconb = require("tui-image-editor/dist/svg/icon-b.svg");
const iconc = require("tui-image-editor/dist/svg/icon-c.svg");
const icond = require("tui-image-editor/dist/svg/icon-d.svg");
const ImageEditorTheme = {
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

const useStyles = makeStyles(theme => ({
  saveBtn: {
    width: '250px',
    marginLeft: 'auto',
  }
}));

// function PhotoEditor(props) {
const PhotoEditor = React.forwardRef(function(props, ref) {
  const imageEditor = React.createRef();
  const classes = useStyles();

  const [image, setImage] = useState(props.image)

  useEffect(() => {
    setImage(props.image);
  }, [props.image]);

  React.useImperativeHandle(ref, () => {
    return {
      saveCroppedImage : () => {
        const { imageEditorInst } = imageEditor.current;
        const data = imageEditorInst.toDataURL();
        // setImage(data);
        props.onCrop(data);
        }
    }
  });
  
  if (image) {
    return (
        <ImageEditor
          includeUI={{
            loadImage: {
              path: image,
              name: 'SampleImage'
            },
            theme: ImageEditorTheme,
            menu: ["crop", "flip", "rotate", "draw", "shape", "text", "filter"],
            initMenu: "",
            uiSize: {
              height: `calc(100vh - 130px)`,
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
    );
  } else {
    return (
      <React.Fragment>
        Image Loading Failed
      </React.Fragment>
    )
  }
});
export default PhotoEditor;
// export default withReducer('registerApp', reducer)(PhotoEditor);
