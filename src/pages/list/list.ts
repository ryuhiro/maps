import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { PlacemapPage } from '../placemap/placemap';

declare var google: any;

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any;
  autocompleteItems: any;
  nearbyItems: any = new Array<any>();
  loading: any;
  options: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, public loadingCtrl: LoadingController, private geolocation: Geolocation) {
    // If we navigated to this page, we will have an item available as a nav param
    this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div");
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };
    this.autocompleteItems = [];
  }

  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        if(predictions){
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
    });
  }

  selectSearchResult(item) {
    // this.presentLoading();
    this.autocompleteItems = [];
    var input = item.lat + ", " + item.lng;
    var latlngStr = input.split(',', 2);
    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    this.geocoder.geocode({'location': latlng}, (results, status) => {
      console.log(results)
      if(status == google.maps.places.PlacesServiceStatus.OK){
        this.autocompleteItems = [];
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

  tryGeolocation(){
    this.presentLoading();

    this.options = {
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(this.options).then((resp) => {
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      console.log(resp);
      this.selectSearchResult(pos);
      this.dismissLoading();
    }).catch((error) => {
      console.log('Error getting location', error);
      this.dismissLoading();
    });
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    this.loading.present();
  }

  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

  toPlace(place) {
    this.navCtrl.push(PlacemapPage, {place: place});
  }
}
