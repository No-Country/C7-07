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
  async edit(tourId: string, data: Partial<Omit<ITour, "id">>): Promise<ITour> {
    try {
      const tour = await this._repository
        .findOneAndUpdate(
          {
            id: tourId,
          },
          data,
          { new: true }
        )
        .populate(this.populateOptions);

      console.log({
        tourId,
        tour,
      });

      return tour;
    } catch (error) {
      throw error;
    }
  }

  async searchBy(value: string): Promise<ITour[] | void> {
    try {
      value = value?.trim();
      const tours = await this._repository.aggregate([
        {
          $match: {
            $or: [
              { title: { $regex: value, $options: "i" } },
              { city: { $regex: value, $options: "i" } },
              { country: { $regex: value, $options: "i" } },
              { "agencies.name": { $regex: value, $options: "i" } },
              { "experience.whatIncludes": { $regex: value, $options: "i" } },
            ],
          },
        },

        {
          $project: {
            title: 1,
            description: 1,
            agencies: 1,
            city: 1,
            country: 1,
            days: 1,
          },
        },
      ]);
      return tours;
    } catch (error) {
      throw error;
    }
  }

  async delete(agencyId: string, tourId: string): Promise<ITour> {
    try {
      const tour = await this._repository.findOneAndDelete({
        id: tourId,
        agencies: agencyId,
      });
      return tour;
    } catch (error) {
      throw error;
    }
  }
}
