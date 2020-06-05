import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { MatTabsModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatMenuModule, MatButtonToggleModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatCheckboxModule } from '@angular/material';

const materialComponents = [
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatTabsModule,
  MatMenuModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  CommonModule,
  MatSidenavModule,
  CarouselModule, WavesModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,  
];

@NgModule({
  imports: [materialComponents],
  exports: [materialComponents]
})

export class MaterialModule { }

