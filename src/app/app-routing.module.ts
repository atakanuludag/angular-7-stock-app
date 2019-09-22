import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Login
import { LoginComponent } from './components/login/login.component';
import { LoggedInComponent } from './core/layout/logged-in/logged-in.component';

//Dashboard
import { DashboardComponent } from './components/dashboard/dashboard.component';

//Brands
import { BrandNewEditComponent } from './components/brand/brand-new-edit/brand-new-edit.component';
import { BrandListComponent } from './components/brand/brand-list/brand-list.component';

//Stocks
import { StockNewEditComponent } from './components/stock/stock-new-edit/stock-new-edit.component';
import { StockListComponent } from './components/stock/stock-list/stock-list.component';

//Resolver
import { DashboardGetResolver } from './components/dashboard/dashboard.resolver';
import { BrandGetResolver, BrandListResolver } from './components/brand/brand.resolver';
import { StockGetResolver, StockListResolver } from './components/stock/stock.resolver';


const routes: Routes = [
  {
    path: '',
    component: LoggedInComponent,
    data: { title: "Markalar" },
    children: [
      {
        path: '',
        children: [
          { path: '', component: DashboardComponent, resolve: { dashboard: DashboardGetResolver }, data: { title: "Dashboard" } }
        ]
      },
      {
        path: 'brand',
        children: [
          { path: '', component: BrandListComponent, resolve: { brand: BrandListResolver }, data: { title: "Markalar" } },
          { path: 'new', component: BrandNewEditComponent, data: { title: "Yeni Marka" } },
          { path: 'edit/:id', component: BrandNewEditComponent, resolve: { brand: BrandGetResolver }, data: { title: "Markayı Düzenle" } }
        ]
      },
      {
        path: 'stock',
        children: [
          { path: '', component: StockListComponent, runGuardsAndResolvers: 'paramsOrQueryParamsChange', resolve: { stock: StockListResolver}, data: { title: "Stoklar" } },
          { path: 'new', component: StockNewEditComponent, resolve: { brand: BrandListResolver }, data: { title: "Yeni Stok" } },
          { path: 'edit/:id', component: StockNewEditComponent, resolve: { stock: StockGetResolver, brand: BrandListResolver }, data: { title: "Stok Düzenle" } }
        ]
      },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {};