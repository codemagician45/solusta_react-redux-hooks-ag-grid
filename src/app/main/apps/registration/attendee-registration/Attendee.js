import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ReactToPrint from 'react-to-print'; // for Print React component

// import @material-ui
import {
	Button, Grid, TextField,
	AppBar, Tabs, Tab,
	Typography, Box, FormControl,
	InputLabel, Select, MenuItem,
	Icon, IconButton, LinearProgress
} from '@material-ui/core';
import {
	KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

// import redux
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

// import utils
import * as Utils from '../../../../utils';

// import components
import AttendeePrintComponent from './AttendeePrintComponent';

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
		textAlign: "right",
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
		width: '200px',
		marginRight: theme.spacing(2),
		padding: theme.spacing(1),
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
	const [category, setCategory] = useState({});
	const [savingAttendee, setSavingAttendee] = useState(false);

	const printRef = useRef();
	const classes = useStyles();
	const dispatch = useDispatch();
	const categories = useSelector(({ registration }) => registration.attendee.categories);
	const loading = useSelector(({ registration }) => registration.attendee.loading);
	let searchKey = (props.match.path).split('/')[4];

	useEffect(() => {
		if (categories.length > 0) {
			let key = searchKey === 'event-crew' ? 'event crew' : searchKey;
			const tmp = categories.filter(item => {
				return item.categoryName.toUpperCase() === key.toUpperCase();
			});
			setCategory(tmp);
		}
	}, [props, categories, searchKey]);

	useEffect(() => {
		setSavingAttendee(loading);
	}, [loading])

	const selectImg = (e) => {
		if (e.target.files[0]) {
			setProfile(e.target.files[0]);
		}
	};

	const onSaveAttendee = async () => {
		if (firstName && lastName && companyName) {
			if (tabIndex === 0) {
				if (qId) {
					setError(false);

					const mainPhoto = profile && await Utils.toBase64(profile);
					const data = {
						firstName: firstName,
						lastName: lastName,
						gender: (gender === 1) ? 'MALE' : 'FEMALE',
						phone: phoneNum,
						email: email,
						companyName: companyName,
						attendeeCategorySAS: category,
						mainPhoto: mainPhoto ? mainPhoto.split(',')[1] : null,
						mainPhotoContentType: profile ? profile.type : null,
					};

					dispatch(Actions.saveAttendee());

					Utils.xapi().post(`/attendee-sas`, data)
						.then(response => {
							dispatch(Actions.saveAttendeeSuccess(response.data));
							props.history.goBack();
						})
						.catch(error => {
							dispatch(Actions.saveAttendeeFail());
							props.history.goBack();
						});
				} else {
					setError(true);
				}
			} else {
				if (passportNum && nationality) {
					setError(false);

					const mainPhoto = profile && await Utils.toBase64(profile);
					const data = {
						firstName: firstName,
						lastName: lastName,
						gender: (gender === 1) ? 'MALE' : 'FEMALE',
						phone: phoneNum,
						email: email,
						companyName: companyName,
						attendeeCategorySAS: category,
						mainPhoto: mainPhoto ? mainPhoto.split(',')[1] : null,
						mainPhotoContentType: profile ? profile.type : null,
					};

					dispatch(Actions.saveAttendee(data));

					Utils.xapi().post(`/api/attendee-sas`, data)
						.then(response => {
							dispatch(Actions.saveAttendeeSuccess(response.data));
							props.history.goBack();
						})
						.catch(error => {
							dispatch(Actions.saveAttendeeFail());
							props.history.goBack();
						});
				} else {
					setError(true);
				}
			}
		} else {
			setError(true);
		}
	};

	const onSaveAndPrint = () => {
		onSaveAttendee.call()
			.then(()=> {
			//console.log("saved ")
		}).catch(()=>{
			console.error("something wrong")
		});

	};

	const onCancel = () => {
		props.history.goBack();
	}

	return (
		<React.Fragment>
			<div className={classes.root}>
				{savingAttendee && (
					<div className={classes.linearProgress}>
						<LinearProgress />
					</div>
				)}
				<AttendeePrintComponent
					firstName={firstName}
					lastName={lastName}
					companyName={companyName}
					profile={profile}
					categoryName={searchKey}
					ref={printRef}
				/>
				<Grid container spacing={0} className={classes.container}>
					<Grid item xs={3} md={3} className="relative">
						<Grid container spacing={0} className={classes.profileItem}>
							<Grid item xs={12} md={12} className={classes.imageItem}>
								<div className="relative">
									<img src={(profile && URL.createObjectURL(profile)) || 'assets/images/avatars/profile.jpg'} className={classes.img} alt="note" />
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
										error={error && !qId && (tabIndex === 0)}
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
										error={error && !passportNum && (tabIndex === 1)}
										margin="normal"
									/>
								</Grid>
								<Grid item xs={12} md={6} className={classes.item}>
									<KeyboardDatePicker
										margin="normal"
										id="date-picker-dialog"
										label="Expiry Date *"
										format="MM-DD-YYYY"
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
										error={error && !nationality && (tabIndex === 1)}
										margin="normal"
									/>
								</Grid>
								<Grid item xs={12} md={6} className={classes.item}>
									<KeyboardDatePicker
										margin="normal"
										id="date-picker-dialog"
										label="Date of Birth *"
										format="MM-DD-YYYY"
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
						<Button variant="contained" color="primary" onClick={onSaveAttendee} className={classes.button}>
							Save
            </Button>
						<ReactToPrint
							trigger={() => <Button color="secondary" className={classes.button} variant="contained">Save &amp; Print</Button>}
							content={() => printRef.current}
							onBeforePrint = {() => onSaveAndPrint()}
						/>
						<Button variant="contained" color="default" onClick={onCancel} className={classes.button}>
							Cancel
            </Button>
					</Grid>
				</Grid>
			</div>
		</React.Fragment>
	);
}

export default withReducer('registration', reducer)(NewCategory);
