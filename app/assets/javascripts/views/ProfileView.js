Profiles.Views['ProfileView'] = Backbone.View.extend({
  model: Profiles.Models['Profile'],
  template: JST['profile/profile_view'],
  tagName: 'tr',
  initialize: function(){
    // this.listenTo(this.model, 'change', this.save);
  },
  events: {
    'input input': 'edit',
    'change input, select': 'update',
  },
  edit: function(event){
    $(event.target).addClass('editing');
    // this.$el.addClass('editing');
  },
  update: function(event){
    const targ = $(event.target);
    const name = targ.prop('name');
    let attrs = {};
    if(targ.prop('type') === 'checkbox'){
      attrs[name] = targ.prop('checked');
    } else {
      attrs[name] = targ.val();
    }
    this.model.set(attrs);
    this.save(targ);
  },
  save: function(input){
    const t = this;
    this.model.save().then(function(){
      input.removeClass('editing');
    });
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
