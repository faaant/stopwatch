import './stopwatch.scss'
import { Observable } from 'rxjs'
import { useState } from 'react';

let subscription, click;
export default function Stopwatch () {
    let [counter, setCounter] = useState(0);
    let timer$ = new Observable ( (observer) => {
        setInterval(()=>{
            observer.next(++counter)
        }, 1000);
    }) 

    function start () {
        if (subscription && !subscription.closed) {
            return;
        }
        subscription = timer$.subscribe(newState => {setCounter(newState)});
    }

    function stop () {
        subscription.unsubscribe();
        setCounter(0);
    }

    function reset () {
        if (subscription && subscription?.closed) {
            subscription.unsubscribe();
            setCounter(0);
            counter = 0;
            return;
        }
        subscription.unsubscribe();
        setCounter(0);
        counter = 0;
        subscription = timer$.subscribe(newState => {setCounter(newState)});
    }

    function wait () {
        if (Date.now() - click <= 300) {
            subscription.unsubscribe();
            click = 0;
            return;
        }
        click = Date.now();
    }

    return (
        <div className="stopwatch">
            <div className="panel">{new Date(counter * 1000).toISOString().substring(11, 19)}</div>
            <div className = "control" onClick={start}>Start</div>
            <div className = "control" onClick={stop}>Stop</div>
            <div className = "control" onClick={reset}>Reset</div>
            <div className = "control" onClick={wait}>Wait</div>
        </div>
    )
}