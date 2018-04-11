import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpParams, HttpHeaders } from "@angular/common/http";

@Injectable()
export class SqlService {

  private SQL_API: string = "http://localhost:4301/sql/";

  constructor(private http: Http) { }

  getInventory (): Observable<any> {
    var response = this.http.get (this.SQL_API + "all/")
                            .map(res => res.json());
    return response;
  }

  addProduct (product: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var response = this.http.post(this.SQL_API, product, options)
                   .map(res => res.json());
    return response;
  }

  updateProduct (product: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var response = this.http.put(this.SQL_API, product, options)
                   .map(res => res.json());
    return response;
  }

  deleteInventory (): Observable<any> {
    var response = this.http.delete (this.SQL_API + "all/")
                            .map(res => res.json());
    return response;
  }

  deleteProduct (productId: number): Observable<any> {
    var response = this.http.delete (this.SQL_API + "?productId=" + productId)
                            .map(res => res.json());
    return response;
  }

}
