import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare var google: any;

@Component({
  selector: 'page-list-modal',
  templateUrl: 'list-modal.html',
})
export class ListModalPage {

  geocoder: any;
  nearbyItems: any = new Array<any>();
  GooglePlaces: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private zone: NgZone) {
    this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div");
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
  }

  ionViewDidLoad() {
    var latlng = this.navParams.get('location');
    this.selectSearchResult(latlng);
  }

  selectSearchResult(item) {
    // this.presentLoading();
    var input = item.lat + ", " + item.lng;
    var latlngStr = input.split(',', 2);
    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    this.geocoder.geocode({'location': latlng}, (results, status) => {
      console.log(results)
      if(status == google.maps.places.PlacesServiceStatus.OK){
        this.GooglePlaces.nearbySearch({
          location: results[0].geometry.location,
          radius: '500',
          types: ['hospital'], //check other types here https://developers.google.com/places/web-service/supported_types
          key: 'AIzaSyAT55USDnQ-tZLHJlzryDJbxseD8sLSdZE'
        }, (near_places) => {
          this.zone.run(() => {
            this.nearbyItems = [];
            for (var i = 0; i < near_places.length; i++) {
              this.nearbyItems.push(near_places[i]);
            }
            // this.dismissLoading();
          });
        })
      }
    })
  }

}
