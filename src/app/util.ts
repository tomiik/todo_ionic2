import { ToastController } from 'ionic-angular';

export class Util {
  constructor(public toastCtrl: ToastController) {
  }

  public showToast(str) {
     const toast = this.toastCtrl.create({
       message: str,
       duration: 2000,
       showCloseButton: true,
       position: 'top',
       closeButtonText: 'Close'
     });
     toast.present();
   }
}
