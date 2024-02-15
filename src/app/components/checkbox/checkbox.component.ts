import {Component, DoCheck, Input} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {

  public state: boolean = false;

  changeState(val: any) {
    this.state = !this.state;
  }

}
