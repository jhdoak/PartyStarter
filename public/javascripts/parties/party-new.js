angular.module('myApp')
.component('partyNew', {
  template: `
    <div class="main-landing new-landing">
    <h3>New</h3>

    <form ng-submit="$ctrl.save()">

      <div class="form-group">
        <label for="name">Name</label>
        <input type="text"
               class="form-control"
               name="name"
               ng-model="$ctrl.party.name">
      </div>

      <div class="form-group">
        <label for="time.start">Start Time</label>
        <input type="text"
               class="form-control"
               name="startTime"
               ng-model="$ctrl.party.time.start">
      </div>

      <div class="form-group">
        <label for="time.start">End Time</label>
        <input type="text"
               class="form-control"
               name="endTime"
               ng-model="$ctrl.party.time.end">
      </div>

      <div class="form-group">
        <label for="date">Date</label>
        <md-datepicker ng-model="$ctrl.party.date"
                       md-placeholder="Enter date">
                       </md-datepicker>
      </div>

      <div id="geocoder">
        <input id="address" type="textbox" value="Atlanta, GA">
        <input id="geocodeSubmit" type="button" value="Geocode">
      </div>

      <div id="geocodeMap"></div>

      <div class="form-group">
        <label for="description">Description</label>
        <input type="text"
               class="form-control"
               name="description"
               ng-model="$ctrl.party.description">
      </div>

      <div class="form-group detail-choices">
        <div class="detail-choice-box">
          <input type="checkbox" id='details.over18' class="form-control" name="details.over18" ng-model="$ctrl.party.details.over18"><label for="details.over18">18 and older</label>
        </div>

        <div class="detail-choice-box">
          <input type="checkbox" id='details.over21' class="form-control" name="details.over21" ng-model="$ctrl.party.details.over21"><label for="details.over21">21 and older</label>
        </div>

        <div class="detail-choice-box">
          <input type="checkbox" id='details.byoBeer' class="form-control" name="details.byoBeer" ng-model="$ctrl.party.details.byoBeer"><label for="details.byoBeer">Bring your own beer</label>
        </div>

        <div class="detail-choice-box">
          <input type="checkbox" id='details.byoFood' class="form-control" name="details.byoFood" ng-model="$ctrl.party.details.byoFood"><label for="details.byoFood">Bring your own food</label>
        </div>

        <div class="detail-choice-box">
          <input type="checkbox" id='details.movie' class="form-control" name="details.movie" ng-model="$ctrl.party.details.movie"><label for="details.movie">Movie</label>
        </div>

        <div class="detail-choice-box">
          <input type="checkbox" id='details.dancing' class="form-control" name="details.dancing" ng-model="$ctrl.party.details.dancing"><label for="details.dancing">Dancing</label>
        </div>

        <div class="detail-choice-box">
          <input type="checkbox" id='details.music' class="form-control" name="details.music" ng-model="$ctrl.party.details.music"><label for="details.music">Music</label>
        </div>

        <div class="detail-choice-box">
          <input type="checkbox" id='details.outdoors' class="form-control" name="details.outdoors" ng-model="$ctrl.party.details.outdoors"><label for="details.outdoors">Outdoors</label>
        </div>

        <div class="detail-choice-box">
          <input type="checkbox" id='details.swimming' class="form-control" name="details.swimming" ng-model="$ctrl.party.details.swimming"><label for="details.swimming">Swimming</label>
        </div>

        <div class="detail-choice-box">
          <input type="checkbox" id='details.birthday' class="form-control" name="details.birthday" ng-model="$ctrl.party.details.birthday"><label for="details.birthday">Birthday Party</label>
        </div>

        <div class="detail-choice-box">
          <input type="checkbox" id='details.attire.formal' class="form-control" name="details.attire.formal" ng-model="$ctrl.party.details.attire.formal"><label for="details.attire.formal">Formal Attire</label>
        </div>

        <div class="detail-choice-box">
          <input type="checkbox" id='details.attire.casual' class="form-control" name="details.attire.casual" ng-model="$ctrl.party.details.attire.casual"><label for="details.attire.casual">Casual Attire</label>
        </div>

      </div>

      <a ui-sref="parties" class="btn btn-primary">Back</a>
      <button type="submit" class="btn btn-success">Save</button>
    </form>
    </div>
  `,
  controller: function(partyService, $state) {
    var newPartyController = this;
    newPartyController.marker = undefined;

    newPartyController.party = {
      name: '',
      time: {
        start: '',
        end: ''
      },
      date: '',
      location: {
        address: '',
        lat: '',
        lng: ''
      },
      description: '',
      // foodList: {
      //   chosen: false
      // },
      // playlist: {
      //   chosen: false
      // },
      // entertainment: {
      //   chosen: false
      // }
      details: {
        over18: false,
        over21: false,
        byoBeer: false,
        byoFood: false,
        movie: false,
        dancing: false,
        music: false,
        outdoors: false,
        swimming: false,
        birthday: false,
        attire: {
          formal: false,
          casual: false
        }
      },
    };

    newPartyController.save = function() {
      console.log()
      partyService.create(newPartyController.party)
      .then( res => {
        $state.go('parties');
      });
    };

    newPartyController.initMap = function() {
      var map = new google.maps.Map(document.getElementById('geocodeMap'), {
        zoom: 11,
        center: {lat: 33.7490, lng: -84.3880}
      });
      var geocoder = new google.maps.Geocoder();

      newPartyController.marker = new google.maps.Marker({
            map: map,
            // position: {lat: 33.7490, lng: -84.3880}
          });

      document.getElementById('geocodeSubmit').addEventListener('click', function() {
        newPartyController.geocodeAddress(geocoder, map);
      });
    };

    newPartyController.geocodeAddress = function (geocoder, resultsMap) {
      var address = document.getElementById('address').value;
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
          newPartyController.marker.setMap(null);
          newPartyController.party.location.address = results[0].formatted_address;
          newPartyController.party.location.lat = results[0].geometry.location.lat();
          newPartyController.party.location.lng = results[0].geometry.location.lng();
          resultsMap.setCenter(results[0].geometry.location);
          newPartyController.marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    };
    newPartyController.initMap();
  }
});
