const fkFormFieldCompare = () => {
  return {
    restrict : "A", /* 'A' means that this is a tag attribute only */
    require: 'ngModel',
    link: function (scope, elem, attrs, ngModel) {

      if ( attrs[fkFormFieldCompare].length < 1 ) {
        return true;
      }

      var validate = function(value) {
        var fieldName = "";
        var errMsg = "Does not match"; /* default only.  can be changed if the component/controller writer uses a json value for the 'fkFormFieldCompare' with property of 'errMsg' */
        var isValid = false;

        try {
          //it is recommended that the value for the other field (typically value of 'fkFormFieldCompare') be json, property name of 'fieldName' holding the actual string value.
          var parsedOtherValObj = JSON.parse( attrs[fkFormFieldCompare] );

          //string value for name of field to be compared to
          fieldName = parsedOtherValObj.fieldName;

          //custom error message entered as json parameter if available and if the value has at least 1 character.  also string value.
          if ( parsedOtherValObj.hasOwnProperty("errMsg") && parsedOtherValObj.errMsg.trim().length > 0 ) {
            errMsg = parsedOtherValObj.errMsg;
          }
        } catch (e) {
          //otherwise, assume that the value for the 'fkFormFieldCompare' is a string.
          fieldName = attrs[fkFormFieldCompare];
        }

        //core condition for whether this field equals the targeted field. whitespace to the left and right of both compared entries are irrelevant thanks to 'trim' method.
        isValid = false;
        if ( value !== null && scope.$parent.$c.form[fieldName].$viewValue !== null
          && typeof scope.$parent.$c.form[fieldName].$viewValue === "string" && scope.$parent.$c.form[fieldName].$viewValue.length > 0 ) {
          isValid = scope.$parent.$c.form[fieldName].$viewValue.trim() === value.trim();
        }

        //attaches error message to possible invalid entries
        ngModel.$setValidity(errMsg, isValid);

        //returns true, false or undefined.  anything other than true returns feedback error message.
        return isValid ? value : null;
      };

      //add this new 'validate' function to the parsers array.  Allows it to be used for evaluation and comparison.
      ngModel.$parsers.unshift(validate);

      // Force-trigger the parsing pipeline.
      scope.$watch( attrs[fkFormFieldCompare], function() {
        ngModel.$setViewValue(ngModel.$viewValue);
      });

      return true;
    } //end link function
  };
};

export default fkFormFieldCompare;
