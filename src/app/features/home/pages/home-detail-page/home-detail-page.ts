import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponent } from '@shared/components/table/table';
import { VehicleItem } from '@core/domain/mappers/vehicle.mapper';
import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header';
import { VehicleDetailData } from './resolver/home-detai-page-resolver.service';

@Component({
  selector: 'vapi-home-detail-page',
  standalone: true,
  imports: [CommonModule, TableComponent, HeaderComponent],
  templateUrl: './home-detail-page.html',
  styleUrl: './home-detail-page.scss',
})
export class HomeDetailPage implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  vehicleData = signal<VehicleDetailData | null>(null);
  models = signal<VehicleItem[]>([]);
  types = signal<VehicleItem[]>([]);

  ngOnInit(): void {
    this._route.data.subscribe(data => {
      const vehicleData = data['vehicleData'] as VehicleDetailData;

      if (vehicleData) {
        this.vehicleData.set(vehicleData);
        this.models.set(vehicleData.models);
        this.types.set(vehicleData.types);
      }
    });
  }

  goBack(): void {
    this._router.navigate(['/home']);
  }
}
