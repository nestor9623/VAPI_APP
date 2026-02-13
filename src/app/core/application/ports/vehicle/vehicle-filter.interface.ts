import { FORMAT_STATES } from "@core/domain/entities";

export interface VehicleFilter{
  description?: string;
  format: FORMAT_STATES;
}
