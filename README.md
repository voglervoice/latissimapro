# Latissima Pro / site

## Require

 - [NodeJs](http://nodejs.org/)
 - Grunt `$npm install -g grunt-cli`

## Getting Started

 1. Install npm dependencies : `$npm install`
 2. Use grunt for deploy the prod version : `$grunt web`
 3. Configure an apache vhost (ex: _tendays.web_) for __web__ folder
 4. Launch the site into your brower (ex: http://tendays.web)
 
## Developer mode

Use the grunt task __dev__ : `$grunt dev`

Watchers for :

 - js
 - less
 - images
 - index.php