export interface OverallGraphEntry {
    date: Date;
    confirmed: number;
    deaths: number;
    recovered: number;
}

export interface NormalizedGraphEntry {
    date: Date;
}

export interface GlobalChangeLineGraphData {
    dates: Date[];
    data: {
        country: string;
        values: number[];
    }[]
}