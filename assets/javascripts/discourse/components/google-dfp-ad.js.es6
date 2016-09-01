import loadScript from 'discourse/lib/load-script';

var _loaded = false,
    _promise = null,
    mobileSizes = [320, 50],
    desktopSizes = [[728, 90], [970, 90]];

function loadGoogle(settings, targets) {
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
      if (this.site.mobileView) {
        if (settings.dfp_mobile_show_topic_list_top && settings.dfp_mobile_topic_list_top_code) {
          googletag.defineSlot('/' + settings.dfp_id + '/' + settings.dfp_mobile_topic_list_top_code, mobileSizes, 'div-gpt-ad-topic-list-top').addService(googletag.pubads());
        }
        if (settings.dfp_mobile_show_topic_top && settings.dfp_mobile_topic_top_code) {
          googletag.defineSlot('/' + settings.dfp_id + '/' + settings.dfp_mobile_topic_top_code, mobileSizes, 'div-gpt-ad-topic-top').addService(googletag.pubads());
        }
        if (settings.dfp_mobile_show_topic_bottom && settings.dfp_mobile_topic_bottom_code) {
          googletag.defineSlot('/' + settings.dfp_id + '/' + settings.dfp_mobile_topic_bottom_code, mobileSizes, 'div-gpt-ad-topic-bottom').addService(googletag.pubads());
        }
      } else {
        if (settings.dfp_show_topic_list_top && settings.dfp_topic_list_top_code) {
          googletag.defineSlot('/' + settings.dfp_id + '/' + settings.dfp_topic_list_top_code, desktopSizes, 'div-gpt-ad-topic-list-top').addService(googletag.pubads());
        }
        if (settings.dfp_show_topic_top && settings.dfp_topic_top_code) {
          googletag.defineSlot('/' + settings.dfp_id + '/' + settings.dfp_topic_top_code, desktopSizes, 'div-gpt-ad-topic-top').addService(googletag.pubads());
        }
        if (settings.dfp_show_topic_bottom && settings.dfp_topic_bottom_code) {
          googletag.defineSlot('/' + settings.dfp_id + '/' + settings.dfp_topic_bottom_code, desktopSizes, 'div-gpt-ad-topic-bottom').addService(googletag.pubads());
        }
      }

      for (var name in targets) {
        googletag.pubads().setTargeting(name, targets[name]);
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
    if (this.site.mobileView) {
      var size = "height: 50px";
    } else {
      var size = "height: 90px";
    }
    return size.htmlSafe();
  }.property(),

  targets: function() {
    return {
      channel: this.get('category') && this.get('category').slug
    };
  }.property('category'),

  _initGoogleDFP: function() {
    var self = this;
    loadGoogle(Discourse.SiteSettings, self.get('targets')).then(function() {
      self.set('loadedGoogletag', true);
    });
  }.on('didInsertElement')
});
