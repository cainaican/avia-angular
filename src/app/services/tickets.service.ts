import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, map } from "rxjs";
import { ICompany, ISegment, ITicket } from "../models/i-ticket";
import { FilterPanelService } from "../panels/filter-panel/filter-panel.service";

@Injectable({
	providedIn: "root",
})
export class TicketsService {
	tickets$: Observable<ITicket[]> | null = null;

	constructor(
		private readonly _httpClient: HttpClient,
		private readonly _filterPanelService: FilterPanelService, // eslint-disable-next-line no-empty-function
	) {}

	getTickets(): Observable<ITicket[]> {
		return this._httpClient.get<ITicket[]>("./assets/json/tickets.json");
	}

	getCompanyById(id: string): Observable<ICompany | undefined> {
		return this._httpClient.get<ICompany[]>("./assets/json/companies.json").pipe(
			map((companies: ICompany[]) => {
				return companies.find((comp) => comp.id === id);
			}),
		);
	}

	getCompanies(): Observable<ICompany[] | undefined> {
		return this._httpClient.get<ICompany[]>("./assets/json/companies.json");
	}

	getSegmentsByIds(ids: string[]): Observable<ISegment[]> {
		return this._httpClient.get<ISegment[]>("./assets/json/segments.json").pipe(
			map((segments: ISegment[]) => {
				return segments.filter((seg) => ids.includes(seg.id));
			}),
		);
	}

	getSegments(): Observable<ISegment[]> {
		return this._httpClient.get<ISegment[]>("./assets/json/segments.json");
	}

	getFilteredTickets(): Observable<ITicket[]> {
		return forkJoin([this.getTickets(), this.getCompanies(), this.getSegments()]).pipe(
			map(([tickets, , segments]) => {
				const result = tickets.filter((ticket) => {
					ticket.segments = ticket.segments.filter((seg) => {
						const values: boolean[] = Object.values(this._filterPanelService.model);

						if (!values.includes(true)) {
							return true;
						}

						if (this._filterPanelService.allTransfers) {
							return true;
						}

						const s1 = segments.find((segment) => segment.id === seg);

						let res: boolean;

						switch (s1?.stops.length) {
							case 0:
								res = this._filterPanelService.withoutStops;
								break;
							case 1:
								res = this._filterPanelService.oneStop;
								break;
							case 2:
								res = this._filterPanelService.twoStops;
								break;
							case 3:
								res = this._filterPanelService.threeStops;
								break;
							default:
								res = true;
								break;
						}

						return res;
					});

					return ticket.segments.length > 0;
				});

				return result;
			}),
		);
	}
}
