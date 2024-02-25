import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ICompany, ISegment, ITicket } from '../models/i-ticket';
import { Observable, filter, forkJoin, map } from 'rxjs';
import { FilterPanelService } from '../panels/filter-panel/filter-panel.service';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {


  public filterObject: {stops: [boolean, boolean, boolean, boolean], all: boolean} = {stops: [false, false, false, false], all: true};

  public tickets$: Observable<ITicket[]> | null = null;

  constructor(
    private _httpClient: HttpClient,
    private _filterPanelService: FilterPanelService
  ) { }

  getTickets(): Observable<ITicket[]>{
    return this._httpClient.get<ITicket[]>("./assets/json/tickets.json")
  }

  getCompanyById(id: string): Observable<ICompany | undefined>{
    return this._httpClient.get<ICompany[]>("./assets/json/companies.json").pipe(
      map((companies:ICompany[]) => {
        return companies.find((comp) => comp.id === id);
      })
    );
  }

  getCompanies(): Observable<ICompany[] | undefined>{
    return this._httpClient.get<ICompany[]>("./assets/json/companies.json");
  }

  getSegmentsByIds(ids: string[]): Observable<ISegment[]>{
    return this._httpClient.get<ISegment[]>("./assets/json/segments.json").pipe(
      map((segments:ISegment[]) => {
        return segments.filter((seg) => ids.includes(seg.id));
      })
    );
  }

  getSegments(): Observable<ISegment[]>{
    return this._httpClient.get<ISegment[]>("./assets/json/segments.json");
  }


  getFilteredTickets(): Observable<ITicket[]> {
    return forkJoin(
      this.getTickets(),
      this.getCompanies(),
      this.getSegments(),
    ).pipe(
      map(([tickets, companies, segments]) => {
        const result = tickets.filter((ticket) => {

          ticket.segments = ticket.segments.filter(seg => {

            const s1 = segments.find(segment => segment.id === seg);

            let res: boolean;

            switch (s1?.stops.length) {
              case 0: res = this._filterPanelService.model.withoutStops || this._filterPanelService.model.allTransfers; 
                break;
              case 1: res = this._filterPanelService.model.oneStop; 
                break;
              case 2: res = this._filterPanelService.model.twoStops; 
                break;
              case 3: res = this._filterPanelService.model.threeStops; 
                break;
              default: res = this._filterPanelService.model.allTransfers;
                break;
            }
            return res;
          });

          return ticket.segments.length > 0;
        })

        return result;
      })
    )
  }

}

