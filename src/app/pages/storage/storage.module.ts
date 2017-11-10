import {NgModule} from "@angular/core";
import {StorageComponent} from "./storage.component";
import {NgaModule} from "../../theme/nga.module";
import {CommonModule} from "@angular/common";
import { HandDeviceComponent } from './components/hand-device/hand-device.component';
import {routing} from "./storage.routting";
import { InStockComponent } from './components/hand-device/in-stock/in-stock.component';
import {NoAuthGuard} from "../../shared/commonService/authGuard.service";

@NgModule(
  {
    imports:[
      CommonModule,
      NgaModule,
      routing
    ],
    declarations:[StorageComponent, HandDeviceComponent, InStockComponent],
  }
)
export class StorageModule{}
