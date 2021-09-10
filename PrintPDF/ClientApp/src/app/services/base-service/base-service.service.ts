import { Injectable } from '@angular/core';
import { BaseModel } from '../../models/base-model/base-model.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export declare class BaseService<T extends Response> {

  constructor(url?: string, idColumn?: string);

  protected apiGet<R extends any>(url: string): Observable<R>;
  protected apiPut<R extends any>(url: string): Observable<R>;
  protected apiPost<R extends any>(url: string): Observable<R>;
  protected apiDelete<R extends any>(url: string): Observable<R>;

}
