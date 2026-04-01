import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function YAxis(props) {
    const { yScale, axisLable } = props;
    const ref = useRef();

    useEffect(() => {
        if (yScale) {

            const axis = d3.axisLeft(yScale);
            d3.select(ref.current).call(axis);
        }
    }, [yScale]);

    if (yScale) {
        return (
            <g>
                <g ref={ref} />
                <text
                    style={{ textAnchor: 'end', fontSize: '15px' }}
                    transform={`translate(20, 0) rotate(-90)`}
                >
                    {axisLable}
                </text>
            </g>
        );
    } else {
        return <g></g>;
    }
}

export default YAxis;