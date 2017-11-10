import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Login } from './login.component';
import { routing }       from './login.routing';
import {LoginService} from "../../shared/commonService/login.service";
import {JwtService} from "../../shared/PublicService/JwtService";
import {UserService} from "../../shared/commonService/user.service";
import {ApiService} from "../../shared/PublicService/api.service";


@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Login
  ],
  providers:[
    ApiService,
    LoginService,
    JwtService,
    UserService
  ],
})
export class LoginModule {}
