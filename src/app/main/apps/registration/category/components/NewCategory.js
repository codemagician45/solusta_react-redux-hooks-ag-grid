import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

// import @material-ui
import {
    Button, Grid, TextField,
    AppBar, Tabs, Tab,
    Typography, Box, FormControl,
    InputLabel, Select, MenuItem,
    Icon, IconButton, CircularProgress, LinearProgress
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';

// import redux
import withReducer from 'app/store/withReducer';
import * as Actions from '../../store/actions';
import reducer from '../../store/reducers';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },

    container: {
        marginTop: theme.spacing(4),
    },

    item: {
        textAlign: 'center',
    },

    profileItem: {
        position: 'absolute',
        bottom: 0,
    },

    imageItem: {
        marginLeft: theme.spacing(6),
        textAlign: 'center',
        height: '100%',
    },

    selectItem: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
    },

    categoryGrid: {
        textAlign: "center",
        margin: theme.spacing(6),
        boxShadow: theme.shadows[1],
    },

    submitGrid: {
        textAlign: "center",
        marginTop: theme.spacing(4),
    },

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '300px',
    },

    select: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        textAlign: 'left',
        width: '300px'
    },

    button: {
        width: '400px',
    },

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

    imagePicker: {
        backgroundColor: '#55c39e',
    },

    img: {
        display: 'block',
        width: '100%',
        height: '220px',
    },

    linearProgress: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(1),
        },
    }
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="p"
            {...props}
        />
    );
}

