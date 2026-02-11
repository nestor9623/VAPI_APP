import { inject, Injectable } from '@angular/core';
import { Vehicle } from '../entities';
import { Mapper } from '../../base/mapper';
import { RawVehicleBrand, VehicleBrandMapper } from './vehicle-brand.mapper';

export interface RawVehicleModel extends RawVehicleBrand {
  idModelo: number;
  modelo: string;
}

@Injectable({ providedIn: 'root' })
export class VehicleModelMapper implements Mapper<Vehicle, RawVehicleModel> {
  private readonly _vehicleBrandMapper = inject(VehicleBrandMapper);
  mapFrom(vehicle: Vehicle): RawVehicleModel {
    const brandMapped = this._vehicleBrandMapper.mapFrom(vehicle);
    return {
      ...brandMapped,
      idModelo: vehicle.Model_ID,
      modelo: vehicle.Model_Name,
    };
  }
}
