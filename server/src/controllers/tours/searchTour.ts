import { Request, Response } from "express";
import { ITour } from "../../interfaces/ITour";
import { TourRepository } from "../../models/repository/tours/TourRepository";
import { IMessage } from "../../interfaces/IMessage";
const Tour = new TourRepository();
export const searchTour = async (req: Request, res: Response) => {
  try {
    const { value } = req.query as {
      value: string;
    };
    let tours: ITour[] | void = [];
    if (value.trim()) {
      tours = (await Tour.searchBy(value)) as ITour[];
    }
    res.status(200).json({
      code: 200,
      message: `Tours founded: ${tours.length}`,
      data: tours,
      status: "OK",
    } as IMessage<ITour[]>);
  } catch (error) {
    res.status(500).json({
      code: 500,
      data: null,
      message: error,
      status: "ERROR",
    } as IMessage);
  }
};
