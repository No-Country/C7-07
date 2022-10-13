import { Request, Response } from "express";
import { TourRepository } from "../../models/repository/tours/TourRepository";
import { IMessage } from "../../interfaces/IMessage";

const Tour = new TourRepository();

export const getTourById = async (req: Request, res: Response) => {
  const { tourId } = req.params;
  try {
    const tour = await Tour.getById(tourId);
    res.status(200).json({
      message: `Tour founed!`,
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
