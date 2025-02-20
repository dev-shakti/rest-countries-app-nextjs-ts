export interface CountryDetailType {
    name: {
      common: string;
      official: string;
    };
    region: string;
    population: number;
    flags: {
      svg: string;
      png: string;
    };
    cca2:string,
    capital:string[],
    continents:string[]
  }