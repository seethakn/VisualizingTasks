/* Javascript file
  -- for retrieving and displaying todo task items
  -- visualizing tasks via google charts */

  // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['corechart']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);

var tasksList = []; //An array to collect entered task items
//A two dimensional array to pass as an argument to addRows()
var difficultyTotal = [['Simple',0],['Demanding',0],['Challenging',0],['Intimidating',0]];

function task(minion, taskDescription, taskDifficulty)
  {
    this.minion = minion;
    this.taskDescription = taskDescription;
    this.taskDifficulty = taskDifficulty;
  }

/*window.onload = function(){
  //console.log("Function called");
  //var submitButton = document.getElementById("assignTask");
  //submitButton.onclick = getFormData();
  var form = document.querySelector("form");
  form.onsubmit = getFormData;
}*/


function getFormData(){
  var taskDescription = document.getElementById("taskDescription").value;
  var taskDifficulty = document.getElementById("taskDifficulty").value;
  var minion = document.querySelector('input[name="minion"]:checked').value;
  //console.log(minion + " needs to do " + taskDescription + " which is " + taskDifficulty + " task");
  var newTask = new task(minion, taskDescription, taskDifficulty);
  tasksList.push(newTask);
  addToDoListToPage(); //To display todo items on the web page
  calculateTaskDifficulties(); //To calculate the count of tasks based on its difficulty
  drawChart();
}

// To display an unordered list of all the assigned tasks
function addToDoListToPage(){
  var ulTasksList = document.getElementById("todoTasksList");
  ulTasksList.innerHTML = "";
  for (var i=0; i<tasksList.length; i++){
    var taskItem = tasksList[i];
    var liTaskItem = document.createElement("li");
    liTaskItem.innerHTML = taskItem.minion + " needs to do " + taskItem.taskDescription + " (" + taskItem.taskDifficulty + " task)";
    ulTasksList.appendChild(liTaskItem);
}
}

// To calculate total tasks based on difficulty type
function calculateTaskDifficulties(){
   for (var i=0; i<tasksList.length; i++){
     // increase count of tasks based on difficulty level
     for (var j=0; j<difficultyTotal.length; j++){
       if (difficultyTotal[j][0] == tasksList[i].taskDifficulty){
         difficultyTotal[j][1] = ++difficultyTotal[j][1];
         break;
       }
     }
   }
}


// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Task Difficulty');
  data.addColumn('number', 'Count of tasks');
  // data.addRows([
  //   ['Simple', 6],
  //   ['Demanding', 7],
  //   ['Challenging', 4],
  //   ['Intimidating', 1]
  // ]);
 data.addRows(difficultyTotal); // Passing two dimensional array

  // Set chart options
  var options = {'title':'Task Difficulty',
                 'width':400,
                 'height':300,
                  pieHole:0.4,
                  titleTextStyle: {
                    fontSize: 28,
                    underline: true,
                    fontName: 'Montserrat',
                    color: 'rgb(245,220,80)' // minion yellow
                  },
                  slices: {
                    0: { color: '#043c70' }, //dark blue
                    1: { color: '#9a701b' }, //brown
                    2: { color: '#f6da6e' }, //light yellow
                    3: { color: '#a9a9a9' }  // dark grey
                  },
                  legend: {
                    //position: 'labeled',
                    textStyle: {
                      color: 'rgb(30,106,159)', //minion blue
                      fontName: 'Montserrat'
                      }
                  }
                };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('pieHoleChart'));
  chart.draw(data, options);
}
