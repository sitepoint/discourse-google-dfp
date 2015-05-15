import loadScript from 'discourse/lib/load-script';

export default {
  name: 'discourse-google-dfp',
  after: 'inject-objects',

  initialize: function(container) {

    var siteSettings = container.lookup('site-settings:main');

    if (!siteSettings.dfp_show_topic_list_top) {
      // no ad units to show
      return true;
    }

    // Load the API
    var dfpSrc = (('https:' == document.location.protocol) ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
    loadScript(dfpSrc, { scriptTag: true }).then(function() {
      if (window.googletag === undefined) {
        console.log('googletag is undefined!');
        return false;
      }

      // Define our ad units
      googletag.cmd.push(function() {
        if (siteSettings.dfp_show_topic_list_top && siteSettings.dfp_topic_list_top_code) {
          googletag.defineSlot('/' + siteSettings.dfp_id + '/' + siteSettings.dfp_topic_list_top_code, [728, 90], 'div-gpt-ad-topic-list-top').addService(googletag.pubads());
        }
        if (siteSettings.dfp_show_topic_top && siteSettings.dfp_topic_top_code) {
          googletag.defineSlot('/' + siteSettings.dfp_id + '/' + siteSettings.dfp_topic_top_code, [728, 90], 'div-gpt-ad-topic-top').addService(googletag.pubads());
        }
        if (siteSettings.dfp_show_topic_bottom && siteSettings.dfp_topic_bottom_code) {
          googletag.defineSlot('/' + siteSettings.dfp_id + '/' + siteSettings.dfp_topic_bottom_code, [728, 90], 'div-gpt-ad-topic-bottom').addService(googletag.pubads());
        }
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
      });

      // Watch for navigation and make async calls to fetch ad content
      var refreshAds = function() {
        if (window.googletag && window.googletag.pubads) {
          window.googletag.pubads().refresh();
        }
      };

      Discourse.PageTracker.current().on('change', function(url) {
        window.setTimeout(refreshAds, 500);
      });

      window.setTimeout(refreshAds, 4000);
    });
  }
}