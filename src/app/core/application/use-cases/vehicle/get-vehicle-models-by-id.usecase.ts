import { map, Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { VehicleItem, VehicleMapper } from '@core/domain/mappers/vehicle.mapper';
import { ApiResponse, Vehicle } from '@core/domain/entities';
import { UseCase } from '@core/base/use-case';
import { VEHICLE_REPOSITORY } from 'app/app.config';

@Injectable({ providedIn: 'root' })
export class GetVehicleModelsByIdUseCase implements UseCase<number, ApiResponse<VehicleItem>> {
  private readonly _vehicleRepository = inject(VEHICLE_REPOSITORY);
  private readonly _vehicleMapper = inject(VehicleMapper);

  execute(id: number): Observable<ApiResponse<VehicleItem>> {
    return this._vehicleRepository.getVehicleModelsByBrand(id).pipe(
      map((response: ApiResponse<Vehicle>) => ({
        ...response,
        Results: response.Results.map(vehicle => this._vehicleMapper.mapToModel(vehicle))
      }))
    );
  }
}
