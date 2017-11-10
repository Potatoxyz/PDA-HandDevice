import { Injectable } from '@angular/core';

import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {JwtService} from "./JwtService";
import {environment} from "./api_url";

@Injectable()
export class ApiService {
  constructor(private http: Http,
              private jwtService: JwtService) {
  }

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `Bearer ${this.jwtService.getToken()}`;
    }
    return new Headers(headersConfig);
  }

  private handleBusinessErrorResult(res: Response): Response {
    const json = res.json();
    if (json.error && json.success === false) {
      // return Observable.throw(json.Errors.ErrorItems);
      throw json.error.message;
    } else {
      return res;
    }
  }


  private formatErrors(error: any) {
    $('.loading-wrapper').fadeOut(0);

    console.info(error);
    return Observable.throw(error.json());
  }


  get(path: string, params?: URLSearchParams): Observable<any> {
    $('.loading-wrapper').fadeIn(0);
    let reqPrams = this.merge(path, params);
    let getUrl = `${environment.api_url}${reqPrams.url}`;
    return this.http.get(getUrl, reqPrams.options).catch(this.formatErrors).map(res => {
      $('.loading-wrapper').fadeOut(0);
      return this.handleBusinessErrorResult(res);
    }).map((res: Response) => res.json());
  }

  put(path: string, body: Object = {}, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    let reqPrams = this.merge(path, params);
    let reqUrl = `${environment.api_url}${reqPrams.url}`;
    return this.http.put(
      reqUrl,
      JSON.stringify(body),
      reqPrams.options
    ).catch(this.formatErrors).map((res: Response) => res.json());
  }

  post(path: string, body: Object = {}, params?: URLSearchParams): Observable<any> {
    $('.loading-wrapper').fadeIn(0);
    let reqPrams = this.merge(path, params);
    let reqUrl = `${environment.api_url}${reqPrams.url}`;
    return this.http.post(
      reqUrl,
      JSON.stringify(body),
      reqPrams.options
    ).catch(this.formatErrors).map(res => {
      $('.loading-wrapper').fadeOut(0);
      return this.handleBusinessErrorResult(res);
    }).map((res: Response) => res.json());
  }

  delete(path, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    let reqPrams = this.merge(path, params);
    let reqUrl = `${environment.api_url}${reqPrams.url}`;
    return this.http.delete(
      reqUrl,
      reqPrams.options
    ).catch(this.formatErrors).map((res: Response) => res.json());
  }


  private merge(url: string, searchParams?: URLSearchParams): any {

    let options = { headers: this.setHeaders(), search: null };
    if (!searchParams) {
      return {
        'url': url,
        'options': options
      };
    }

    // let search: URLSearchParams;
    // if (typeof searchParams === 'string') {
    //   search = new URLSearchParams(searchParams as string);
    // }
    // else {
    //   search = searchParams as URLSearchParams;
    // }

    options.search = searchParams;
    const data = this.strMapToObj(options.search.paramsMap);

    //  let formatUrl = formatPattern({ pattern: url  }, data);
    // const pathRegex = new RegExp('\/:[^\/]+', 'g');
    //  var data = pathRegex.matches(url);

    let formatUrl = url;
    let startIndex = 0;
    while (true) {
      let index = url.indexOf(':', startIndex);
      if (index < 0) {
        break;
      }
      var paraEndIndex = url.indexOf('/', index);

      let paramName = '';
      if (paraEndIndex < 0) {
        paramName = url.substr(index + 1);
      }
      else {
        let len = paraEndIndex - index - 1;
        paramName = url.substr(index + 1, len);
      }
      let value = data[paramName]
      if (value) {
        formatUrl = formatUrl.replace(`:${paramName}`, value)
      }


      if (paraEndIndex < 0) {
        break;
      }

      startIndex = paraEndIndex;
    }


    let params = {
      'url': formatUrl,
      'options': options
    };

    return params;

  }

  private strMapToObj(strMap: Map<string, string[]>) {
    const obj = Object.create(null);
    strMap.forEach((v, k) => {
      // We don’t escape the key '__proto__'
      // which can cause problems on older engines
      obj[k] = v[0];
    });
    return obj;
  }
}
