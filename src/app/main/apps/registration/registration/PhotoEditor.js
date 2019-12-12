import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import { Button, Icon, Typography } from '@material-ui/core';
// import {Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";

import { Link } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';

// import env server link
const environment = require('../RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

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

function PhotoEditor(props) {
  const imageEditor = React.createRef();
  const classes = useStyles();

  const [image, setImage] = useState(`data:${props.attendee && props.attendee.mainPhotoContentType};base64, ${props.attendee && props.attendee.mainPhoto}`)

  useEffect(() => {
    const attendeeImg = `data:${props.attendee && props.attendee.mainPhotoContentType};base64, ${props.attendee && props.attendee.mainPhoto}`;
    setImage(attendeeImg);
  }, [props, props.attendee]);

  const saveCroppedImage = () => {
    const { imageEditorInst } = imageEditor.current;
    const data = imageEditorInst.toDataURL();
    setImage(data);
  };
  
  // const test = 'data:null;base64,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'
  // console.log(test)
  console.log("photoImage",image);

  return (
    <React.Fragment>
      <Button variant="contained" color="secondary" onClick={saveCroppedImage} className={classes.saveBtn}>Save Cropped Result</Button>
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
            height: `calc(100vh - 20px)`,
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

export default withReducer('registerApp', reducer)(PhotoEditor);
