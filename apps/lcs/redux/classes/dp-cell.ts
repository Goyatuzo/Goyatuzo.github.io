export enum LCSDirection {
    UP,
    LEFT,
    DIAG
}

export interface LCSDPCell {
    length: number;
    direction: LCSDirection;
    isSubsequence: boolean;
}