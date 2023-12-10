import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshWatcherService {
  private refreshWatcher = new BehaviorSubject<string|null>(null);
  refreshObservable = this.refreshWatcher.asObservable();
  constructor() { }

  public refreshPage(page:string|null):void{
    if (page!==null || page !== undefined){
      this.refreshWatcher.next(page)
    }
    else{
      return;
    }
  }
}
