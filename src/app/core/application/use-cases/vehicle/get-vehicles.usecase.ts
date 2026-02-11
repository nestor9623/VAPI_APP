import { VehicleFilter } from './../../ports/vehicle/vehicle-filter.interface';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { VehicleRepository } from '../../../domain/repositories/vehicle/vehicle.repository';
import { ApiResponse, Vehicle } from '../../../domain/entities';
import { RawVehicleBrand, VehicleBrandMapper } from '../../../domain/mappers/vehicle-brand.mapper';
@Injectable({ providedIn: 'root' })
export class GetVehiclesUseCase implements UseCase<VehicleFilter, ApiResponse<RawVehicleBrand>> {
  private readonly _vehicleRepository = inject(VehicleRepository);
  private readonly _vehicleBrandMapper = inject(VehicleBrandMapper);

  execute(filters: VehicleFilter): Observable<ApiResponse<RawVehicleBrand>> {
    return this._vehicleRepository.getVehicles(filters).pipe(map((response: ApiResponse<Vehicle>) => {
      const mappedResults = response.results.map(vehicle => this._vehicleBrandMapper.mapFrom(vehicle));
      return {
        ...response,
        results: mappedResults,
      };
    }));
  }
}
