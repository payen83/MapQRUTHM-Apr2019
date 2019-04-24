import { Component, OnInit } from '@angular/core';
import leaflet from 'leaflet'; 
// import here
import { Geolocation } from '@ionic-native/geolocation/ngx'; 
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  map: any; // add here
  constructor(
    private geolocation: Geolocation, 
    private loadingController: LoadingController
    ) { }
 
  ionViewDidEnter(){
    this.presentLoading(); //display loading
    this.geolocation.getCurrentPosition().then((resp) => {
      this.loadingController.dismiss(); // remove loading indicator
      console.log('lat: ', resp.coords.latitude);
      console.log('lng: ', resp.coords.longitude);
      this.loadMap(resp.coords.longitude, resp.coords.latitude);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  loadMap(lng: number, lat: number) { // add this function
    if (!this.map) {
      this.map = leaflet.map('map', { zoomControl: false }).fitWorld();
      leaflet.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attributions: 'UTHM',
        minZoom: 6,
        maxZoom: 19
      }).addTo(this.map);
      this.map.setView([lat, lng ], 17);
      leaflet.marker([lat, lng]).addTo(this.map)
        .bindPopup("You are here").openPopup();
    }
  } // end of loadMap

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait..',
      duration: 5000
    });
    await loading.present();
  }


  ngOnInit() {
  }

}
