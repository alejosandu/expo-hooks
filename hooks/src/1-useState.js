
import React , { useState } from 'react'

const UseState = () => {
    // Declara una nueva variable de estado, que llamaremos "count".
    const [count, setCount] = useState(0);

    const update = () => {
        setCount(count + 5)
    }

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={update}>
                Click me
            </button>
        </div>
    );
}

export default UseState