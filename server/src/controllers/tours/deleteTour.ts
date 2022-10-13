import { Request, Response } from "express";
import { TourRepository } from "../../models/repository/tours/TourRepository";
import { IMessage } from "../../interfaces/IMessage";
import { IAgency } from "../../interfaces/IUser";

const Tour = new TourRepository();

export const deleteTour = async (
  req: Request & { token: string; payload: IAgency },
  res: Response
) => {
  const { id, userType } = req.payload;
  if (userType.toLowerCase() !== "agency") throw "Authentication Error.";
  const { tourId } = req.params;
  try {
    const tour = await Tour.delete(id, tourId);
    res.status(200).json({
      message: `Tour deleted!`,
      code: 200,
      status: "OK",
      data: tour,
    } as IMessage<typeof tour>);
  } catch (error) {
    res.status(500).json({
      message: error,
      code: 500,
      status: "ERROR",
      data: null,
    } as IMessage);
  }
};
