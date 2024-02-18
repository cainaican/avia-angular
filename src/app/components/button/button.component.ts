import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Subject } from 'rxjs';

export enum ERoundCorner {
  "left" = "left-corner-rounded",
  "right" = "right-corner-rounded",
  "both" = "corner-rounded",
  "none" = ""
}
export enum ESizeButton {
  "big" = "big-button",
  "middle" = "middle-button",
  "small" = "small-button"
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() textButton: string = "";
  @Input() sizeButtonClass: ESizeButton = ESizeButton.small;
  @Input() roundCornerClass: ERoundCorner = ERoundCorner.none;
  @Output() clickOnButton: EventEmitter<unknown> = new EventEmitter();

  public getButtonClasses(): string[] {
    return [this.sizeButtonClass, this.roundCornerClass]
  }

  click(event: MouseEvent) {
    this.clickOnButton.emit(event);
  }

}
