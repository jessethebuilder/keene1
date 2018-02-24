window.Profiles = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function(profile_data, page) {
    if(typeof page == 'undefined'){ page = 1; }

    let profiles = new Profiles.Collections['Profiles'](profile_data);

    // profiles.fetch().then(function(){
    let v = new Profiles.Views['ProfilesView']({collection: profiles, attributes: {page: page, per_page: 100}});
    v.render();
    // });


  }
};
