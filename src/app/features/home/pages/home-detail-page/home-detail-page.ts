import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableComponent } from '@shared/components/table/table';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header';
import { DetailStore } from '@core/store/detail-store';

@Component({
  selector: 'vapi-home-detail-page',
  standalone: true,
  imports: [CommonModule, TableComponent, HeaderComponent],
  templateUrl: './home-detail-page.html',
  styleUrl: './home-detail-page.scss',
})
export class HomeDetailPage {
  private readonly _router = inject(Router);

  readonly detailStore = inject(DetailStore);
  readonly models = this.detailStore.modelos;
  readonly types = this.detailStore.tipos;

  goBack(): void {
    this._router.navigate(['/home']);
  }
}
