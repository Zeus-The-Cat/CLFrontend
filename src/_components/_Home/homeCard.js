import React, {useState} from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    enter:{
        background:theme.palette.primary.light,
        padding:8,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:5,
    },
	homepageCard:{
		display:'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'stretch',
		textAlign: 'center',
		borderRadius: '5px',
		width:'35%',
		paddingTop:'10px',
		backgroundColor:theme.palette.background.paper,
		'@global > div':{
			textAlign: 'center',
			opacity:0,
			width:'100%',
			padding:'0% 10% 0% 10%',
			flexGrow:5,
			fontWeight: 500,
			fontSize: '1.5em',
		},
		'@global > h2':{
			flexGrow:3,
			'&:hover':{
				color:theme.palette.primary.dark,
				cursor:'pointer',
			},
		},
		'@global > h4':{
			cursor:'pointer',
			alignSelf:'center',
			borderStyle: 'none',
			borderRadius: '4px',
			opacity:0,
			fontWeight: 800,
			display:'flex',
			alignItems:'center',
			justifyContent:'center',
			fontSize: '1.75em',
			paddingRight:theme.spacing(2),
			paddingLeft:theme.spacing(2),
			width:'auto',
			'&:hover':{
				color:theme.palette.primary.main,
			},
			'@global > *':{
				textDecoration: 'none',
				color:'inherit',
			},
		},
	},
}));

const HomepageCard = (page,title,body) => {
	const classes = useStyles();
	const [toggle,set] = useState(true);
	const [toggleCard,setCard] = useState(true);
	const propsCard = useSpring({
		to:{height:415},
		from:{height:75},
		delay:()=> toggleCard ? 100 : 0,
		reverse:toggleCard,
		config:config.default
	})
	const props = useSpring({
	  to: { opacity: 1, transform: 'scaleY(1)', maxHeight: '300px' },
	  from: { opacity: 0, transform: 'scaleY(0)', maxHeight: '0px' },
	  reverse: toggle,
	  delay:()=> toggleCard ? 0 : 375,
	  config: config.default,
	   })
	const propsHeader = useSpring({
		to: {paddingTop:'0px'},
		from: {paddingTop:'60px'},
		reverse: toggle,
		delay:()=> toggleCard ? 0 : 500,
		config: config.default,
		})
	const onClick = () => {
		setCard(!toggleCard);
		set(!toggle);
	};
	return(
		<animated.div style={propsCard} className={classes.homepageCard}>
			<animated.h2 style={propsHeader} onClick={()=>onClick()}>{title}</animated.h2>
			<animated.div style={props}>{body}</animated.div>
			<animated.h4 style={props}>
				<Link to={`/${page}`} className={classes.enter}>Enter</Link>
			</animated.h4>

		</animated.div>
	)
}
export default HomepageCard;
