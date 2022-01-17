import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PortraitRoundedIcon from '@material-ui/icons/PortraitRounded';
import GavelRoundedIcon from '@material-ui/icons/GavelRounded';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';

import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme=>({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  paper:{
    backgroundColor: theme.palette.primary.main,
    borderRadius:'0%',
    flexDirection:'row',
    alignItems:'center'
  },
  navText:{
    paddingLeft:7,
    alignItems: 'center',
    color:theme.palette.primary.dark
  },
  navIcon:{
    alignItems: 'center',
    color:theme.palette.primary.main
  },
  homeIcon:{
    color: theme.palette.text.primary,
  },
  container:{
    backgroundColor: theme.palette.primary.main,
    borderRadius:'0%',
    display:'flex',
    flexDirection:'row'
  },
  title:{
    color:theme.palette.text.primary,
    fontWeight:300,
    borderLeftStyle:'solid',
    borderColor:theme.palette.background.default,
    paddingLeft:'0.5em',
    fontSize:'2.5em',
  }
}));

const Navigation = (props) => {
  const classes = useStyles();
  const [navOpened, setNavOpened] = useState(false);


  const toggleNavigation = (open) => (event) => {
    if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
      return;
    }

    setNavOpened(open);
  };
  function changeText(text) {
    switch(text){
      case 'CompareLeg':
        return 'Compare'
      default:
        return text
    }
  };
  const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleNavigation(false)}
        onKeyDown={toggleNavigation(false)}
      >
        <List>
          {['Home', 'CompareLeg', 'Bills', 'About', 'Contact'].map((text, index) => (
            <Link style={{textDecoration:'none'}} key={text} to={`/${text}`}>
              <ListItem button={true} >
                <ListItemIcon className={classes.navIcon}>{getNavIcon(index)}
                  <ListItemText className={classes.navText} primary={changeText(text)} />
                </ListItemIcon>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </div>
    );
  function getNavIcon(index){
    const navIcons = [<HomeRoundedIcon />,<PortraitRoundedIcon />,
      <GavelRoundedIcon />,<HelpOutlineRoundedIcon />,<MailIcon />];
    if(index < navIcons.length){
      return navIcons[index];
    }
    return navIcons[0];
  }

  return (
    <React.Fragment key={'left'}>
        <div className={classes.container}>
          <div>
            <Button onClick={toggleNavigation(true)}>
              <HomeRoundedIcon fontSize="large" className={classes.homeIcon}/>
            </Button>
            <Drawer anchor={'left'} open={navOpened} onClose={toggleNavigation(false)}>
              {list('left')}
            </Drawer>
          </div>
          <div className={classes.title}> Clear <b>Legislation</b></div>
        </div>
    </React.Fragment>
  );
};

export default Navigation;
