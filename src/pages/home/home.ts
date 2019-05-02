import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController, LoadingController } from 'ionic-angular';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapRef: ElementRef;

  map: any;
  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  loading: any;

  constructor(public navCtrl: NavController, private geolocation: Geolocation, public loadingCtrl: LoadingController, private zone: NgZone) {
    this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div")
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };
    this.autocompleteItems = [];
    this.markers = [];
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad(){
    this.showMap()
  }

  showMap() {
    // let infoWindow = new google.maps.InfoWindow({map: map});
    //Set latitude and longitude of some place
    var centers = { lat: -6.2556254, lng: 106.8612565 };
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: centers,
      zoom: 15
    });

    this.addMarker(centers, this.map);
  }

  tryGeolocation(){
    this.loading.present();
    this.clearMarkers();//remove previous markers

    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp)
      // let pos = {
      //   lat: resp.coords.latitude,
      //   lng: resp.coords.longitude
      // };
      // let marker = new google.maps.Marker({
      //   position: pos,
      //   map: this.map
      // });
      // this.markers.push(marker);
      // this.map.setCenter(pos);
      this.loading.dismiss();
    }).catch((error) => {
      console.log('Error getting location', error);
      this.loading.dismiss();
    });
  }

  updateSearchResults(){
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

  selectSearchResult(item){
    this.clearMarkers();
    this.autocompleteItems = [];

    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        // let position = {
        //     lat: results[0].geometry.location.lat,
        //     lng: results[0].geometry.location.lng
        // };
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }

  addMarker(position,map) {
    return new google.maps.Marker({
      position,
      map
    });
  }

  clearMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i])
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

}
