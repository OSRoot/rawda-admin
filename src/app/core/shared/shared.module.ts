import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [SpinnerComponent, HeaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[SpinnerComponent]
})
export class SharedModule { }
