window.Profiles = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function(profile_data) {
    const profiles = new Profiles.Collections['Profiles'](profile_data);

    profiles.fetch().then(function(){
      const v = new Profiles.Views['ProfilesView']({collection: profiles});
      v.render();
    });


  }
};
