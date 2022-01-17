import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
	display:'flex',
	flexDirection:'column',
	justifyContent:'center',
	alignItems:'center',
    height:'86vh',
  },
}));

const Contact = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h2>Clear Legislation is still under development.</h2>
            <h2>Any questions, suggestions, or general inquiries can be addressed to ClearLegislation@gmail.com </h2>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Contact;
