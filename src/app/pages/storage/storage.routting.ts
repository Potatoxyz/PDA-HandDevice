
import {StorageComponent} from "./storage.component";
import {HandDeviceComponent} from "./components/hand-device/hand-device.component";
import {RouterModule, Routes} from "@angular/router";
import {InStockComponent} from "./components/hand-device/in-stock/in-stock.component";

const routes:Routes=[
  {
    path:'',
    component:StorageComponent,
    children:[
      {path:'handDevice',component:HandDeviceComponent},
      {path:'handDevice-instock',component:InStockComponent}
    ]
  }
];
export const routing = RouterModule.forChild(routes);
