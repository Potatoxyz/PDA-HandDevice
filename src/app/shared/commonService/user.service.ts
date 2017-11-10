import {Injectable} from "@angular/core";
import {ApiService} from "../PublicService/api.service";
import {Http} from "@angular/http";
import {JwtService} from "../PublicService/JwtService";
import {EndPointsConfig} from "../apiUrl.info";
import {Observable} from "rxjs/Observable";
import {ApiResponseBaseModel} from "../Models/apiResponse.model";
import {CurrentUserInfoModel} from "../Models/current.userinfo.model";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<CurrentUserInfoModel>(new CurrentUserInfoModel());
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  constructor(private apiService: ApiService,
              private http: Http,
              private jwtService: JwtService) {
  }
  fetchCurrentUsrInfo(): Observable<ApiResponseBaseModel<CurrentUserInfoModel>> {
    return this.apiService.get(EndPointsConfig.EndPoints.GetCurrentUserInfo);
  }
  setUserInfo(user: CurrentUserInfoModel) {
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }
}
