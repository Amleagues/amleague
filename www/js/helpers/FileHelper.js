angular.module('exporm.filehelper', ['ngCordova'])

.factory('FileHelper', function($http,$cordovaFile,$cordovaFileTransfer,$ionicPlatform) {
  return {
    createFolder: function(folderName,callback) {

        $ionicPlatform.ready(function() {
            //$cordovaPlugin.someFunction().then(success, error);

            $cordovaFile.checkDir(cordova.file.dataDirectory, folderName)
            .then(function (success) {

                console.log("exists");
                console.log(success);

            }, function (error) {

                console.log("new");
                console.log(error);
                // CREATE
                $cordovaFile.createDir(cordova.file.dataDirectory, folderName, false)
                .then(function (success) {

                        console.log("created");
                        callback(success)
                }, function (error) {
                        console.log("error creating");
                    
                })

               
            })
            

        })
    },
    createFile: function(fileName) {
      
    },

    removeFolder: function(folderName,callback){



         $cordovaFile.checkDir(cordova.file.dataDirectory, folderName)
            .then(function (success) {

               
                          // REMOVE
                $cordovaFile.removeDir(cordova.file.dataDirectory, folderName)
                  .then(function (success) {

                    console.log("removed folder"+ folderName);
                    callback(success);
                    // success
                  }, function (error) {

                    console.log("error removing folder");
                    // error
                  });

            }, function (error) {



            })

  

    }

  };
})