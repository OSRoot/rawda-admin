import { Injectable } from '@angular/core';
import {
  AlertController,
  AlertOptions,
  LoadingController,
  LoadingOptions,
  NavController,
  ToastController,
  ToastOptions,
} from '@ionic/angular';
import { AlertData } from '../../interfaces/alertConfirmData';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  isLoading: boolean = false;
  private loading: any | null;
  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private tostCtrl: ToastController
  ) {}

  ///////////////////////////////////////////////////////////////////////////////////
  navigate(page: string, dir: string, path?: any) {
    if (dir === 'forward'.toLowerCase()) {
      this.navCtrl.navigateForward(page);
    } else if (dir === 'root'.toLowerCase()) {
      this.navCtrl.navigateRoot(page);
    } else {
      this.navCtrl.navigateBack(page);
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////

  navBack() {
    this.navCtrl.pop();
  }
  ///////////////////////////////////////////////////////////////////////////////////

  async GenericAlertConfirm(options: AlertOptions) {
    const alert = await this.alertCtrl.create({
      header: options.header || 'تأكيد',
      message: options.message || 'هل أنت متأكد؟',
      buttons: options.buttons || [
        { text: 'إلغاء', role: 'cancel' },
        { text: 'نعم', role: 'confirm' },
      ],
      cssClass: options.cssClass || 'OS-CUSTOM-ALERT',
      mode:options.mode||'ios',
      inputs:options.inputs|| []
    });
    await alert.present();
    const data = await alert.onDidDismiss() as AlertData;
    return data
  }
  ///////////////////////////////////////////////////////////////////////////////////
  async PresentGenericToaster(options: ToastOptions) {
    const toaster = await this.tostCtrl.create({
      header: options.header || 'إخطار',
      message: options.message || 'تم',
      cssClass: options.cssClass || 'OS-CUSTOM-TOASTER',
      duration: options.duration || 3000,
      icon:'notifications-outline',
      buttons:[
        {icon:'close',role:'cancel'}
      ],
      position:options.position||'top'
    });
    await toaster.present();
    const data = await toaster.onDidDismiss();
  }
  ///////////////////////////////////////////////////////////////////////////////////

  async StartLoading(options: LoadingOptions): Promise<void> {
    if (this.isLoading) return;
    this.isLoading = true;
    this.loading = await this.loadingCtrl.create({
      message: options.message || undefined,
      animated: options.animated || true,
      cssClass: options.cssClass || 'OS-CUSTOM-LOADING',
    });
    await this.loading.present();
  }

  ///////////////////////////////////////////////////////////////////////////////////

  async StopLoading(): Promise<void> {
    this.isLoading = false;
    this.loading?.dismiss();
  }
  ///////////////////////////////////////////////////////////////////////////////////
}
