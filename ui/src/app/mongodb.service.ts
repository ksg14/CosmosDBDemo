import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpParams, HttpHeaders } from "@angular/common/http";

@Injectable()
export class MongodbService {

  private MONGO_API: string = "http://localhost:4302/mongodb/";

  constructor(private http: Http) { }

  getCustomers (): Observable<any> {
    var response = this.http.get (this.MONGO_API + "all/")
                            .map(res => res.json());
    return response;
  }

  addCustomer (customer: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var response = this.http.post(this.MONGO_API, customer, options)
                   .map(res => res.json());
    return response;
  }

  updateCustomer (customer: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var response = this.http.put(this.MONGO_API, customer, options)
                   .map(res => res.json());
    return response;
  }

  deleteCustomer (): Observable<any> {
    var response = this.http.delete (this.MONGO_API)
                            .map(res => res.json());
    return response;
  }

}
