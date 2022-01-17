import React, { useEffect, useState, Fragment } from 'react';
//---v--- Material-ui Layout---v----------------------------------------------
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//---v--- Material-ui Select Section ---v-------------------------------------
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
//---v---Autocomplete feature---v---
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
//---v--- Custom Constants ---v-------------------------------------
import constants from './../../_constants/billConstants';
import Bill from './Bill';
import Info from './../_subcomponents/Info.js';
import SearchBillsModal from './../_subcomponents/SearchBillsModal.js'
import FilterBillsModal from './../_subcomponents/FilterBillsModal.js'
import FilterButton from './../_subcomponents/FilterButton.js';
import styles from './bills.module.css';

const mediaQueryBreakpoint = '1024';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
	root2:{
		margin:'10vw',
		marginTop:'5vw',
		marginBottom:'5vw',
	},
	billsContainer:{
		display:'flex',
		flexDirection:'column',
		gap:theme.spacing(0),
		[`@media (min-width: ${mediaQueryBreakpoint}px)`]:{
			flexDirection:'row',
			gap:theme.spacing(1),
		}
	},
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.primary,
      transition: ['height','2s'],
      minWidth:'192px',
    },
    searchTitle:{
      color: theme.palette.text.primary,
      fontSize: '20px',
	  textAlign:'center',
    },
	searchOptions:{
		alignSelf:'stretch',
		display:'grid',
		alignItems:'stretch',
		gap:theme.spacing(2),
	},
	searchBarContainer:{
		minWidth:'20vw',
	},
	searchBarPaper:{
		display:'flex',
		alignItems:'center',
		flexDirection:'column',
		justifyContent:'center',
		width:'100%',
		padding:theme.spacing(2),
		'@media (min-width: 1024px)':{
			paddingLeft:theme.spacing(5),
			paddingRight:theme.spacing(4),
			paddingBottom:theme.spacing(8),
			minWidth:186,
		}
	},
	responseArea:{
	},
    formControl:{
      flexDirection:'row',
      alignItems:'center',
	  color:theme.palette.text.primary,
    }, inputLabel:{
	  color:theme.palette.text.primary,
    },backdrop:{
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.text.primary,
    },selectEmpty:{
       width:'11em',
	   color:theme.palette.text.primary,
    },textSearch:{
      minWidth:'10em',
    }, clearButton:{
		padding:theme.spacing(2),
    }, sortingHelp:{
	   position:'absolute',
	   top:theme.spacing(92),
	   right:theme.spacing(3),
	   '@media (min-width: 1024px)':{
		   top:theme.spacing(10),
	   },
   },searchHelp:{
	   color:theme.palette.primary.dark,
	   position:'absolute',
	   top:theme.spacing(11),
	   left:theme.spacing(1),
   },flexCenter:{
	   marginRight:theme.spacing(2),
	   display:'flex',
	   justifyContent:'center',
	   alignItems:'center',
	   color: theme.palette.primary.main,
	   fontSize: '20px',
	   flexGrow:'0'
	},
    gridContainer:{
		display:'grid',
		gridTemplateColumns:[['[col1-start] 25% [col1-end col2-start] 25% [col2-end col3-start] 25% [col3-end col4-start] 25% [col4-end]']],
	},
    cell:{
		display:'flex',
		alignItems: 'center',
		justifyContent:'center',
		background:theme.palette.background.default,
		padding:2,
		borderBottom:[[1,'solid',theme.palette.background.paper]],
		'&:hover':{
			cursor: 'pointer',
			background:theme.palette.background.paper,
		}
  }
}));

const dblink = process.env.REACT_APP_BACKEND_LINK;
// const dblink = 'https://mgtmdym3uw.us-east-2.awsapprunner.com/';

