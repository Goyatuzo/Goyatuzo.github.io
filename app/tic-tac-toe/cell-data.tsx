export enum CellState {
    EMPTY,
    O,
    X
};

export interface CellData {
    key: number;
    state: CellState;
}