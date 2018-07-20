'use strict'

angular.module('meanApp', [
  'ngRoute',
  'templates'
])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: 'index.html',
      controller: 'appCtrl',
      controllerAs: 'app'
    })
    $locationProvider.html5Mode(true)
  }]).controller('appCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    console.log('appCtrl')
    const APP = this
    const DESCRIBE_TIMEOUT = 10000

    APP.greeting = 'gaymes minecraft'
    APP.serverState = ''

    function describe() {
      $http.get('/aws/describe').then(res => {
        console.log(`describe res: ${JSON.stringify(res)}`)
        APP.serverState = res.data.data.Reservations[0].Instances[0].State.Name
        $timeout(describe, DESCRIBE_TIMEOUT)
      }, err => {
        console.log(`describe err: ${JSON.stringify(err)}`)
      })
    }

    APP.startServer = function () {
      console.log('start server')
      APP.serverState = 'pending'
      $http.get('/aws/start').then(res => {
        console.log(`describe res: ${JSON.stringify(res)}`)
        APP.serverState = res.data.StartingInstances[0].CurrentState.Name
      }).catch(err => {
        console.log(`start err: ${JSON.stringify(err)}`)
      })
    }

    APP.stopServer = function () {
      console.log('stop server')
      APP.serverState = 'stopping'
      $http.get('/aws/stop').then(res => {
        console.log(`describe res: ${JSON.stringify(res)}`)
        APP.serverState = res.data.StoppingInstances[0].CurrentState.Name
      }).catch(err => {
        console.log(`stop err: ${JSON.stringify(err)}`)
      })
    }

    this.toggleServer = function () {
      if (APP.serverState === 'running') {
        APP.stopServer()
      } else if (APP.serverState === 'stopped') {
        APP.startServer()
      }
    }

    describe()
  }])
