import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: '[app-footer]',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(private el: ElementRef) { }

  currentTime = new Date()
  year: number = this.currentTime.getFullYear();

  ngOnInit(): void {
    let htmlEl: HTMLElement = this.el.nativeElement as HTMLElement;
    htmlEl.style.height = "100%";
    htmlEl.style.display = "flex";
    htmlEl.style.alignItems = "flex-end";
    htmlEl.style.justifyContent = "center";
    htmlEl.style.backgroundColor = "#eee";    // [!]    
  }

}
