import React, { useState, useEffect } from 'react';

import { Button, Grid, Box } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import BG1 from '../assets/images/bg-1.jpg';
import BG2 from '../assets/images/bg-2.jpg';
import BG3 from '../assets/images/bg-3.jpg';
import BG4 from '../assets/images/bg-4.jpg';
import BG5 from '../assets/images/bg-5.jpg';
import BG6 from '../assets/images/bg-6.jpg';
import BG7 from '../assets/images/bg-7.jpg';

const styles = (theme) => ({
    modal_print: {
        position:'relative',
        display:'flex',
        margin:'10px',
    },
    nameStyle: {
        position: 'absolute',
        top: '57%',
        width:'100%',
        textAlign:'center',
        color: 'midnightblue',
    },

    companyNameStyle: {
        position: 'absolute',
        top: '64%',
        width:'100%',
        textAlign:'center',
    },

    paper: {
        position: 'absolute',
        width: 400,
        height:'50%',
    },

    photo: {
        position: 'absolute',
        left: '62%',
        width: '120px',
        height: '180px',
        right: '0',
        top: '15%',
        display:'flex'
    },

    backGround: {
        width: '100%'
    },

    photoImg: {
        width: '100%',
        margin:'auto'
    },
})

const ImagePart = ({ item }) => {
    switch (item.attendeeCategorySAS[0].categoryName) {
        case "Speaker": {
            return (
                <img src={BG3} alt="background"/>
            )
        }
        case "Organizer": {
            return (
                <img src={BG5} alt="background"/>
            )
        }
        case "Participant": {
            return (
                <img src={BG1} alt="background"/>
            )
        }
        case "Event Crew" : {
            return (
                <img src={BG6} alt="background"/>
            )
        }
        case "Media": {
            return (
                <img src={BG2} alt="background"/>
            )
        }
        case "Security": {
            return (
                <img src={BG4} alt="background"/>
            )
        }
        case "Contractor": {
            return (
                <img src={BG7} alt="background"/>
            )
        }
        default: {
            return;
        }
    }
}

class PrintComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : props.data,
            rows: props.rows,
        };
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if ((nextProps.data !== prevState.data) || (nextProps.rows !== prevState.rows)) {
            return {
                data: nextProps.data,
                rows: nextProps.rows,
            }
        } else {
            return null;
        }
    }

    render() {
        const { data, rows } = this.state;
        const { classes } = this.props;
        console.log("printdata",rows)
        return (
            <div className={classes.paper}> 
                {data && data
                    .filter((item) => {
                        return rows.some((row) => {
                            return row.id === item.id;
                        })
                    })
                    .map((item, index) => ( 
                        <Box className="w-100 h-100" display="none" displayPrint="block" m={1} key={index.toString()}>
                            <div id="modal-print" className={classes.modal_print}>
                                <h1 className={classes.nameStyle}>{item.firstName + ' ' + item.lastName}</h1>
                                <h2 className={classes.companyNameStyle}>{item.companyName}</h2>
                                <ImagePart item={item} />
                                <div className={classes.photo}>
                                    <img className={classes.photoImg} src={`data:${item.mainPhotoContentType};base64, ${item.mainPhoto}`} alt="badge"/>
                                </div>
                            </div>   
                        </Box>
                ))}
            </div>
        );
    }
}

const StyledPrintComponent = withStyles(styles)(PrintComponent);

export default StyledPrintComponent;
