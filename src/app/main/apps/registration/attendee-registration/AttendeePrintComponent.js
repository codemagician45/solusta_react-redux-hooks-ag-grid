import React from 'react';

// import @material-ui components
import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// import Utils
import * as Utils from '../../../../utils'

// import assets
import BG1 from '../assets/images/bg-1.jpg';
import BG2 from '../assets/images/bg-2.jpg';
import BG3 from '../assets/images/bg-3.jpg';
import BG4 from '../assets/images/bg-4.jpg';
import BG5 from '../assets/images/bg-5.jpg';
import BG6 from '../assets/images/bg-6.jpg';
import BG7 from '../assets/images/bg-7.jpg';

const styles = (theme) => ({
  paper: {
    position: 'absolute',
    margin: '0',
    padding: '0'
  },
  outerBox: {
    margin: '0 auto'
  },
  modal_print: {
    position: 'relative',
    display: 'block',
    margin: '0',
    padding: '0',
    width: '90mm',
    height: '140mm',
    pageBreakerAfter: 'always'
  },
  photoContainer: {
    position: 'absolute',
    left: '50mm',
    width: '34mm',
    height: '44mm',
    right: '0',
    top: '17mm',
    overflow: 'hidden'
  },
  backGround: {
    width: '100%',
    height: '100%'
  },
  photoImg: {
    position: 'relative',
    margin: '0 auto',
  },
  friendly: {
    fontFamily: '"Times New Roman", Times, serif',
    position: 'absolute',
    left: '44mm',
    top: '62mm',
    right: '0',
    fontSize: '22px',
    textAlign: 'center',
    color: '#4d4d4d'
  },
  nameStyle: {
    fontFamily: '"Times New Roman", Times, serif',
    position: 'absolute',
    paddingLeft: '2mm',
    paddingRight: '2mm',
    top: '78mm',
    width: '90mm',
    textAlign: 'center',
    color: '#174883',
    whiteSpace: 'nowrap',
  },
  companyNameStyle: {
    fontFamily: '"Times New Roman", Times, serif',
    position: 'absolute',
    top: '88mm',
    width: '100%',
    textAlign: 'center',
    color: '#4d4d4d'
  },
});

const ImagePart = ({ categoryName }) => {
  switch (categoryName.toUpperCase()) {
    case "SPEAKER": {
      return (
        <img src={BG3} alt="background" />
      );
    }
    case "ORGANIZER": {
      return (
        <img src={BG5} alt="background" />
      );
    }
    case "PARTICIPANT": {
      return (
        <img src={BG1} alt="background" />
      );
    }
    case "EVENT CREW": {
      return (
        <img src={BG6} alt="background" />
      );
    }
    case "MEDIA": {
      return (
        <img src={BG2} alt="background" />
      );
    }
    case "SECURITY": {
      return (
        <img src={BG4} alt="background" />
      );
    }
    case "CONTRACTOR": {
      return (
        <img src={BG7} alt="background" />
      );
    }
    default: {
      return (
        <img src={BG7} alt="background" />
      );
    }
  }
}

class AttendeePrintComponent extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      mainPhoto: null,
      mainPhotoContentType: null,
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      let mainPhoto = this.props.profile && await Utils.toBase64(this.props.profile);
      this.setState({
        profile: this.props.profile,
        mainPhoto: mainPhoto ? mainPhoto.split(',')[1] : null,
        mainPhotoContentType: this.props.profile ? this.props.profile : null,
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.profile !== prevState.profile) {
      return {
        profile: nextProps.profile
      }
    } else {
      return null;
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this._isMounted) {
      if (prevState.profile !== this.state.profile) {
        let mainPhoto = await Utils.toBase64(this.state.profile);
        this.setState({
          mainPhoto: mainPhoto.split(',')[1],
          mainPhotoContentType: this.state.profile,
        });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { mainPhoto, mainPhotoContentType } = this.state;
    const { classes, firstName, lastName, companyName, categoryName } = this.props;

    return (
      <div className={classes.paper}>
        <Box className={classes.outerBox} display="none" displayPrint="block" m={1}>
          <div id="modal-print" className={classes.modal_print}>
            <h1 className={classes.nameStyle}>{firstName + ' ' + lastName}</h1>
            <h2 className={classes.companyNameStyle}>{companyName}</h2>
            <ImagePart categoryName={categoryName} />
            <div className={classes.photoContainer}>
              <img className={classes.photoImg} src={`data:${mainPhotoContentType};base64, ${mainPhoto}`} alt="badge" />
            </div>
          </div>
        </Box>
      </div>
    );
  }
}

const StyledAttendeePrintComponent = withStyles(styles)(AttendeePrintComponent);

export default StyledAttendeePrintComponent;
