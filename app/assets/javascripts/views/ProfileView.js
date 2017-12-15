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
    'dblclick .photo': 'updatePhoto',
  },
  updatePhoto: function(event){
    let input = $('<input type="file" name="photo" class="form-control" />');
    $(input).insertAfter(event.target);
  },
  edit: function(event){
    $(event.target).addClass('editing');
    // this.$el.addClass('editing');
  },
  update: function(event){
    const t = this;
    const targ = $(event.target);
    const name = targ.prop('name');
    let attrs = {};
    if(targ.prop('type') === 'checkbox'){
      attrs[name] = targ.prop('checked');
    } else if(targ.prop('type') === 'file'){
      t.uploadPhoto(targ[0]).then(function(){
        t.model.fetch().then(function(){
          t.render();
        });
      });
    } else {
      attrs[name] = targ.val();
    }
    this.model.set(attrs);

    this.save(targ);
  },
  uploadPhoto: function(field){
    const t = this;
    return new Promise(function(resolve, reject){
      let formData = new FormData();
      let file = field.files[0];
      c(file);
      formData.append('profile[photo]', file);

      $.ajax({
        url: t.model.url() + '.js',
        data: formData,
        cache: false,
        contentType: false,
        method: 'PUT',
        processData: false,
        success: function(){
          resolve();
        }
      });
    });
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
