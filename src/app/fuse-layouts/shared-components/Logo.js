import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root      : {
        '& .logo-icon'                : {
            width     : 24,
            height    : 24,
            transition: theme.transitions.create(['width', 'height'], {
                duration: theme.transitions.duration.shortest,
                easing  : theme.transitions.easing.easeInOut
            })
        },
        '& .react-badge, & .logo-text': {
            transition: theme.transitions.create('opacity', {
                duration: theme.transitions.duration.shortest,
                easing  : theme.transitions.easing.easeInOut
            })
        }
    },
    reactBadge: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        color          : '#61DAFB'
    }
}));

function Logo()
{
    const classes = useStyles();
    const logo_style = {
        width:'100%',
        marginTop:'12px'
        
    }
    return (
        <div className={clsx(classes.root, "flex items-center")}>
            <img className="logo-icon" style={logo_style} src="assets/images/logos/solusta_logo_NEW.svg" alt="logo"/>
        </div>
    );
}

export default Logo;
