import React, {useState, useEffect} from 'react';
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
//--v---Timeline component---v--------------------------------------------------
import Switch from '@material-ui/core/Switch';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//--v---Custom components-------------------------------------------------------
import LegTimeline from './LegTimeline'
import Content from './Content';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color:'black',
    maxWidth:1000,
    margin:'auto',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    borderRadius:'0%',
    color:'#000',
  },
  filter:{
    '&>:nth-child(1)':{
      minHeight:'108px',
      flexDirection:'row',
    }
},formControl:{
    marginBottom:10,
},timelineContainer:{
    display:'flex',
    justifyContent:'space-around',
    width:'100%',
},tlContainer:{
    width:'50%',
    alignItems:'center',
    padding:10,
}
}));

const dblink = process.env.REACT_APP_BACKEND_LINK;
// const dblink = 'https://mgtmdym3uw.us-east-2.awsapprunner.com/';

const CompareLeg = () => {
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
  const [timelineAChecked,setTimelineAChecked] = useState(false);
  const [timelineBChecked,setTimelineBChecked] = useState(false);
  const [timelineAElements,setTimelineAElements] = useState([]);
  const [timelineBElements,setTimelineBElements] = useState([]);

  useEffect(() => {
    //fetches the select and textfield autocompletes
    const getFields = async () => {
        const response = await fetch(`${dblink}CompareLegPreload`);
        const data = await response.json();
        try {
            setResponse(data);
        } catch (error) {
            console.log('Error at UseEffect:')
            console.log(error);
        }
    };
    getFields();
  },[setResponse]);

  useEffect(() => {
    //populates textbox and select arrays
    if(response.filteredCollection){
      let fn = [];
      let states = [];
      response.filteredCollection.forEach((each) => {
            if (states.indexOf(each.state) === -1){
              states.push(each.state)
    	  }else if(fn.indexOf(each.fullName)=== -1){
    		  fn.push(each.fullName);
    	  }
        })
      states.sort();
      setStateList(states);
	  fn.sort();
      setFullNameList(fn);
      setFullNameListB(fn);
    }
  },[response, setStateList, setFullNameList, setFullNameListB]);

  useEffect(() => {
    //Sets DataA when legislator is selected for dynamic images
    if(response.filteredCollection){
      if(fullName){
        response.filteredCollection.forEach(each => {
          if(each.fullName === fullName){
            const getAPI = async () => {
              const response = await fetch(`${dblink}Legislator/${each._id}`);
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
    },[fullName,setDataA,response]);

  useEffect(()=> {
        if(dataA){
            let timelineE = [];
            if(dataA.votes && Object.keys(dataA.votes).length > 1){
                console.log(dataA.votes)
                dataA.votes.forEach((item, i) => {
                    timelineE.push(
                        {   type:'vote',
                            date:item.date.substring(0,10),
                            vote:item.vote,
                            billId:item.billId,
                            passed:item.fullActionName,
                            title:item.title,
                        })
                });
            }
            if(dataA.sponsored && Object.keys(dataA.sponsored).length > 1){
                dataA.sponsored.forEach((item, i) => {
                    timelineE.push(
                        {   type:'sponsor',
                            date:item.date,
                            vote:item.vote,
                            billId:item.billId,
                            passed:item.fullActionName,
                            title:item.title,
                        })
                });
            }
            if(dataA.cosponsored && Object.keys(dataA.cosponsored).length > 1){
                dataA.cosponsored.forEach((item, i) => {
                    timelineE.push(
                        {   type:'cosponsor',
                            date:item.date,
                            vote:item.vote,
                            billId:item.billId,
                            passed:item.fullActionName,
                            title:item.title,
                        })
                });
            }
            setTimelineAElements([...timelineE]);
        }
  },[dataA,setTimelineAElements]);

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
          if(each.fullName === fullNameB){
            const getAPI = async () => {
              const response = await fetch(`${dblink}Legislator/${each._id}`);
              const data = await response.json();
              try {
                   if(data.filteredCollection.length){
                     setDataB(data.filteredCollection[0]);
                     setTimelineBElements(data.filteredCollection[0].votes)
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
},[fullNameB,setDataB,setTimelineBElements,response]);

useEffect(()=> {
      if(dataB){
          let timelineE = [];
          if(dataB.votes && Object.keys(dataB.votes).length > 1){
              dataB.votes.forEach((item, i) => {
                  timelineE.push(
                      {   type:'vote',
                          date:item.date.substring(0,10),
                          vote:item.vote,
                          billId:item.billId,
                          passed:item.fullActionName,
                          title:item.title,
                      })
              });
          }
          if(dataB.sponsored && Object.keys(dataB.sponsored).length > 1){
              dataB.sponsored.forEach((item, i) => {
                  timelineE.push(
                      {   type:'sponsor',
                          date:item.date,
                          vote:item.vote,
                          billId:item.billId,
                          passed:item.fullActionName,
                          title:item.title,
                      })
              });
          }
          if(dataB.cosponsored && Object.keys(dataB.sponsored).length > 1){
              dataB.cosponsored.forEach((item, i) => {
                  timelineE.push(
                      {   type:'cosponsor',
                          date:item.date,
                          vote:item.vote,
                          billId:item.billId,
                          passed:item.fullActionName,
                          title:item.title,
                      })
              });
          }
          setTimelineBElements([...timelineE]);
      }
},[dataB,setTimelineBElements]);

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
        return <div style={{textAlign:'center'}}> Select a Legislator above </div>
    }

  };

  //Timeline Structure

  // const voteSample = {
  //     type:'vote',
  //     title:'Title of Bill',
  //     passed:'Passsed',
  //     vote:'Yay',
  //     date:'2020-01-03'
  // };
  // const sponsorSample = {
  //     type:'sponsor',
  //     title:'Bill Title',
  //     congress:'Senate',
  //     committee:'Finance',
  //     date:'2020-01-08',
  // };
  // const cosponsorSample = {
  //     type:'cosponsor',
  //     date:'2020-01-20',
  //     title:'Bill Title',
  //     congress:'Senate',
  //     committee:'Finance',
  // };

  return (
    <div className={classes.root}>
      <Grid alignItems={'center'} container spacing={0}>
        <Grid item xs={12}>
        <Paper className={classes.paper} elevation={0}>
            <h2> Select Legislators to Compare</h2>
        </Paper>
        </Grid>
        <Grid className={classes.filter} item xs={6}>
            <Paper className={classes.paper} elevation={0}>
              <h3> Legislator A </h3>
              <div className={classes.formControl}>
                  <Autocomplete
                  options={fullNameList} autoHighlight={true}
                  getOptionLabel={(option) => option} required={true}
                  renderInput={(params) => <TextField {...params}
                                              label='Legislator'
                                              variant='outlined'
                                              />}
                  onChange={handleFullName}
                  />
            </div>
            <div className={classes.formControl}>
              <Autocomplete
                options={stateList} autoHighlight={true}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField {...params}
                                            label='State'
                                            variant='outlined'/>}
                onChange={(e)=>setState(e.target.value)}
                />
            </div>
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
            </Paper>
        </Grid>
        <Grid className={classes.filter} item  xs={6}>
         <Paper className={classes.paper} elevation={0}>
                <h3> Legislator B </h3>
                <div className={classes.formControl}>
                  <Autocomplete
                  options={fullNameListB} autoHighlight={true}
                  getOptionLabel={(option) => option} required={true}
                  renderInput={(params) => <TextField {...params}
                                              label='Legislator'
                                              variant='outlined'
                                              />}
                  onChange={handleFullNameB}
                  />
                 </div>
             <div className={classes.formControl}>
              <Autocomplete
                options={stateList} autoHighlight={true}
                getOptionLabel={(option) => option}
                className={classes.formControl}
                renderInput={(params) => <TextField {...params}
                                            label='State'
                                            variant='outlined'/>}
                onChange={(e)=>setStateB(e.target.value)}
                />
                </div>
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
          </Paper>
        </Grid>
        <Grid item  xs={12}>
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
		<Grid item style={{backgroundColor:'#ffffff'}} xs={12}>
			<h3 style={{textAlign:'center',color:'rose'}}>This feature is under active development, only session 116 is currently available</h3>
		</Grid>
        <div className={classes.timelineContainer}>
              <Paper className={(classes.paper,classes.tlContainer)} style={{paddingBottom:30}}>
                {rContent('A')}
                <FormControlLabel style={{color:'black'}}
                  control={<Switch checked={timelineAChecked} onChange={()=>setTimelineAChecked(!timelineAChecked)} />}
                  label="Show Timeline"/>
                <Collapse in={timelineAChecked}>{<LegTimeline elements={timelineAElements} />}</Collapse>
              </Paper>
              <Paper className={(classes.paper,classes.tlContainer)} style={{paddingBottom:30}}>
                {rContent('B')}
                <FormControlLabel style={{color:'black'}}
                  control={<Switch checked={timelineBChecked} onChange={()=>setTimelineBChecked(!timelineBChecked)} />}
                  label="Show Timeline"/>
                <Collapse in={timelineBChecked}>{<LegTimeline elements={timelineBElements} />}</Collapse>
              </Paper>
        </div>
      </Grid>
    </div>
  );
};

export default CompareLeg;
