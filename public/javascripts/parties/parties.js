angular.module('myApp')
.component('parties', {
  template: `
    <div class="party-page z-depth-1">


    <div class="parties" ng-repeat = "party in $ctrl.parties">

      <div>
        <h4 class="indigo-text" ng-click="$ctrl.show(party)"> {{ party.name }} </h4>
        <div class="icons indigo-text">
            <i ng-if="party.details.over18" title="18 and up only"><span>18+</span></i>
            <i ng-if="party.details.over21" title="21 and up only"><span>21+</span></i>
            <i ng-if="party.details.byoBeer" class="fa fa-beer" aria-hidden="true" title="Bring your own beer"></i>
            <i ng-if="party.details.byoFood" class="fa fa-cutlery" aria-hidden="true" title="Bring your own food"></i>
            <i ng-if="party.details.movie" class="fa fa-film" aria-hidden="true" title="Movie party"></i>
            <i ng-if="party.details.music" class="fa fa-music" aria-hidden="true" title="Music"></i>
            <i ng-if="party.details.outdoors" class="fa fa-sun-o" aria-hidden="true" title="Outdoor party"></i>
            <i ng-if="party.details.birthday" class="fa fa-birthday-cake" aria-hidden="true" title="Birthday party"></i>
        </div>
        <p class="indigo-text"> {{ party.description }}</p>
      </div>
      <hr>
    </div>
    <div class="newButton center">
    <a ui-sref="party-new" class="btn btn yellow lighten-2 black-text">Create a New Party!</a>
    </div>
    </div>
  `,
  controller: function(partyService, $state) {
    this.parties = null;

    this.getParties = function() {
      partyService.getParties()
      .then( res => {
        this.parties = res.data;
      });
    };

    this.getParties();

    this.show = function(party) {
      $state.go('party-show', { id: party._id });
    };

    this.delete = function(party) {
      partyService.delete(party)
      .then( res => {
        this.getParties();
      });
    };
  }
});
