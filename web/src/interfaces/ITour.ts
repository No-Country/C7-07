/* eslint-disable prettier/prettier */
import { IAgency } from "./IUser";

type Experience = {
  whatYouWillDo: Array<string>;
  whatIncludes: Array<string>;
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
  region: string;
  days: number;
  country: string;
  experience: Array<Experience>;
  agency: Array<IAgency | string>;
  personPriceUsd: string;
  mainImages: Array<string>;
  stops: Array<Stop>;
  city: string;
}