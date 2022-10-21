import { Request, Response } from "express";
import { TourRepository } from "../../models/repository/tours/TourRepository";
import { IMessage } from "../../interfaces/IMessage";
import { ITour } from "../../interfaces/ITour";
import { IAgency } from "../../interfaces/IUser";

const Tour = new TourRepository();

type PickedBody = Omit<ITour, "id">;

export const editTour = async (
  req: Request & { token: string; payload: IAgency },
  res: Response
) => {
  const { userType } = req.payload;
  if (userType.toLowerCase() !== "agency") throw "Authentication Error.";
  const { tourId } = req.params;
  const {
    country,
    description,
    experience,
    mainImages,
    personPriceUsd,
    stops,
    title,
    days,
    region,
    agency,
  } = req.body as PickedBody;
  try {
    const tour = await Tour.edit(tourId, {
      days,
      region,
      country,
      description,
      experience,
      mainImages,
      personPriceUsd,
      stops,
      title,
      agency,
    });
    res.status(200).json({
      message: `Tours edited!`,
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
