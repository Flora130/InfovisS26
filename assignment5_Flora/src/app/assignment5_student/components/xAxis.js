import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function XAxis(props) {
    const { xScale, height, width, axisLable } = props;
    const ref = useRef();

    useEffect(() => {
        if (xScale) {

            const isBandScale = typeof xScale.domain()[0] === 'string';

            const axis = d3.axisBottom(xScale);

            if (isBandScale) {
                axis.tickSize(0);
                axis.tickPadding(15);
            } else {
                axis.tickSize(6);
            }

            const g = d3.select(ref.current);
            g.call(axis);


            if (isBandScale) {
                g.selectAll("text")
                    .style("text-anchor", "start")
                    .attr("dx", ".8em")
                    .attr("dy", ".15em")
                    .attr("transform", "rotate(75)");


            } else {

                g.selectAll("text")
                    .style("text-anchor", "middle")
                    .attr("transform", "rotate(0)")
                    .attr("dx", "0")
                    .attr("dy", "0.71em");
            }
        }
    }, [xScale]);

    if (xScale) {
        return (
            <g transform={`translate(0, ${height})`}>
                <g ref={ref} />
                {axisLable && (
                    <text
                        style={{ textAnchor: 'end', fontSize: '15px', fill: 'black' }}
                        x={width}
                        y={-10}
                    >
                        {axisLable}
                    </text>
                )}
            </g>
        );
    } else {
        return <g></g>;
    }
}

export default XAxis;