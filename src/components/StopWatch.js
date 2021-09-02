import React, {useEffect, useState} from 'react';
import Contact from './contact'

import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

export default function StopWatch() {

    const [time, setTime] = useState(0);
    const [watchOn, setWatchOn] = useState(false);

    const [active, setActive] = useState(true);


    useEffect(() => {
        const unsubscribe = new Subject();
        interval(10)
            .pipe(takeUntil(unsubscribe))
            .subscribe(() => {
              if (watchOn) {
                setTime(val => val + 1);
              }
            });
        return () => {
          unsubscribe.next();
          unsubscribe.complete();
        };
      }, [watchOn]);

    const handleStart = () => {
        setWatchOn(prevState => !prevState);
        setActive(false);
    }
    const handleStop = () => {
        setTime(0);
        setWatchOn(false);
        setActive(true);
      }
    const handleWait = () => {
        if (time !== 0) {
            setWatchOn(false);
        }
        setActive(true);
    }
    const handleReset = () => {
        setTime(0);
        if (time === 0) {
            setWatchOn(prevState => !prevState);
        }
    }

    return (
        <div className='StopWatch'>
            <div className="stopWatch_wrapper">
                <h1>StopWatch</h1>
                <div className="StopWatch-timer">
                    <span>{('0' + Math.floor((time / (1000 * 60 * 60)) % 24)).slice(-2)}h</span>
                    :
                    <span>{('0' + Math.floor(time / 6000)).slice(-2)}m</span>
                    :
                    <span>{('0' + Math.floor((time / 100) % 60)).slice(-2)}s</span>
                </div>

                {
                active 
                ?
                <div className="button-wrapper">
                    <button className='start-btn' onClick={handleStart}>Start</button>
                    <button className='Wait-btn' onClick={handleWait}>Wait</button>
                    <button className='Stop-btn' onClick={handleStop}>Stop</button>
                    <button className='Reset-btn' onDoubleClick={handleReset}>Reset</button>
                </div>
                :
                <div className="button-wrapper">
                    <button className='Wait-btn' onClick={handleWait}>Wait</button>
                    <button className='Stop-btn' onClick={handleStop}>Stop</button>
                    <button className='Reset-btn' onDoubleClick={handleReset}>Reset</button>
                </div>
                }

            </div>
            
            <Contact/>
        </div>
    )
}
