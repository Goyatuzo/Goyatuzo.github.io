import * as React from 'react';
import { connect } from 'react-redux';
import { select } from 'd3-selection';
import { scaleUtc, extent, scaleLinear, max, stack, scaleOrdinal, schemeCategory10, area, axisBottom, axisLeft } from 'd3';

import { CrnTableState } from '../redux/reducers';
import { CrnLocation } from '../classes/location';
import { selectLocation } from '../redux/actions';
import { OverallGraphEntry } from '../classes/graph';

interface ExternalProps {
    generateDataSet: (data: CrnLocation[]) => OverallGraphEntry[];
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

export class CoronaHistoricGraphComponent extends React.PureComponent<GraphProps, GraphState> {
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

        
        const stacked = stack().keys(this.state.keys)((series as any));
        const x = scaleUtc().domain(extent(series, d => d.date)).range([margin.left, this.state.width - margin.right]);
        const y = scaleLinear().domain([0, max(series, d => d.confirmed + d.deaths + d.recovered)]).nice().range([this.state.height - margin.bottom, margin.top]);
        const colors = scaleOrdinal<string>().domain(this.state.keys).range(schemeCategory10);
        const areas = area<any>().x(d => x(d.data.date)).y0(d => y(d[0])).y1(d => y(d[1]));

        svg.append('g')
            .selectAll('path')
            .data(stacked)
            .join('path')
            .attr('fill', ({ key }) => colors(key))
            .attr('d', areas);

        // x-axis
        svg.append('g')
            .call(g => g
                .attr('transform', `translate(0, ${this.state.height - margin.bottom})`)
                .call(axisBottom(x).ticks(this.state.width / 80).tickSizeOuter(0)));

        // y-axis
        svg.append('g')
            .call(g => g
                .attr('transform', `translate(${margin.left}, 0)`)
                .call(axisLeft(y))
                .call(g => g.select('.domain').remove())
                .call(g => g.selectAll(".tick line").clone()
                    .attr("stroke-opacity", d => d === 1 ? null : 0.2)
                    .attr("x2", this.state.width - margin.left - margin.right))
                .call(g => g.select('.tick:last-of-type text').clone()
                    .attr('x', 3)
                    .attr('text-anchor', 'start')
                    .attr('font-weight', 'bold')
                    .text("Number of People")));

    }

    render() {
        return (
            <div className="">
                <h2 className="ui header">{this.props.chosenLocation ?? "Global"} Numbers</h2>
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

const CoronaHistoricGraph = connect<StateToProps, DispatchToProps, ExternalProps, CrnTableState>(state => {
    return {
        data: state.locations,
        chosenLocation: state.chosenLocation
    }
}, (dispatch) => {
    return {
        removeCountry: () => dispatch(selectLocation(null))
    }
})(CoronaHistoricGraphComponent);

export default CoronaHistoricGraph;