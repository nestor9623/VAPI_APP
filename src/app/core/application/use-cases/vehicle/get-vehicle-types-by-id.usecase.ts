import { map, Observable } from 'rxjs';
import { UseCase } from '@core/base/use-case';
import { Injectable, inject } from '@angular/core';
import { VEHICLE_REPOSITORY } from 'app/app.config';
import { ApiResponse, Vehicle } from '@core/domain/entities';
import { VehicleItem, VehicleMapper } from '@core/domain/mappers/vehicle.mapper';

@Injectable({ providedIn: 'root' })
export class GetVehicleTypesByIdUseCase implements UseCase<number, ApiResponse<VehicleItem>> {
  private readonly _vehicleRepository = inject(VEHICLE_REPOSITORY);
  private readonly _vehicleMapper = inject(VehicleMapper);

  execute(id: number): Observable<ApiResponse<VehicleItem>> {
    return this._vehicleRepository.getVehicleTypesByBrand(id).pipe(
      map((response: ApiResponse<Vehicle>) => ({
        ...response,
        Results: response.Results.map(vehicle => this._vehicleMapper.mapToType(vehicle))
      }))
    );
  }
}
