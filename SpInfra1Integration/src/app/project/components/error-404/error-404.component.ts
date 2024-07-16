import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthStorageService } from 'src/app/auth/storage/auth-storage.service';

@Component({
  selector: 'app-error-404',
  templateUrl: './error-404.component.html',
  styleUrls: ['./error-404.component.css'],
  preserveWhitespaces: true
})
export class Error404Component {

  constructor(private router: Router,
              public authStorageService: AuthStorageService
) { }

  onHome() {
    this.router.navigate(["/home"]);
  }

}
