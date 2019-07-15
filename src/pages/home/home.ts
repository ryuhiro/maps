import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { RumahSakitPage } from '../rumah-sakit/rumah-sakit';

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
  lat: any;
  lng: any;
  options: GeolocationOptions;
  currPos: Geoposition;
  modal: any;

  constructor(public navCtrl: NavController, private geolocation: Geolocation, public loadingCtrl: LoadingController, private zone: NgZone, public modalCtrl: ModalController) {
    this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div");
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
    this.showMap();
  }

  showMap() {
    // let infoWindow = new google.maps.InfoWindow({map: map});
    //Set latitude and longitude of some place
    var centers = { lat: -6.296437, lng: 106.855688 };
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: centers,
      zoom: 15
    });

    this.addMarker(centers, this.map);
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

  selectSearchResult(item) {
    // this.clearMarkers();
    this.autocompleteItems = [];
    // console.log(item)

    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        var marker = new google.maps.Marker({
          map: this.map,
          place: {
            placeId: results[0].place_id,
            location: results[0].geometry.location
          }
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }

  addMarker(position,map) {
    this.clearMarkers();//remove previous markers
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

  tryGeolocation(){
    this.clearMarkers();//remove previous markers
    this.presentLoading();

    this.options = {
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(this.options).then((resp) => {
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      let marker = new google.maps.Marker({
        position: pos,
        map: this.map
      });
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      console.log(pos);
      this.markers.push(marker);
      this.map.setCenter(pos);
      this.dismissLoading();
    }).catch((error) => {
      console.log('Error getting location', error);
      this.dismissLoading();
    });
  }

  tryNear() {
    var position = {
      lat: this.lat,
      lng: this.lng
    };
    this.navCtrl.push(RumahSakitPage, { location: position });
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

}
