import { NgModule } from "@angular/core";

import {
  MatTableModule,
  MatButtonModule,
  MatSidenavModule, 
  MatCardModule, 
  MatInputModule, 
  MatFormFieldModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatExpansionModule,
  MatDialogModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonToggleModule,
  MatSortModule,
  MatPaginatorModule,
  MatPaginatorIntl
} 
from '@angular/material';

import { MatPaginatorTurkishLanguage } from './core/classes/matPaginatorTurkishLanguage.class';

@NgModule({
  imports: [MatPaginatorModule, MatSortModule, MatButtonToggleModule, MatSelectModule, MatOptionModule, MatTooltipModule, MatTableModule, MatProgressBarModule, MatProgressSpinnerModule, MatSnackBarModule, MatDialogModule, MatExpansionModule, MatMenuModule, MatListModule, MatIconModule, MatToolbarModule, MatButtonModule,MatSidenavModule, MatCardModule, MatInputModule, MatFormFieldModule],
  exports: [MatPaginatorModule, MatSortModule, MatButtonToggleModule, MatSelectModule, MatOptionModule, MatTooltipModule, MatTableModule, MatProgressBarModule, MatProgressSpinnerModule, MatSnackBarModule, MatDialogModule, MatExpansionModule, MatMenuModule, MatListModule, MatIconModule, MatToolbarModule, MatButtonModule,MatSidenavModule, MatCardModule, MatInputModule, MatFormFieldModule],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorTurkishLanguage}]
})
export class MaterialModule {}