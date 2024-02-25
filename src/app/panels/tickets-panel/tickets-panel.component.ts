import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ERoundCorner, ESizeButton} from "../../components/button/button.component";
import {TicketsService} from "../../services/tickets.service";
import {ISegment, ITicket} from "../../models/i-ticket";
import {Observable, from} from 'rxjs';
import { FilterPanelService } from '../filter-panel/filter-panel.service';

@Component({
  selector: "app-tickets-panel",
  templateUrl: "./tickets-panel.component.html",
  styleUrls: ["./tickets-panel.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsPanelComponent implements OnInit {

  public ticketsForModel: ITicket[] | null = null;

  public countOfTicketsOnThePage: number = 5;
  public countOfTicketsToload: number = 5;

  constructor(
    private _ticketsService: TicketsService,
    private _filterPanelService: FilterPanelService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._ticketsService.getFilteredTickets().subscribe({
      next: (tickets) => {
        this.ticketsForModel = tickets.slice(0,this.countOfTicketsOnThePage);
        this._cdr.markForCheck();
      }
    });

    from(this._filterPanelService.potok$)
    .subscribe({
        next: (v) => {
          this._ticketsService.getFilteredTickets().subscribe({
            next: (tickets) => {
              this.ticketsForModel = tickets.slice(0,this.countOfTicketsOnThePage);
              this._cdr.markForCheck();
            }
          });
        }
      }
    )
  }

  public eRoundCorner(): typeof ERoundCorner {
    return ERoundCorner;
  }

  public eSizeButton(): typeof ESizeButton {
    return ESizeButton;
  }

  public loadNewTickets(e: MouseEvent): void {

    this.countOfTicketsOnThePage += this.countOfTicketsToload;

    this._ticketsService.getFilteredTickets().pipe().subscribe({
      next: (tickets) => {
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

    this._ticketsService.getSegmentsByIds(arrayOfAllSegments).subscribe({
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
    const arrayOfAllSegments = this.ticketsForModel?.flatMap((v) => {
      return v.segments;
    });

    if(!arrayOfAllSegments) return;

    this._ticketsService.getSegmentsByIds(arrayOfAllSegments).subscribe({
      next: (segments: ISegment[]) => {
        
        let newTicketsArray = segments.map((s: ISegment): ITicket => {
          
          const foundedTicket = this.ticketsForModel!.find((t) =>  t.segments.includes(s.id));

          let res = Object.assign({}, foundedTicket);

          res!.segments = res!.segments.filter(id => id === s.id);

          return res!;

        });

        newTicketsArray.sort((t1,t2) => {

          /*
          * соотношение цены данного рейса,
          * к общей сумме цен всего перечня рейсов, чем ниже kPrice1, 
          * тем наоблее выгоден рейс
          */

          const summaryOfPricesOfTickets = newTicketsArray.map((a) => a.price).reduce((a,b) => a + b);

          const kPrice1 = t1.price / summaryOfPricesOfTickets; 
          const kPrice2 = t2.price / summaryOfPricesOfTickets; 

          
          /*
          * соотношение времени полета данного рейса,
          * к общей сумме всех времен полетов, чем ниже kDuration, 
          * тем наоблее выгоден рейс
          */

          const summaryOfDurationsOfTickets = segments.map((a) => a.duration).reduce((a,b) => a + b);

          const kDuration1 = segments.find(s => s.id === t1.segments[0])!.duration / summaryOfDurationsOfTickets; 
          const kDuration2 = segments.find(s => s.id === t2.segments[0])!.duration / summaryOfDurationsOfTickets; 

          /*
          * Чем ниже сумма kPrice и kDuration, тем оптимальнее билет,
          * по критериям цена - время полета
          */

          return (kPrice1 + kDuration1) - (kPrice2 + kDuration2);
        })

        this.ticketsForModel = newTicketsArray.filter(t => t.segments.length !== 0);
        
        this._cdr.markForCheck();
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  public trackByIdAndIndex(_index: number, item: ITicket): string {
    return `${item.id} ${_index} ${item.segments.length}`;
  }

}
