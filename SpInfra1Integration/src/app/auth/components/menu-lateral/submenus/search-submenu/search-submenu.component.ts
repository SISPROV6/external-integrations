import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-submenu',
  templateUrl: './search-submenu.component.html',
  styleUrls: ['./search-submenu.component.scss']
})
export class SearchSubmenuComponent implements OnInit {

constructor() { }

ngOnInit(): void {

  }

  getFocus() {
    document.getElementById('search-bar')?.focus();
  }
}
