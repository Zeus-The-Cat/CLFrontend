import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import InfoSharpIcon from '@material-ui/icons/InfoSharp';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'full'
  },
  commitments:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    margin:'0.75em',
    backgroundColor:theme.palette.background.main,
    color:theme.palette.primary,
    '& h3':{
      backgroundColor: theme.palette.primary.main,
      color:theme.palette.primary.contrastText,
      marginTop:0,
      height:'2em',
      lineHeight:'2em',
    },
    '& p':{
      margin:'0.75em',
      color:theme.palette.secondary,
    },
    '& h4':{
    }
  },
  firstContainer:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
  },
  commitmentsContainer:{
    display:'flex',
    flexDirection:'row',
    flexWrap: 'nowrap',
  },typography: {
    padding: theme.spacing(2),
  },
}));

const About = () => {
  const classes = useStyles();
  const [anchorInfo, setAnchorInfo] = React.useState(null);

  const handleInfoClick = (event) => {
    setAnchorInfo(event.currentTarget);
  };

  const handleInfoClose = () => {
    setAnchorInfo(null);
  };
  const infoOpen = Boolean(anchorInfo);
  const infoId = infoOpen ? 'info-popover example' : undefined;

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item sm>
          <Paper className={classes.paper}>
            <div className={classes.firstContainer}>
              <h3>Clear Legislation provides you with a single source for public legislative data</h3>
              <h3>It's unreasonable to expect the average citizen to keep track of the 6,000+ bills that pass through congress each year</h3>
              <h3>Our goal is to help citizens connect with their government's legislative process</h3>
              <h2>Commitments</h2>
            </div>
            <Grid container className={classes.commitmentsContainer} item sm={12}>
              <Grow in={true} {...({timeout:500})}>
                <Grid className={classes.commitments} sm={4}>
                  <h3>Context</h3>
                  <p>The legislative process is complicated, we'll show you the information you need to know and don't worry you can always ask for more details along the way.</p>
                  <h4>Look for 
                        <InfoSharpIcon style={{fontSize:'medium',cursor:'help',marginLeft:'2px',marginRight:'2px'}} aria-describedby={infoId} onClick={handleInfoClick} />
                    <Popover
                      id={infoId}
                      open={infoOpen}
                      anchorEl={anchorInfo}
                      onClose={handleInfoClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                    >
                      <Typography className={classes.typography}>Helpful information will be displayed here.<br />Click outside of popup to close.</Typography>
                    </Popover>   
                       icons for additional information
                  </h4>
                </Grid>
              </Grow>
              <Grow in={true} {...({timeout:750})}>
                <Grid className={classes.commitments} item sm={4}>
                  <h3>Accessibility</h3>
                  <p>Clear Legislation will never charge a membership fee. It's important that the tools for a healthy society remain accessible to all income levels.</p>
                  <h4>Donations Page</h4>
                </Grid>
              </Grow>
              <Grow in={true} {...({timeout:1000})}>
                <Grid className={classes.commitments} item sm={4}>
                  <h3>Security</h3>
                  <p>Modern websites make a profit selling your data, we commit to never collecting or distributing data on our users. Period.</p>
                  <h4>See our Terms of Service</h4>
                </Grid>
              </Grow>
            </Grid>
          </Paper>
        </Grid>
      </Grid> 
    </div>
  );
};

export default About;
