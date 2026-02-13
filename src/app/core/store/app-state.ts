import { VehicleFilter } from "@core/application/ports/vehicle/vehicle-filter.interface";
import { VehicleItem } from "@core/domain/mappers/vehicle.mapper";

export interface VehicleState {
  brands: VehicleItem[];
  filter: VehicleFilter;
  loading: boolean;
  error: boolean;
  rowSelected: VehicleItem | null;
}


export interface DetailState {
  modelos: VehicleItem[];
  tipos: VehicleItem[];
  error: boolean;
}
