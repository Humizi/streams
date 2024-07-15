import { BehaviorSubject, Observable, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface IData {
  items: number[];
}

@Injectable()
export class DataService {
  private data$ = new BehaviorSubject(900);

  constructor(private httpClient: HttpClient) {}

  getResponseData(): Observable<IData> {
    return this.httpClient
      .get<IData>('https://api.rand.by/v1/integer?count=1')
      .pipe(tap((data) => this.setData(data.items[0])));
  }

  getData$(): Observable<number> {
    return this.data$.asObservable();
  }

  setData(value: number): void {
    this.data$.next(value);
  }
}
