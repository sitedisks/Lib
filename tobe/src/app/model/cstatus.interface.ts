export interface CStatus {
    country: string;
    countryInfo: CInfo;
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    active: number;
    critical: number;
    casesPerOneMillion: number;
    deathsPerOneMillion: number;
    updated: number;
}

interface CInfo {
    _id: number;
    country: string;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
}