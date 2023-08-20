import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-google-btn',
  templateUrl: './google-btn.component.html',
  styleUrls: ['./google-btn.component.scss']
})
export class GoogleBtnComponent {

  @Output() buttonClick = new EventEmitter();
  
  buttonClicked() {
    this.buttonClick.emit();
  }
}
