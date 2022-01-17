import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme) => ({
	helpContent:{
		flexGrow:1,
	},modal:{
	  position: 'fixed',
	  zIndex: 2,
	  top:0,
	  width: '100%',
	  height: '100%',
	  background: 'rgba(0, 0, 0, 0.25)',
  	},modal_content:{
	  position: 'absolute',
	  top: '10%',
	  left: '10%',
	  width: '80%',
	  padding: '20px',
	  maxHeight:'80vh',
	  '@media (min-width: 1024px)':{
		  top: '20%',
		  left: '30%',
		  width: '40%',
		  padding: '20px',
	  },
	  borderRadius: '5px',
	  background:theme.palette.background.default,
    },close:{
	  fontSize:'small',
	  float: 'right',
	  '&:hover':{
	  cursor: 'pointer',
  	  }
  },sbmContainer:{
  	display:'flex',
  	flexDirection:'column',
  	alignItems:'left',
  	justifyContent:'center',
  	minHeight:'50vh',
  	padding:'0px 15px 0px 15px',
  },sbmChangePage:{
  	display:'flex',
  	alignItems:'center',
  	justifyContent:'center',
  	alignSelf:'center',
  	flexGrow:0,
	'& > div':{
	  	cursor: 'pointer',
	  	padding:'5px',
	},
  },
}));
//Will need to use context for a global modal attribute!
/*provides instructions for each passed component*/
const SearchBillsModal = (toggle) => {
	const classes = useStyles();
	const [pageNumber, setPageNumber] = useState(1);
	const changePage = (direction) => {
		if(direction === -1 && pageNumber > 1){
			setPageNumber(pageNumber-1);
		}else if(direction === 1 && pageNumber < 4){
			setPageNumber(pageNumber+1);
		}
	}
	const closeModal = (toggle) => {
		setPageNumber(1);
		toggle();
	}
	const renderPage = (index) =>{
		switch(index){
			case 1:
				return(
					<div className={classes.helpContent}>
						<h3 style={{textAlign:'center'}}>Sorting Options</h3>
						<h4>Title</h4>
						<p>Sorts Titles of Legislation alphabetically</p>
						<h4>Date</h4>
						<p>Sorts Legislation by Date</p>
						<h4>Sponsor</h4>
						<p>Sorts Legislation by Sponsor Title</p>
						<h4>Activity</h4>
                        <p>Sorts Legislation by Activity type</p>
					</div>
				)
			case 2:
				return(
					<div className={classes.helpContent}>
                    <h2> Under Construction </h2>

					</div>)
			case 3:
				return(
					<div className={classes.helpContent}>
                    <h2> Under Construction </h2>

					</div>)
			case 4:
				return(
					<div className={classes.helpContent}>
                    <h2> Under Construction </h2>

					</div>)
			default:
				return(
					<div className={classes.helpContent}>

					</div>)
		}
	}
	return (
	   <div className={classes.modal}>
	        <div className={classes.modal_content}>
				<IconButton
				   onClick={()=>{closeModal(toggle)}}
				   aria-label="Close Modal"
				   className={classes.close}
				 >
			    	<CloseIcon fontSize="small"></CloseIcon>
				</IconButton>
				<div className={classes.sbmContainer}>
		 		    {renderPage(pageNumber)}
		 		    <div className={classes.sbmChangePage}>
		 			   <div>
		 			   <IconButton
		 				  onClick={()=>{changePage(-1)}}
		 				  aria-label="Previous Help Section"
		 				>
		 				   <KeyboardArrowLeft className={classes.largeIcon} aria-describedby={'Next Help section'} />
		 			    </IconButton>
		 			    </div>
		 				{pageNumber} / 4
		 			    <div>
		 				   <IconButton
		 					  onClick={()=>{changePage(1)}}
		 					  aria-label="Next Help Section"
		 					>
		 					   <KeyboardArrowRight className={classes.largeIcon} aria-describedby={'Next Help section'} />
		 				    </IconButton>
		 			    </div>
		 		    </div>
		 		</div>
	    	</div>
	   </div>
  	);
}
export default SearchBillsModal;
