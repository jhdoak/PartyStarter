angular.module('myApp')
.component('partyShow', {
  template: `
    <div id="party-show">
      <div class="party-header z-depth-1 indigo-text">
        <div class="icons indigo-text">
            <i ng-if="$ctrl.party.details.over18" class='icon-span' title="18 and up only"><span>18+</span></i>
            <i ng-if="$ctrl.party.details.over21" class='icon-span' title="21 and up only"><span>21+</span></i>
            <i ng-if="$ctrl.party.details.byoBeer" class="fa fa-beer" aria-hidden="true" title="Bring your own beer"></i>
            <i ng-if="$ctrl.party.details.byoFood" class="fa fa-cutlery" aria-hidden="true" title="Bring your own food"></i>
            <i ng-if="$ctrl.party.details.movie" class="fa fa-film" aria-hidden="true" title="Movie party"></i>
            <i ng-if="$ctrl.party.details.music" class="fa fa-music" aria-hidden="true" title="Music"></i>
            <i ng-if="$ctrl.party.details.outdoors" class="fa fa-sun-o" aria-hidden="true" title="Outdoor party"></i>
            <i ng-if="$ctrl.party.details.birthday" class="fa fa-birthday-cake" aria-hidden="true" title="Birthday party"></i>
        </div>
        <h3>{{ $ctrl.party.name }}</h3>
        <p><b>Organized by: </b>{{ $ctrl.party.organizer.username }}</p>
        <p class="party-description"><b>Description: </b>{{ $ctrl.party.description }}</p>
      </div>

      <div class="party-body row red-text accent-2">
        <div class="party-info column">
          <div class="party-time detail-section">
            <div class="icon">
              <i class="fa fa-clock-o" aria-hidden="true"></i>
            </div>
            <div class="details">
              <p><b>Date: </b>{{ $ctrl.party.date }}</p>
              <p><b>Time: </b>{{ $ctrl.party.time.start }} to {{ $ctrl.party.time.end }}</p>
            </div>
          </div>
          <div class="party-location detail-section">
            <div class="icon">
              <i class="fa fa-map-marker" aria-hidden="true"></i>
            </div>
            <div class="details">
              <p><b>Location: </b>{{ $ctrl.party.location.address }}</p>
            </div>
            <div id="showmap"></div>
          </div>
        </div>

        <div>
          <div class="party-people column detail-section">
            <div class="icon">
              <i class="fa fa-user" aria-hidden="true"></i>
            </div>
            <div class="details">
              <p><b>Planned On: </b>{{ $ctrl.party.updatedAt | date : "medium" }}</p>
              <p><b>Updated On: </b>{{ $ctrl.party.createdAt | date : "medium" }}</p>
              <p><b>Guests Attending: </b> {{ $ctrl.party.usersAttending }}</p>
            </div>
          </div>
        </div>
      </div>

    <a ui-sref="parties" class="showButton btn btn yellow lighten-2 black-text">Back</a>
    <a ng-if="$ctrl.Auth.getCurrentUserSync().email==$ctrl.party.organizer.local.email" ng-click="$ctrl.edit(party)" class="showButton btn yellow lighten-2 black-text">Edit</a>
    </div>


  `,
  controller: function(partyService, $state, $stateParams, Auth) {
    this.party = null;

    this.Auth = Auth;

    this.edit = function() {
      $state.go('party-edit', { id: this.party._id });
    };

    partyService.getParty($stateParams.id)
    .then( res => {
      this.party = res.data;
      this.party.date = moment(this.party.date).format('MM-DD-YYYY');
      console.log(this.party.organizer.local.email);
      console.log(Auth.getCurrentUserSync().email);

      var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(this.party.location.lat, this.party.location.lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(document.getElementById('showmap'), mapOptions);

      var marker = new google.maps.Marker({
        map: this.map,
        position: new google.maps.LatLng(this.party.location.lat, this.party.location.lng)
      });

    });

  }
});
