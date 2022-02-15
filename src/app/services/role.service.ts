import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import {RoleModel} from "../models/role.model";

const API_ENDPOINTS_URL = `${environment.apiUrl}/admin/roles`;

@Injectable({ providedIn: 'root' })
export class RoleService {
    constructor(private http: HttpClient,) { }

  getRoles(): Observable<any> {
    return this.http.get<Array<RoleModel>>(`${API_ENDPOINTS_URL}`).pipe(
      map((roles: Array<RoleModel>) => {
        roles = <Array<RoleModel>>roles.map((role: RoleModel) => {
          return role
        });
        return roles || [];
      })
    )
  }
}
