import React from 'react';

function Points(props) {
    const { data, xScale, yScale, height, width,
        selectedStation, setSelectedStation, setTooltipX, setTooltipY } = props;

    if (!data) return <g></g>;

    return (
        <g>
            <g>
                {data.map((d, i) => (
                    <circle
                        key={`base-${i}`}
                        cx={xScale(d.tripdurationS)} cy={yScale(d.tripdurationE)}
                        r={5} fill={selectedStation === d.station ? 'red' : 'steelblue'} stroke={'black'}
                        onMouseEnter={(event) => {
                            setSelectedStation(d.station);
                            setTooltipX(event.pageX);
                            setTooltipY(event.pageY);
                        }}
                        onMouseOut={() => {
                            setSelectedStation(null);
                            setTooltipX(null);
                            setTooltipY(null);
                        }}
                    />
                ))}
            </g>
            {selectedStation && (
                <rect width={width} height={height} fill="yellow" style={{ opacity: 0.5, pointerEvents: 'none' }} />
            )}
            {selectedStation && data.filter(d => d.station === selectedStation).map((d, i) => (
                <circle
                    key={`highlight-${i}`}
                    cx={xScale(d.tripdurationS)} cy={yScale(d.tripdurationE)}
                    r={10} fill={'red'} stroke={'black'} style={{ pointerEvents: 'none' }}
                />
            ))}
        </g>
    );
}
export default Points;