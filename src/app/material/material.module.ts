import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {
  MatCardModule,
  MatTableModule,
  MatSortModule
} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
  ],
  declarations: [],
  exports: [
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatSortModule
  ],
  providers: []
})
export class MaterialModule { }
