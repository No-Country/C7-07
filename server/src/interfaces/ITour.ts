type Experience = {
  toDo: Array<String>;
  whatIncludes: Array<String>;
  meetingPoint: string;
};

type Details = {
  pickUpPoint: boolean;
  watcher: boolean;
  trekking: boolean;
};

type Stop = {
  id: string;
  number: string;
  name: string;
  direction: string;
  coords: [number, number];
  height: number;
  details: Details;
};

export interface ITour {
  id: string;
  title: string;
  description: string;
  apartament: number;
  country: string;
  experience: Array<Experience>;
  agency: Array<any>;
  personPriceUsd: string;
  mainImages: Array<String>;
  stops: Array<Stop>;
}