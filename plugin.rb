# name: discourse-google-dfp
# about: Google DoubleClick for Publishers (DFP) plugin for Discourse
# version: 0.1
# authors: Neil Lalonde

register_css <<CSS

.google-dfp-ad {
  padding: 3px;
  margin-bottom: 10px;
  clear: both;
}

.google-dfp-ad  .dfp-ad-unit {
  margin: 0 auto;
}

.google-dfp-ad .google-dfp-ad-label {
  width: 728px;
  margin: 0 auto;
}

.google-dfp-ad .google-dfp-ad-label h2 {
  margin: 4px 0 !important;
  color: #858a8c;
  text-transform: uppercase;
  font-size: 12px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: normal;
}

.mobile-view .google-dfp-ad {
  padding: 0;
}

.mobile-view .google-dfp-ad .google-dfp-ad-label {
  width: 320px;
}
.mobile-view .google-dfp-ad .google-dfp-ad-label h2 {
  margin-left: 4px !important;
}

CSS
