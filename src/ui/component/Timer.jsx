import moment from 'jalali-moment';
import React, { useEffect, useRef, useState } from 'react'
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Store } from './../../redux/store/index';
import { withRouter } from 'react-router-dom';
const renderTime = (dimension, time) => {
    return (
        <div className="time-wrapper">
            <div className="time">
                <p>{time}</p>
            </div>
            <div>{dimension}</div>
        </div>
    );
};
//   Number(moment().locale('fa').format('YYYYMMDDhhmm'))
const Timer = (props) => {
    const [hour, setHour] = useState('00')
    const [min, setMin] = useState('00')
    const [sec, setSec] = useState('00')
    const u=1
    useEffect(()=>{
        ftt(Store.getState().Time)
        return ()=>{
            clearInterval(interval)
        } 
    },[u])
    
    let interval = useRef()
    const ftt=(time)=>{
        //time diffrent
        const spendTime=((Number(moment().locale('fa').format('HH'))-Number(time.hour))*60)+((Number(moment().locale('fa').format('mm'))-Number(time.min)))
        let result=((Number(time.duration))-spendTime)*60;
        let eT=(new Date().getTime())+(result*1000)+(60-(Number(moment().locale('fa').format('ss')))*1000)
        interval = setInterval(() => {
            let sT=new Date().getTime()
            let remain=eT-sT
            let hour1=Math.floor((remain%(1000*3600*24))/(1000*3600))
            let min1=Math.floor((remain%(1000*3600))/(1000*60))
            let sec1=Math.floor((remain%(1000*60))/(1000))        

            if ((eT-sT) < 0) {
                clearInterval(interval)
                props.history.push('/')
            } else {
                setHour(hour1)
                setMin(min1)
                setSec(sec1)
            }
    
        }, 1000);
    
    
    }
    
    const timerProps = {
        isPlaying: true,
        size: 120,
        strokeWidth: 6
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <div style={{ marginRight: 10, marginLeft: 10 }}>
                <CountdownCircleTimer
                    {...timerProps}
                    colors={[["#EF798A"]]}

                >
                    {({ elapsedTime }) =>
                        renderTime("ثانیه", sec)
                    }
                </CountdownCircleTimer>
            </div>
            <div style={{ marginRight: 10, marginLeft: 10 }}>
                <CountdownCircleTimer
                    {...timerProps}
                    colors={[["#D14081"]]}
                >
                    {({ elapsedTime }) =>
                        renderTime("دقیقه", min)
                    }
                </CountdownCircleTimer>
            </div>

            <div style={{ marginRight: 10, marginLeft: 10 }}>
                <CountdownCircleTimer
                    {...timerProps}
                    colors={[["#7E2E84"]]}

                >
                    {({ elapsedTime }) =>
                        renderTime("ساعت", hour)
                    }
                </CountdownCircleTimer>
            </div>
        </div>


    );
}

export default withRouter( Timer);