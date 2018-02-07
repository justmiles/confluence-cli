#!/usr/bin/env node
var program = require('commander')
var fs      = require('fs')
var path    = require('path')
var version = '1.0.0'

var confluence = require('../atlassian-confluence/Confluence');
var md2conflu = require('markdown2confluence');


program
  .version(version)
  .option('-u, --username [username]', 'Confluence username. Can also be read from env variable CONFLUENCE_USERNAME')
  .option('-p, --password [password]', 'Confluence password. Can also be read from env variable CONFLUENCE_PASSWORD')
  .option('-h, --host [host]', 'Confluence host. eg mycompany.atlassian.com')
  .option('-n, --port [port]', 'Confluence port')
  .option('-c, --context [context]', 'Confluence context')
  .option('-t, --title [title]', 'Page title to update. Defaults to file name')
  .option('-k, --key [key]', 'Confluence key for page')
  .option('--no-ssl', 'Do not use SSL when connecting to Confluence')
  .option('-f, --file [file]', 'Markdown File')
  .parse(process.argv)

if (! fs.existsSync(path.resolve(program.file))) {
  console.error('Could not find ' + path.resolve(program.file) )
  process.exit(1)
}


confluence.useSSL = program.ssl
confluence.username = program.username || process.env['CONFLUENCE_USERNAME']
confluence.password = program.password || process.env['CONFLUENCE_PASSWORD']
confluence.host = program.host

if (program.port) { confluence.port = program.port; }
confluence.context = program.context || '/wiki'


var confluencePage = { 
  title : program.title || program.file,
  storage : {
    representation: 'wiki'
  },
  body : {
    storage: {
      value: md2conflu(fs.readFileSync(path.resolve(program.file)).toString())
    }
  },
  type: 'page',
  space: {
    key: program.key
  }
}

confluence.upsertPage('type=page AND title="'+confluencePage.title+'"', confluencePage, function (err,res) {
  if (err) { 
    console.error(err)
    console.error(res)
  } else {
    console.log(res._links.base + res._links.webui)
  }
});