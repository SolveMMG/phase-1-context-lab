/* Your Code Here */

// Create an employee record
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // Create employee records
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
  }
  
  // Create a time-in event and push it .
  function createTimeInEvent( dateTime) {
    const [date, time] = dateTime.split(' ');
    const timeIn = {
      type: 'TimeIn',
      hour: parseInt(time),
      date: date,
    };
    this.timeInEvents.push(timeIn);
    return this;
  }
  
  // Create a time-out event and push it .
  function createTimeOutEvent(dateTime) {
    const [date, time] = dateTime.split(' ');
    const timeOut = {
      type: 'TimeOut',
      hour: parseInt(time),
      date: date,
    };
    this.timeOutEvents.push(timeOut);
    return this;
  }
  
  // Calculate hours worked on a particular date
  function hoursWorkedOnDate(date) {
    const timeArrive = this.timeInEvents.find(event => event.date === date);
    const timeLeave = this.timeOutEvents.find(event => event.date === date);
    const hours= (timeLeave.hour - timeArrive.hour) / 100;
    return hours;
  }
  
  // Calculate wages earned on a particular date.
  function wagesEarnedOnDate( date) {
    const hours = hoursWorkedOnDate.call(this, date);
    const wages = hours * this.payPerHour;
    return wages;
  }
  
 
  
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

// Calculate total pay owed to all employees.
function calculatePayroll(employees) {
    const totalPayroll = employees.reduce(function (acc, employee) {
      return acc + allWagesFor.call(employee);
    }, 0);
    return totalPayroll;
  }

  // Function to find employee by first name.
function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName);
}

