import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export interface IFilter {
	allTransfers: boolean;
	withoutStops: boolean;
	oneStop: boolean;
	twoStops: boolean;
	threeStops: boolean;
}

@Injectable()
export class FilterPanelService {
	set allTransfers(v: boolean) {
		this.model.allTransfers = v;
		this.filtersStateListener$.next(this.model);
	}

	get allTransfers() {
		return this.model.allTransfers;
	}

	set withoutStops(v: boolean) {
		this.model.withoutStops = v;
		this.filtersStateListener$.next(this.model);
	}

	get withoutStops() {
		return this.model.withoutStops;
	}

	set oneStop(v: boolean) {
		this.model.oneStop = v;
		this.filtersStateListener$.next(this.model);
	}

	get oneStop() {
		return this.model.oneStop;
	}

	set twoStops(v: boolean) {
		this.model.twoStops = v;
		this.filtersStateListener$.next(this.model);
	}

	get twoStops() {
		return this.model.twoStops;
	}

	set threeStops(v: boolean) {
		this.model.threeStops = v;
		this.filtersStateListener$.next(this.model);
	}

	get threeStops() {
		return this.model.threeStops;
	}

	model: IFilter = {
		allTransfers: false,
		withoutStops: true,
		oneStop: false,
		twoStops: false,
		threeStops: false,
	};

	filtersStateListener$: Subject<IFilter> = new Subject();
}
