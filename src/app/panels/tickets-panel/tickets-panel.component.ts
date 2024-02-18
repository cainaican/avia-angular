import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ERoundCorner, ESizeButton} from "../../components/button/button.component";
import {TicketsService} from "../../services/tickets.service";
import {ISegment, ITicket} from "../../models/i-ticket";
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tickets-panel',
  templateUrl: './tickets-panel.component.html',
  styleUrls: ['./tickets-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsPanelComponent implements OnInit {

  public tickets$: Observable<ITicket[]> | null = null;
  public tickets: ITicket[]| null = null;
  public ticketsForModel: ITicket[]| null = null;

  public countOfTicketsOnThePage: number = 5;

  constructor(
    private _ticketsService: TicketsService,
    private _cdr: ChangeDetectorRef,
  ) {
    
  }
  ngOnInit(): void {
    this._ticketsService.getTickets().pipe().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.ticketsForModel = tickets.slice(0,this.countOfTicketsOnThePage);
        this._cdr.markForCheck();
      }
    });
  }


  public eRoundCorner(): typeof ERoundCorner {
    return ERoundCorner;
  }
  public eSizeButton(): typeof ESizeButton {
    return ESizeButton;
  }

  public loadNewTickets(e: MouseEvent): void {

    this.countOfTicketsOnThePage += 5;

    this._ticketsService.getTickets().pipe().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.ticketsForModel = tickets.slice(0, this.countOfTicketsOnThePage);
        this._cdr.markForCheck();
      }
    });
  }

  public sortForChipest(): void {

      this.ticketsForModel!.sort((t1, t2) => t1.price - t2.price);

      this.ticketsForModel! = this.ticketsForModel!.map((tOuter, index) => {

        if (index + 1 === this.ticketsForModel!.length) return tOuter;

        for(let i = index; i < this.ticketsForModel!.length - 1; i++) {
          const isCompIdsEqual = tOuter.companyId === this.ticketsForModel![i + 1].companyId; 
          const isPricesEqual = tOuter.price === this.ticketsForModel![i + 1].price;
          const isNotSegmentsEmpty = tOuter.segments.length && this.ticketsForModel![i + 1].segments.length;

          if (isCompIdsEqual && isPricesEqual && isNotSegmentsEmpty) {
            tOuter.segments = [...tOuter.segments, this.ticketsForModel![i + 1].segments.pop()!];
          } else {
            break;
          }
            
        }
        return tOuter;

      })
      this.ticketsForModel = this.ticketsForModel!.filter(t => t.segments.length !== 0);

    this._cdr.markForCheck();

  }

  public sortForFastest(): void {

    const arrayOfAllSegments = this.ticketsForModel?.flatMap((v) => {
      return v.segments;
    });
    
    if(!arrayOfAllSegments) return;

    this._ticketsService.getSegments(arrayOfAllSegments).subscribe({
      next: (segments: ISegment[]) => {
        const resultSegments = segments.sort((s1,s2) => s1.duration - s2.duration);

        let newTicketsArray = resultSegments.map((s: ISegment): ITicket => {
          
          const foundedTicket = this.ticketsForModel!.find((t) =>  t.segments.includes(s.id));

          let res = Object.assign({}, foundedTicket);

          res!.segments = res!.segments.filter(id => id === s.id);

          return res!;

        });

        newTicketsArray = newTicketsArray.map((tOuter, index) => {

          if (index + 1 === newTicketsArray.length) return tOuter;

          for(let i = index; i < newTicketsArray.length - 1; i++) {
            const isCompIdsEqual = tOuter.companyId === newTicketsArray[i + 1].companyId; 
            const isPricesEqual = tOuter.price === newTicketsArray[i + 1].price;
            const isNotSegmentsEmpty = newTicketsArray[i + 1].segments.length;

            if (isCompIdsEqual && isPricesEqual && isNotSegmentsEmpty) {
              
              tOuter.segments.push(newTicketsArray[i + 1].segments.pop()!);

            } else {

              tOuter.segments.sort((id1,id2) => {

                const s1 = resultSegments.find(s => id1 === s.id);

                const s2 = resultSegments.find(s => id2 === s.id);

                if (s1 && s2) return +s1.duration - +s2.duration;

                return 0;
                
              });

              break;
              
            }
          }

          return tOuter;

        })

        this.ticketsForModel = newTicketsArray.filter(t => t.segments.length !== 0);
        this._cdr.markForCheck();

      },
      error: (e) => {
        console.log(e)
      }
    })
    
  }

  public sortForOptimal(): void {
    
  }

  trackById(_index: number, item: ITicket): ITicket['segments'] {
    return item.segments;
}

}
