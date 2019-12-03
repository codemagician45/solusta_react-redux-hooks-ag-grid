import React from 'react';
import { withRouter } from 'react-router-dom';

// import @material-ui
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
}));

function Category(props) {
    const classes = useStyles();

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
        </React.Fragment>
    );
}

export default withRouter(Category);
