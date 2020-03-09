import * as React from 'react';
import { connect } from 'react-redux';
import { CrnTableState } from '../redux/reducers';
import { CrnLocation } from '../classes/location';
import Chart = require('chart.js');

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

    componentDidMount() {
        this.chart = new Chart(this.canvasRef.current, {
            type: 'line',
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    }]
                }
            },
            data: {
                datasets: [{
                    label: 'Number of People',
                    data: [{ t: new Date(), y: 5 }],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            }
        })
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