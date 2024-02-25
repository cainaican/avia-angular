import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TicketsService } from "src/app/services/tickets.service";
import { FilterPanelService, IFilterModel } from "./filter-panel.service";

@Component({
	selector: "app-filter-panel",
	templateUrl: "./filter-panel.component.html",
	styleUrls: ["./filter-panel.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPanelComponent {
	filterModel: IFilterModel | null = null;

	constructor(
		private readonly _ticketsService: TicketsService,
		private readonly _filterPanelService: FilterPanelService,
	) {
		this.filterModel = this._filterPanelService.model;
	}
}
