const fkTime = function ($filter) {
  function generateTime(date) {
    let time,
        period,
        timeElement = $filter('date')(date, 'h-mm-a');

    if (timeElement) {
      timeElement = timeElement.split('-');

      if (timeElement[1] === '00') {
        time = timeElement[0];
      } else {
        time = timeElement[0] + ':' + timeElement[1];
      }
      period = timeElement[2];
    }

    return {
      time: time,
      period: period,
      text: time + period
    };

  }

  return function (dateObj) {
    let startTime, endTime;

    startTime = generateTime(dateObj.startDate);
    endTime = generateTime(dateObj.endDate);

    return startTime.text + " " + '-' + " " + endTime.text;
  };
};

fkTime.$inject = ['$filter'];


const fkShortTime = function ($filter) {
  function generateTime(date='') {
    let time,
        period,
        timeElement = $filter('date')(date, 'h-mm-a');

    if (timeElement) {
      timeElement = timeElement.split('-');

      if (timeElement[1] === '00') {
        time = timeElement[0];
      } else {
        time = timeElement[0] + ':' + timeElement[1];
      }
      period = timeElement[2];
    }

    return {
      time: time,
      period: period,
      text: time + ' ' + period
    };

  }

  return function (dateObj) {
    let startTime, endTime;

    startTime = generateTime(dateObj.startDate);
    endTime = generateTime(dateObj.endDate);

    return startTime.time + ' - ' + endTime.text;
  };
};

fkShortTime.$inject = ['$filter'];


const fkDateTime = function ($filter, fkUtils) {
  return function(dateObj) {
    return fkUtils.generateDate(dateObj.startDate, $filter('fkTimeSlot')(dateObj) );
  };
};

fkDateTime.$inject = ['$filter', 'fkUtils'];


const fkDeliveryTime = function ($filter, fkUtils) {
  return function(dateObj) {
    return fkUtils.generateDate(dateObj.startDate, $filter('date')(dateObj.startDate,'h:mma') + ' - ' + $filter('date')(dateObj.endDate,'h:mma'));
  };
};

fkDeliveryTime.$inject = ['$filter', 'fkUtils'];

const fkHeaderDeliveryTime = function ($filter, fkUtils) {
  return function(dateObj) {
    return fkUtils.generateDate(dateObj.startDate, $filter('fkTimeSlot')(dateObj) );
  };
};

fkHeaderDeliveryTime.$inject = ['$filter', 'fkUtils'];

const fkTimeDifference = function(){
  return function(timeMs){
    let allSeconds = timeMs /1000;
    let hours = Math.floor(allSeconds / 60 / 60);
    let minutes = Math.floor((allSeconds - hours * 60 * 60) / 60);
    let seconds = Math.floor(allSeconds - hours * 60 * 60 - minutes * 60);
    return hours ? `${hours}h ${minutes}m` : `${minutes}m ${seconds}s`;
  };
};


const fkDayDate = function ($filter, fkUtils) {
  return function(dateObj) {
    return fkUtils.generateDay(dateObj.startDate) + ', ' + $filter('date')(dateObj.startDate,'M') + '/' + $filter('date')(dateObj.startDate,'d');
  };
};

fkDayDate.$inject = ['$filter', 'fkUtils'];

const fkDate = function ($filter) {
  return function(dateObj) {
    const year = new Date(dateObj.startDate).getFullYear();
    return $filter('date')(dateObj.startDate,'M') + '/' + $filter('date')(dateObj.startDate,'d') + '/' + year;
  };
};

fkDate.$inject = ['$filter'];

const fkRedemptionAmount = function () {
  return function(dateObj) {
    return dateObj.replace(/[()]/g, "");
  };
};

const fkTimeSlot = function () {
  function generateTime(date='') {
    var startIndex = date.indexOf('T');
    var endIndex = date.lastIndexOf('-0');
    var convert = date.substring(startIndex+1, endIndex).split(':');
    var hh = parseInt(convert[0], 10);
    var m = convert[1];
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
        h = hh-12;
        dd = "PM";
    }
    if (h === 0) {
        h = 12;
    }

    m = m<10?"":":"+m;
    h = h<10?""+h:h;
    var pattern = h+m+" "+dd;

        return {
      time:pattern
    };

}

  return function (dateObj) {
    let startTime, endTime;

    startTime = generateTime(dateObj.start);
    endTime = generateTime(dateObj.end);

    return startTime.time + " " + '-' + " " + endTime.time;

  };
};

const fkOrderTime = function () {
  function generateTime(date='') {
    var startIndex = date.indexOf('T');
    var endIndex = date.lastIndexOf('-0');
    var convert = date.substring(startIndex+1, endIndex).split(':');
    var hh = convert[0];
    var m = convert[1];
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
        h = hh-12;
        dd = "PM";
    }
    if (h === 0) {
        h = 12;
    }

    m = m<10?"":":"+m;
    h = h<10?""+h:h;
    var pattern = h+m+" "+dd;
    var timeFrame = h+m;

        return {
      time:timeFrame,
      meridiem:pattern
    };

}

  return function (dateObj) {
    let startTime, endTime;

    startTime = generateTime(dateObj.start);
    endTime = generateTime(dateObj.end);

    return startTime.time + " "+'-' + " "+ endTime.meridiem;
  };
};


export {
  fkTime,
  fkShortTime,
  fkDateTime,
  fkDeliveryTime,
  fkTimeDifference,
  fkDayDate,
  fkHeaderDeliveryTime,
  fkDate,
  fkRedemptionAmount,
  fkTimeSlot,
  fkOrderTime
};
