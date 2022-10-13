import { Request, Response } from "express";
import { TourRepository } from "../../models/repository/tours/TourRepository";
import { IMessage } from "../../interfaces/IMessage";

const Tour = new TourRepository();

export const getToursByAgencyId = async (req: Request, res: Response) => {
  const { agencyId } = req.params;
  try {
    const tours = await Tour.getToursByAgencyId(agencyId);
    res.status(200).json({
      message: `Tours founed: ${tours?.length ?? 0}`,
      code: 200,
      status: "OK",
      data: tours,
    } as IMessage<typeof tours>);
  } catch (error) {
    res.status(500).json({
      message: error,
      code: 500,
      status: "ERROR",
      data: null,
    } as IMessage);
  }
};
