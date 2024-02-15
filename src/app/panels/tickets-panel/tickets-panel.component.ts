import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ERoundCorner} from "../../components/button/button.component";
import {TicketsService} from "../../services/tickets.service";
import {ITicket} from "../../models/i-ticket";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tickets-panel',
  templateUrl: './tickets-panel.component.html',
  styleUrls: ['./tickets-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsPanelComponent {

  public tickets$: Observable<ITicket[]> | null = null;

  constructor(
    private _ticketsService: TicketsService
  ) {
    // this.getTickets();

    this.tickets$ = this._ticketsService.getTickets();
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
