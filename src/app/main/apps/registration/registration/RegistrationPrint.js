import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import @material-ui components
import { Button, Grid, Box } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

// import assets
import BG1 from '../assets/images/bg-1.jpg';
import BG2 from '../assets/images/bg-2.jpg';
import BG3 from '../assets/images/bg-3.jpg';
import BG4 from '../assets/images/bg-4.jpg';
import BG5 from '../assets/images/bg-5.jpg';
import BG6 from '../assets/images/bg-6.jpg';
import BG7 from '../assets/images/bg-7.jpg';

// import env server link
const environment = require('../RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

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

const ImagePart = ({ item }) => {
    switch (item.attendeeCategorySAS[0] && item.attendeeCategorySAS[0].categoryName.toUpperCase()) {
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

class RegistrationPrint extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            attendees: props.attendees,
            rows: props.rows,
            displayData: [],
            friendlyIdArr: [],
        };
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            const { attendees, rows } = this.state;
            const displayData = attendees && rows && attendees
                .filter((item) => {
                    return rows.some((row) => {
                        return row.id === item.id;
                    })
                });
            this.setState({ displayData: displayData }, () => {
                this.getFriendlyIdArr();
            });
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if ((nextProps.attendees !== prevState.attendees) || (nextProps.rows !== prevState.rows)) {
            return {
                attendees: nextProps.attendees,
                rows: nextProps.rows,
            }
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this._isMounted) {
            if ((prevState.attendees !== this.state.attendees) || (prevState.rows !== this.state.rows)) {
                const { attendees, rows } = this.state;
                const displayData = attendees && attendees
                    .filter((item) => {
                        return rows.some((row) => {
                            return row.id === item.id;
                        })
                    });
                this.setState({ displayData: displayData }, () => {
                    this.getFriendlyIdArr();
                });
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getFriendlyIdArr = () => {
        const { displayData } = this.state;
        const promiseArr = displayData.map((item, index) => {
            return this.getFriendlyId(item);
        });
        Promise.all(promiseArr).then(values => {
            let friendlyIdArr = [];
            values.map((item, index) => {
                friendlyIdArr.push({
                    fId: item,
                    id: displayData[index].id,
                });
            })
            this.setState({ friendlyIdArr: friendlyIdArr });
        });
    }

    getFriendlyId = (item) => {
        return new Promise((resolve, reject) => {
            const header = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
                }
            };
            const body = {
                key: 'value',
            };
            axios.get(`${SERVER_LINK}/api/badge-sas?attendeeSAId.equals=${item.id}`, body, header)
                .then((res) => {
                    // console.log('here in friendlyID: ', res);
                    resolve((res.data && res.data.length > 0) ? res.data[0].badgeFriendlyID : 0);
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }

    render() {
        const { friendlyIdArr, displayData } = this.state;
        const { classes } = this.props;
        // console.log('print component selected row: ', this.state.rows)

        return (
            <div className={classes.paper}>
                {displayData && displayData
                    .map((item, index) => {
                        const fId = friendlyIdArr.filter(fItem => fItem.id === item.id);
                        return (
                            <Box className={classes.outerBox} display="none" displayPrint="block" m={1} key={index.toString()}>
                                <div id="modal-print" className={classes.modal_print}>
                                    <h1 className={classes.nameStyle}>{item.firstName + ' ' + item.lastName}</h1>
                                    <h2 className={classes.companyNameStyle}>{item.companyName}</h2>
                                    {(fId && fId[0]) && <h2 className={classes.friendly}>{fId[0].fId}</h2>}
                                    <ImagePart item={item} />
                                    <div className={classes.photoContainer}>
                                        <img className={classes.photoImg} src={`data:${item.mainPhotoContentType};base64, ${item.mainPhoto}`} alt="badge" />
                                    </div>
                                </div>
                            </Box>
                        )
                    })}
            </div>
        );
    }
}

const StyledRegistrationPrint = withStyles(styles)(RegistrationPrint);

export default StyledRegistrationPrint;
