import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Suggestion } from 'src/app/core/interfaces/suggestion.interface';
import { Page } from 'src/app/core/scripts/page';
import { DataService } from 'src/app/core/services/data/data.service';
import { HelpersService } from 'src/app/core/services/helpers/helpers.service';
import { RefreshWatcherService } from 'src/app/core/services/refresh/refresh-watcher.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.page.html',
  styleUrls: ['./suggestions.page.scss'],
})
export class SuggestionsPage implements OnInit , OnDestroy {
  segment = 'unread'
  skip=0
  suggestions:Suggestion[] = [];
  unreadCount: any
isLoading: any;
errorView: any;
  constructor(
    private helpers:HelpersService,
    private data:DataService,
    private refreshWatcher:RefreshWatcherService

  ) { }

  ngOnInit(
  ) {
    this.getData()
  // return true
  }
  navigate(page:string,dir:string,path?:string){

    this.helpers.navigate(page,dir,path)
  }
  //////////////////////////////////////////////////////////////////
navBack(){
  this.helpers.navBack()
}

segmentChanged(ev:any){
  this.segment = ev.detail.value
}
getData(ev?:any){
  forkJoin([
    this.data.getData('/suggest?skip=0'),
    this.data.getData('/suggest/count?seen=false'),
  ])
    .subscribe(
      res=>{
        this.suggestions = res[0];
        for (let sugg of this.suggestions){
          if (sugg?.seen===false){
            this.data.updateData('/suggest/'+sugg._id,{seen:true}).subscribe(
              res=>{
                this.refreshWatcher.refreshPage(Page.Tabs);
              },
              err=>{

              }
            )
          }
        }
        this.unreadCount = res[1];

      },
      err=>{

      }
    )
}

ngOnDestroy() {
  return true
}
}
