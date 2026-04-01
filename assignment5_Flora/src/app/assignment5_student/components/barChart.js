import Bars from './bars';
import YAxis from './yAxis';
import XAxis from './xAxis';

function BarChart(props) {
    const { offsetX, offsetY, data, xScale, yScale, height, width, selectedStation, setSelectedStation } = props;

    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            <Bars
                data={data} xScale={xScale} yScale={yScale} height={height}
                selectedStation={selectedStation} setSelectedStation={setSelectedStation}
            />
            <YAxis yScale={yScale} height={height} axisLable={"Bikers start from"} />
            <XAxis xScale={xScale} height={height} width={width} />
        </g>
    );
}
export default BarChart;