import { Injectable } from '@angular/core';
import { Mapper } from '@core/base/mapper';
import { Vehicle } from '../entities';

export interface VehicleItem {
  id: number;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class VehicleMapper implements Mapper<Vehicle, VehicleItem> {
  mapFrom(vehicle: Vehicle): VehicleItem {
    return {
      id: vehicle.Make_ID,
      description: vehicle.Make_Name
    };
  }

  mapToModel(vehicle: Vehicle): VehicleItem {
    return {
      id: vehicle.Model_ID!,
      description: vehicle.Model_Name!
    };
  }

  mapToType(vehicle: Vehicle): VehicleItem {
    return {
      id: vehicle.VehicleTypeId!,
      description: vehicle.VehicleTypeName!
    };
  }
}

