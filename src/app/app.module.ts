import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoPanelComponent } from './panels/logo-panel/logo-panel.component';
import { FilterPanelComponent } from './panels/filter-panel/filter-panel.component';
import { TicketsPanelComponent } from './panels/tickets-panel/tickets-panel.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { CommonModule } from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LogoPanelComponent,
    FilterPanelComponent,
    TicketsPanelComponent,
    ButtonComponent,
    CheckboxComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
