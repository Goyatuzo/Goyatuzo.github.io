import * as React from 'react';
import { connect } from 'react-redux';
import { select } from 'd3-selection';
import { scaleUtc, extent, scaleLinear, max, stack, scaleOrdinal, schemeCategory10, area, axisBottom, axisLeft } from 'd3';

import { CrnTableState } from '../redux/reducers';
import { CrnLocation } from '../classes/location';
import { selectLocation } from '../redux/actions';
import { OverallGraphEntry } from '../classes/graph';

interface ExternalProps {
    createChart: (refNode: React.RefObject<SVGSVGElement>) => void;
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

export class BaseGraphComponent extends React.PureComponent<GraphProps, GraphState> {
    private svgRef: React.RefObject<SVGSVGElement>;

    constructor(props: GraphProps) {
        super(props);

        this.svgRef = React.createRef<SVGSVGElement>();

        this.state = {
            width: 1100,
            height: 500,
            keys: ['deaths', 'recovered', 'confirmed']
        };
    }

    componentDidUpdate() {
        this.props.createChart(this.svgRef);
    }

    render() {
        return (
            <div className="ui container">
                <p>Hover over the shaded area to see what data is represented.</p>
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

const BaseD3Graph = connect<StateToProps, DispatchToProps, ExternalProps, CrnTableState>(state => {
    return {
        data: state.locations,
        chosenLocation: state.chosenLocation
    }
}, (dispatch) => {
    return {
        removeCountry: () => dispatch(selectLocation(null))
    }
})(BaseGraphComponent);

export default BaseD3Graph;