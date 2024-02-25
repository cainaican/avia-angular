import {Component, DoCheck, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {

  @Input() state!: boolean;
  @Output() stateChange: EventEmitter<boolean> = new EventEmitter();

  changeState(val: any) {
    this.state = !this.state;
    this.stateChange.emit(this.state);
  }

}
