import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import { Link } from 'react-router-dom';

import ExampleModal from './../_subcomponents/ExampleModal.js'
import Info from './../_subcomponents/Info.js';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    height:'full',
  },
  commitments:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    margin:'0.75em',
    backgroundColor:theme.palette.background.default,
    color:theme.palette.text.primary,
    '& > p':{
		marginRight:'1.75em',
		marginLeft:'1.75em',
	    '@media (min-width: 900px)':{
	  	    margin:'0.75em',
	  	    color:theme.palette.text.primary,
	    },
  	},
  },
  commitmentsTitle:{
    backgroundColor: theme.palette.primary.main,
    color:theme.palette.text.primary,
    marginTop:0,
    height:'2em',
    lineHeight:'2em',
	},
  selectable:{
	  color:theme.palette.primary.dark,
	  textDecoration:'none',
	  '&:hover':{
		  color:theme.palette.primary.main,
		  cursor:'pointer',
	  }
  },
  firstContainer:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    // fontSize:'clamp(0.5rem,7vw,1.25rem)',
  },
  commitmentsContainer:{
    display:'flex',
    flexDirection:'column',
    flexWrap: 'nowrap',
	alignItems:'center',
	justifyContent:'stretch',
	'@media (min-width: 900px)':{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'stretch',
		'&>p':{
			padding:theme.spacing(10),
			color:'white'
		}
	}
  },helpIcon:{
	display:'flex',
	alignItems:'center',
	justifyContent:'center',
	color:theme.palette.primary.dark,
	'&:hover':{
		color:theme.palette.secondary.main,
		cursor:'pointer',
	}
}
}));

const About = () => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [activeModal, setActiveModal] = useState('');

  const toggleModal = () => {
	setModal(!modal);
  }
  const updateModalContent = (component) => {
	setActiveModal(component);
  }
  const modals = {
	ExampleModal: ExampleModal(toggleModal),
  }

  return (
    <div className={classes.root}>
	  {modal ? modals[activeModal] : null}
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
              <Grow in={true} {...({timeout:1500})}>
                <Grid className={classes.commitments} md={4}>
                  <h3 className={classes.commitmentsTitle}>Context</h3>
                  <p>The legislative process is complicated, we'll show you the information you need to know and don't worry you can always ask for more details along the way.</p>
                  <h4>
				  <span className={classes.helpIcon}>{Info('ExampleModal',updateModalContent,toggleModal)}</span>
                         Buttons will provide helpful information and instructions<br />
                  </h4>
                </Grid>
              </Grow>
              <Grow in={true} {...({timeout:1750})}>
                <Grid className={classes.commitments} item md={4}>
                  <h3 className={classes.commitmentsTitle}>Accessibility</h3>
                  <p>Clear Legislation will never charge a membership fee. It&#39;s important that the tools for a healthy society remain accessible to all income levels.</p>
                  <h4><a className={classes.selectable} href="https://www.patreon.com/clearlegislation">Donations Page</a></h4>
                </Grid>
              </Grow>
              <Grow in={true} {...({timeout:2000})}>
                <Grid className={classes.commitments} item md={4}>
                  <h3 className={classes.commitmentsTitle}>Security</h3>
                  <p>Modern websites make a profit selling your data, we are commited to never collecting or distributing our users private information.</p>
                  <h4>See our <Link className={classes.selectable} to={`/PrivacyPolicy`}>Terms of Service</Link></h4>
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
