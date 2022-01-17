import React, {useState, useEffect} from 'react';
import Content from '_components/_CompareLeg/Content';
//---v--- Material-ui Core ---v----------------------------------------------
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//---v--- Material-ui Select Section ---v-------------------------------------
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//---v---Autocomplete feature---v-----------------------------------------------
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius:'0%'
  },
  filter:{
    '&>:nth-child(1)':{
      minHeight:'108px',
    }
  }
}));

const CompareLeg = () => {
  //const dblink = "https://pyruqveupx.us-east-1.awsapprunner.com/";
  const dblink = 'http://localhost:8080/';
  const classes = useStyles();
  const [response, setResponse] = useState({});
  const [session, setSession] = useState(116);
  const [dataA, setDataA] = useState({});
  const [dataB, setDataB] = useState({});

  //Selector values for DataA, instead of destructuring dataA/dataB I used
  //  seperate declarations, this allows the selectors to be independent from
  //  the display data
  //------------Begin DataA---------------
  const [state, setState] = useState('');//eslint-disable-line no-unused-vars
  const [stateList, setStateList] = useState([]);
  const [fullName, setFullName] = useState('');
  const [fullNameList, setFullNameList] = useState([]);
  const [fullNameListB, setFullNameListB] = useState([]);
  const [congress, setCongress] = useState('');
  const [party, setParty] = useState('');


  useEffect(() => {
    //fetches the select and textfield autocompletes
    const getFields = async () => {
        const response = await fetch(`${dblink}PPCFields/${session}`);
        const data = await response.json();
        try {
            setResponse(data);
        } catch (error) {
            console.log('Error at UseEffect:')
            console.log(error);
        }
    };
    getFields();
  },[setResponse,session]);

  useEffect(() => {
    //populates textbox and select arrays
    if(response.filteredCollection){
      let fn = [];
      let states = [];
      response.filteredCollection.forEach((each) => {
        if (states.indexOf(each.state) === -1){
          states.push(each.state)
        }
        fn.push(each.full_name);
      })
      states.sort();
      setStateList(states);
      setFullNameList(fn);
      setFullNameListB(fn);
    }
  },[response, setStateList, setFullNameList, setFullNameListB]);

  useEffect(() => {
    //Sets DataA when legislator is selected for dynamic images
    if(response.filteredCollection){
      if(fullName){
        response.filteredCollection.forEach(each => {
          if(each.full_name === fullName){
            const getAPI = async () => {
              const response = await fetch(`${dblink}PPCProjected/${each._id}`);
              const data = await response.json();
              try {
                   if(data.filteredCollection.length){
                     setDataA(data.filteredCollection[0]);
                   }else{
                    setDataA({});
                   }
              } catch (error) {
                  console.log('Error at UseEffect:')
                  console.log(error);
              }
            };
            getAPI();
          }
        })
      }else{
        setDataA({});
      }
    }
  },[fullName,setDataA, response]);

  const handleFullName = (event, newValue) => {
    setFullName(newValue);
  };

  //Selector values for DataB, could be made into it's own component
  //-------------Begin DataB-----------------
  const [stateB, setStateB] = useState('');//eslint-disable-line no-unused-vars
  const [fullNameB, setFullNameB] = useState('');
  const [congressB, setCongressB] = useState('');
  const [partyB, setPartyB] = useState('');


  useEffect(() => {
    //Sets bioguide when legislator is selected for dynamic images
    if(response.filteredCollection){
      if(fullNameB){
        response.filteredCollection.forEach(each => {
          if(each.full_name === fullNameB){
            const getAPI = async () => {
              const response = await fetch(`${dblink}PPCProjected/${each._id}`);
              const data = await response.json();
              try {
                   if(data.filteredCollection.length){
                     setDataB(data.filteredCollection[0]);
                   }else{
                     setDataB({});
                   }
              } catch (error) {
                  console.log('Error at UseEffect:')
                  console.log(error);
              }
            };
            getAPI();
          }
        })
      }else{
        setDataB({});
      }
    }
  },[fullNameB,setDataB, response]);

  const handleFullNameB = (event, newValue) => {
    setFullNameB(newValue);
  };
  //rContent stands for reactive content its a naming convention in this app
  const rContent = (side) => {
    if(side === 'A' && Object.keys(dataA).length){
         return <Content side={'A'} data={dataA}/>
    }else if (side === 'B' && Object.keys(dataB).length){
        return <Content side={'B'} data={dataB}/>
    }else{
        return <div> Select a Legislator above </div>
    }

  };
  return (
    <div className={classes.root}>
      <Grid alignItems={'center'} container spacing={0}>
        <Grid className={classes.filter} item xs={5}>
          <Paper elevation={0} className={classes.paper}>
            <Grid container align-items-xs-center spacing={0}>
              <Grid item sm={3}>
                  <Autocomplete
                  options={fullNameList} autoHighlight={true}
                  getOptionLabel={(option) => option} required={true}
                  renderInput={(params) => <TextField {...params}
                                              label='Legislator'
                                              variant='outlined'
                                              />}
                  onChange={handleFullName}
                  />
                </Grid>
              <Grid item sm={3}>
              <Autocomplete
                options={stateList} autoHighlight={true}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField {...params}
                                            label='State'
                                            variant='outlined'/>}
                onChange={(e)=>setState(e.target.value)}
                />
              </Grid>
              <Grid item sm={3}>
                <FormControl variant='outlined' fullWidth={true} className={classes.formControl}>
                  <InputLabel>Party</InputLabel>
                  <Select
                    value={party}
                    onChange={(e)=>setParty(e.target.value)}
                    className={classes.selectEmpty}
                    label='party'>
                    <MenuItem value={''}>None</MenuItem>
                    <MenuItem value={'D'}>Democrat</MenuItem>
                    <MenuItem value={'R'}>Republican</MenuItem>
                    <MenuItem value={'I'}>Independent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={3}>
                <FormControl variant='outlined' fullWidth={true} className={classes.formControl}>
                    <InputLabel>Congress</InputLabel>
                    <Select
                      value={congress}
                      onChange={(e)=>setCongress(e.target.value)}
                      className={classes.selectEmpty}
                      label='congress'>
                      <MenuItem value={''}>None</MenuItem>
                      <MenuItem value={'Senate'}>Senate</MenuItem>
                      <MenuItem value={'House'}>House</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item  xs={2}>
          <Paper className={classes.paper} elevation={0}>
          <FormControl variant='outlined' autowidth={'true'} className={classes.formControl}>
                      <InputLabel>Session</InputLabel>
                      <Select
                        value={session}
                        onChange={(e)=>setSession(e.target.value)}
                        className={classes.selectEmpty}
                        label='session'>
                        <MenuItem value={'116'}>116</MenuItem>
                      </Select>
                    </FormControl> <br />(01/09/2018 - 02/10/2020)
          </Paper>
        </Grid>
        <Grid className={classes.filter} item  xs={5}>
         <Paper className={classes.paper} elevation={0}>
            <Grid container spacing={0}>
              <Grid item sm={3}>
                  <Autocomplete
                  options={fullNameListB} autoHighlight={true}
                  getOptionLabel={(option) => option} required={true}
                  renderInput={(params) => <TextField {...params}
                                              label='Legislator'
                                              variant='outlined'
                                              />}
                  onChange={handleFullNameB}
                  />
                </Grid>
              <Grid item sm={3}>
              <Autocomplete
                options={stateList} autoHighlight={true}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField {...params}
                                            label='State'
                                            variant='outlined'/>}
                onChange={(e)=>setStateB(e.target.value)}
                />
              </Grid>
              <Grid item sm={3}>
                <FormControl variant='outlined' fullWidth={true} className={classes.formControl}>
                  <InputLabel>Party</InputLabel>
                  <Select
                    value={partyB}
                    onChange={(e)=>setPartyB(e.target.value)}
                    className={classes.selectEmpty}
                    label='party'>
                    <MenuItem value={''}>None</MenuItem>
                    <MenuItem value={'D'}>Democrat</MenuItem>
                    <MenuItem value={'R'}>Republican</MenuItem>
                    <MenuItem value={'I'}>Independent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={3}>
                <FormControl variant='outlined' fullWidth={true} className={classes.formControl}>
                    <InputLabel>Congress</InputLabel>
                    <Select
                      value={congressB}
                      onChange={(e)=>setCongressB(e.target.value)}
                      className={classes.selectEmpty}
                      label='congress'>
                      <MenuItem value={''}>None</MenuItem>
                      <MenuItem value={'Senate'}>Senate</MenuItem>
                      <MenuItem value={'House'}>House</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            {rContent('A')}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            {rContent('B')}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CompareLeg;
