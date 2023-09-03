console.log("hey js works");
$(document).ready(onReady);

function onReady() {
  console.log("jQuery works!!!");

  getTask();
  $("#addTask").on("click", postTask);
  $("#taskTableBody").on('click', '.completeButton', markAsComplete);
  $("#taskTableBody").on('click', '.deleteButton', deleteTask);

}

function postTask() {
  console.log("add task button");
  let newTask = {
    text: $("#taskInput").val(),
  };
  $.ajax({
    method: "POST",
    url: "/create-task",
    data: newTask,
  })
    .then(function (response) {
      $("input").val(""),
        getTask();
        console.log("task is created!");
    })
    .catch(function (error) {
      console.log(error);
    });
}
function getTask() {
  $("#taskTableBody").empty();
  $.ajax({
    method: "GET",
    url: "/get-tasks",
  })
    .then(function (response) {
      // console.log("GET /task response", response);
      for (let task of response) {
        $("#taskTableBody").append(`
          <tr class=${task.isComplete===true ?'done':''} id=${task.id} data-id=${task.id}>
          <td>${task.id}</td>
          <td>${task.text}</td>
            <td>${task.isComplete===true ?'Yes':'No'}</td>

            <td><button class="completeButton">COMPLETE</button></td>
            <td><button class="deleteButton">DELETE</button></td>
          
          </tr>
        
        `);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
function markAsComplete() {
    console.log('update');
    let id = $(this).closest('tr').data('id');
    

    console.log('in updateTask', id);
    $.ajax({
        type: 'PUT',
        url: `/mark-completed/${id}`
    }).then(function (response) {
        console.log('back from PUT:', response);
        getTask();
       
    }).catch(function (err) {
        console.log('error on client-side')
    }) 
}
function deleteTask() {
    console.log('delete');
    let id = $(this).closest('tr').data('id');



    console.log('in deleteTask', id);
    $.ajax({
        type: 'DELETE',
        url: `/delete-task/${id}`
    }).then(function (response) {
        console.log('back from Delete:', response);
        getTask();
    }).catch(function (err) {
        console.log('error on client-side')
    }) 
}
