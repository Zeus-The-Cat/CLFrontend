import React,{Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './subcomponents.module.css';

import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

const useStyles = makeStyles((theme) => ({
	filterButton:{
		backgroundColor: theme.palette.primary.main,
		color:theme.palette.common.black,
		display:'inline-flex',
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		fontSize:'18px',
		lineHeight:'18px',
		padding:'2px',
		userSelect: 'none',
		'&:hover':{
			background:theme.palette.primary.light,
			color:theme.palette.primary.dark,
			animation:'background',
			animationDuration:'100',
			cursor:'pointer',
		}
	},
	largeIcon:{
		fontSize:'large',
	}
}));

const FilterButton = (content,onClick,sortValue,index) => {
	const classes = useStyles();
	const renderIcon = (value) =>{
		switch(value){
			case 0:
				return(<RemoveRoundedIcon className={styles.largeIcon}
				aria-describedby={`${content}-Not-Sorted`}/>)
			case 1:
				return(<ExpandMoreRoundedIcon className={styles.largeIcon}
			   aria-describedby={`${content}-ascending-sorting-order`}/>)
			case 2:
				return(<ExpandLessRoundedIcon className={styles.largeIcon}
				aria-describedby={`${content}-descending-sorting-order`}/>)
			default:
				return('')
		}
	}
	return(
		<Fragment>
			<div onClick={()=>{onClick(index)}} className={classes.filterButton}>
				<div>{content}</div>
				{renderIcon(sortValue[index])}
			</div>
		</Fragment>
	)
}

export default FilterButton;
