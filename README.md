apigee-deploy-grunt-plugin
==========================

The purpose essentially is to extend the apigee maven plugin.

Will include custom built Grunt Plugin which can make use of Apigee Management APIs to bundle, managet and deploy API Proxies, API Products and Developer Apps.

## TL;DR
[Follow these directions to enable API Proxy Bundle deployment with Grunt.js](https://github.com/apigeecs/apigee-deploy-grunt-plugin/tree/master/apigee-deploy-grunt-plugin)

## Basic Ideas

   - Should extend Java provided in io.apigee.buildTools.enterprise4g.utils

Here are some of the Java stuff that well need to think about which is current used in the maven build. :

- com.google.http-client - 1.10.3-beta
- org.slf4j - 1.6.6
- commons-logging - 1.1.1
- org.apache.commons- 3.1
- com.google.guava - 12.0
- com.google.code.gson - 2.2.2
- xalan - 2.7.1
- org.eclipse.jgit 3.3.2.201404171909-r
- org.apache.axis2 - 1.3
- jakarta-httpcore-niossl
- httpcore
- org.apache.httpcomponents
- org.apache.httpcomponents
- org.apache.woden
- org.apache.axis2


This is how we can mashup grunt with maven

We will use the ant-run plugin together with the ant-exe to call out to Grunt from the existing build process so it can build your API Sepecification  blueprints, run tests and so on.


Mocha Testing Demo

## Adding Tests

* add it to `tests/runner.js`
* add a stub for the test specification to the corresponding file in `tests/app/`
* add a stub for the solution to the corresponding file in `app/`


### Adding Data Driven Tests
If your tests need data that can be fetched via XHR, stick a `.json` file in
the `data` directory; you can access it at `/data/<filename>.json`.



