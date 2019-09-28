'use strict'
var HostedGit = require('../index')
var test = require('tap').test

test('fromUrl(otherHosts url)', function (t) {
  function verify (host, label, branch) {
    var hostinfo = HostedGit.fromUrl(host, { allowOtherHosts: true })
    var hash = branch ? '#' + branch : ''
    if (!hostinfo) return
    t.ok(hostinfo, label)
    t.is(hostinfo.https(), 'git+https://my.other-host.com/111/222.git' + hash, label + ' -> https')
    t.is(hostinfo.browse(), 'https://my.other-host.com/111/222' + (branch ? '/tree/' + branch : ''), label + ' -> browse')
    t.is(hostinfo.browse(''), 'https://my.other-host.com/111/222/tree/' + (branch || 'master') + '/', label + ' -> browse(path)')
    t.is(hostinfo.browse('C'), 'https://my.other-host.com/111/222/tree/' + (branch || 'master') + '/C', label + ' -> browse(path)')
    t.is(hostinfo.browse('C/D'), 'https://my.other-host.com/111/222/tree/' + (branch || 'master') + '/C/D', label + ' -> browse(path)')
    t.is(hostinfo.browse('C', 'A'), 'https://my.other-host.com/111/222/tree/' + (branch || 'master') + '/C#a', label + ' -> browse(path, fragment)')
    t.is(hostinfo.browse('C/D', 'A'), 'https://my.other-host.com/111/222/tree/' + (branch || 'master') + '/C/D#a', label + ' -> browse(path, fragment)')
    t.is(hostinfo.docs(), 'https://my.other-host.com/111/222' + (branch ? '/tree/' + branch : '') + '#readme', label + ' -> docs')
    t.is(hostinfo.ssh(), 'git@my.other-host.com:111/222.git' + hash, label + ' -> ssh')
    t.is(hostinfo.sshurl(), 'git+ssh://git@my.other-host.com/111/222.git' + hash, label + ' -> sshurl')
    t.is(hostinfo.shortcut(), 'otherHosts:111/222' + hash, label + ' -> shortcut')
    t.is(hostinfo.file(''), 'https://my.other-host.com/111/222/raw/' + (branch || 'master') + '/', label + ' -> file')
    t.is(hostinfo.file('C'), 'https://my.other-host.com/111/222/raw/' + (branch || 'master') + '/C', label + ' -> file')
    t.is(hostinfo.file('C/D'), 'https://my.other-host.com/111/222/raw/' + (branch || 'master') + '/C/D', label + ' -> file')
    // t.is(hostinfo.tarball(), null, label + ' -> tarball') // tarball is not supported
    // t.is(hostinfo.tarball({ noCommittish: true }), null, label + ' -> tarball')
  }

  require('./lib/standard-tests')(verify, 'my.other-host.com', 'my.other-host.com')

  t.end()
})
