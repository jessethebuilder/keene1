Profiles.Collections['Profiles'] = Backbone.Collection.extend({
  model: Profiles.Models['Profile'],
  url: '/profiles'
});
