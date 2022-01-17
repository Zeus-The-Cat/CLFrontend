import React, {useState,Fragment,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

//Timeline Imports
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
//Icons
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
// import GavelOutlinedIcon from '@material-ui/icons/GavelOutlined';
//Form Controls
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//Animations
import Fade from '@material-ui/core/Fade';
const useStyles = makeStyles((theme) => ({
    timelineContainer:{
        display:'flex',
        flexDirection:'column',
        maxWidth:'100%',
        '@media (max-width: 500px)':{
            maxWidth:'50%'
        }
    },
    timeline:{
        minWidth:'100%',
        '@media (max-width: 500px)':{
            maxWidth:100,
            paddingLeft:0,
        }
    },
    timelineDate:{
        '@media (max-width: 500px)':{
            paddingLeft:0,
            paddingRight:5,
        }
    },
    timelineContent:{
        '@media (max-width: 500px)':{
            paddingLeft:6,
            paddingRight:0,
            maxWidth:73,
            overflow:'clip',
        }
    },tl:{
        fontSize: 'clamp(0.7rem,2vw,1.5rem)',
        width:'100%',
        paddingLeft:0,
        justifyContent:'space-around'
    }
}));

const LegTimeline = (props) => {
    const classes = useStyles();

    //accepts [{type:'typename',date:'yyyy-mm-dd'}] other attr are specific to type
	const [timelineElements, setTimelineElements] = useState([]);
    useEffect(()=>{
        setTimelineElements([...props.elements].sort((a,b)=>{
            if (a.date < b.date) {return -1;}
            if (a.date > b.date) {return 1;}
            return 0;
        }))
    },[props.elements,setTimelineElements])
    //Move towards using react spring to transition items within timeline in/out
    //either fade in or move in from right/left

    //filter states for checkboxes
    const [votes,setVotes] = useState(true);
    const [sponsor,setSponsor] = useState(true);
    const [cosponsor,setCosponsor] = useState(true);
    const easing = {enter:"cubic-bezier(0.25, 0.1, 0.25, 1.0)"}
    const voteTimeline = (props) => {
        return(
            <TimelineItem className={classes.timeline}>
                <TimelineOppositeContent className={classes.timelineDate}>
                    {props.date}
                </TimelineOppositeContent>
                <TimelineSeparator style={{color:props.vote === 'Yea'?'green':'red'}}>
                    {props.vote === 'Yea'?<CheckOutlinedIcon />:<ClearOutlinedIcon />}
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className={classes.timelineContent} style={{color:'black'}}>
                    {`Voted ${props.vote} on ${props.title}`}
                </TimelineContent>
            </TimelineItem>
        )
    }
    const sponsorTimeline = (props) => {
        return(
            <TimelineItem className={classes.timeline}>
                <TimelineOppositeContent className={classes.timelineDate}>
                  {props.date}
                </TimelineOppositeContent>
                <TimelineSeparator  style={{color:'darkblue'}}>
                  <CreateOutlinedIcon />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className={classes.timelineContent} style={{color:'black'}}>
                    {`Sponsored ${props.title}`}
                </TimelineContent>
            </TimelineItem>
        )
    }
    const cosponsorTimeline = (props) => {
        return(
            <TimelineItem className={classes.timeline}>
                <TimelineOppositeContent className={classes.timelineDate}>
                  {props.date}
                </TimelineOppositeContent>
                <TimelineSeparator  style={{color:'lightblue'}}>
                  <GroupAddOutlinedIcon />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className={classes.timelineContent} style={{color:'black'}}>
                    {`Cosponsored ${props.title}`}
                </TimelineContent>
            </TimelineItem>
        )
    }
    const endTimeline = () => {
        const today = new Date()
        return(
            <TimelineItem className={classes.timeline}>
                <TimelineOppositeContent style={{color:'grey', paddingLeft:0}}>
                    {today.getFullYear()+'-'}{today.getMonth() + 1 < 10?'0'+(today.getMonth() + 1):today.getMonth() + 1}{'-' + today.getDate()}
                </TimelineOppositeContent>
                <TimelineSeparator >
                    <TimelineDot  />
                </TimelineSeparator>
                <TimelineContent className={classes.timelineContent} style={{color:'black'}}>
                    Present
                </TimelineContent>
            </TimelineItem>
        )
    }
    /*
    const committeeJoinSample = {
        type:'committee',
        date:'2020-01-30',
        title:'Joined',
        congress:'Senate',
        committee:'Finance',
    }
    const committeeTimeline = (props) => {
        return(
            <TimelineItem>
                <TimelineOppositeContent style={{color:'grey'}}>
                  {props.date}
                </TimelineOppositeContent>
                <TimelineSeparator style={{color:'lightblue'}}>
                  <GavelOutlinedIcon style={{margin:2}} />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={{color:'black'}}>
                    {`${props.title} the ${props.congress} ${props.committee} committee`}
                </TimelineContent>
            </TimelineItem>
        )
    }*/


  return(
        <div style={{display:'flex',minHeight:390}}>
            <div className={classes.timelineContainer}>
                <h2 style={{color:'black',justifySelf:'center',marginBottom:5,textDecoration:'underline grey solid'}}>Filters</h2>
                <FormGroup style={{color:'black'}}>
                    <FormControlLabel control={<Checkbox checked={votes} onChange={()=>setVotes(!votes)} />}
                        label="Votes" />
                    <FormControlLabel control={<Checkbox checked={sponsor} onChange={()=>setSponsor(!sponsor)} />}
                        label="Sponsored" />
                    <FormControlLabel control={<Checkbox checked={cosponsor} onChange={()=>setCosponsor(!cosponsor)} />}
                        label="Cosponsored" />
                 </FormGroup>
            <Timeline position="alternate" className={classes.tl}>
                {timelineElements.map((item, i) => {
                    if(item.type === 'vote' && votes){
                        return(
                            <Fragment key={i}>
                                    <Fade in={votes} easing={easing}>
                                        {voteTimeline(item)}
                                    </Fade>
                            </Fragment>
                        )
                    }else if(item.type === 'sponsor' && sponsor){
                        return(
                            <Fragment key={i}>
                                <Fade in={sponsor} easing={easing}>{sponsorTimeline(item)}</Fade>
                            </Fragment>)
                    }else if(item.type === 'cosponsor' && cosponsor){
                        return(
                            <Fragment key={i}>
                                <Fade in={cosponsor} easing={easing}>{cosponsorTimeline(item)}</Fade>
                            </Fragment>)
                    }else{return null}
                })}
                {endTimeline()}
            </Timeline>
            </div>
        </div>
  )
};

export default LegTimeline;
