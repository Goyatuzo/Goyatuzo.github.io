export interface OverallGraphEntry {
    date: Date;
    confirmed: number;
    deaths: number;
    recovered: number;
}

export interface NormalizedGraphEntry {
    date: Date;
}

export interface GlobalChangeLineGraphEntry {
    country: string;
    values: number[];
}

export interface GlobalChangeLineGraphData {
    dates: Date[];
    data: GlobalChangeLineGraphEntry[];
}