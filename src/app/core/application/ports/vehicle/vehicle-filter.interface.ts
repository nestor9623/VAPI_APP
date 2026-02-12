import { FORMAT_STATES } from "@core/domain/entities";

export interface VehicleFilter{
  brandId?: number;
  format: FORMAT_STATES;
}
