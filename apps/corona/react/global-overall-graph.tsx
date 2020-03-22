import * as React from 'react';
import BaseD3Graph, { BaseGraphState } from './base-graph';
import { select, stack, scaleUtc, extent, scaleLinear, max, scaleOrdinal, schemeCategory10, area, axisBottom, axisLeft } from 'd3';
import { OverallGraphEntry } from '../classes/graph';
import { CrnLocation } from '../classes/location';

interface ExternalProps {
    generateDataSet:  (data: CrnLocation[]) => OverallGraphEntry[];
}

const GlobalOverallGraph: React.StatelessComponent<ExternalProps> = props => {
    function createGraph(refNode: React.RefObject<SVGSVGElement>, data: CrnLocation[], state: BaseGraphState) {
        const svg = select(refNode.current);
        svg.selectAll('*').remove();

        const series = props.generateDataSet(data);

        const keys = ['deaths', 'recovered', 'confirmed'];

        
        const stacked = stack().keys(keys)((series as any));
        const x = scaleUtc().domain(extent(series, d => d.date)).range([state.margins.left, state.width - state.margins.right]);
        const y = scaleLinear().domain([0, max(series, d => d.confirmed + d.deaths + d.recovered)]).nice().range([state.height - state.margins.bottom, state.margins.top]);
        const colors = scaleOrdinal<string>().domain(keys).range(schemeCategory10);
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
                .attr('transform', `translate(0, ${state.height - state.margins.bottom})`)
                .call(axisBottom(x).ticks(state.width / 80).tickSizeOuter(0)));

        // y-axis
        svg.append('g')
            .call(g => g
                .attr('transform', `translate(${state.margins.left}, 0)`)
                .call(axisLeft(y))
                .call(g => g.select('.domain').remove())
                .call(g => g.selectAll(".tick line").clone()
                    .attr("stroke-opacity", d => d === 1 ? null : 0.2)
                    .attr("x2", state.width - state.margins.left - state.margins.right))
                .call(g => g.select('.tick:last-of-type text').clone()
                    .attr('x', 3)
                    .attr('text-anchor', 'start')
                    .attr('font-weight', 'bold')
                    .text("Number of People")));
    }

    return <BaseD3Graph createChart={createGraph} />
}

export default GlobalOverallGraph;