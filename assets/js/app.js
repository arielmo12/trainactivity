var firebaseConfig = {
    apiKey: "AIzaSyB0ym0A92LFE4ppF7P6tKW-rMN5d4F-Xo8",
    authDomain: "trainactivity-5cb3a.firebaseapp.com",
    databaseURL: "https://trainactivity-5cb3a.firebaseio.com",
    projectId: "trainactivity-5cb3a",
    storageBucket: "trainactivity-5cb3a.appspot.com",
    messagingSenderId: "996629087258",
    appId: "1:996629087258:web:bdc787d3dac8feacabbda3",
    measurementId: "G-1FW7EB3Q9D"
  
  
  
 
  
  
  $('#newTrainBtn').on('click', function(){
  
    var trainName = $('#trainNameInput').val().trim();
      var destination = $('#destInput').val().trim();
      var firstTrain = $('#firstTrainInput').val().trim();
      var frequency = $('#freqInput').val().trim();
  
    
      var newTrain = {
          name: trainName,
          dest: destination,
          first: firstTrain,
          freq: frequency
      }
  
    
      database.ref().push(newTrain);
  
      console.log(newTrain.name);
      console.log(newTrain.dest);
      console.log(newTrain.first);
    console.log(newTrain.freq);
    

      $('#trainNameInput').val("");
      $('#destInput').val("");
      $('#firstTrainInput').val("");
      $('#freqInput').val("");
  
  return false;
  })
  
  
  database.ref().on("child_added", function(childSnapshot){
      console.log(childSnapshot.val());
  
      // Store everything into a variable
      var trainName = childSnapshot.val().name;
      var destination = childSnapshot.val().dest;
      var firstTrain = childSnapshot.val().first;
      var frequency = childSnapshot.val().freq;
  
      // Train info
      console.log(trainName);
      console.log(destination);
      console.log(firstTrain);
      console.log(frequency);
  
     
      var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
      console.log(firstTimeConverted);
  
    
      var currentTime = moment();
      console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm"));
  
   
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);
  
     
      var tRemainder = diffTime % frequency;
      console.log(tRemainder);
  
      
      var tMinutesTillTrain = frequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
      
      var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
  
      $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination  + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  
  });