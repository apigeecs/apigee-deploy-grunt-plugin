apigee-deploy-grunt-plugin
==========================

The purpose essentially is to extend the apigee maven plugin.

Will include custom built Grunt Plugin which can make use of Apigee Management APIs to bundle, managet and deploy API Proxies, API Products and Developer Apps.



Basic Ideas

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







The task will allow you to switch to a deploy branch and push an api proxy bundle 
to Apigee.

## Getting Started
Install the grunt plugin next to your project's [Gruntfile.js gruntfile][getting_started] 
with: `npm install grunt-apigee-deploy`


Then add this line to your project's `Gruntfile.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-apigee-deploy');
```

## Documentation

We typically code on a forked develop branch which is set up to push to 
the development organization.

Once the clone is complete your repo will have a remote named "origin" that points to your fork on GitHub.
Don't let the name confuse you, this does not point to the original repo you forked from. To help you keep track of that repo we will add another remote named 
"upstream":

$ cd github-services
$ git remote add upstream git://github.com/pjhyett/github-services.git
$ git fetch upstream

# then: (like "git pull" which is fetch + merge)
$ git merge upstream/master master

# or, better, replay your local work on top of the fetched branch
# like a "git pull --rebase"
$ git rebase upstream/master


    git branch --set-upstream master origin/master

I set up a branch locally that will be my deploy branch - it might have 
some different configuration's committed. It pushes to heroku by default.

    git branch --set-upstream deploy heroku/master

Now I can run `grunt heroku-deploy` while on the master branch, which will do:

    git checkout deploy  # switch to the deploy branch
    git merge master     # merge in the changes I was making
    git push             # push it to heroku
    git checkout master  # switch back to where I was so I can continue developing

If you want to specify the deploy branch name, use the 'deployBranch' property on each target like so:
```javascript
grunt.initConfig({
    'heroku-deploy' : {
        production : {
            deployBranch : 'prod'
        },
        staging : {
            deployBranch : 'staging'
        }
    }
});
```

You may also provide a tag if you'd like to automatically create a new tag (and optionally push it up to origin):

```javascript
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  'heroku-deploy' : {
      production : {
          deployTag : 'v<%= pkg.version %>',
          pushTag : true,
          origin : 'origin'
      }
  }
})
```
This will create a new tag, push it to origin, and deploy that tag to heroku:

    git tag v0.1.1  # create a new tag
    git push origin v0.1.1 # push the tag to origin (this is skipped if pushTag is missing or false)
    git push -f heroku v0.1.1^{}:master

As this is a tag, it will skip the merge step because the current changes will be present in the tag.

If you would like to specify the name of the heroku remote, you can add it to the options as `herokuRemote`:

```javascript
grunt.initConfig({
    'heroku-deploy' : {
        production : {
            deployBranch : 'prod',
            herokuRemote : 'heroku'
        }
    }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
0.1.0 - "works for me".  Needs testing and feedback.

## License
Copyright (c) 2012 Adam Ahmed  
Licensed under the MIT license.






