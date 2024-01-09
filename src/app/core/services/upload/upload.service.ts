import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';
import { ActionSheetController, ActionSheetOptions } from '@ionic/angular';
import { DataService } from '../data/data.service';
import { HelpersService } from '../helpers/helpers.service';
import { Image } from '../../interfaces/image.interface';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  image:Image | undefined;
  imageName:string|undefined
  set Image(image:Image|undefined){
    this.image = image;
  }
  get ImageName():string|undefined{
    return this.imageName
  }
  set ImageName(name:string|undefined){
     this.imageName = name
  }
  get Image():Image|undefined{
    return this.image;
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private actSheet:ActionSheetController,
    private data:DataService,
    private helpers:HelpersService
  ) { };
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  async ActionSheetChooseImage():Promise<any>{
    const options : ActionSheetOptions ={
      header:'اختيار صورة',
      buttons:[
        {
          text:'افتح المعرض',
          icon:'image-outline',
          handler:async()=>{
          const image:Image = await this.selectImageFromDevice();
          await ActSheet.dismiss(image);
          }
        },
        {
          text:'التقط صورة',
          icon:'camera-outline',
          handler:async()=>{
          const image:Image = await this.takeAphoto();
          await ActSheet.dismiss(image);
          }
        }
      ]
    }
    const ActSheet = await  this.actSheet.create(options);
    await ActSheet.present();
    const data = await ActSheet.onDidDismiss();
    return data.data;
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  private async selectImageFromDevice():Promise<any>{
    const options:ImageOptions = {
      quality:50,
      allowEditing:false,
      resultType:CameraResultType.DataUrl,
      source:CameraSource.Photos,
    }
    const image = await Camera.getPhoto(options);
    if (image){
      this.procesImage(image);
    }
    else{
      return;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  private async takeAphoto():Promise<any>{
    const options:ImageOptions = {
      quality:50,
      allowEditing:false,
      resultType:CameraResultType.DataUrl,
      saveToGallery:true,
      source:CameraSource.Camera,
      correctOrientation:false
    }
    const image = await Camera.getPhoto(options);
    console.log("🚀 ~ UploadService ~ takeAphoto ~ image:", image)

    if (image){
      this.procesImage(image);
    }
    else{
      console.log(`Choosing images was canceled`);
      return;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  private procesImage(photo:Image):Image{
    const image:Image = {
      name: new Date().getTime()+`.${photo.format}`,
      data:photo.dataUrl
    }
    this.image = image;
    return image;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  private async setImageFormData(image:Image){
    let fData = new FormData();
    const data = await fetch(image.data as string);
    const blob = await data.blob();
    fData.append('image', blob,image.name);
    return fData;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////



  ////////////////////////////////////////////////////////////////////////////////////////////////////
  clearImage(){
    this.image = {};
    this.imageName = '';
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  async uploadImage(image:Image|undefined){
    await this.helpers.StartLoading({})
    if (image===undefined||this.imageName?.length){
      this.helpers.StopLoading()
      return;
    }
    const ImageData = await this.setImageFormData(image);
    this.data.postData(`/upload/image`,ImageData).subscribe(
      async (res:any)=>{
      this.helpers.StopLoading()
      this.imageName = res.image
      },
      err=>{
        this.helpers.StopLoading()

      }
    )
  }



}
