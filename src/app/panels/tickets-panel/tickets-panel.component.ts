import {Component, Input} from '@angular/core';
import {ERoundCorner} from "../../components/button/button.component";

@Component({
  selector: 'app-tickets-panel',
  templateUrl: './tickets-panel.component.html',
  styleUrls: ['./tickets-panel.component.scss']
})
export class TicketsPanelComponent {

  public eRoundCorner(): typeof ERoundCorner {
    return ERoundCorner;
  }

}
