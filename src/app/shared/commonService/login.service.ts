import {Injectable} from "@angular/core";
import {ApiService} from "../PublicService/api.service";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../Models/apiResponse.model";
import {EndPointsConfig} from "../apiUrl.info";

//  ApiResponseBaseModel(errorModel)

@Injectable()
export class LoginService {
  constructor(public apiService: ApiService) {

  }

  public Login(workerNo: string, password: string): Observable<ApiResponseBaseModel<string>> {
    const data = {
      'WorkerNo': workerNo,
      'Password': password
    };
    return this.apiService.post(EndPointsConfig.EndPoints.Login, data);
  }
}
