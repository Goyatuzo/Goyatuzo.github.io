import * as React from 'react';
import { connect } from 'react-redux';

import { CrnTableState } from '../redux/reducers';
import { CrnLocation } from '../classes/location';
import { Chart } from 'chart.js';
import { selectLocation } from '../redux/actions';

interface ExternalProps {
    generateDataSet: (data: CrnLocation[]) => Chart.ChartDataSets[];
}

interface StateToProps {
    data: CrnLocation[];
    chosenLocation: string;
}

interface DispatchToProps {
    removeCountry: () => void;
}

type GraphProps = ExternalProps & StateToProps & DispatchToProps;

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
                datasets: this.props.generateDataSet(this.props.data)
            }
        })
    }

    componentDidUpdate() {
        this.chart.data = {
            datasets: this.props.generateDataSet(this.props.data)
        };

        this.chart.update();
    }

    render() {
        return (
            <div className="ui">
                <h2 className="ui header">{this.props.chosenLocation ?? "Global"} Numbers</h2>
                {
                    this.props.chosenLocation ? <button type="button" onClick={() => this.props.removeCountry()}>Show All Data</button> : null
                }
                <div className="ui segments">
                    <canvas ref={this.canvasRef} />

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