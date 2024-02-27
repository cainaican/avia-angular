import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LogoPanelComponent } from "./panels/logo-panel/logo-panel.component";
import { FilterPanelComponent } from "./panels/filter-panel/filter-panel.component";
import { TicketsPanelComponent } from "./panels/tickets-panel/tickets-panel.component";
import { ButtonComponent } from "./components/button/button.component";
import { CheckboxComponent } from "./components/checkbox/checkbox.component";
import { TicketComponent } from "./components/ticket/ticket.component";
import { DurationFormatPipe } from "./pipes/duration-format/duration-format.pipe";
import { Inclinator } from "./pipes/inclinator/inclinator.pipe";
import { FilterPanelService } from "./panels/filter-panel/filter-panel.service";

@NgModule({
	declarations: [
		AppComponent,
		LogoPanelComponent,
		FilterPanelComponent,
		TicketsPanelComponent,
		ButtonComponent,
		CheckboxComponent,
		TicketComponent,
		DurationFormatPipe,
		Inclinator,
	],
	imports: [BrowserModule, AppRoutingModule, CommonModule, FormsModule, HttpClientModule],
	providers: [FilterPanelService],
	bootstrap: [AppComponent],
})
export class AppModule {}
