"use client";
import React, { useState, useEffect } from 'react'
import * as d3 from "d3"
import 'bootstrap/dist/css/bootstrap.css'
import { Row, Col, Container } from 'react-bootstrap'
import ScatterPlot from './components/scatterPlot'
import BarChart from './components/barChart'
import Tooltip from './components/tooltips'

const csvUrl = 'https://gist.githubusercontent.com/hogwild/3b9aa737bde61dcb4dfa60cde8046e04/raw/citibike2020.csv'

function useData(csvPath) {
    const [dataAll, setData] = useState(null);
    useEffect(() => {
        d3.csv(csvPath).then(data => {
            data.forEach(d => {
                d.start = +d.start;
                d.tripdurationS = +d.tripdurationS;
                d.end = +d.end;
                d.tripdurationE = +d.tripdurationE;
            });
            setData(data);
        });
    }, [csvPath]);
    return dataAll;
}

const Charts = () => {
    const [month, setMonth] = useState('4');
    // Task 5
    const [selectedStation, setSelectedStation] = useState(null);
    // Task 6
    const [tooltipX, setTooltipX] = useState(null);
    const [tooltipY, setTooltipY] = useState(null);

    const dataAll = useData(csvUrl);
    if (!dataAll) return <pre>Loading...</pre>;

    const WIDTH = 600;
    const HEIGHT = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 35 };
    const innerWidth = WIDTH - margin.left - margin.right;
    const innerHeightScatter = HEIGHT - margin.top - margin.bottom;
    const innerHeightBar = HEIGHT - margin.top - margin.bottom - 120;

    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = dataAll.filter(d => d.month === MONTH[month]);

    const xScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationS)]).range([0, innerWidth]).nice();
    const yScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationE)]).range([innerHeightScatter, 0]).nice();

    const xScaleBar = d3.scaleBand()
        .domain(data.map(d => d.station).reverse()).range([0, innerWidth]);
    const yScaleBar = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.start)]).range([innerHeightBar, 0]).nice();
    return (
        <Container>
            <Row>
                <Col lg={3} md={2}>
                    <input type='range' min='0' max='11' value={month} step='1' onChange={(e) => setMonth(e.target.value)} />
                    <input
                        type="text"
                        className="form-control mt-2"
                        value={MONTH[month]}
                        readOnly
                        style={{ width: '180px', height: "30px", borderColor: "black" }}
                    />
                </Col>
            </Row>
            <Row className='justify-content-md-center'>
                <Col>
                    <svg width={WIDTH} height={HEIGHT}>
                        <ScatterPlot
                            offsetX={margin.left} offsetY={margin.top} data={data}
                            xScale={xScaleScatter} yScale={yScaleScatter}
                            height={innerHeightScatter} width={innerWidth}
                            selectedStation={selectedStation} setSelectedStation={setSelectedStation}
                            setTooltipX={setTooltipX} setTooltipY={setTooltipY}
                        />
                    </svg>
                </Col>
                <Col>
                    <svg width={WIDTH} height={HEIGHT}>
                        <BarChart
                            offsetX={margin.left} offsetY={margin.top} data={data}
                            xScale={xScaleBar} yScale={yScaleBar}
                            height={innerHeightBar} width={innerWidth}
                            selectedStation={selectedStation} setSelectedStation={setSelectedStation}
                        />
                    </svg>
                </Col>
            </Row>
            {selectedStation && tooltipX && (
                <Tooltip
                    d={data.find(d => d.station === selectedStation)}
                    x={tooltipX} y={tooltipY}
                />
            )}
        </Container>
    )
}
export default Charts;