angular.module('starter.factories', [])
  .factory('ListFactory', function() {

    var list = [];
    var listStore = localStorage.getItem("list");
    if (listStore !== null && listStore !== '' && angular.isArray(angular.fromJson(listStore))) {
      list = angular.fromJson(listStore);
    }
    var listSrv = {
      setList: function(newList) {
        list = newList;
        localStorage.setItem("list", angular.toJson(list));
        return true;
      },
      getList: function() {
        if (list !== null) {
          return list;
        } else {
          return [];
        }
      }
    };
    return listSrv;
  })
.factory('TaskFactory', function() {
     var list = [];
    var listStore = localStorage.getItem("mist");
    if (listStore !== null && listStore !== '' && angular.isArray(angular.fromJson(listStore))) {
      list = angular.fromJson(listStore);
    }
    var listSrv = {
      setList: function(newList) {
        list = newList;
        localStorage.setItem("mist", angular.toJson(list));
        return true;
      },
      getList: function() {
        if (list !== null) {
          return list;
        } else {
          return [];
        }
      }
    };
    return listSrv;
  })
.factory('DeadlinesFactory', function() {
     var list = [];
    var listStore = localStorage.getItem("deadlines");
    if (listStore !== null && listStore !== '' && angular.isArray(angular.fromJson(listStore))) {
      list = angular.fromJson(listStore);
    }
    var listSrv = {
      setList: function(newList) {
        list = newList;
        localStorage.setItem("deadlines", angular.toJson(list));
        return true;
      },
      getList: function() {
        if (list !== null) {
          return list;
        } else {
          return [];
        }
      }
    };
    return listSrv;
  })
.factory('CalendarFactory', function() {
     var list = [];
    var listStore = localStorage.getItem("calendar5");
    if (listStore !== null && listStore !== '' && angular.isArray(angular.fromJson(listStore))) {
      list = angular.fromJson(listStore);
    }
    var listSrv = {
      setList: function(newList) {
        list = newList;
        localStorage.setItem("calendar5", angular.toJson(list));
        return true;
      },
      getList: function() {
        if (list !== null) {
          return list;
        } else {
          return [];
        }
      }
    };
    return listSrv;
});