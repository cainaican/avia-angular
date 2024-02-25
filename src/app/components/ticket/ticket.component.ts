import { AfterViewChecked, ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs';
import { ICompany, ISegment, ITicket } from 'src/app/models/i-ticket';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class TicketComponent implements OnInit {
  @Input() model!: ITicket;
  public company$!: Observable<ICompany | undefined>;
  public segments$!: Observable<ISegment[] | undefined>;

  constructor(private readonly _ticketsService: TicketsService){
  }


  ngOnInit(): void {
    this.getFullInformationOfTicket();
  }

  

  public getFullInformationOfTicket() {
    this.company$ = this._ticketsService.getCompanyById(this.model.companyId);
    this.segments$ = this._ticketsService.getSegmentsByIds(this.model.segments);
  }


}
