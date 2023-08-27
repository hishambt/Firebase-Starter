import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-google-btn',
  templateUrl: './google-btn.component.html',
  styleUrls: ['./google-btn.component.scss']
})
export class GoogleBtnComponent {

  @Output() buttonClick = new EventEmitter();
  @Input() isWaiting = false;
  
  buttonClicked() {
    this.buttonClick.emit();
  }
}
