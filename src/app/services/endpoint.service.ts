import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import {EndpointModel} from "../models/endpoint.model";

const API_ENDPOINTS_URL = `${environment.apiUrl}/admin/endpoints`;

@Injectable({ providedIn: 'root' })
export class EndpointService {
    constructor(private http: HttpClient,) { }

  getEndpoints(): Observable<any> {
    return this.http.get<Array<EndpointModel>>(`${API_ENDPOINTS_URL}`).pipe(
      map((endpoints: Array<EndpointModel>) => {
        endpoints = <Array<EndpointModel>>endpoints.map((endpoint: EndpointModel) => {
          return endpoint
        });
        return endpoints || [];
      })
    )
  }
}
