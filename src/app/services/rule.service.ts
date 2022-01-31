import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {catchError, map} from 'rxjs/operators';
import {EndpointModel} from "../models/endpoint.model";
import {RuleModel} from "../models/rule.model";

const API_RULES_URL = `${environment.apiUrl}/admin/rules`;

@Injectable({providedIn: 'root'})
export class RuleService {
  constructor(private http: HttpClient,) {
  }

  getRules(): Observable<any> {
    return this.http.get<Array<RuleModel>>(`${API_RULES_URL}`).pipe(
      map((rules: Array<RuleModel>) => {
        rules = <Array<RuleModel>>rules.map((rule: RuleModel) => {
          return rule
        });
        return rules || [];
      })
    )
  }

  addRule(rule: RuleModel): Observable<any> {
    return this.http.post(`${API_RULES_URL}`, rule).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    )
  }

  deleteRule(rule_id: number | null): Observable<void> {
    return this.http.delete<void>(`${API_RULES_URL}/${rule_id}`).pipe()
  }

  updateRule(rule: RuleModel, id: number | null): Observable<any> {
    return this.http.patch(`${API_RULES_URL}/${id}`, rule).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
