import * as React from 'react';
import { connect } from 'react-redux';
import { CrnTableState } from '../redux/reducers';
import { CrnLocation } from '../classes/location';
import { Chart } from 'chart.js';

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

    private generateDataSet(data: CrnLocation[]): Chart.ChartDataSets[] {
        let confirmed: { t: Date, y: number }[] = [];
        let deaths: { t: Date, y: number }[] = [];
        let recovered: { t: Date, y: number }[] = [];

        const datesInMs = Object.keys(data[0]?.statistics ?? {});
        for (let i = 0; i < data.length; ++i) {
            for (let j = 0; j < datesInMs.length; ++j) {
                const stats = data[i].statistics[parseInt(datesInMs[j])];

                // Add to confirmed
                if (j >= confirmed.length) {
                    confirmed.push({ t: new Date(stats.dateInMs), y: stats.confirmed });
                } else {
                    confirmed[j].y += stats.confirmed
                }

                // Add to deaths
                if (j >= deaths.length) {
                    deaths.push({ t: new Date(stats.dateInMs), y: stats.deaths });
                } else {
                    deaths[j].y += stats.deaths;
                }

                // Add to recovered
                if (j >= recovered.length) {
                    recovered.push({ t: new Date(stats.dateInMs), y: stats.recovered });
                } else {
                    recovered[j].y += stats.recovered;
                }
            }
        }

        return [{
            label: 'Confirmed',
            data: confirmed,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }, {
            label: 'Deaths',
            data: deaths,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1
        }, {
            label: 'Recovered',
            data: recovered,
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            borderColor: 'rgba(0, 255, 0, 1)',
            borderWidth: 1
        }];
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
                datasets: this.generateDataSet(this.props.data)
            }
        })
    }

    componentDidUpdate() {
        this.chart.data = {
            datasets: this.generateDataSet(this.props.data)
        };

        this.chart.update();
    }

    render() {
        return (
            <div className="ui">
                <h2 className="ui header">Global Numbers</h2>
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

const CoronaHistoricGraph = connect<StateToProps, any, any, CrnTableState>(state => {
    return {
        data: state.locations
    }
})(CoronaHistoricGraphComponent);

export default CoronaHistoricGraph;