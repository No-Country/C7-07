export interface ITour {
    id: string;
    title: string;
    description: string;
    region: string;
    days: number;
    country: string;
    experience: Array<any>;
    agency: Array<any | string>;
    personPriceUsd: string;
    city: string;
    mainImages: Array<string>;
    
  }
  