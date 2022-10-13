import { Request, Response } from "express";
import { TourRepository } from "../../models/repository/tours/TourRepository";
import { IMessage } from "../../interfaces/IMessage";
import { ITour } from "../../interfaces/ITour";
import { IAgency } from "../../interfaces/IUser";
import { AgencyRepository } from "../../models/repository/user";

const Tour = new TourRepository();

type PickedBody = Omit<ITour, "id" | "agency">;

export const createTour = async (
  req: Request & { token: string; payload: IAgency },
  res: Response
) => {
  const { id, userType } = req.payload;
  if (userType.toLowerCase() !== "agency")
    throw "No Agency users can not create Tours.";
  const {
    apartament,
    country,
    description,
    experience,
    mainImages,
    personPriceUsd,
    stops,
    title,
    agencies,
  } = req.body as PickedBody;
  try {
    const agency = await AgencyRepository.getById(id);
    const tour = await Tour.create({
      apartament,
      country,
      description,
      experience,
      mainImages,
      personPriceUsd,
      stops,
      title,
      agencies: [agency],
    });
    await AgencyRepository.setTour(id, tour);
    res.status(200).json({
      message: `Tour created!`,
      code: 200,
      status: "OK",
      data: tour,
    } as IMessage<typeof tour>);
  } catch (error) {
    res.status(404).json({
      message: error,
      code: 200,
      status: "ERROR",
      data: null,
    } as IMessage);
  }
};
