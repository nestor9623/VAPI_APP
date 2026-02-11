import { VehicleFilter } from './../../ports/vehicle/vehicle-filter.interface';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { VehicleRepository } from '../../../domain/repositories/vehicle/vehicle.repository';
import { ApiResponse, Vehicle } from '../../../domain/entities';
import { RawVehicleBrand } from '../../../domain/mappers/vehicle-brand.mapper';
import { VehicleTypeMapper } from '../../../domain/mappers/vehicle-type.mapper';
@Injectable({ providedIn: 'root' })
export class GetVehicleTypesByIdUseCase implements UseCase<number, ApiResponse<RawVehicleBrand>> {
  private readonly _vehicleRepository = inject(VehicleRepository);
  private readonly _vehicleTypeMapper = inject(VehicleTypeMapper);

  execute(id: number): Observable<ApiResponse<RawVehicleBrand>> {
    return this._vehicleRepository.getVehicleTypesByBrand(id).pipe(map((response: ApiResponse<Vehicle>) => {
      const mappedResults = response.results.map(vehicle => this._vehicleTypeMapper.mapFrom(vehicle));
      return {
        ...response,
        results: mappedResults,
      };
    }));
  }
}
