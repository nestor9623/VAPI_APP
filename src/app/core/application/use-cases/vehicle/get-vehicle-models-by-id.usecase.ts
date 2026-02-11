import { VehicleFilter } from './../../ports/vehicle/vehicle-filter.interface';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { VehicleRepository } from '../../../domain/repositories/vehicle/vehicle.repository';
import { ApiResponse, Vehicle } from '../../../domain/entities';
import { RawVehicleBrand } from '../../../domain/mappers/vehicle-brand.mapper';
import { VehicleModelMapper } from '../../../domain/mappers/vehicle-model.mapper';
@Injectable({ providedIn: 'root' })
export class GetVehicleModelsByIdUseCase implements UseCase<number, ApiResponse<RawVehicleBrand>> {
  private readonly _vehicleRepository = inject(VehicleRepository);
  private readonly _vehicleModelMapper = inject(VehicleModelMapper);

  execute(id: number): Observable<ApiResponse<RawVehicleBrand>> {
    return this._vehicleRepository.getVehicleModelsByBrand(id).pipe(map((response: ApiResponse<Vehicle>) => {
      const mappedResults = response.results.map(vehicle => this._vehicleModelMapper.mapFrom(vehicle));
      return {
        ...response,
        results: mappedResults,
      };
    }));
  }
}
