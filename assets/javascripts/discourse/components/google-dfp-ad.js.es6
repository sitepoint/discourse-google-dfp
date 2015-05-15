export default Ember.Component.extend({
  classNames: ['google-dfp-ad'],

  divId: function() {
    return "div-gpt-ad-" + this.get('placement');
  }.property('placement'),

  fixedSize: function() {
    switch(this.get('placement')) {
      case 'topic-list-top':
      case 'topic-top':
      case 'topic-bottom':
        return 'height:90px; width:728px;';
    }
  }.property('placement'),

  adUnitCode: function() {
    switch(this.get('placement')) {
      case 'topic-list-top': return Discourse.SiteSettings.dfp_topic_list_top_code;
      case 'topic-top':      return Discourse.SiteSettings.dfp_topic_top_code;
      case 'topic-bottom':   return Discourse.SiteSettings.dfp_topic_bottom_code;
    }
  }.property('placement'),

});
