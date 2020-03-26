import * as React from 'react';
import { CrnLocation } from '../classes/location';
import { GlobalChangeLineGraphData } from '../classes/graph';
import BaseD3Graph, { BaseGraphState } from './base-graph';
import { select, line, scaleUtc, extent, scaleLinear, area, scaleOrdinal, schemeCategory10, axisBottom, axisLeft, max } from 'd3';

interface ExternalProps {
    generateDataSet: (data: CrnLocation[]) => GlobalChangeLineGraphData;
}

const GlobalChangeLineGraph: React.StatelessComponent<ExternalProps> = props => {
    function createGraph(refNode: React.RefObject<SVGSVGElement>, data: CrnLocation[], state: BaseGraphState) {
        // Clear existing graph
        const svg = select(refNode.current);
        svg.selectAll('*').remove();

        const series = props.generateDataSet(data);

        const x = scaleUtc()
            .domain(extent(series.dates)).range([state.margins.left, state.width - state.margins.right]);
        const y = scaleLinear()
            .domain([0, max(series.data, d => max(d.values))]).nice()
            .range([state.height - state.margins.bottom, state.margins.top]);

        const lineData = line<number>()
            .defined(d => !isNaN(d))
            .x((d, i) => x(series.dates[i]))
            .y(d => y(d));

        svg.append('g')
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .selectAll("path")
            .data(series.data)
            .join("path")
            .style("mix-blend-mode", "multiply")
            .attr("d", d => lineData(d.values));

        // x-axis
        svg.append('g')
            .call(g => g
                .attr('transform', `translate(0, ${state.height - state.margins.bottom})`)
                .call(axisBottom(x).ticks(state.width / 80).tickSizeOuter(0)));

        // y-axis
        svg.append('g')
            .call(g => g
                .attr("transform", `translate(${state.margins.left},0)`)
                .call(axisLeft(y))
                .call(g => g.select(".domain").remove())
                .call(g => g.select(".tick:last-of-type text").clone()
                    .attr("x", 3)
                    .attr("text-anchor", "start")
                    .attr("font-weight", "bold")
                    .text("Rate of Change")));

    }

    return <BaseD3Graph createChart={createGraph} />
}

export default GlobalChangeLineGraph;