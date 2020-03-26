import * as React from 'react';
import { CrnLocation } from '../classes/location';
import { GlobalChangeLineGraphData } from '../classes/graph';
import BaseD3Graph, { BaseGraphState } from './base-graph';
import { select, stack, stackOffsetExpand, scaleUtc, extent, scaleLinear, area, scaleOrdinal, schemeCategory10, axisBottom, axisLeft, max } from 'd3';

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

        svg.append('g')
            .selectAll('path')
            .join('path')
            .append('title')
            .text(({ key }) => key);

        // x-axis
        svg.append('g')
            .call(g => g
                .attr('transform', `translate(0, ${state.height - state.margins.bottom})`)
                .call(axisBottom(x).ticks(state.width / 80).tickSizeOuter(0)));

        // y-axis
        svg.append('g')
            .call(g => g
                .attr("transform", `translate(${state.margins.left},0)`)
                .call(axisLeft(y).ticks(10, "%"))
                .call(g => g.select(".domain").remove()));

    }

    return <BaseD3Graph createChart={createGraph} />
}

export default GlobalChangeLineGraph;