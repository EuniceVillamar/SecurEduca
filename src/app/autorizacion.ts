import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Autorizacion {
  object: any = {};

  public logeado$ = new BehaviorSubject<boolean>(false);
  public modulo$ = new BehaviorSubject<any>(this.object);
  constructor() {}
}
