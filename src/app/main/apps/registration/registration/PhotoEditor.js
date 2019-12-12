import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Button, Icon, Typography } from '@material-ui/core';
// import {Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";

import { Link } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';

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

  const [image, setImage] = useState(props.image)

  useEffect(() => {
    setImage(props.image);
  }, [props, props.attendee, props.attendeeId, props.image]);

  const saveCroppedImage = () => {
    const { imageEditorInst } = imageEditor.current;
    const data = imageEditorInst.toDataURL();
    setImage(data);
    props.onCrop(data);
  };

  console.log('here in photo editor component in true: ', image, props);
  if (image) {
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
  } else {
    return (
      <React.Fragment>
        <Button variant="contained" color="secondary" onClick={saveCroppedImage} className={classes.saveBtn}>Save Cropped Result</Button>
      </React.Fragment>
    )
  }
}

export default withReducer('registerApp', reducer)(PhotoEditor);
