import { Observable } from 'rxjs';
import { ApiResponse, Vehicle } from '@core/domain/entities';
import { VehicleFilter } from '@core/application/ports/vehicle/vehicle-filter.interface';
export abstract class VehicleRepository {
  abstract getVehicleTypesByBrand(id: number): Observable<ApiResponse<Vehicle>>;
  abstract getVehicleModelsByBrand(id: number): Observable<ApiResponse<Vehicle>>;
  abstract getVehicles(filters: VehicleFilter): Observable<ApiResponse<Vehicle>>;
}
