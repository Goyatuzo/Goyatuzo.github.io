export interface CrnLocation {
    province: string;
    country: string;
    lat: number;
    long: number;
    statistics: { [dateInMs: number]: CrnStats };
}

export interface CrnStats {
    dateInMs: number;
    confirmed: number;
    deaths: number;
    recovered: number;
}