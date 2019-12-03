import React from 'react';
import PropTypes from 'prop-types';

// import @material-ui
import { 
    Button, Grid, TextField,
    AppBar, Tabs, Tab,
    Typography, Box 
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';

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

    tabItem: {
        textAlign: "center",
        paddingLeft: theme.spacing(7),
        paddingRight: theme.spacing(7),
        marginTop: theme.spacing(4),
    },

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '400px',
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

function NewCategory(props) {
    const [value, setValue] = React.useState(0);
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const classes = useStyles();
    const category = (props.match.path).split('/')[4];
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const handleDateChange = date => {
      setSelectedDate(date);
    };

    return(
        <React.Fragment>
            <div className={classes.root}>
                <Grid container spacing={0} className={classes.container}>
                    <Grid item xs={12} md={6} className={classes.item}>
                        <TextField
                            id="outlined-basic"
                            className={classes.textField}
                            label="First Name"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.item}>
                        <TextField
                            id="outlined-basic"
                            className={classes.textField}
                            label="Last Name"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.item}>
                        <TextField
                            id="outlined-basic"
                            className={classes.textField}
                            label="Email"
                            type="email"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.item}>
                        <TextField
                            id="outlined-basic"
                            className={classes.textField}
                            label="Phone No"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.item}>
                        <TextField
                            id="outlined-basic"
                            className={classes.textField}
                            label="Company Name"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.item}>
                        <TextField
                            id="outlined-basic"
                            className={classes.textField}
                            label="Gender"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.tabItem}>
                        <AppBar position="static">
                            <Tabs
                                variant="fullWidth"
                                value={value}
                                onChange={handleChange}
                                aria-label="nav tabs example"
                            >
                                <LinkTab label="Qatar National ID" {...a11yProps(0)} />
                                <LinkTab label="Passport" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            <Grid container spacing={0} className={classes.container}>
                                <Grid item xs={12} md={12} className={classes.item}>
                                    <TextField
                                        id="standard-basic"
                                        className={classes.textField}
                                        label="QID"
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Grid container spacing={0} className={classes.container}>
                                <Grid item xs={12} md={6} className={classes.item}>
                                    <TextField
                                        id="outlined-basic"
                                        className={classes.textField}
                                        label="Passport No"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.item}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM-DD-YYYY"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Expiry Date"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.item}>
                                    <TextField
                                        id="outlined-basic"
                                        className={classes.textField}
                                        label="Nationality"
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.item}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM-DD-YYYY"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Date of Birth"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}

export default NewCategory;
