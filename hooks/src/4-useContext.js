
import { createContext, useContext, useState } from 'react'

const Context = createContext()

const useCustomContext = () => {
    return useContext(Context)
}

const ContextProvider = (props) => {

    const [stateContext, setStateContext] = useState(0)

    const value = {
        counter: stateContext,
        setCounter: setStateContext
    }

    return (
        <Context.Provider value={value} children={props.children} />
    )
}

const ContextConsumer = () => {
    return (
        <ContextProvider>
            <Container />
        </ContextProvider>
    )
}

const Container = () => {

    const { counter , setCounter } = useCustomContext()

    return (
        <div>
            <p>You clicked context {counter} times</p>
            <button onClick={() => setCounter(counter + 1)}>
                Click me
            </button>
        </div>
    )
}

export default ContextConsumer