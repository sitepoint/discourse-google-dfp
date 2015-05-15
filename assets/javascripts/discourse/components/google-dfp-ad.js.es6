import loadScript from 'discourse/lib/load-script';

var _loaded = false,
    _promise = null;

function loadGoogle(settings) {
  if (_loaded) {
    return Ember.RSVP.resolve();
  }

  if (_promise) {
    return _promise;
  }

  var dfpSrc = (('https:' == document.location.protocol) ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
  _promise = loadScript(dfpSrc, { scriptTag: true }).then(function() {
    _loaded = true;
    if (window.googletag === undefined) {
      console.log('googletag is undefined!');
    }

    // Define our ad units
    googletag.cmd.push(function() {
      if (settings.dfp_show_topic_list_top && settings.dfp_topic_list_top_code) {
        googletag.defineSlot('/' + settings.dfp_id + '/' + settings.dfp_topic_list_top_code, [728, 90], 'div-gpt-ad-topic-list-top').addService(googletag.pubads());
      }
      if (settings.dfp_show_topic_top && settings.dfp_topic_top_code) {
        googletag.defineSlot('/' + settings.dfp_id + '/' + settings.dfp_topic_top_code, [728, 90], 'div-gpt-ad-topic-top').addService(googletag.pubads());
      }
      if (settings.dfp_show_topic_bottom && settings.dfp_topic_bottom_code) {
        googletag.defineSlot('/' + settings.dfp_id + '/' + settings.dfp_topic_bottom_code, [728, 90], 'div-gpt-ad-topic-bottom').addService(googletag.pubads());
      }
      googletag.pubads().enableSingleRequest();
      googletag.enableServices();
    });
  });

  return _promise;
}

export default Ember.Component.extend({
  classNames: ['google-dfp-ad'],
  loadedGoogletag: false,

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

  _initGoogleDFP: function() {
    var self = this;
    loadGoogle(Discourse.SiteSettings).then(function() {
      self.set('loadedGoogletag', true);
    });
  }.on('didInsertElement')
});
