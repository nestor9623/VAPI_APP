import { Observable } from 'rxjs';
import { ApiResponse, Vehicle } from '../../entities';
import { VehicleFilter } from '../../../application/ports/vehicle/vehicle-filter.interface';

export abstract class VehicleRepository {
  abstract getVehicleTypesByBrand(id: number): Observable<ApiResponse<Vehicle>>;
  abstract getVehicleModelsByBrand(id: number): Observable<ApiResponse<Vehicle>>;
  abstract getVehicles(filters: VehicleFilter): Observable<ApiResponse<Vehicle>>;
}
