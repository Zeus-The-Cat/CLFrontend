import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//---v---Icons---v---
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    whiteSpace:'auto'
  },contacts: {
    display:'flex',
    alignItems: 'center'
  },totalVotes:{
    color:'green',
  }, missedVotes:{
    color:'red',
  }
}));


const Content = (props) => {
    const classes = useStyles();

    function get(obj, key) {
      return key.split('.').reduce(function(o, x) {
          return (typeof o == 'undefined' || o === null) ? o : o[x];
      }, obj);
    } 

    const openInNewTab = (url) => {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    }
    
    const legislatorImage = (resolution) => {
        if(get(props, 'data.bioguide') !== '0' && get(props,'data.bioguide')){ 
            return (<img alt={`${get(props, 'data.full_name')} portrait`} className={classes.portrait}
                src={`https://theunitedstates.io/images/congress/${resolution}/${get(props,'data.bioguide')}.jpg`} 
                />)
        }else{
        return <img alt='Not available' src="https://icon-library.net//images/no-profile-picture-icon/no-profile-picture-icon-11.jpg" width="275" />
        }
    };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item style={{float:'left'}} sm={12}>
            {legislatorImage('225x275')}<br/>
        </Grid>
        <Grid container className={classes.contacts}>
          <Grid item sm={3}>
            <IconButton className={classes.inline} aria-label="Legislator Website" onClick={() => openInNewTab(get(props,'data.url'))}>
              <AccountBoxIcon fontSize="large" /><br />
              <p>Website</p>
            </IconButton>
          </Grid>
          <Grid item sm={3}>
            <div aria-label="Phone Number">
              <PhoneForwardedIcon fontSize="large" className={classes.phoneIcon} />
              <p className={classes.phoneNumber}>{get(props,'data.phone')}</p>
            </div>
          </Grid>
          <Grid item sm={2}>
            <IconButton aria-label="Twitter Link" onClick={() => openInNewTab(`https://twitter.com/${get(props,'data.twitter_account')}`)}>
              <TwitterIcon fontSize="large" color="primary" />
            </IconButton>
          </Grid>
          <Grid item sm={2}>
            <IconButton aria-label="Facebook Link" onClick={() => openInNewTab(`https://www.facebook.com/${get(props,'data.facebook_account')}`)}>
              <FacebookIcon fontSize="large" color="primary"/>
            </IconButton>
          </Grid>
          <Grid item sm={2}>
            <IconButton aria-label="Youtube Link" onClick={() => openInNewTab(`https://www.youtube.com/${get(props,'data.youtube_account')}`)}>
              <YouTubeIcon fontSize="large" color="primary"/>
            </IconButton>
          </Grid>
        </Grid>
        <Grid item  sm={6}>
          Total Votes: <span className={classes.totalVotes}>{get(props,'data.total_votes')}</span>
        </Grid>
        <Grid item  sm={6}>
          Missed Votes: <span className={classes.missedVotes}>{get(props,'data.missed_votes')}</span>
        </Grid>
       </Grid> 
    </div>
  );
};

export default Content;
