export interface CrnLocation {
    province: string;
    country: string;
    lat: number;
    long: number;
    statistics: CrnStats;
}

export interface CrnStats {
    confirmed: number;
    deaths: number;
    recovered: number;
}