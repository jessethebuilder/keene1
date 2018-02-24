Profiles.Views['ProfileView'] = Backbone.View.extend({
  model: Profiles.Models['Profile'],
  template: JST['profile/profile_view'],
  tagName: 'tr',
  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);
    // this.listenTo(this.model, '')
  },
  events: {
    'input input': 'edit',
    'change input, select': 'update',
    'click .photo': 'editPhoto',
    'click [name=delete]' : 'deleteModel',
    // 'input .photo [name=photo]' : 'updatePhoto'
    'keyup [name=send_to_page]' : 'sendToPage'
  },
  sendToPage: function(e){
    if(e.keyCode === 13){
      this.model.set({send_to_page: $(e.target).val()});
      this.remove();
    }
  },
  deleteModel: function(){
    if(confirm("Are you sure? This is permanent!")){
      this.model.destroy();
    }
  },
  updatePhoto: function(e){
  },
  editPhoto: function(event){
    const t = this;
    let photo_box = this.$el.find('.photo');
    let photo = this.$el.find('img');

    if(this.$el.find('[type=file][name=photo]').length === 0){
      // Unless this already exists
      let input = $('<input type="file" name="photo" class="form-control" />');
      $(input).insertAfter(event.target);
      input.trigger('click'); // Open dialog

      document.body.onfocus = function(){
        if(!this.changing_photo){
          // Unless a photo has been selected, detach. Otherwise, this is re-rendered after new photo upload
          input.detach(); // Remove input on cancel
        }
      }

      input.change(function(){
        this.changing_photo = true; // Mark as changing, so no detach

        photo.hide(); // Hide content of cell
        photo_box.find('button').hide();

        let gif = $('<img>');
        gif.attr('src', '/utilities/ajax-loader.gif');
        // photo_box.append('uplaoding ');
        gif.css('marginLeft', '12px').css('marginTop', '4px');
        photo_box.append(gif);
      });
    }
  },
  edit: function(event){
    $(event.target).addClass('editing');
  },
  update: function(event){
    const t = this;
    const targ = $(event.target);
    const name = targ.prop('name');

    if(name === 'send_to_page'){ return; } // send_to_page does not get set.

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
  updatePage: function(){

  },
  uploadPhoto: function(field){
    const t = this;
    return new Promise(function(resolve, reject){
      let formData = new FormData();
      let file = field.files[0];
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
      if(input.prop('name') === 'member_id'){
        t.model.fetch().then(function(){
          t.$el.find('.photo').text(t.model.get('photo'));
        });
      }

      input.removeClass('editing');
    });
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.attr('data-id', this.model.get('id'));
    return this;
  }
});
