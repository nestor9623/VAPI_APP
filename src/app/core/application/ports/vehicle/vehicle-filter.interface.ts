import { FORMAT_STATES } from "../../../domain/entities";

export interface VehicleFilter{
  brandId?: number;
  format: FORMAT_STATES;
}
