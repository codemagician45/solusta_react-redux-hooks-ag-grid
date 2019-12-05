import React, { useState, useEffect } from "react";
import withReducer from 'app/store/withReducer';
import {useDispatch, useSelector} from 'react-redux';
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import {Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

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
const useStyles = makeStyles(theme => ({
  save_div: {
    display:'flex',
    justifyContent:'flex-end'
  },
  // sav_btn: {
  //   margin:'auto'
  // }
}));

function HomePage(props) {
  const dispatch = useDispatch();
  const [image, setImage] = useState(props.image);
  const [rect, setRect] = useState(null);
  const imageEditor = React.createRef();
  const classes = useStyles();
  useEffect(() => {
    setImage(props.image);
  }, [props.image]);

  useEffect(() => {
    props.onCrop(image);
  }, [props, image]);

  const saveImageToDisk = () => {
    const { imageEditorInst } = imageEditor.current;
    const data = imageEditorInst.toDataURL();
    setImage(data);
    dispatch(Actions.setImage(data));
  };

  const setCropImage = (e) => {
    const cropRect = {
      left: e.left,
      top: e.top,
      width: e.width,
      height: e.height,
    };
    setRect(cropRect);
  }

    // console.log('here inside the image editor hook: ', image);

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

  export default withReducer('registerApp', reducer)(HomePage);
  