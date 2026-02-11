import { Injectable } from '@angular/core';
import { Vehicle } from '../entities';
import { Mapper } from '../../base/mapper';

export interface RawVehicleBrand {
  idMarca: number;
  nombreMarca: string;
}

@Injectable({ providedIn: 'root' })
export class VehicleBrandMapper implements Mapper<Vehicle, RawVehicleBrand> {

  mapFrom(vehicle: Vehicle): RawVehicleBrand {
    return {
      idMarca: vehicle.Make_ID,
      nombreMarca: vehicle.Make_Name,
    };
  }
}
