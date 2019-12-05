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

    paper: {
        position: 'absolute',
        background: 'red'
    },

    modal_print: {
        position:'relative',
        display:'block',
        margin:'0',
        pageBreakerAfter: 'always',
    },
    nameStyle: {
        position: 'absolute',
        top: '57%',
        width:'100%',
        textAlign:'center',
        color: 'midnightblue',
        textTransform:'uppercase'
    },

    companyNameStyle: {
        position: 'absolute',
        top: '64%',
        width:'100%',
        textAlign:'center',
        textTransform:'uppercase'
    },

    photo: {
        position: 'absolute',
        left: '180px',
        width: '118px',
        height: '150px',
        right: '0',
        top: '55px'
    },

    backGround: {
        width: '100%'
    },

    photoImg: {
        width: '100%',
        margin:'auto'
    },

});

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
            friendlyIdArr: [],
        };
    }

    componentDidMount() {
        this.getFriendlyIdArr();
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.data !== this.state.data) {
            this.getFriendlyIdArr();
        }
    }

    getFriendlyIdArr = () => {
        const { data } = this.state;
        const promiseArr =  data.map((item, index) => {
            return this.getFriendlyId(item);
        });
        Promise.all(promiseArr).then(values => {
            let friendlyIdArr = [];
            values.map((item, index) => {
                friendlyIdArr.push({
                    fId: item,
                    id: data[index].id,
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
            axios.get(`https://stage02.solusta.me/api/badge-sas?attendeeSAId.equals=${item.id}`, body, header)
                .then((res) => {
                    console.log('here in friendlyID: ', res);
                    resolve(res.data[0].badgeFriendlyID);
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }

    render() {
        const { data, rows, friendlyIdArr } = this.state;
        const { classes } = this.props;
        console.log('here in print component: ', data);
        const displayData = data && data
                                .filter((item) => {
                                    return rows.some((row) => {
                                        return row.id === item.id;
                                    })
                                });

        return (
            <div className={classes.paper}>
                {displayData && displayData
                    .map((item, index) => {
                        const fId = friendlyIdArr.filter(fItem => fItem.id === item.id);
                        console.log('here inside the render: ', fId);
                        return (
                        <Box className="w-100 h-100" display="none" displayPrint="block" m={1} key={index.toString()}>
                            <div id="modal-print" className={classes.modal_print}>
                                <h1 className={classes.nameStyle}>{item.firstName + ' ' + item.lastName}</h1>
                                <h2 className={classes.companyNameStyle}>{item.companyName}</h2>
                                <h2 className={classes.friendly}>{fId[0].fId}</h2>
                                <ImagePart item={item} />
                                <div className={classes.photo}>
                                    <img className={classes.photoImg} src={`data:${item.mainPhotoContentType};base64, ${item.mainPhoto}`} alt="badge"/>
                                </div>
                            </div>
                        </Box>
                )})}
            </div>
        );
    }
}

const StyledPrintComponent = withStyles(styles)(PrintComponent);

export default StyledPrintComponent;
