const signinError = function(){
  var errorObject = {
    status:'OK'
  };

  errorObject.clear = function(){
    errorObject.status = 'OK';
  };

  this.setError= (error, message) => {
    errorObject.status = error;
    errorObject.message = message;
  };

  this.$get = function() {
    return errorObject;
  };
};

export default signinError;
