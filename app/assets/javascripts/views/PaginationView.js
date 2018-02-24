Profiles.Views['PaginationView'] = Backbone.View.extend({
  template: JST['pagination'],
  tagName: 'ul',
  className: 'pagination',
  render: function(){
    if(this.attributes['collection_count'] > 1){
      this.$el.html(this.template({collection_count: this.attributes['collection_count'],
      per_page: this.attributes['per_page'],
      page: this.attributes['page']}));
    } else {
      this.$el.empty();
    }

    return this;
  }
});
