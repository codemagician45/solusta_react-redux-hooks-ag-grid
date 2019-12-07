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
  const [image, setImage] = useState(null);
  const attendees = useSelector(({registerApp}) => registerApp.registration.attendees);
  const imageEditor = React.createRef();
  const attendeeId = props.match.params.id;
  const classes = useStyles();

  useEffect(() => {
    const attendee = attendees.find(item => item.id === parseInt(attendeeId));
    const attendeeImg = `data:${attendee.mainPhotoContentType};base64, ${attendee && attendee.mainPhoto}`
    setImage(attendeeImg);
  }, [attendees, attendeeId]);

  const saveCroppedImage = () => {
    const { imageEditorInst } = imageEditor.current;
    const data = imageEditorInst.toDataURL();
    setImage(data);
    
    // const requestData = props.requestData;
    // requestData['mainPhoto'] = data.split(',')[1];
    // requestData['mainPhotoContentType'] = data.slice(5, 14);
    // const header = {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
    //   }
    // };
    // const body = {
    //   ...requestData,
    // };
    // axios.put(`${SERVER_LINK}/api/attendee-sas`, body, header)
    //   .then(res => console.log('here in crop image action: ', res.data));
  };

	console.log('here in photo editor component: ', attendees, attendeeId);  
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
