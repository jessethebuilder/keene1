Profiles.Views['ProfilesView'] = Backbone.View.extend({
  collection: Profiles.Collections['Profiles'],
  el: '#profiles',
  initialize: function(){
    this.filters = {};
  },
  events: {
    'change .filter': 'filter'
  },
  filter: function(event){
    this.filters = {};
    // Filters based on any value in all filters.
    let filters = this.$el.find('.filter');
    let filter_array = {};
    for(let i = 0; i < filters.length; i++){
      let f = $(filters[i]);
      if(f.val()){
        filter_array[f.prop('name')] = f.val();
      }
    }
    this.filters = filter_array;
    this.renderList();
  },
  render: function(){
    this.renderFilters();
    this.renderList();
    return this;
  },
  renderFilters: function(){
    let headers = this.$el.find('th');
    $(headers).each(function(i, header){
      let h = $(header);
      let name = h.data('filter-for');
      if(name){
        let input = $('<input type="text" class="form-control filter" />');
        input.prop('name', name);
        h.append(input);
      }
    });
  },
  renderList: function(){
    const t = this;

    t.list = this.$el.find('#profile_list');
    t.list.empty();

    this.collection.each(function(model){
      let pass = true;

      for(filter in t.filters){
        let reg = new RegExp(t.filters[filter], 'i');
        if(!reg.test(model.get(filter))){
          pass = false;
          break;
        }
      }

      if(pass){
        let v = new Profiles.Views['ProfileView']({model: model});
        t.list.append(v.render().$el);
      }
    });
  }
});
