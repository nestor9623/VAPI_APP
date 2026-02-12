import { map, Observable } from 'rxjs';
import { UseCase } from '@core/base/use-case';
import { Injectable, inject } from '@angular/core';
import { VEHICLE_REPOSITORY } from 'app/app.config';
import { ApiResponse, Vehicle } from '@core/domain/entities';
import { VehicleFilter } from '@core/application/ports/vehicle/vehicle-filter.interface';
import { VehicleItem, VehicleMapper } from '@core/domain/mappers/vehicle.mapper';

@Injectable({ providedIn: 'root' })
export class GetVehiclesUseCase implements UseCase<VehicleFilter, ApiResponse<VehicleItem>> {
  private readonly _vehicleRepository = inject(VEHICLE_REPOSITORY);
  private readonly _vehicleMapper = inject(VehicleMapper);

  execute(filters: VehicleFilter): Observable<ApiResponse<VehicleItem>> {
    return this._vehicleRepository.getVehicles(filters).pipe(
      map((response: ApiResponse<Vehicle>) => ({
        ...response,
        Results: response.Results.map(vehicle => this._vehicleMapper.mapFrom(vehicle))
      }))
    );
  }
}
