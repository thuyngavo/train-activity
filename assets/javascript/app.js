// Initialize Firebase
var config = {
  apiKey: "AIzaSyD52euAbTiQI8jf82qrCHTKo8lsL-yJgRA",
  authDomain: "groupproject1-1552151782848.firebaseapp.com",
  databaseURL: "https://groupproject1-1552151782848.firebaseio.com",
  projectId: "groupproject1-1552151782848",
  storageBucket: "groupproject1-1552151782848.appspot.com",
  messagingSenderId: "614899259391"
};

firebase.initializeApp(config);

var database = firebase.database();

// onclick function
$("#add-train-btn").on("click", function(event) {
event.preventDefault();

// collects input from users
var trainName = $("#train-name-input").val().trim();
var trainDestination = $("#destination-input").val().trim();
var firstTrain = moment($("#time-input").val().trim(), "HH:mm").format("X");
var trainFrequency = $("#frequency-input").val().trim();

// holding employee data
var newTrain = {
  name: trainName,
  destination: trainDestination,
  time: firstTrain,
  frequency: trainFrequency
};

// upload data to the database
database.ref().push(newTrain);

// console.log responses
console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.time);
console.log(newTrain.frequency);

alert("Train Route Successfully Added");

// clear text input
$("#employee-name-input").val("");
$("#destination-input").val("");
$("#time-input").val("");
$("#frequency-input").val("");
});

// firebase event for adding to database 
database.ref().on("child_added", function(childSnapshot) {
console.log(childSnapshot.val());

// variable to store snapshot
var trainName = childSnapshot.val().name;
var trainDestination = childSnapshot.val().destination;
var firstTrain = childSnapshot.val().time;
var trainFrequency = childSnapshot.val().frequency;

// console.log train information
console.log(trainName);
console.log(trainDestination);
console.log(firstTrain);
console.log(trainFrequency);

// convert first train time to make sure it comes before cuurent time (set back by one year)
var tFirstTrain = moment(firstTrain, "HH:mm").subtract(1, "years");
console.log(tFirstTrain);

// calculate current Time
var currentTime = moment();
console.log("Current time: " + moment(currentTime).format("hh:mm"));

// time differance
var timeDifference = moment().diff(moment(tFirstTrain), "minutes");
console.log("Time difference: " + timeDifference);

// time between current and next train (remainder)
var remainder = timeDifference % trainFrequency;

// calculate how long until next train
var minutesLeft = trainFrequency - remainder;
console.log(minutesLeft + " until the next train");

// calculate when next train arrives
var nextTrain = moment().add(minutesLeft, "minutes");
console.log("The Train will arrive at " + moment(nextTrain).format("hh:mm"));

// print new row
var addRow = $("<tr>").append(
  $("<th>").text(trainName),
  $("<td>").text(trainDestination),
  $("<td>").text(trainFrequency),    
  $("<td>").text(nextTrain),
  $("<td>").text(minutesLeft)
);

// append each row to table
$("#train-table > tbody").append(addRow);

});