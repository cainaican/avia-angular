import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {ERoundCorner} from "../../components/button/button.component";
import {TicketsService} from "../../services/tickets.service";
import {ITicket} from "../../models/i-ticket";
import { Observable, take } from 'rxjs';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-tickets-panel',
  templateUrl: './tickets-panel.component.html',
  styleUrls: ['./tickets-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsPanelComponent {

  public tickets$: Observable<ITicket[]> | null = null;
  public tickets: ITicket[]| null = null;
  public ticketsForModel: ITicket[]| null = null;

  constructor(
    private _ticketsService: TicketsService,
    private _cdr: ChangeDetectorRef,
  ) {
    this._ticketsService.getTickets().pipe().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.ticketsForModel = tickets.slice(0,5);
        this._cdr.markForCheck();
      }
    });
  }


  public eRoundCorner(): typeof ERoundCorner {
    return ERoundCorner;
  }

  // public getTickets(){
  //  this._ticketsService.getTickets().subscribe({
  //   next: (val) => {
  //       this.tickets = val;
  //   },
  //   error: (e) => {
  //     console.log(e);
  //   }
  //  })
  // }


}
