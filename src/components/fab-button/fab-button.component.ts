import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'fab-button',
  templateUrl: 'fab-button.html',
})
export class FabButtonComponent {

  @Output()
  actionButton = new EventEmitter();

  @Input()
  iconName: string;

  constructor() {}

}
