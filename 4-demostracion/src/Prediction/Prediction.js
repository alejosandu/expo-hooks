
import { useState, useEffect, useMemo } from 'react'
import ReactDatePicker from 'react-datepicker'
import Chart from 'react-apexcharts'
import request from 'helpers/request'

import "react-datepicker/dist/react-datepicker.css";

const Prediction = (props) => {

    const [data, setData] = useState([])
    const [nextPage, setNext] = useState("")
    const [page, setPage] = useState(1)
    const [region, setRegion] = useState("Nacional")
    const [date, setDate] = useState(new Date())

    const handleChangeDate = (date = new Date()) => {
        setDate(date)
    }

    useEffect(() => {
        const requestData = async () => {
            try {

                const response = await request(
                    "http://localhost:8000/v2/track_prices/pricepig/",
                    {
                        body: {
                            date__lte: date.toISOString(),
                            region
                        }
                    }
                )
                console.log("promise", response);
                const { results = [], next } = response
                setData([...results])
                setNext(next)
            } catch (error) {
                console.error(error);
            }
        }

        requestData()
    }, [date])

    useEffect(() => {

        if (!nextPage) return

        const requestNext = async () => {
            try {
                const response = await request(nextPage)
                console.log("promise", response);
                const { results = [], next } = response
                setData((data) => [...results, ...data])
                setNext(next)
            } catch (error) {
                console.error(error);
            }
        }

        requestNext()
    }, [page])

    const graph = useMemo(() => {
        const series = [
            {
                name: region,
                type: "line",
                data: data.map((d) => {
                    const { date, value } = d
                    return [new Date(date).getTime(), value]
                })
            }
        ]

        return (
            <Chart
                options={{
                    grid: {
                        padding: {
                            left: 30,
                        },
                        show: false
                    },
                    legend: {
                        show: false,
                    },
                    stroke: {
                        show: true,
                    },
                    fill: {
                        colors: ['#FFFFFF', '#426cbc'],
                        opacity: ['1', '1'],
                        type: 'solid',
                    },
                    xaxis: {
                        type: "datetime"
                    },
                    yaxis: {
                        show: true,
                        opposite: true,
                    },
                    chart: { toolbar: { show: false } },
                    markers: {
                        // size: dotSize,
                    },
                    noData: {
                        text: "noData",
                        align: 'center',
                        verticalAlign: 'middle',
                        offsetX: 0,
                        offsetY: 0,
                        style: {
                            color: undefined,
                            fontSize: '14px',
                            fontFamily: undefined
                        }
                    },
                }}
                series={series}
                height={"500px"}
                width={"100%"}
            />
        )
    }, [data, region])

    return (
        <div>
            <ReactDatePicker onChange={handleChangeDate} dateFormat="yyyy-MM-dd" selected={date} />
            <button type="button" onClick={() => setPage(page + 1)} disabled={!nextPage} >Load more</button>
            <div>resultados: {data.length}</div>
            {graph}
        </div>
    )
}

export default Prediction