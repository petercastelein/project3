import "./styles.css";
import { useState, useRef } from "react";



export default function App() {
  return (
    <div className="App">
      <h1>Use Counter some pass in the menu item, need output the total num of item</h1>
      <h2>from total num of item, multiply by item price then modify item price</h2>
      
      <UseStateCounter />
      <UseStateCounter />
    </div>
    
  );
}
// Use Counter some pass in the menu item, need output the total num of item
// from total num of item, multiply by item price then modify item price

// Promise-ified version of setTimeout
const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const UseStateCounter = () => {
    const [value, setValue] = useState(0);
    const changeRef = useRef(Promise.resolve());

  

    const reset = () => {
        queueValueUpdate(0, false);
    };

    // A function to do the queued update
    const queueValueUpdate = (change, isDelta = true) => {
        changeRef.current = changeRef.current
            
            .then(() => timeout(4)) // Add a delay
            
            .then(() => setValue(prevValue => isDelta ? prevValue + change : change));
    };

    const asyncIncrease = () => {
        queueValueUpdate(1);
    };

    const asyncDecrease = () => {
        queueValueUpdate(-1);
    };

    return <>
        <section style={{ margin: '4rem 0' }}>
            <h3>Counter</h3>
            <h2>{value}</h2>
            <button className='btn' onClick={asyncDecrease}>Async Decrease</button>
            <button className='btn' onClick={reset}>Reset</button>
            <button className='btn' onClick={asyncIncrease}>Async Increase</button>
        </section>
    </>;
};
