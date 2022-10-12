import { Model, PopulateOptions } from "mongoose";
import { TourModel } from "./TourModel";
import { IToursRepository } from "../../../interfaces/IRepository";
import { ITour } from "src/interfaces/ITour";

export class TourRepository implements IToursRepository {
  private _repository: Model<ITour> = TourModel;
  populateOptions: PopulateOptions[] | PopulateOptions;

  async getAll(): Promise<ITour[]> {
    try {
      const tours = await this._repository
        .find()
        .populate(this.populateOptions);
      return tours;
    } catch (error) {
      throw error;
    }
  }
  async getAllByAgencyId(agencyId: string): Promise<ITour[]> {
    try {
      const tours = await this._repository
        .find({ id: agencyId })
        .populate(this.populateOptions);
      return tours;
    } catch (error) {
      throw error;
    }
  }
  async getById(tourId: string): Promise<ITour> {
    try {
      const tour = await this._repository
        .findById({ id: tourId })
        .populate(this.populateOptions);
      return tour;
    } catch (error) {
      throw error;
    }
  }
  async create(data: Omit<ITour, "id">): Promise<ITour> {
    try {
      const tour = await this._repository.create(data);
      return tour;
    } catch (error) {
      throw error;
    }
  }
  async edit(
    agencyId: string,
    tourId: string,
    data: Omit<ITour, "id">
  ): Promise<ITour> {
    try {
      const tour = await this._repository
        .findOneAndUpdate(
          {
            id: tourId,
            agency: agencyId,
          },
          data,
          { new: true }
        )
        .populate(this.populateOptions);

      return tour;
    } catch (error) {
      throw error;
    }
  }
  async delete(agencyId: string, tourId: string): Promise<ITour> {
    try {
      const tour = await this._repository.findOneAndDelete({
        id: tourId,
        agency: agencyId,
      });
      return tour;
    } catch (error) {
      throw error;
    }
  }
}
