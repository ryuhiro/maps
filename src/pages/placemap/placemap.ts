import { Component, ViewChild, ElementRef } from '@angular/core';
// import { Geolocation } from '@ionic-native/geolocation';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-placemap',
  templateUrl: 'placemap.html',
})
export class PlacemapPage {

  @ViewChild('map') mapRef: ElementRef;

  data: any;
  map: any;
  geocoder: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.geocoder = new google.maps.Geocoder;
  }

  ionViewDidLoad() {
    this.data = this.navParams.get('place');
    this.getGeocode(this.data.place_id);
  }

  // showMap(places) {
  //   // let infoWindow = new google.maps.InfoWindow({map: map});
  //   //Set latitude and longitude of some place
  //   this.map = new google.maps.create(document.getElementById('map'), {
  //     center: places,
  //     zoom: 15
  //   });

  //   console.log(this.map);

  //   // this.addMarker(centers, this.map);
  // }

  getGeocode(place_id) {
    this.geocoder.geocode({'placeId': place_id}, (results, status) => {
      console.log(results)
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        // var marker = new google.maps.Marker({
        //   map: this.map,
        //   place: {
        //     placeId: results[0].place_id,
        //     location: results[0].geometry.location
        //   }
        // });
        // this.map.setCenter(results[0].geometry.location);
      }
    })
  }

}
