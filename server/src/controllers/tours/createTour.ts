import { Request, Response } from "express";
import { TourRepository } from "../../models/repository/tours/TourRepository";
import { IMessage } from "../../interfaces/IMessage";
import { ITour } from "src/interfaces/ITour";

const Tour = new TourRepository();

type PickedBody = Pick<
  ITour,
  | "experience"
  | "apartament"
  | "country"
  | "description"
  | "mainImages"
  | "personPriceUsd"
  | "stops"
  | "title"
  | "agency"
>;

export const createTour = async (req: Request, res: Response) => {
  const { agencyId } = req.params;
  const {
    apartament,
    country,
    description,
    experience,
    mainImages,
    personPriceUsd,
    stops,
    title,
  } = req.body as PickedBody;
  try {
    const tour = await Tour.createTour<PickedBody>({
      apartament,
      country,
      description,
      experience,
      mainImages,
      personPriceUsd,
      stops,
      title,
      agency: [agencyId],
    });
    res.status(200).json({
      message: `Tour created!`,
      code: 200,
      status: "OK",
      data: tour,
    } as IMessage<typeof tour>);
  } catch (error) {
    res.status(500).json({
      message: error,
      code: 200,
      status: "ERROR",
      data: null,
    } as IMessage);
  }
};
