
import { useState, useEffect } from 'react'

const UseEffect = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(count);
        return () => console.log("dismount");
    }, [count])

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

export default UseEffect