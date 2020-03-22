import * as React from 'react';
import { CrnLocation } from '../classes/location';
import { NormalizedGraphEntry } from '../classes/graph';
import { connect } from 'react-redux';
import { select, stack, scaleUtc, extent, scaleLinear, max, scaleOrdinal, area, axisBottom, axisLeft, stackOffsetExpand, interpolateHcl, range, schemeCategory10 } from 'd3';
import { CrnTableState } from '../redux/reducers';
import { selectLocation } from '../redux/actions';
import BaseD3Graph, { BaseGraphState } from './base-graph';

interface ExternalProps {
    generateDataSet: (data: CrnLocation[]) => NormalizedGraphEntry[];
}

const ConfirmedNormalizedArea: React.StatelessComponent<ExternalProps> = props => {
    function createGraph(refNode: React.RefObject<SVGSVGElement>, data: CrnLocation[], state: BaseGraphState) {
        // Clear existing graph
        const svg = select(refNode.current);
        svg.selectAll('*').remove();

        const series = props.generateDataSet(data);

        const keys = Object.keys(series[series.length - 1]).filter(key => key !== "date").sort((a, b) => {
            const last = series[series.length - 1];

            return last[a] - last[b];
        });

        const stacked = stack().keys(keys).offset(stackOffsetExpand)((series as any));
        const x = scaleUtc().domain(extent(series, d => d.date)).range([state.margins.left, state.width - state.margins.right]);
        const y = scaleLinear().range([state.height - state.margins.bottom, state.margins.top]);
        const areas = area<any>().x(d => x(d.data.date)).y0(d => y(d[0])).y1(d => y(d[1]));
        const colors = scaleOrdinal<string>().domain(keys).range(schemeCategory10);

        svg.append('g')
            .selectAll('path')
            .data(stacked)
            .join('path')
            .attr('fill', ({ key }) => colors(key))
            .attr('d', areas)
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

export default ConfirmedNormalizedArea;