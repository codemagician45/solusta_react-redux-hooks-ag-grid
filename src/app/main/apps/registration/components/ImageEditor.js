import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';

import {Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";

import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';


const icona = require("tui-image-editor/dist/svg/icon-a.svg");
const iconb = require("tui-image-editor/dist/svg/icon-b.svg");
const iconc = require("tui-image-editor/dist/svg/icon-c.svg");
const icond = require("tui-image-editor/dist/svg/icon-d.svg");

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

const useStyles = makeStyles(theme => ({
  save_div: {
    display:'flex',
    justifyContent:'flex-end'
  },
}));

function PhotoEditor(props) {
  // console.log("single data for updating",props)
  const dispatch = useDispatch();
  const [image, setImage] = useState(props.image);
  const [data,setData] = useState(props.requestData);
  const [rect, setRect] = useState(null);
  const imageEditor = React.createRef();
  const classes = useStyles();

  useEffect(() => {
    setImage(props.image);
  }, [props.image]);

  useEffect(() => {
    setData(props.requestData);
  }, [props.requestData]);

  useEffect(() => {
    props.onCrop(image);
  }, [props, image]);

  const saveImageToDisk = () => {
    const { imageEditorInst } = imageEditor.current;
    const data = imageEditorInst.toDataURL();
    setImage(data);

    const requestData = props.requestData;
    requestData['mainPhoto'] = data.split(',')[1];
    requestData['mainPhotoContentType'] = data.slice(5, 14);
    // console.log(data.slice(5, 14));
    dispatch(Actions.setImage(requestData));
  };

  // const setCropImage = (e) => {
  //   const cropRect = {
  //     left: e.left,
  //     top: e.top,
  //     width: e.width,
  //     height: e.height,
  //   };
  //   setRect(cropRect);
  // }
  
   return (
      <React.Fragment>
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
              height: `calc(100vh - 300px)`,
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
        <div className={classes.save_div}>
          <Button variant="contained" color="secondary" onClick={saveImageToDisk}>Save Cropped Result</Button>
        </div>
      </React.Fragment>
    );
  }

  export default withReducer('registerApp', reducer)(PhotoEditor);
  