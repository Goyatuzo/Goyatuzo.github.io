import * as React from 'react';
import { connect } from 'react-redux';
import { CrnTableState } from '../redux/reducers';
import { CrnLocation } from '../classes/location';

interface StateToProps {
    data: CrnLocation[];
}

type GraphProps = StateToProps;

export class CoronaHistoricGraphComponent extends React.PureComponent<GraphProps> {
    private chart: Chart;
    private canvasRef: React.RefObject<HTMLCanvasElement>;

    constructor(props: GraphProps) {
        super(props);

        this.canvasRef = React.createRef<HTMLCanvasElement>();
    }

    render() {
        return <canvas ref={this.canvasRef} />
    }
}

const CoronaHistoricGraph = connect<StateToProps, any, any, CrnTableState>(state => {
    return {
        data: state.locations
    }
})(CoronaHistoricGraphComponent);

export default CoronaHistoricGraph;