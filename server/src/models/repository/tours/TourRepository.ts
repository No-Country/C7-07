import { TourModel } from "./TourModel";
import { ITourRepository } from "../../../interfaces/IRepository";
import { ITour } from "src/interfaces/ITour";

export class TourRepository implements ITourRepository {
  private _repository = TourModel;

  async getAllTours(): Promise<ITour[]> {
    try {
      const tours = await this._repository.find().populate("agency");
      return tours;
    } catch (error) {
      throw error;
    }
  }
  async getToursByAgencyId(agencyId: string): Promise<Array<ITour>> {
    try {
      const tours = await this._repository
        .find({
          agency: agencyId,
        })
        .populate("agency");
      return tours;
    } catch (error) {
      throw error;
    }
  }

  async getTourByAgencyId(agencyId: string, tourId: string): Promise<ITour> {
    try {
      const tour = await this._repository
        .findOne({
          id: tourId,
          agency: agencyId,
        })
        .populate("agency");
      return tour;
    } catch (error) {
      throw error;
    }
  }
  async getOne<Type>(fields: Type): Promise<ITour> {
    try {
      const tour = this._repository.findOne({ fields }).populate("agency");
      return tour;
    } catch (error) {
      throw error;
    }
  }
  async createTour<Type>(data: Type): Promise<ITour> {
    try {
      const tour = new this._repository(data);
      return tour;
    } catch (error) {
      throw error;
    }
  }
  async editTour<NewType>(
    agencyId: string,
    tourId: string,
    data: NewType
  ): Promise<ITour> {
    try {
      const tour = await this._repository
        .findOneAndUpdate({ id: tourId, agency: agencyId }, data, {
          new: true,
        })
        .populate("agency");

      await tour.save();
      return tour;
    } catch (error) {
      throw error;
    }
  }
  async deleteTour(agencyId: string, tourId: string): Promise<ITour> {
    try {
      const tour = this._repository.findOneAndRemove({
        id: tourId,
        agency: agencyId,
      });
      return tour;
    } catch (error) {
      throw error;
    }
  }
}
