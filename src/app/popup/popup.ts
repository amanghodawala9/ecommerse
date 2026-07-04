import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-popup',
  imports: [],
  templateUrl: './popup.html',
  styleUrl: './popup.css',
})
export class Popup {
  @Input() hasError: boolean = false;
  @Input() message: string = '';
  @Input() isVisible: boolean = false;
}
