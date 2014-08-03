<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [mocha and chai](#mocha-and-chai)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# mocha and chai
Mocha is a JavaScript framework. 

The following steps are just recommendation to highlight specific items applied to API testing. However, it's encouraged to learn as much as you can by reading the documentation end-to-end:

- [ ] [Installation](http://visionmedia.github.io/mocha/#installation)
- [ ] Write [your first Mocha example](http://visionmedia.github.io/mocha/#getting-started)
- [ ] Learn about Mocha [reporters](http://visionmedia.github.io/mocha/#usage) and xUnit. This will be useful to integrate your tests with Jenkins ```mocha -R xunit > xunit.xml```
- [ ] Continue learning mocha syntax, features and CLI
- [ ] [Learn about running your tests from the browser](http://visionmedia.github.io/mocha/#browser-support). This is useful to enable users to access tests without having to install any special tool, except for the browser. Debugger and browser tools, then come for free
- [ ] Run ```npm install``` to install node dependencies within package.json
- [ ] Run ```mocha mocha-with-http-request.js```. This gives an idea how to run assertions with http request
- [ ] Note usage of chai as assertion library. lines ```require('chai').assert```
- [ ] Note usage of request Node module and contrast with http request. Http over Request exposes unnecessary complexity