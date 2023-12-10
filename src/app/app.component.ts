import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from './core/services/auth/auth.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  constructor(
    private storage:Storage,
    private authService:AuthService,
    private navCtrl:NavController
  ) {
    this.initStorage()
    // this.setToken()
  }


  async initStorage(){
    this.storage.create();
    this.checkUser()
  }

  async checkUser():Promise<void | boolean> {
    const token = this.authService.accessToken;
    if(!token) return this.navCtrl.navigateRoot("/login");
    this.navCtrl.navigateRoot("/home")
  }

  
}
