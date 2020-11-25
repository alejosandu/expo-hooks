
import React , { useEffect, useState } from 'react'


const useCustomHook = () => {
    const [coords, setCoords] = useState({ x: 0 , y: 0})

    useEffect(() => {
        const handleMouseMove = (evt) => {
            setCoords({ x: evt.clientX , y: evt.clientY })
        }

        document.addEventListener("mousemove", handleMouseMove)

        return () => document.removeEventListener("mousemove", handleMouseMove)

    }, [])

    return coords
}


const CustomHook = () => {

    const { x , y } = useCustomHook()

    return (
        <div>
            x: {x} - y: {y}
        </div>
    );
}

export default CustomHook