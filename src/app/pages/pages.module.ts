import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';
import {NoAuthGuard} from "../shared/commonService/authGuard.service";
import {JwtService} from "../shared/PublicService/JwtService";
@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule, routing],
  declarations: [Pages],
  providers:[NoAuthGuard,JwtService]
})
export class PagesModule {
}
