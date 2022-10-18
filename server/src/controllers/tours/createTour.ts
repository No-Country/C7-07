import { Request, Response } from "express";
import { TourRepository } from "../../models/repository/tours/TourRepository";
import { IMessage } from "../../interfaces/IMessage";
import { ITour } from "../../interfaces/ITour";
import { IAgency } from "../../interfaces/IUser";
import { AgencyRepository } from "../../models/repository/user";

const Tour = new TourRepository();

type PickedBody = Omit<ITour, "id">;

export const createTour = async (
  req: Request & { token: string; payload: IAgency },
  res: Response
) => {
  const { id, userType } = req.payload;
  if (userType.toLowerCase() !== "agency")
    throw "No Agency users can not create Tours.";
  const {
    days,
    region,
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
    const agenciesArr = [] as IAgency[];
    let tour: ITour;
    Promise.all([
      AgencyRepository.getById(id),
      ...agencies.map((agency: IAgency) =>
        AgencyRepository.getOne({ name: agency.name })
      ),
    ])
      .then(async (agencies) => {
        agenciesArr.push(...agencies);
        return (tour = await Tour.create({
          days,
          region,
          country,
          description,
          experience,
          mainImages,
          personPriceUsd,
          stops,
          title,
          agencies: [
            ...(agencies.map((agency) => ({
              name: agency.name,
              description: agency.description,
            })) as unknown as IAgency[]),
          ],
        }));
      })
      .then((tour) =>
        Promise.all(
          agenciesArr.map(({ id }) => AgencyRepository.setTour({ id }, tour))
        )
      )
      .then(() => {
        res.status(200).json({
          message: "Created",
          code: 200,
          status: "OK",
          data: tour,
        } as IMessage);
      });
  } catch (error) {
    res.status(404).json({
      message: error,
      code: 200,
      status: "ERROR",
      data: null,
    } as IMessage);
  }
};
