import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  qrText: any;
  constructor(private barcodeScanner: BarcodeScanner){
    this.qrText = null;
  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.qrText = barcodeData.text;
     }).catch(err => {
         console.log('Error', err);
         alert(JSON.stringify(err))
     });
  }

}
