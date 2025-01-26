export interface Country {
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
}
