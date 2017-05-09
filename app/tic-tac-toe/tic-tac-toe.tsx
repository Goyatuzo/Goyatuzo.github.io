import * as React from 'react';
import * as _ from 'lodash';

import Cell from './cell';
import { CellData, CellState } from './cell-data';

export interface ITicTacToeProps {
    boardSize: number;
};

export interface ITicTacToeState {
    /**
     * Holds the current game.
     */
    boardState: Array<Array<CellData>>;
};

export default class TicTacToe extends React.Component<ITicTacToeProps, ITicTacToeState> {
    constructor(props: ITicTacToeProps) {
        super(props);

        this.state = {
            boardState: this.constructEmptyBoard(props.boardSize)
        };
    }

    /**
     * The width to be used for flex-box. This should automatically scale by itself.
     */
    private get flexWidthPercentage(): string {
        const percent = 1 / this.props.boardSize;

        return `${percent * 100}%`;
    }

    /**
     * Construct an empty board array.
     * @param boardSize
     */
    private constructEmptyBoard(boardSize: number): Array<Array<CellData>> {
        let emptyBoard: Array<Array<CellData>> = [];

        for (let i = 0; i < boardSize; ++i) {
            let row: Array<CellData> = [];

            for (let j = 0; j < boardSize; ++j) {
                row.push({
                    key: (i * this.props.boardSize) + j,
                    state: CellState.EMPTY
                });
            }

            emptyBoard.push(row);
        }

        return emptyBoard;
    }

    render(): JSX.Element {
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                    _.flatten(this.state.boardState).map(cellData => {
                        return (
                            <div key={cellData.key} style={{ flexGrow: 1, width: this.flexWidthPercentage }}>
                                <Cell key={cellData.key} cell={cellData} />
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}