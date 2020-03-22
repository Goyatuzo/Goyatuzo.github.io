import * as React from 'react';
import BaseD3Graph from './base-graph';
import { select, stack, scaleUtc, extent, scaleLinear, max, scaleOrdinal, schemeCategory10, area, axisBottom, axisLeft } from 'd3';
import { OverallGraphEntry } from '../classes/graph';
import { CrnLocation } from '../classes/location';

interface ExternalProps {
    generateDataSet:  (data: CrnLocation[]) => OverallGraphEntry[];
}

const GlobalOverallGraph: React.StatelessComponent<ExternalProps> = props => {
    function createGraph(refNode: React.RefObject<SVGSVGElement>) {
        const svg = select(refNode.current);
        svg.selectAll('*').remove();

        const margin = ({ top: 20, right: 30, bottom: 30, left: 50 })

        const series = props.generateDataSet(this.props.data);

        
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

    return <BaseD3Graph createChart={createGraph} />
}

export default GlobalOverallGraph;