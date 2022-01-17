import React,{useState,useEffect} from 'react';
import styles from './DakotahPettry.module.css';

const TerminalWriter = ({order,setOrder,index,text,delay}) => {
    const [line, setLine] = useState('')
    const resolveAfterMs = (letter,ms) => {
        return new Promise(resolve => {
          setTimeout(() => {
              resolve(letter)
            }, ms)
        })
      }

      const writeTerminal = async (textString="",setState) => {
          // needs to process textString to determine size of words
          // changing write speed until a new word is encountered
          let state = '> '
          let text = textString.split(" ")
          let speed = 13; // fastest possible is 16
          for(let i = 0; i < text.length; i++){
              let each = text[i]
              speed = 12 + each.length*2.75
              let word = Array.from(each)
              for(let ii = 0; ii < word.length; ii++){
                  let letter = word[ii]
                  state += await resolveAfterMs(letter,speed)
                  setState(state)
              }
              state += await resolveAfterMs(' ',speed)
              setState(state)
          }
          return new Promise(resolve => {
              resolve(true)
          })
      }

    useEffect(()=>{
        async function writeData(){
            await writeTerminal(text,setLine)
            let temp = order.map((x)=>x)
            if(temp.length-1 > index){
                temp[index] = false
                temp[index+1] = true
                setOrder(temp)
            }
        }
        if(order[index]){
            setLine('> ')
            setTimeout(async ()=>{
                writeData()
            },delay[index])
        }
    },[order])

    return(
        <span>{line}<span className={order[index]?styles.active:null}></span></span>
    )
}

export default TerminalWriter;
