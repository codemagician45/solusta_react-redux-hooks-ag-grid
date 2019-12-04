import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import @material-ui
import { Button, Grid, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import redux
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

// import components
import Notification from './components/Notification';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(4),
    },

    container: {
        marginTop: theme.spacing(12),
    },

    item: {
        textAlign: 'center'
    },

    button: {
        margin: theme.spacing(1),
        padding: theme.spacing(1.5),
        width: '400px',
        textDecoration: 'uppercase'
    },

    snackBar: {
        marginTop: '50px',
    }
}));

function Category(props) {
    const classes = useStyles();
    const savingSuccess = useSelector(({registration}) => registration.category.savingSuccess);
    const [openSnack, setOpenSnack] = useState(savingSuccess);

    useEffect(() => {
        setOpenSnack(savingSuccess);
    }, [savingSuccess]);

    const addSpeaker = () => {
        props.history.push('/app/registration/category/speaker');
    }

    const addOrganizer = () => {
        props.history.push('/app/registration/category/organizer');
    }

    const addParticipant = () => {
        props.history.push('/app/registration/category/participant');
    }

    const addEventCrew = () => {
        props.history.push('/app/registration/category/event-crew');
    }

    const addMedia = () => {
        props.history.push('/app/registration/category/media');
    }

    const addSecurity = () => {
        props.history.push('/app/registration/category/security');
    }

    const addContractor = () => {
        props.history.push('/app/registration/category/contractor');
    }

    const closeSnack = () => {
        setOpenSnack(false);
    };

    return(
        <React.Fragment>
            <div className={classes.root}>
                <Grid container spacing={3} className={classes.container}>
                    <Grid item xs={12} md={6} className={classes.item}>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={addSpeaker}>
                            Speaker
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.item}>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={addOrganizer}>
                            Organizer
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.item}>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={addParticipant}>
                            Participant
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.item}>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={addEventCrew}>
                            Event Crew
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.item}>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={addMedia}>
                            Media
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.item}>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={addSecurity}>
                            Security
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={12} className={classes.item}>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={addContractor}>
                            Contractor
                        </Button>
                    </Grid>
                </Grid>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={openSnack}
                autoHideDuration={4000}
                onClose={closeSnack}
                className={classes.snackBar}
            >
                <Notification
                    onClose={closeSnack}
                    variant="success"
                    message="Saving Attendee Success"
                />
            </Snackbar>
        </React.Fragment>
    );
}

export default withRouter(withReducer('registration', reducer)(Category));
