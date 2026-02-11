import { inject, Injectable } from '@angular/core';
import { Vehicle } from '../entities';
import { Mapper } from '../../base/mapper';
import { RawVehicleBrand, VehicleBrandMapper } from './vehicle-brand.mapper';

export interface RawVehicleType extends RawVehicleBrand {
  idTipoVehiculo: number;
  tipoVehiculo: string;
}

@Injectable({ providedIn: 'root' })
export class VehicleTypeMapper implements Mapper<Vehicle, RawVehicleType> {
  private readonly _vehicleBrandMapper = inject(VehicleBrandMapper);
  mapFrom(vehicle: Vehicle): RawVehicleType {
    const brandMapped = this._vehicleBrandMapper.mapFrom(vehicle);
    return {
      ...brandMapped,
      idTipoVehiculo: vehicle.VehicleTypeId,
      tipoVehiculo: vehicle.VehicleTypeName,
    };
  }
}
