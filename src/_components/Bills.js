import React, { useEffect, useState, Fragment } from 'react';
//---v--- Material-ui Layout---v----------------------------------------------
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ClearIcon from '@material-ui/icons/Clear';
import Grow from '@material-ui/core/Grow';
//---v--- Material-ui Select Section ---v-------------------------------------
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//---v---Autocomplete feature---v---
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
//---v--- Custom Constants ---v-------------------------------------
import constants from '_constants/billConstants';
import Bill from '_components/Bill';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.secondary,
      transition: ['height','2s'],
      minWidth:'192px'
    },
    searchOptions:{
      color: theme.palette.primary.main,
      fontSize: '20px'
    },
    formControl:{
      paddingBottom:10,
      flex:1,
      flexDirection:'row',
      alignItems:'center',
    }, backdrop:{
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.primary.tertiary
    }, selectEmpty:{
       width:'9em'
    },textSearch:{
      minWidth:'118px'
    }, clearButton:{
       maxWidth:'1em',
       minWidth:'1em',
       maxHeight:'2em',
       minHeight:'2em',
       marginLeft:4,
       marginRight:4
    },
}));

const Bills = (props) => {
    const classes = useStyles();
	//const dblink = "https://pyruqveupx.us-east-1.awsapprunner.com/";
	const dblink = 'http://localhost:8080/';
  // STATE VARIABLES----------------------------------------------------------
    const [party, setParty] = useState('');
    const [state, setState] = useState('');
    const [fullName, setFullName] = useState('');
    const [originChamber, setOriginChamber] = useState('');
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);
    const [billId, setBillId] = useState('');
    const [animateChecked, setAnimateChecked] = useState('false');

    useEffect(() => {
        setAnimateChecked(false);
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
                        setAnimateChecked(true);
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
    function get(obj, key) {
        return key.split('.').reduce(function(o, x) {
            return (typeof o == 'undefined' || o === null) ? o : o[x];
        }, obj);
      }
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
        }
     };
     const handleClose = () => {
       setOpen(false);
     };
     const handleToggle = (id) => {
       setBillId(id);
       setOpen(!open);
     };
     const handleId = () => {
       return billId;
     };

    return (
          <div className={classes.root}>
            <Grid container spacing={1}>
              <Grid item sm={2}>
                <Paper className={classes.paper}>
                <h3 className={classes.searchOptions}>Search Options</h3>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Congress</InputLabel>
                  <Select
                    value={originChamber}
                    onChange={handleOriginChamber}
                    className={classes.selectEmpty}
                    label="congress"
                  >
                    <MenuItem value={'House'}>House</MenuItem>
                    <MenuItem value={'Senate'}>Senate</MenuItem>
                  </Select>
                  <Button className={classes.clearButton} onClick={()=>setOriginChamber('')}>
                    <ClearIcon style={{fontSize:'large'}} />
                  </Button>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>Party</InputLabel>
                  <Select
                    value={party}
                    onChange={handleParty}
                    className={classes.selectEmpty}
                    label="party"
                  >
                    <MenuItem value={'D'}>Democrat</MenuItem>
                    <MenuItem value={'R'}>Republican</MenuItem>
                    <MenuItem value={'I'}>Independent</MenuItem>
                  </Select>
                  <Button className={classes.clearButton} onClick={()=>setParty('')}>
                    <ClearIcon style={{fontSize:'large'}} />
                  </Button>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel>State</InputLabel>
                  <Select
                    value={state}
                    onChange={handleState}
                    className={classes.selectEmpty}
                    label="state"
                  >
                    {
                      constants.STATES.map((name)=> (
                        <MenuItem value={name} key={name}>{name}</MenuItem>
                      ))
                    }
                  </Select>
                  <Button className={classes.clearButton} onClick={()=>setState('')}>
                    <ClearIcon style={{fontSize:'large'}} />
                  </Button>
                </FormControl>
                <Autocomplete
                  options={constants.LEGISLATOR116}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => <TextField {...params}
                                              label="Legislator"
                                              variant="outlined"/>}
                  onChange={handleFullName}
                />
                </Paper>
              </Grid>
              <Grid item sm>
                <Paper className={classes.paper}>
                  { loading ? '0 Results' :
                    results.map((bill, index) => {
                      return(
                      <Fragment key={index}>
                          <Grow appear={true} in={animateChecked}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(animateChecked ? { timeout: 225 } : {})}>
                          <Button color="primary" onClick={()=> handleToggle(get(bill,'_id'))}>
                              <Paper elevation={2} className={classes.paper}>
                                {get(bill,'title')}
                              </Paper>
                            </Button>
                          </Grow>
                        </Fragment>
                      )
                    })
                  }
                  <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                    <Card className={classes.root}>
                      <CardContent>
                        <Bill _id={handleId()} />
                      </CardContent>
                    </Card>
                  </Backdrop>
                </Paper>
              </Grid>
            </Grid>
          </div>
    );
};

export default Bills;
