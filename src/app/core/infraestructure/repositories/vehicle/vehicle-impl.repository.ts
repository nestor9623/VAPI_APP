import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleRepository } from '@core/domain/repositories/vehicle/vehicle.repository';
import { environment } from 'environments/environment';
import { ApiResponse, Vehicle } from '@core/domain/entities';
import { VehicleFilter } from '@core/application/ports/vehicle/vehicle-filter.interface';


@Injectable({ providedIn: 'root' })
export class VehicleImplRepository implements VehicleRepository {
  private readonly BASE_URL = `${environment.apiUrl}/GetAllMakes`;
  private readonly BASE_VEHICLE_TYPES = `${environment.apiUrl}/GetVehicleTypesForMakeId`;
  private readonly BASE_VEHICLE_MODELS = `${environment.apiUrl}/GetModelsForMakeId`;

  constructor(private readonly http: HttpClient) { }
  getVehicleTypesByBrand(id: number): Observable<ApiResponse<Vehicle>> {
    return this.http.get<ApiResponse<Vehicle>>(
      `${this.BASE_VEHICLE_TYPES}/${id}`,
      {
        params: { format: 'json' },
      }
    );
  }

  getVehicleModelsByBrand(id: number): Observable<ApiResponse<Vehicle>> {
    return this.http.get<ApiResponse<Vehicle>>(
      `${this.BASE_VEHICLE_MODELS}/${id}`,
      {
        params: { format: 'json' },
      }
    );
  }

  getVehicles(filters: VehicleFilter): Observable<ApiResponse<Vehicle>> {
    return this.http.get<ApiResponse<Vehicle>>(
      `${this.BASE_URL}`,
      {
        params: { format: filters.format },
      }
    );
  }
}
