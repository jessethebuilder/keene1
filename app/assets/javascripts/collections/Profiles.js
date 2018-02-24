Profiles.Collections['Profiles'] = Backbone.Collection.extend({
  model: Profiles.Models['Profile'],
  url: '/profiles',
  // initialize: function(){
  //   this.resort();
  // },
  // resort: function(){
  //
  // },
  // comparator: function(x, y){
  //
  // }
  // comparator: function(x, y){
  //   let index_x = this.models.indexOf(x);
  //   let index_y = this.models.indexOf(y);
  //
  //   let order_x = x.get('order');
  //   let order_y = y.get('order');
  //
  //   if(order_x && order_y){
  //     if(order_x < order_y){
  //       return -1;
  //     } else {
  //       return 1;
  //     }
  //   } else if(order_x){
  //     if(order_x <= index_y){
  //       return -1;
  //     } else {
  //       return 1;
  //     }
  //   } else if(order_y){
  //     if(order_y <= index_x){
  //       return 1;
  //     } else {
  //       return -1;
  //     }
  //   } else {
  //     if(index_x < index_y){
  //       return -1;
  //     } else if(index_x > index_y) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   }
  // }
});
