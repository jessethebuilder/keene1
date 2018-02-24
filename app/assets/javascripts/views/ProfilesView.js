Profiles.Views['ProfilesView'] = Backbone.View.extend({
  collection: Profiles.Collections['Profiles'],
  el: '#profiles',
  initialize: function(){
    this.filters = {};
    this.page = this.attributes['page'] || 1;
    this.per_page = this.attributes['per_page'] || 100;

    // this.on('change', this.sendToPage)
    this.listenTo(this.collection, 'change:send_to_page', this.sendToPage);
  },
  sendToPage: function(model){
    // Triggered after send to page is updated on model
    const t = this;

    if(model.get('send_to_page') != ''){
      // If this is a value, set, and save. Re-render page if you're on same one
      let order = (model.get('send_to_page') - 1) * 100
      model.set({order: order});
      model.save().then(function(){
        t.collection.fetch().then(function(){
          if(model.get('send_to_page') == t.page){
            t.renderList(); // If this is the same page, render
          }
        });
      });
    } else {
      model.set({order: null});
      model.save().then(function(){
        t.renderList();
      });
    }
  },
  events: {
    'change .filter': 'filter',
    'click .pagination .page-link' : 'changePage'
  },
  changePage: function(event){
    event.preventDefault();
    this.page = $(event.target).text();
    this.renderList();
  },
  filter: function(event){
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
    this.list = this.$el.find('#profile_list');
    this.renderFilters();
    this.renderList();
    this.initSortable();
    return this;
  },
  renderFilters: function(){
    let headers = this.$el.find('th');
    $(headers).each(function(i, header){
      let h = $(header);
      if(h.find('.filter').length === 0){
        let name = h.data('filter-for');
        if(name){
          let input = $('<input type="text" class="form-control filter" />');
          input.prop('name', name);
          h.append(input);
        }
      }
    });
  },
  renderList: function(){
    let models = this.filterList();
    this.renderPage(models);
  },
  filterList(){
    const t = this;
    let arr = [];
    this.collection.each(function(model){
      let pass = true;

      for(filter in t.filters){
        let reg = new RegExp(t.filters[filter], 'i');
        if(!reg.test(model.get(filter))){
          pass = false;
          break;
        }
      }

      if(pass){ arr.push(model); }
    });

    return arr;
  },
  renderPage(models){
    this.list.empty();

    const t = this;
    let first_page = (this.page - 1) * 100;
    let last_page = first_page + 99;

    let models_slice = models.slice(first_page, last_page + 1);

    $(models_slice).each(function(){
      let v = new Profiles.Views['ProfileView']({model: this});
      t.list.append(v.render().$el);
    });

    this.initPagination(models);
  },
  initSortable: function(){
    const t = this;
    $(this.list).sortable({
      handlle: '.sort_handle',
      axis: 'y',
      stop: function(event, ui){
        let targ = $(ui.item).closest('tr');
        let profile = t.collection.findWhere({id: targ.data('id')});
        profile.set({order: 'slug'});
        t.reorderPage();
      }
    })
  },
  reorderPage: function(){
    // Reorder entire page, but only if model has order. Otherwise, ignore.
    const t = this;
    let profiles_to_save = [];

    t.list.find('tr').each(function(i){
      // Iterate each row and extract the id from data-id. Check if order exists,
      // if so, update and then save as a batch like below.
      let id = $(this).data('id');
      let profile = t.collection.findWhere({id: id});
      if(profile.get('order') != null){ // if order is defined
        let order = i + ((t.page - 1) * 100);
        profile.set({order: order});
        profiles_to_save.push(profile);
      }
    });

    Promise.all(profiles_to_save.map(function(p){ return p.save() })).then(function(){
      t.collection.fetch();
    });

    // c(this.collection.url);
    // this.collection.save().then(function(){
    //   c('done');
    // });
  },
  initPagination: function(models){
    // Event handling for pagination is on this View.
    const t = this;
    $('.pagination_wrapper').each(function(){
      let v = new Profiles.Views['PaginationView']({attributes: {collection_count: models.length,
                                                                 per_page: t.per_page,
                                                                 page: t.page}});
      $(this).html(v.render().$el);
    });
  }
});
