import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
      selector: 'app-secondary-dropdown',
      templateUrl: './secondary-dropdown.component.html',
      styleUrls: ['./secondary-dropdown.component.scss']
})
export class SecondaryDropdownComponent implements OnInit {

      @Output() backPrimaryDropdown = new EventEmitter<boolean>();

      constructor() { }

      ngOnInit(): void {
      }

      backToPrimary() {
            this.backPrimaryDropdown.emit(true);
      }
}
