import React,{ useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const mediaQueryBreakpoint = '1024';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight:'90vh',
    [`@media (max-width: ${mediaQueryBreakpoint}px)`]:{
        // smaller than 1024
        overflow:'auto',
        whiteSpace:'auto'
    },
  },
  paper: {
    backgroundColor:theme.palette.background.main,
    padding:'10px',
    display:'flex',
    overflow:'auto',
    whiteSpace:'auto'
  },
  titles:{
    padding:5,
  },
  left:{
    float:'left',
    margin:0
  }, actions:{
    maxHeight:400,
    overflow:'auto'
  }, action:{
    minWidth:150,
    minHeight:100,
    overflow:'auto',
    whiteSpace:'auto',
  }, cosponsors:{
    minHeight:100,
    overflow:'auto',
    whiteSpace:'auto'
  }, cosponsor:{
    minWidth:125
  }
}));

const dblink = process.env.REACT_APP_BACKEND_LINK;
// const dblink = 'https://mgtmdym3uw.us-east-2.awsapprunner.com/';

const About = (props) => {
    const classes = useStyles();
    const [results, setResults] = useState({});

    function get(obj, key) {
      return key.split('.').reduce(function(o, x) {
          return (typeof o == 'undefined' || o === null) ? o : o[x];
      }, obj);
    }
  const handleSummaries = () =>{
    const temp = get(results,'summaries.billSummaries.item');
    const regex = /<.+?>/g;
    if(Array.isArray(temp)){
      return(<Fragment>
              {temp[0]?.text.replaceAll(regex,"")}
            </Fragment>);
    }else if(temp){
      return(<Fragment>
              {temp?.text.replaceAll(regex,"")}
            </Fragment>);
    }
  }
  const handleActions = () =>{
    const temp = get(results,'actions.item');//should be an array
    if(temp){
      return(
        <Fragment>
            {temp.map(({actionDate, text}, index)=>{
                return <Grid item key={index} className={classes.action} sm>{actionDate} <br /> {text}</Grid>
            })}
        </Fragment>
      );
    }else{
      return('None');
    }
  }
  const handleCosponsors = () =>{
    const temp = get(results,'cosponsors.item');
    if(Array.isArray(temp)){
      return(
        <Fragment>
          {temp.map((cosponsor, index)=> { return(
            <Grid item key={index} className={classes.cosponsor} sm>{cosponsor.fullName} <br /> {cosponsor.sponsorshipDate}:{cosponsor.isOriginalCosponsor ? '\u2611' : '\u2610' }   {cosponsor.state} </Grid>
          )})}
        </Fragment>
      )
    }else if(temp){
      return(<Grid item className={classes.cosponsor} sm>{temp.fullName} <br /> {temp.sponsorshipDate}:{temp.isOriginalCosponsor ? '\u2611' : '\u2610' }   {temp.state} </Grid>)
    }else{
      return('None');
    }
  }
  const handleCommittees = () =>{
    const temp = get(results,'committees.billCommittees');
    if(Array.isArray(temp)){
      return(
        <Fragment>
          {temp.map(({name}, index)=> { return(
            <Grid item key={index} className={classes.committee} sm> {name} </Grid>
          )})}
        </Fragment>
      )
    }else{
      return(<Grid item className={classes.committee} sm> {get(temp,'item.name')} </Grid>)
    }
  }
  useEffect(() => {
      const getAPI = async () => {
        //it's annoying to check for string type in javascript, try to avoid cases like this in the future
        if(props._id && Object.prototype.toString.call(props._id) === '[object String]'){
          const response = await fetch(`${dblink}BillsData/${props._id}`);
          const data = await response.json();
          try {
               if(data.filteredCollection.length){
                 setResults(data.filteredCollection[0]);
               }
          } catch (error) {
              console.log('Error at UseEffect:')
              console.log(error);
          }
        }else{
          //update results to precreated template values for testing
        }
      };
      getAPI();
  }, [setResults,props._id]);

    return (
    <div className={classes.root}>
      <Grid container spacing={1}>
          <Grid item sm>
            <Paper className={[classes.paper,classes.titles]}>
                <h2 className={classes.left}>{get(results,'title')}</h2>
                <Grid item sm>{get(results,'originChamber')}</Grid>
                <Grid item sm>{get(results,'sponsors.item.party')}</Grid>
                <Grid item sm>{get(results,'policyArea.name')}</Grid>
                <Grid item sm>{get(results,'sponsors.item.fullName')}</Grid>
            </Paper>
          </Grid>
      </Grid>
      <Grid container spacing={1}>
          <Grid item sm>
            <Paper className={classes.paper}>
                <Grid item sm>
                  <h2 className={classes.left}>Bill Summary</h2>
                  {handleSummaries()}
                </Grid>
            </Paper>
          </Grid>
        </Grid>
      <Grid container spacing={1}>
          <Grid item sm>
            <Paper className={[classes.paper,classes.actions]}>
              <h2 className={classes.left}>Bill History</h2>
              {handleActions()}
            </Paper>
          </Grid>
        </Grid>
      <Grid container spacing={1}>
          <Grid item sm>
            <Paper className={[classes.paper,classes.cosponsors]}>
              <h2 className={classes.left}>Cosponsors</h2>
              {handleCosponsors()}
            </Paper>
          </Grid>
        </Grid>
      <Grid container spacing={1}>
          <Grid item sm>
            <Paper className={[classes.paper,classes.committees]}>
              <h2 className={classes.left}>Committees</h2>
              {handleCommittees()}
            </Paper>
          </Grid>
        </Grid>
    </div>
  );
};

export default About;
