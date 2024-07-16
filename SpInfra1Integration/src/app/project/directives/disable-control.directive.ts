import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[disableControl]'
})
export class DisableControlDirective {

  @Input() disableControl: boolean;

  constructor(private ngControl: NgControl) {}

  ngOnInit() {
    if (this.disableControl) {
      this.ngControl.control?.disable();
    } else {
      this.ngControl.control?.enable();
    }
  }
}
