import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-logo-panel',
  templateUrl: './logo-panel.component.html',
  styleUrls: ['./logo-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoPanelComponent {

}
