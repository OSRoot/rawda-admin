import { Component, OnInit } from '@angular/core';
import { HelpersService } from 'src/app/core/services/helpers/helpers.service';

@Component({
  selector: 'app-send-notifications',
  templateUrl: './send-notifications.page.html',
  styleUrls: ['./send-notifications.page.scss'],
})
export class SendNotificationsPage implements OnInit {
  constructor(
    private helpers:HelpersService,

  ) { }

  ngOnInit(
  ) {
  return true
  }
  navigate(page:string,dir:string,path?:string){

    this.helpers.navigate(page,dir,path)
  }
  //////////////////////////////////////////////////////////////////
navBack(){
  this.helpers.navBack()
}
}
