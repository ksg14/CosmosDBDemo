import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpParams, HttpHeaders } from "@angular/common/http";

@Injectable()
export class TableService {

  private TABLE_API: string = "http://localhost:4300/table/";

  constructor(private http: Http) { }

  getAllSessionData (): Observable<any> {
    var response = this.http.get (this.TABLE_API + "all/")
                            .map(res => res.json());
    return response;
  }

  addSession (session: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var response = this.http.post(this.TABLE_API, session, options)
                   .map(res => res.json());
    return response;
  }


}
