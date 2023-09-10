import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { LocationService } from 'src/app/services/location/location.service';
// import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterPage],
  providers: [Geolocation]
})
export class RegisterPageModule {}
