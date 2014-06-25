/*
 * grunt-heroku-deploy
 * https://github.com/hitsthings/grunt-heroku-deploy
 *
 * Copyright (c) 2012 Adam Ahmed
 * Licensed under the MIT license.
 */

var spawn = require('child_process').spawn;

function pipeAll(proc) {
 proc.stdout.pipe(process.stdout);
 proc.stderr.pipe(process.stderr);
 return proc;
}

function allOutput(proc, next) {
 var out = '';
 proc.stdout.on('data', function(data) { out += data; });
 proc.stdout.on('end', function() {
   next(null, out);
 });
}

function makeReleaseTag(opts,next){
  pipeAll(spawn('git',['tag',opts.tag])).on('exit',function(){
    if(!opts.push) return next();
    pipeAll(spawn('git',['push',opts.origin,opts.tag])).on('exit',function(){
      next();
    });
  });
}

function doDeploy(options, tagOpts, next) {
 if(typeof tagOpts !== 'function'){
   return makeReleaseTag(tagOpts,doDeploy.bind(null,options,next));
 } else {
   next = tagOpts;
 }
 var originRef = options.originRef;
 var deployRef = options.deployRef;
 var push = function(done){
   var pushArgs = ['push'];
   if(options.deployTag){
     pushArgs.push('-f');
     if(options.herokuRemote) pushArgs.push(options.herokuRemote);
     pushArgs.push(options.deployTag+'^{}:master');
   } else if(options.herokuRemote){
     pushArgs.push(options.herokuRemote);
   }
   pipeAll(spawn('git', pushArgs)).on('exit', done);
 }
 if(options.deployTag){
   push(function(){
     next();
   });
 } else {
   pipeAll(spawn('git', ['checkout', deployRef])).on('exit', function() {
     pipeAll(spawn('git', ['merge', originRef])).on('exit', function(){
       push(function(){
         pipeAll(spawn('git', ['checkout', originRef])).on('exit', function() {
           next();
         });
       })
     });
   });
  }
}

function getCurrentBranch(next) {
 allOutput(spawn('git', ['branch']), function(err, out) {
   if (err) {
     return next(err);
   }

   var newline, current, branch;
   if (out[0] === '*') {
     current = 0;
   } else {
     current = out.indexOf('\n*') + 1;
     if (!current) {
       return next(new Error("Current branch could not be determined."));
     }
   }

   newline = out.indexOf('\n', current);
   branch = out.substring(current + 2, ~newline ?  newline : undefined);

   next(null, branch === '(no branch)' ? null : branch);
 });
}

function getCurrentCommitHash(next) {
 allOutput(spawn('git', ['log', '-1', '--format=format:"%H"']), function(err, out) {
   next(err, out && out.replace(/\n|\r/g, ''));
 });  
}

exports.init = function(grunt){
  var exports = {};
  
  exports['deploy'] = function(options, next){
    var options = options || {}
    var deployArgs
    if(options.deployTag){
      options.deployRef = options.deployTag || "deploy"
      options.tag = options.deployRef
      deployArgs = [options,{
        tag : options.deployTag,
        push : options.pushTag,
        origin : options.origin || "origin"
      }]
    } else {
      options.deployRef = options.deployBranch || "deploy"
      deployArgs = [options]
    }
    deployArgs.push(next)

    getCurrentBranch(function(err, branch) {
      if (err) {
        return next(err);
      }

      if (!branch) {
        console.log('No current branch');

        getCurrentCommitHash(function(err, csid) {
          if (err) {
            return next(err);
          }

          console.log('Using ' + csid + ' as ref to merge.');
          deployArgs[0].originRef = csid
          doDeploy.apply(null,deployArgs);
        });
      } else {
        console.log('Current branch is ' + branch);
        deployArgs[0].originRef = branch
        doDeploy.apply(null,deployArgs);
      }
    });
  }
  
  return exports;
}
