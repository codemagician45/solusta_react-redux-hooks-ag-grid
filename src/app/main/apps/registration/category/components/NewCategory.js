import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

// import @material-ui
import { 
    Button, Grid, TextField,
    AppBar, Tabs, Tab,
    Typography, Box, FormControl,
    InputLabel, Select, MenuItem,
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
        width: '400px',
    },

    select: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        textAlign: 'left',
        width: '400px'
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

const validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

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
    const [error, setError] = useState(false);

    const classes = useStyles();
    const dispatch = useDispatch();
    const categories = useSelector(({registration}) => registration.category.categories);
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

    const saveAttendee = () => {
        console.log('here in save attendee submit');
        if (firstName && lastName && email && validateEmail(email) && phoneNum && companyName && gender && qId && passportNum && nationality) {
            setError(false);
            const data = {
                firstName: firstName,
                lastName: lastName,
                gender: (gender === 1) ? 'MALE' : 'FEMALE',
                phone: phoneNum,
                email: email,
                companyName: companyName,
                attendeeCategorySAS: categoryInFo
            };
            
            dispatch(Actions.saveAttendee(data));
        } else {
            setError(true);
        }
    };
    // console.log('here inside the New Category: ', categories, categoryInFo);
    return(
        <React.Fragment>
            <div className={classes.root}>
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
                            <Grid container spacing={0} className={classes.container}>
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
                            <Grid container spacing={0} className={classes.container}>
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
