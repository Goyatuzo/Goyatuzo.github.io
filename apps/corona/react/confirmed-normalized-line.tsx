import * as React from 'react';
import { CrnLocation } from '../classes/location';
import { NormalizedGraphEntry } from '../classes/graph';
import { connect } from 'react-redux';
import { select, stack, scaleUtc, extent, scaleLinear, max, scaleOrdinal, area, axisBottom, axisLeft, stackOffsetExpand, interpolateHcl, range, schemeCategory10 } from 'd3';
import { CrnTableState } from '../redux/reducers';
import { selectLocation } from '../redux/actions';

interface ExternalProps {
    generateDataSet: (data: CrnLocation[]) => NormalizedGraphEntry[];
}

interface StateToProps {
    data: CrnLocation[];
    chosenLocation: string;
}

interface DispatchToProps {
    removeCountry: () => void;
}

type GraphProps = ExternalProps & StateToProps & DispatchToProps;

interface GraphState {
    width: number;
    height: number;
    keys: string[];
}

class ConfirmedNormalizedAreaChartComp extends React.PureComponent<GraphProps, GraphState> {
    private svgRef: React.RefObject<SVGSVGElement>;

    constructor(props: GraphProps) {
        super(props);

        this.svgRef = React.createRef<SVGSVGElement>();

        this.state = {
            width: 1150,
            height: 500,
            keys: ['deaths', 'recovered', 'confirmed']
        };
    }

    componentDidUpdate() {
        this.createChart();
    }

    private createChart = () => {
        
        // Clear existing graph
        const svg = select(this.svgRef.current);
        svg.selectAll('*').remove();
        
        const margin = ({ top: 20, right: 30, bottom: 30, left: 50 })
        
        const series = this.props.generateDataSet(this.props.data);

        const keys = Object.keys(series[series.length - 1]).filter(key => key !== "date").sort((a, b) => {
            const last = series[series.length - 1];

            return last[a] - last[b];
        });

        console.log(keys);
        
        const stacked = stack().keys(keys).offset(stackOffsetExpand)((series as any));
        const x = scaleUtc().domain(extent(series, d => d.date)).range([margin.left, this.state.width - margin.right]);
        const y = scaleLinear().range([this.state.height - margin.bottom, margin.top]);
        const areas = area<any>().x(d => x(d.data.date)).y0(d => y(d[0])).y1(d => y(d[1]));        
        const colors = scaleOrdinal<string>().domain(keys).range(schemeCategory10);

        svg.append('g')
            .selectAll('path')
            .data(stacked)
            .join('path')
                .attr('fill', ({ key }) => colors(key))
                .attr('d', areas)
            .append('title')
                .text(({key}) => key);

        // x-axis
        svg.append('g')
            .call(g => g
                .attr('transform', `translate(0, ${this.state.height - margin.bottom})`)
                .call(axisBottom(x).ticks(this.state.width / 80).tickSizeOuter(0)));

        // y-axis
        svg.append('g')
            .call(g => g
                .attr("transform", `translate(${margin.left},0)`)
                .call(axisLeft(y).ticks(10, "%"))
                .call(g => g.select(".domain").remove()));

    }

    render() {
        return (
            <div className="">
                <h2 className="ui header">Normalized Confirmed Cases by Country</h2>
                <p>Hover over the shaded area to see the name of the country.</p>
                {
                    this.props.chosenLocation ? <button type="button" onClick={() => this.props.removeCountry()}>Show All Data</button> : null
                }
                <div className="ui segments">
                    <svg ref={this.svgRef} width={this.state.width} height={this.state.height} viewBox={`0 0 ${this.state.width} ${this.state.height}`} preserveAspectRatio="xMidYMid meet" />

                    <div className="ui segment">
                        Data sourced from:
                        <a href="https://github.com/CSSEGISandData/COVID-19">Johns Hopkins CSSE</a>
                    </div>
                </div>
            </div>
        );
    }
}

const ConfirmedNormalizedAreaChart = connect<StateToProps, DispatchToProps, ExternalProps, CrnTableState>(state => {
    return {
        data: state.locations,
        chosenLocation: state.chosenLocation
    }
}, (dispatch) => {
    return {
        removeCountry: () => dispatch(selectLocation(null))
    }
})(ConfirmedNormalizedAreaChartComp);

export default ConfirmedNormalizedAreaChart;