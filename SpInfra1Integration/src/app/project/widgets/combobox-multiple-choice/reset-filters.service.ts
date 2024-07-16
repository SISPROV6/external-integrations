import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetFiltersService {

  
  // #region ==========> PROPERTIES <==========
  private readonly _CALL_CHILD_METHOD_SOURCE = new Subject<void>();
  public readonly callChildMethod$: Observable<void> = this._CALL_CHILD_METHOD_SOURCE.asObservable();
  public triggerCallChildMethod(): void { this._CALL_CHILD_METHOD_SOURCE.next(); }
  // #endregion ==========> PROPERTIES <==========


}
