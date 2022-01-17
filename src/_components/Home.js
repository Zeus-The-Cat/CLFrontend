import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
    marginBottom:20
  }, p:{
    color:'#b09f9c',
    textAlign: 'left'
  }, h2:{
    textAlign:'left',
    color:'#BD1E1E'
  }, button:{
    float:'left',
    color:'#3F51B5',
    alignItems:'center'
  }, h1:{
    color:theme.palette.primary.tertiary,
  }, img:{
    minHeight:'auto',
    maxHeight:'15vw'
  }, link:{
    textDecoration:'none'
  }, lmText:{
    display:'inline',
  },learnMore:{

  }
}));

const Home = () => {
  const classes = useStyles();

  // eslint-disable-next-line no-unused-vars
  function onInit(){
    // eslint-disable-next-line no-unused-vars
    const recentBill = {
      title:'Title',
      fullName: 'Full Name',
      party: 'P',
      committee: 'committee',
      description: 'Description of the bill in plain language',
      updateDate: 'DD-MM-YYYY',
      cosponsors: ['Full Name']
    }
    return (
    <Grid container spacing={3}>
      <Grid item sm>
        <Paper className={classes.paper}>
        </Paper>
      </Grid>
    </Grid>
  )};

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item sm>
          <Paper elevation={0} style={{backgroundColor:'#fff'}} className={classes.paper}>
            <h1 className={classes.h1}>Bringing Citizens and Governments Together</h1>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={1}>
        <Grid item sm></Grid>
        <Grid item sm>
          <Paper elevation={0} className={classes.paper}>
            <h2 className={classes.h2}>Find a specific bill</h2>
            <p className={classes.p}>Search by party, state, congress and more...</p>
            <Button className={classes.button} >
              <Link className={classes.link} to={'/Bills'}>
                <ArrowForwardIcon /><div className={classes.lmText}> Learn More</div>
            </Link></Button>
          </Paper>
        </Grid>
        <Grid item sm>
          <Paper elevation={0} className={classes.paper}>
          <img className={classes.img} alt={'debating court'} src={'https://cdn.pixabay.com/photo/2012/04/13/13/01/capitol-32309_960_720.png'} />
          </Paper>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
      <br /><br /><br /><br />
      <Grid container spacing={1}>
        <Grid item sm></Grid>
        <Grid item sm>
          <Paper elevation={0} className={classes.paper}>
            <img className={classes.img} alt={'government building'} src={'https://cdn.pixabay.com/photo/2017/08/28/19/53/court-2691100_960_720.png'} />
          </Paper>
        </Grid>
        <Grid item sm>
          <Paper elevation={0} className={classes.paper}>
            <h2 className={classes.h2}>Legislator v.s. Legislator</h2>
            <p className={classes.p}>Compare records of individual senators to know who represented your interests during their term. Helping you hold them accountable.</p>
            <Button className={classes.button}>
            <Link className={classes.link} to={'/CompareLeg'}>
            <ArrowForwardIcon />  
            <span className={classes.learnMore}>Learn More</span>
            </Link></Button>
          </Paper>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    </div>
  );
};

export default Home;
