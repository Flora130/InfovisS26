import React from 'react';

function Bars(props) {
    const { data, xScale, yScale, height, selectedStation, setSelectedStation } = props;

    if (!data) return <g></g>;

    return (
        <g>
            {data.map((d, i) => (
                <rect
                    key={i}
                    x={xScale(d.station)} y={yScale(d.start)}
                    width={xScale.bandwidth()} height={height - yScale(d.start)}
                    fill={selectedStation === d.station ? 'red' : 'steelblue'}
                    stroke="black"
                    onMouseEnter={() => setSelectedStation(d.station)}
                    onMouseOut={() => setSelectedStation(null)}
                />
            ))}
        </g>
    );
}
export default Bars;