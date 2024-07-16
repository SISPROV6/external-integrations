import { Component, Input, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';

interface CustomIconsConfig {
  class: string;
  iconName: string;
  iconColor: string;
  iconSize: number;
  iconTooltip: string;
}

@Component({
  selector: 'app-side-tabs',
  templateUrl: './side-tabs.component.html',
  styleUrls: ['./side-tabs.component.scss']
})
export class SideTabsComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    
  }

  @Input({ required:true }) public useCustomIcons: boolean;
  
  @Input() public titleList: string[];
  @Input() public subtitleList: string[] = [];
  @Input() public selectedIndex: number = 0;
  
  @Input() public icons: any[] = [];
  @Input() public customIcons: CustomIconsConfig[] = [];

  @Output() public indexPage: EventEmitter<number> = new EventEmitter<number>();


  public sendIndexPage(index: number): void {
    this.selectedIndex = index;
    this.indexPage.emit(this.selectedIndex);
  }
}