const Bills = (props) => {
    const classes = useStyles();
  // STATE VARIABLES----------------------------------------------------------
    const [party, setParty] = useState('');
    const [state, setState] = useState('');
    const [fullName, setFullName] = useState('');
	const [fullNameList, setFullNameList] = useState([]);
	// const [searchOptionsList, setSearchOptionsList] = useState([]);
    const [originChamber, setOriginChamber] = useState('');
	const [session, setSession] = useState('');
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);
    const [billId, setBillId] = useState('');
	const [visibleBillCount, setVBC] = useState(1);
    const smallMedia = useMediaQuery(`@media (min-width: ${mediaQueryBreakpoint}px)`);
	function get(obj, key) {
        return key.split('.').reduce(function(o, x) {
            return (typeof o == 'undefined' || o === null) ? o : o[x];
        }, obj);
      }

    useEffect(() => {
        function allStates(){ return { 'party':party,'state':state,
            'fullName':fullName,'originChamber':originChamber
          };
        };
        const filterFun = () => {
          var template = allStates();
          let returnValue = {};
          for(var each in template){
            if(template[each]){
              returnValue[each] = template[each];
            }
          };
          if(returnValue){
            return returnValue
          }else{
            return null
          }
        };
        const filter = filterFun();

        const getAPI = async () => {
            if(filter){
              const response = await fetch(`${dblink}Bills/${JSON.stringify(filter)}`);
              const data = await response.json();
              try {
                   setLoading(false);
                   if(data.filteredCollection.length){
                      setTimeout(function(){
                        setResults(data.filteredCollection);
                      },195);
                   }else{
                     setResults([]);
                   }
              } catch (error) {
                  console.log('Error at UseEffect:')
                  console.log(error);
              }
            }
        };
        getAPI();
    }, [party,state,originChamber,fullName]);
	useEffect(()=>{
			const getFields = async () => {
				const response = await fetch(`${dblink}BillsInitial/`);
				const data = await response.json();
				try {
					// setSearchOptionsList(data.filteredCollection);
					let tempA = []
					data.filteredCollection.forEach((item) => {
						if(tempA.indexOf(get(item,'sponsors.item.fullName')) === -1){
							tempA = [...tempA,get(item,'sponsors.item.fullName')];
						}
					})
					if(tempA){setFullNameList(tempA)}
					else{setFullNameList([''])}
				} catch (error) {
					console.log('Error at UseEffect:')
					console.log(error);
				}
			};
			getFields();
	},[setFullNameList])

    const handleParty = (event) => {
        setParty(event.target.value);
     };
    const handleState = (event) => {
        setState(event.target.value);
     };
    const handleOriginChamber = (event) => {
        setOriginChamber(event.target.value);
     };
    const handleFullName = (event, newValue) => {
        if(newValue){
          setFullName(newValue);
		  }else{
			setFullName('');
		  }
     };
	 const handleSession = (event) => {
		setSession(event.target.value);
	 };
     const handleClose = () => {
       setOpen(false);
     };
     const handleToggle = (id) => {
       setBillId(id);
       setOpen(!open);
     };
     const getId = () => {
       return billId;
     };
	 const changeViewCount = (amount) => {
		 console.log(amount)
		 if(visibleBillCount+amount >= 1 && visibleBillCount+amount < results.length){
			 console.log(visibleBillCount+amount)
			setVBC(visibleBillCount+amount);
		}
	 }
	 // Modal states and methods---------------------------------------------------
 	const [modal, setModal] = useState(false);
 	const [activeModal, setActiveModal] = useState('');

 	const toggleModal = () => {
 	  setModal(!modal);
 	}
 	const updateModalContent = (component) => {
 	  setActiveModal(component);
 	}
 	const modals = {
 	  SearchBillsModal: SearchBillsModal(toggleModal),
 	  FilterBillsModal: FilterBillsModal(toggleModal),
 	}
 	// END MODAL SECTIONS
 	// Filter Button State and Methods
 	const [sorting,setSorting] = useState([0,0,0,0]);
 	const updateSorting = (index) => {
 		let temp = [0,0,0,0];
		temp[index] = (sorting[index]+1)%3;
 		setSorting([...temp]);
 	}
	//
	useEffect(()=>{
		//sort based on sorting array [date, sponsor, title, activity]
		//set results with new sorted Object
		let temp = [...results]
		let attributes = ['title','latestAction.actionDate','sponsors.item.fullName','latestAction.text']
		sorting.forEach((num,index)=>{
			if(sorting[index] === 1){
				temp.sort((a,b)=>(get(a,attributes[index]) >= get(b,attributes[index])) ? 1 : -1)
			}else if(sorting[index] === 2){
				temp.sort((a,b)=>(get(a,attributes[index]) <= get(b,attributes[index])) ? 1 : -1)
			}
		});
		setResults(temp);
		//eslint-disable-next-line
	},[sorting]);
 	// END FILTER BUTTON
 	// Sorting Data
 	//
 	// You will need to sort your object before mapping over them.
 	//And it can be done easily with a sort() function with a custom
 	//comparator definition like
 	// var obj = [...this.state.data];
 	// obj.sort((a,b) => a.timeM - b.timeM);
 	// obj.map((item, i) => (<div key={i}> {item.matchID}
 	//                       {item.timeM} {item.description}</div>))

    return (
        <div className={classes.root}>
		    {modal ? modals[activeModal] : null}
				<div className={classes.billsContainer}>
					<div className={classes.searchBarContainer}>
	                    <Paper className={classes.searchBarPaper}>
	                		<h3 className={classes.searchTitle}>Bill Search</h3>
							<div className={classes.searchOptions}>
								<Autocomplete
								  options={fullNameList}
								  getOptionLabel={(option) => option}
								  renderInput={(params) => <TextField {...params}
															  label="Legislator"
															  variant="outlined"/>}
								  onChange={handleFullName}/>
		                		<FormControl variant="outlined" className={classes.formControl}
									>
			                  		<InputLabel className={classes.inputLabel}>Congress</InputLabel>
				                    <Select
				                      value={originChamber}
				                      onChange={handleOriginChamber}
				                      className={classes.selectEmpty}
				                      label="congress">
					                    <MenuItem value={'House'}>House</MenuItem>
					                    <MenuItem value={'Senate'}>Senate</MenuItem>
				                    </Select>
									<IconButton
									   onClick={()=>{setOriginChamber('')}}
									   aria-label="Clear Chamber of Origin Selection"
									   className={classes.clearButton}
									>
										<CloseIcon fontSize="small"></CloseIcon>
									</IconButton>
		                		</FormControl>
		                		<FormControl variant="outlined" className={classes.formControl}>
				                    <InputLabel className={classes.inputLabel}>Party</InputLabel>
				                        <Select
				                          value={party}
				                          onChange={handleParty}
				                          className={classes.selectEmpty}
				                          label="party">
						                    <MenuItem value={'D'}>Democrat</MenuItem>
						                    <MenuItem value={'R'}>Republican</MenuItem>
						                    <MenuItem value={'I'}>Independent</MenuItem>
						                </Select>
										<IconButton
									 	   onClick={()=>{setParty('')}}
									 	   aria-label="Clear Party Selection"
									 	   className={classes.clearButton}
									 	>
									 		<CloseIcon fontSize="small"></CloseIcon>
									 	</IconButton>
				                </FormControl>
		                		<FormControl variant="outlined" className={classes.formControl}>
		                  			<InputLabel className={classes.inputLabel}>State</InputLabel>
				                    <Select
				                      value={state}
				                      onChange={handleState}
				                      className={classes.selectEmpty}
				                      label="state">
					                    {constants.STATES.map((name)=> (
					                        <MenuItem value={name} key={name}>{name}</MenuItem>
					                      ))}
		                  			</Select>
									<IconButton
									   onClick={()=>{setState('')}}
									   aria-label="Clear State Selection"
									   className={classes.clearButton}
									>
										<CloseIcon fontSize="small"></CloseIcon>
									</IconButton>
		                        </FormControl>
								<FormControl variant="outlined" className={classes.formControl}>
				                    <InputLabel className={classes.inputLabel}>Session</InputLabel>
				                        <Select
				                          value={session}
				                          onChange={handleSession}
				                          className={classes.selectEmpty}
				                          label="session">
						                    <MenuItem disabled value={'117'}>117 (2021-Present)</MenuItem>
						                    <MenuItem value={'116'}>116 (2019-2021)</MenuItem>
						                    <MenuItem disabled value={'115'}>115 (2017-2019)</MenuItem>
						                </Select>
										<IconButton
									 	   onClick={()=>{setSession('')}}
									 	   aria-label="Clear Session Selection"
									 	   className={classes.clearButton}
									 	>
									 		<CloseIcon fontSize="small"></CloseIcon>
									 	</IconButton>
				                </FormControl>
								<div className={classes.searchHelp}>
									{Info('SearchBillsModal',updateModalContent,toggleModal)}
								</div>
							</div>
						</Paper>
					</div>
        			<div className={classes.responseArea}>
					  	<h1 className={classes.flexCenter}>
							<div className={classes.sortingHelp}>
								{Info('FilterBillsModal',updateModalContent,toggleModal)}
							</div>
						</h1>
		                <Paper className={classes.paper}>
							<div className={classes.gridContainer}>
								{FilterButton('Title',updateSorting,sorting,0)}
								{FilterButton('Date',updateSorting,sorting,1)}
								{FilterButton('Sponsor',updateSorting,sorting,2)}
								{FilterButton('Activity',updateSorting,sorting,3)}
								{ loading ? null :
									results.map((bill, index) => {
										return(
												<Fragment key={index}>
													{(index+1 >= visibleBillCount && index+1 <= visibleBillCount+25) &&
														<Fragment>
															<div className={classes.rowTitle+' '+classes.cell} onClick={()=> handleToggle(get(bill,'_id'))}>
																{get(bill,'title')}
															</div>
															<div className={classes.rowDate+' '+classes.cell} onClick={()=> handleToggle(get(bill,'_id'))}>
																{get(bill,'introducedDate')}&#160;{smallMedia?null:<br/>}-&#160;{get(bill,'latestAction.actionDate')}
															</div>
															<div className={classes.rowSponsor+' '+classes.cell} onClick={()=> handleToggle(get(bill,'_id'))}>
																{get(bill,'sponsors.item.fullName')}
															</div>
															<div className={classes.rowActivity+' '+classes.cell} onClick={()=> handleToggle(get(bill,'_id'))}>
																{get(bill,'latestAction.text')}
															</div>
														</Fragment>
													}
													</Fragment>
											)
									})
								}
							</div>
			                <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
			                    <Card className={classes.root2}>
			                        <CardContent>
			                          <Bill _id={getId()} />
			                        </CardContent>
			                    </Card>
			                </Backdrop>
							<div className={styles.rowSelection}>
								<span className={styles.hoverMain} onClick={()=>changeViewCount(visibleBillCount*-1+1)}> {`<<  `} </span>
							    <span className={styles.hoverMain} onClick={()=>changeViewCount(-25)}> {`<  `} </span>
								{`${visibleBillCount}-${visibleBillCount+25>results.length ? results.length : visibleBillCount+25} of ${results.length}`}
								<span className={styles.hoverMain} onClick={()=>changeViewCount(25)}> {`  >`} </span>
								<span className={styles.hoverMain} onClick={()=>changeViewCount((results.length-(results.length % 25))+(visibleBillCount*-1+1))}> {`  >>`} </span>
							</div>
		                </Paper>
					</div>
				</div>
        	</div>
    );
};

export default Bills;
