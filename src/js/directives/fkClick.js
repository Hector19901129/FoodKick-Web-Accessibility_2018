// TODO we dont need fkClick

const fkClick = ($rootScope, $parse, $controller, $log) => {


  var objViaStr = ( thisObj, thisArr, startIndex ) => {
        var tempObj = {};

        //if there is no 3rd parameter given, then MARK IT ZERO
        if ( startIndex === null ){
          startIndex = 0;
        }

        if ( startIndex < thisArr.length - 1 ) {
          //yes, calling itself recursively to help construct the object tree correctly
          tempObj = objViaStr( thisObj, thisArr, startIndex + 1 );
        } else {
          tempObj = thisObj[ thisArr[ startIndex ] ];
        }
        return tempObj;
    };



  return {
    restrict:'A',
    link: function(scope, elem, attrs){

      if ( attrs.fkClick.length > 0 && typeof attrs.fkClick == "string" ){
        elem.bind('click', function() {
          if ( attrs.fkClickScope.length > 0 && typeof attrs.fkClickScope == "string" ){
            var tempCtrl = null;
            try {
              var tempScope = $rootScope.$new();
              //get the controller
              tempCtrl = $controller(attrs.fkClickScope, {$scope: tempScope});
            } catch (e) {
              $log.error(e);
            }

            //is the allged scope actually a window method? if so, then handle it in such fashion
            if ( attrs.fkClickScope.trim().lastIndexOf("window", 0) === 0 ){
              var tempSplit = attrs.fkClickScope.trim().split(".");
              objViaStr( window, tempSplit, 1 )();
            } else {
              //call the desired method provided in the parameter, execute it from the targeted scope (elemScope)
              $parse( attrs.fkClick )( tempCtrl.scope );
            }
          } else {
            $parse( attrs.fkClick );
          }
        });
      }
    }
  };
};

fkClick.$inject = ['$rootScope', '$parse', '$controller', '$log'];
export default fkClick;









// ( function () {
//   "use strict";
//
//   var fkComponents = angular.module('fkComponents');
//
//   //used for global functions and other non-scope functions
//   var objViaStr = ( thisObj, thisArr, startIndex ) => {
//       var tempObj = {};
//
//       //if there is no 3rd parameter given, then MARK IT ZERO
//       if ( startIndex === null ){
//         startIndex = 0;
//       }
//
//       if ( startIndex < thisArr.length - 1 ) {
//         //yes, calling itself recursively to help construct the object tree correctly
//         tempObj = objViaStr( thisObj, thisArr, startIndex + 1 );
//       } else {
//         tempObj = thisObj[ thisArr[ startIndex ] ];
//       }
//       return tempObj;
//   };
//
//   //everthing that ngClick should be (but only clicking for now).  improves over ngClick because one can use curly brackets for the value of the attribute in a template, unlike 'ngClick'
//   fkComponents.directive('fkClick', function($rootScope, $parse, $controller, $log){
//     return {
//       restrict:'A',
//       link: function(scope, elem, attrs){
//
//         //if this attribute is valid
//         if ( attrs.fkClick.length > 0 && typeof attrs.fkClick == "string" ){
//
//           //for the onclick of the targeted element
//           elem.bind('click', function() {
//
//             //get the targeted scope for the desired method
//             if ( attrs.fkClickScope.length > 0
//             && typeof attrs.fkClickScope == "string" ){
//
//               var tempCtrl = null;
//
//               try {
//                 var tempScope = $rootScope.$new();
//
//                 //get the controller
//                 tempCtrl = $controller(attrs.fkClickScope, {$scope: tempScope});
//               } catch (e) {
//                 $log.error(e);
//               }
//
//               //is the allged scope actually a window method? if so, then handle it in such fashion
//               if ( attrs.fkClickScope.trim().lastIndexOf("window", 0) === 0 ){
//                 var tempSplit = attrs.fkClickScope.trim().split(".");
//
//                 objViaStr( window, tempSplit, 1 )();
//               } else {
//                 //call the desired method provided in the parameter, execute it from the targeted scope (elemScope)
//                 $parse( attrs.fkClick )( tempCtrl.scope );
//               }
//             } else {
//               $parse( attrs.fkClick );
//             }
//           }); // end elem.bind 'click' ...
//         } // end if attrs.fkClick.length > 0 ...
//       } // end link ...
//     }; // end return
//   }); // end directive
// }());
