import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {
  MatCardModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatButtonModule,
  MatRadioModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatSlideToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSlideToggleModule
  ],
  declarations: [],
  exports: [
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSlideToggleModule
  ],
  providers: []
})
export class MaterialModule { }
