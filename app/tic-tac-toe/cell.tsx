import * as React from 'react';

import { CellData, CellState } from './cell-data';

export interface ICellProps {
    cell: CellData;
}

export interface ICellState {

}

export default class Cell extends React.Component<ICellProps, ICellState> {

    private cellText(cellType: CellState): string {
        switch (cellType) {
            case CellState.EMPTY:
                return "";
            case CellState.O:
                return "O";
            case CellState.X:
                return "X";
            default:
                return "";
        }
    }

    render(): JSX.Element {
        return (
            <div style={{
                borderColor: 'black',
                borderWidth: 1,
                borderStyle: 'solid',
                height: '20vh'
            }}>{ this.cellText(this.props.cell.state) }</div >
        );
    }
}