const fkGreetingFilter = function (fkUserService) {

  var RESOLVERS = {
    daypart: () => {
      var hours = new Date().getHours();

      if (hours < 5 || hours > 21) {
        return "Night";
      }

      if (hours < 12) {
        return "Morning";
      }

      if (hours < 18) {
        return "Afternoon";
      }

      if (hours < 21) {
        return "Evening";
      }

      return "Day";
    },
    commaname: () => {
      if (fkUserService.user && fkUserService.user.firstName) {
        return ", " + fkUserService.user.firstName;
      }

      return "";
    }
  };

  var resolve = function (key) {
    var resolver = RESOLVERS[key.toLowerCase()];

    if (resolver) {
      return resolver(key);
    }

    return "";
  };

  return input => {
    var matches = input.match(/\{.*?\}/g);

    if (matches && matches.length) {
      matches.forEach(function (m) {
        var key = m.substring(1, m.length-1);

        input = input.replace(m, resolve(key));
      });
    }

    return input;
  };
};

fkGreetingFilter.$inject = ['fkUserService'];

export default fkGreetingFilter;
