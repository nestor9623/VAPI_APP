import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { HomeDetailPage } from './pages/home-detail-page/home-detail-page';
import { HomeDetailResolver } from './pages/home-detail-page/resolver/home-detai-page-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: ':id',
    component: HomeDetailPage,
    resolve: {
      vehicleData: HomeDetailResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