// validate Email
const validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Convert image file content to base64
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function NewCategory(props) {
    const [tabIndex, setTabIndex] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [gender, setGender] = useState(1);
    const [qId, setQId] = useState('');
    const [passportNum, setPassportNum] = useState('');
    const [nationality, setNationality] = useState('');
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [birthDate, setBirthDate] = useState(new Date());
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    const classes = useStyles();
    const dispatch = useDispatch();
    const categories = useSelector(({registration}) => registration.category.categories);
    const attendee = useSelector(({registration}) => registration.category.attendee);
    const success = useSelector(({registration}) => registration.category.success);
    const loading = useSelector(({registration}) => registration.category.loading);
    const fail = useSelector(({registration}) => registration.category.fail);
    let category = (props.match.path).split('/')[4];

    useEffect(() => {
        dispatch(Actions.getCategory());
    }, [dispatch]);

    const categoryInFo = categories && categories.filter((item) => {
        if (category === 'event-crew') {
            category = 'Event Crew';
        }
        return (item.categoryName).toUpperCase() === category.toUpperCase();
    });

    const selectImg = (e) => {
        if (e.target.files[0]) {
            setProfile(e.target.files[0]);
        }
    };

    const saveAttendee = async () => {
        if (firstName && lastName && email && validateEmail(email) && phoneNum && companyName && gender && (qId || (passportNum && nationality))) {
            if (tabIndex === 0) {
                if (qId) {
                    setError(false);

                    const mainPhoto = profile && await toBase64(profile);
                    const data = {
                        firstName: firstName,
                        lastName: lastName,
                        gender: (gender === 1) ? 'MALE' : 'FEMALE',
                        phone: phoneNum,
                        email: email,
                        companyName: companyName,
                        attendeeCategorySAS: categoryInFo,
                        mainPhoto: mainPhoto ? mainPhoto.split(',')[1] : null,
                        mainPhotoContentType: profile ? profile.type : null,
                    };
                    const header = {
                        headers: {
                            'content-type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
                        }
                    };
                    dispatch(Actions.saveAttendee());
                    axios.post('http://dee-mac.local:8088/api/attendee-sas', data, header)
                        .then(response => {
                            console.log('here save attendee response: ', response);
                            dispatch(Actions.saveAttendeeSuccess(response.data));
                            props.history.push('/app/registration/category');
                        })
                        .catch(error => {
                            dispatch(Actions.saveAttendeeFail());
                        });

                } else {
                    setError(true);
                }
            } else {
                if (passportNum && nationality) {
                    setError(false);

                    const mainPhoto = profile && await toBase64(profile);
                    const data = {
                        firstName: firstName,
                        lastName: lastName,
                        gender: (gender === 1) ? 'MALE' : 'FEMALE',
                        phone: phoneNum,
                        email: email,
                        companyName: companyName,
                        attendeeCategorySAS: categoryInFo,
                        mainPhoto: mainPhoto ? mainPhoto.split(',')[1] : null,
                        mainPhotoContentType: profile ? profile.type : null,
                    };
                    dispatch(Actions.saveAttendee(data));
                } else {
                    setError(true);
                }
            }
        } else {
            setError(true);
        }
    };
    // console.log('here inside the New Category: ', categories, categoryInFo, attendee);

    return(
        <React.Fragment>
            <div className={classes.root}>
                {loading && (
                    <div className={classes.linearProgress}>
                        <LinearProgress />
                    </div>
                )}
                <Grid container spacing={0} className={classes.container}>
                    <Grid item xs={3} md={3} className="relative">
                        <Grid container spacing={0} className={classes.profileItem}>
                            <Grid item xs={12} md={12} className={classes.imageItem}>
                                <div className="relative">
                                    <img src={(profile && URL.createObjectURL(profile)) || 'assets/images/avatars/profile.jpg'} className={classes.img} alt="note"/>
                                    {/* <Fab
                                        className="absolute right-0 bottom-0 m-8"
                                        variant="extended"
                                        size="small"
                                        color="secondary"
                                        aria-label="Delete Image"
                                        onClick={removeImage}
                                    >
                                        <Icon fontSize="small">delete</Icon>
                                    </Fab> */}
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12} className={classes.imageItem}>
                                <div className={classes.imagePicker}>
                                    <input
                                        accept="image/*"
                                        className="hidden"
                                        id="button-file"
                                        type="file"
                                        onChange={selectImg}
                                    />
                                    <label htmlFor="button-file">
                                        <IconButton className="w-32 h-32 mx-4 p-0" component="span">
                                            <Icon fontSize="small">image</Icon>
                                        </IconButton>
                                        Choose Image
                                    </label>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={9} md={9}>
                        <Grid container spacing={0} className={classes.container}>
                            <Grid item xs={12} md={6} className={classes.item}>
                                <TextField
                                    id="outlined-basic"
                                    className={classes.textField}
                                    label="First Name *"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    error={error && !firstName}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.item}>
                                <TextField
                                    id="outlined-basic *"
                                    className={classes.textField}
                                    label="Last Name *"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    error={error && !lastName}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.item}>
                                <TextField
                                    id="outlined-basic"
                                    className={classes.textField}
                                    label="Email *"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={error && (!email || !validateEmail(email))}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.item}>
                                <TextField
                                    id="outlined-basic"
                                    className={classes.textField}
                                    label="Phone No *"
                                    value={phoneNum}
                                    onChange={(e) => setPhoneNum(e.target.value)}
                                    error={error && !phoneNum}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.item}>
                                <TextField
                                    id="outlined-basic"
                                    className={classes.textField}
                                    label="Company Name *"
                                    value={companyName}
                                    onChange={e => setCompanyName(e.target.value)}
                                    error={error && !companyName}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.selectItem}>
                                <FormControl className={classes.select}>
                                    <InputLabel id="demo-simple-select-label">Gender *</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={gender}
                                        onChange={e => setGender(e.target.value)}
                                        error={error && !gender}
                                    >
                                        <MenuItem value={1}>Male</MenuItem>
                                        <MenuItem value={2}>Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.categoryGrid}>
                        <AppBar position="static">
                            <Tabs
                                variant="fullWidth"
                                value={tabIndex}
                                onChange={(e, newValue) => setTabIndex(newValue)}
                                aria-label="nav tabs example"
                            >
                                <LinkTab label="Qatar National ID" {...a11yProps(0)} />
                                <LinkTab label="Passport" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={tabIndex} index={0}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} md={12} className={classes.item}>
                                    <TextField
                                        id="standard-basic"
                                        className={classes.textField}
                                        label="QID *"
                                        value={qId}
                                        onChange={e => setQId(e.target.value)}
                                        error={error && !qId}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={tabIndex} index={1}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} md={6} className={classes.item}>
                                    <TextField
                                        id="standard-basic"
                                        className={classes.textField}
                                        label="Passport No *"
                                        value={passportNum}
                                        onChange={(e) => setPassportNum(e.target.value)}
                                        error={error && !passportNum}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.item}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM-DD-YYYY"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Expiry Date *"
                                        value={expiryDate}
                                        onChange={(date) => setExpiryDate(date)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.item}>
                                    <TextField
                                        id="standard-basic"
                                        className={classes.textField}
                                        label="Nationality *"
                                        value={nationality}
                                        onChange={e => setNationality(e.target.value)}
                                        error={error && !nationality}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.item}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM-DD-YYYY"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Date of Birth *"
                                        value={birthDate}
                                        onChange={(date) => setBirthDate(date)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.submitGrid}>
                        <Button variant="contained" color="secondary" onClick={saveAttendee} className={classes.button}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}

export default withReducer('registration', reducer)(NewCategory);
