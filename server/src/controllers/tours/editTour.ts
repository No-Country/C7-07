import { Request, Response } from "express";
import { TourRepository } from "../../models/repository/tours/TourRepository";
import { IMessage } from "../../interfaces/IMessage";
import { ITour } from "../../interfaces/ITour";
import { IAgency } from "../../interfaces/IUser";
import { AgencyRepository } from "../../models/repository/user";

const Tour = new TourRepository();

type PickedBody = Omit<ITour, "id">;

export const editTour = async (
  req: Request & { token: string; payload: IAgency },
  res: Response
) => {
  const { id, userType } = req.payload;
  if (userType.toLowerCase() !== "agency") throw "Authentication Error.";
  const { tourId } = req.params;
  const {
    apartament,
    country,
    description,
    experience,
    mainImages,
    personPriceUsd,
    stops,
    title,
    agencies: $agencies,
  } = req.body as PickedBody;
  try {
    const agencies = await AgencyRepository.getManyByTourId(tourId);
    let _agencies = ($agencies as IAgency[]).map(
      (agency, idx) =>
        agency.name === agencies[idx].name &&
        agency.email !== agencies[idx].email &&
        agencies[idx]
    );

    _agencies = _agencies.filter((agency) => agency !== undefined);
    const tour = await Tour.edit(tourId, {
      apartament,
      country,
      description,
      experience,
      mainImages,
      personPriceUsd,
      stops,
      title,
      agencies: _agencies,
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
