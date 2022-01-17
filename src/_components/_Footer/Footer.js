import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
 footerContainer:{
	display:'flex',
 	flexWrap:'wrap',
 	background:theme.palette.background.default,
 	color:theme.palette.text.disabled,
 	alignItems:'center',
 	maxWidth:'100%',
	width:'100%',
},footerLeft:{
 	minWidth: '100%',
 	display: 'flex',
 	flexWrap: 'wrap',
 	order:1,
	'@global > * ':{
	 	textDecoration: 'none',
	 	color:'inherit',
	 	display: 'block',
	 	padding: '15px',
	 	whiteSpace: 'nowrap',
		'&:hover':{
			color:theme.palette.text.primary,
		},
 	},
},patreon:{
    marginLeft:'auto',
},
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footerContainer}>
		<div className={classes.footerLeft}>
			<span>2022 Clear Legislation </span>
			<a href="https://www.patreon.com/clearlegislation">Donate</a>
			<Link to={`/PrivacyPolicy`}>Privacy</Link>
			<Link to={`/DakotahPettry`}>Founder</Link>
			<Link to={`/About`}>What is Clear Legislation?</Link>
            <a className={classes.patreon}href="https://www.patreon.com/clearlegislation">Patreon</a>
		</div>
	</div>
  );
};

export default Footer;
