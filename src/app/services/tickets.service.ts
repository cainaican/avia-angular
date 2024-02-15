import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ICompany, ISegment, ITicket } from '../models/i-ticket';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getTickets(): Observable<ITicket[]>{
    return this._httpClient.get<ITicket[]>("./assets/json/tickets.json");
  }

  getCompany(id: string): Observable<ICompany | undefined>{
    return this._httpClient.get<ICompany[]>("./assets/json/companies.json").pipe(
      map((companies:ICompany[]) => {
        return companies.find((comp) => comp.id === id);
      })
    );
  }

  getSegments(ids: string[]): Observable<ISegment[]>{
    return this._httpClient.get<ISegment[]>("./assets/json/segments.json").pipe(
      map((segments:ISegment[]) => {
        return segments.filter((seg) => ids.includes(seg.id));
      })
    );
  }
}
