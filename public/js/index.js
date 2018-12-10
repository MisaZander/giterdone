var userId = parseInt($("#all-mother").data("userid")) || 0;

// The API object contains methods for each kind of request we'll make
var API = {
  saveToDo: function(toDoObject) {
    console.log(toDoObject);
    $.ajax({
      type: "POST",
      url: "/api/todos",
      data: toDoObject
    });
  },
  saveErrand: function(errandObject) {
    $.ajax({
      type: "POST",
      url: "/api/errands",
      data: errandObject
    });
  },
  saveCorr: function(corrObject) {
    $.ajax({
      type: "POST",
      url: "/api/corrs",
      data: corrObject
    });
  },
  getTasks: function() {
    return $.ajax({
      url: "api/all/" + userId,
      type: "GET"
    });
  },
  deleteTodo: function(deleteID) {
    return $.ajax({
      url: "api/todos/",
      type: "DELETE",
      data: {
        id: deleteID
      }
    }).then(function() {
      refreshTasks();
    });
  }
};

// refreshTasks takes the response from the db and creates our tables, then it fills them in
var refreshTasks = function() {
  API.getTasks().then(function(res) {
    $("#todos").empty();
    $("#todos").append("<h3>TO-DO LIST</h3>");
    //Only execute table build if there exists at least one item
    if (res.todos.length > 0) {
      var $todoTable = $("<table>");
      $($todoTable).attr("id", "todoTable");
      $($todoTable).attr("class", "striped");
      $($todoTable).append(
        "<thead><tr><th class='smallcell'>Complete</th><th>Description</th><th class='smallcell'>Delete</th></tr></thead>"
      );
      $($todoTable).append("<tbody>");
      for (var i = 0; i < res.todos.length; i++) {
        var $tRow = $("<tr>");
        //create complete button
        var $buttonComplete = $("<button>");
        var $td = $("<td>");
        $($td).attr("class", "smallcell");
        $($buttonComplete).attr("data-id", res.todos[i].id);
        if (res.todos[i].complete) {
          $($buttonComplete).attr("data-newcomplete", "false");
        } else {
          $($buttonComplete).attr("data-newcomplete", "true");
        }
        $($buttonComplete)
          .attr(
            "class",
            "btn waves-effect waves-light green accent-4 todoComplete"
          )
          .html("<i class='material-icons green accent-4'>done</i> Complete");
        $($td).append($buttonComplete);
        $($tRow).append($td);
        //$($tRow).append($buttonComplete);
        //$($tRow).append("</td>");
        //creates list item
        var $td = $("<td>");
        var $data = $("<p>");
        $($data).text("Item " + (i + 1) + ": " + res.todos[i].data);
        if (res.todos[i].complete) {
          $($data).css("text-decoration", "line-through");
        }
        $($td).append($data);
        //var tRow2 = $("<tr>");
        $($tRow).append($td);
        //creates a delete button
        var $buttonDelete = $("<button>");
        $($buttonDelete).attr("data-id", res.todos[i].id);
        $($buttonDelete)
          .attr("class", "btn waves-effect waves-light red accent-4 todoDelete")
          .html(
            "<i class='material-icons red accent-4'>delete_forever</i> Delete"
          );
        //var tRow3 = $("<tr>");
        var $td = $("<td>");
        $($td).attr("class", "smallcell");
        $($td).append($buttonDelete);
        $($tRow).append($td);

        $($todoTable).append($tRow);
      }
      $($todoTable).append("</tbody>");
      $("#todos").append($todoTable);
    }

    //ERRANDS TABLE
    $("#errands").empty();
    $("#errands").append("<h3>ERRANDS</h3>");
    if (res.errands.length > 0) {
      var $errTable = $("<table>");
      $($errTable).attr("id", "errandsTable");
      $($errTable).attr("class", "striped");
      $($errTable).append(
        "<thead><tr><th class='smallcell'>Complete</th><th>Description</th><th class='medcell'>Location</th><th class='smallcell'>Delete</th></tr></thead>"
      );
      $($errTable).append("<tbody>");
      for (var i = 0; i < res.errands.length; i++) {
        var $tRow = $("<tr>");
        //creates complete button
        var $buttonComplete = $("<button>");
        $($buttonComplete).attr("data-id", res.errands[i].id);
        if (res.errands[i].complete) {
          $($buttonComplete).attr("data-newcomplete", "false");
        } else {
          $($buttonComplete).attr("data-newcomplete", "true");
        }
        $($buttonComplete)
          .attr(
            "class",
            "btn waves-effect waves-light green accent-4 errandComplete"
          )
          .html("<i class='material-icons green accent-4'>done</i> Complete");
        var $td = $("<td>");
        $($td).attr("class", "smallcell");
        $($td).append($buttonComplete);
        $($tRow).append($td);
        //creates list item for data
        var $td = $("<td>");
        var $data = $("<p>");
        $($data).text("Item " + (i + 1) + ": " + res.errands[i].data);
        if (res.errands[i].complete) {
          $($data).css("text-decoration", "line-through");
        }
        $($td).append($data);
        $($tRow).append($td);
        //Create list item for where
        var $td = $("<td>");
        var $data = $("<p>");
        $($data).text(res.errands[i].where);
        $($td).attr("class", "medcell");
        if (res.errands[i].complete) {
          $($data).css("text-decoration", "line-through");
        }
        $($td).append($data);
        $($tRow).append($td);
        //create delete button
        var $buttonDelete = $("<button>");
        $($buttonDelete).attr("data-id", res.errands[i].id);
        $($buttonDelete)
          .attr(
            "class",
            "btn waves-effect waves-light red accent-4 errandDelete"
          )
          .html(
            "<i class='material-icons red accent-4'>delete_forever</i> Delete"
          );
        var $td = $("<td>");
        $($td).attr("class", "smallcell");
        $($td).append($buttonDelete);
        $($tRow).append($td);
        $($errTable).append($tRow);
      }
      $("#errands").append($errTable);
    }

    //CORR TABLE
    $("#correspondences").empty();
    $("#correspondences").append("<h3>CORRESPONDENCE</h3>");
    if (res.correspondence.length > 0) {
      var $corrTable = $("<table>");
      $corrTable.attr("id", "corrTable");
      $corrTable.attr("class", "striped");
      $($corrTable).append(
        "<thead><tr><th class='smallcell'>Complete</th><th>Description</th><th class='medcell'>Who With</th><th class='smallcell'>Delete</th></tr></thead>"
      );
      $($corrTable).append("<tbody>");
      for (var i = 0; i < res.correspondence.length; i++) {
        var $tRow = $("<tr>");
        //creates complete button
        var $buttonComplete = $("<button>");
        //$buttonComplete.attr("id", "complete" + i).text("Complete");
        $($buttonComplete).attr("data-id", res.correspondence[i].id);
        if (res.correspondence[i].complete) {
          $($buttonComplete).attr("data-newcomplete", "false");
        } else {
          $($buttonComplete).attr("data-newcomplete", "true");
        }
        $($buttonComplete)
          .attr(
            "class",
            "btn waves-effect waves-light green accent-4 corrComplete"
          )
          .html("<i class='material-icons green accent-4'>done</i> Complete");
        var $td = $("<td>");
        $($td).attr("class", "smallcell");
        $($td).append($buttonComplete);
        $($tRow).append($td);
        //creates list item
        var $td = $("<td>");
        var $data = $("<p>");
        $($data).text("Item " + (i + 1) + ": " + res.correspondence[i].data);
        //$data.attr("id", "itemId" + i);
        if (res.correspondence[i].complete) {
          $($data).css("text-decoration", "line-through");
        }
        $($td).append($data);
        $($tRow).append($td);

        //Create list item for who
        var $td = $("<td>");
        var $data = $("<p>");
        $($data).text(res.correspondence[i].who);
        $($td).attr("class", "medcell");
        if (res.correspondence[i].complete) {
          $($data).css("text-decoration", "line-through");
        }
        $($td).append($data);
        $($tRow).append($td);
        //create delete button
        var $buttonDelete = $("<button>");
        //$buttonDelete.attr("id", "close" + i).text("ｘ");
        $($buttonDelete).attr("data-id", res.correspondence[i].id);
        $($buttonDelete)
          .attr("class", "btn waves-effect waves-light red accent-4 corrDelete")
          .html(
            "<i class='material-icons red accent-4'>delete_forever</i> Delete"
          );
        var $td = $("<td>");
        $($td).attr("class", "smallcell");
        $($td).append($buttonDelete);
        $($tRow).append($td);
        $($corrTable).append($tRow);
      }
      $("#correspondences").append($corrTable);
    }
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
function FormSubmitTodo(event) {
  event.preventDefault();
  var todoObject = {
    data: $("#inputTodoData")
      .val()
      .trim(),
    priority: parseInt($("#inputTodoPriority").val()),
    userId: userId
  };

  if (!(todoObject.data && todoObject.priority)) {
    alert("You must enter a To-Do item and Priority!");
    return;
  }

  $("#inputTodoData").val("");
  $("#inputToDoPriority").val("");
  console.log(todoObject);
  API.saveToDo(todoObject);
}

$("#inputTodoSubmit").on("click", function(event) {
  FormSubmitTodo(event);
});

function FormSubmitErrand(event) {
  event.preventDefault();
  var errandObject = {
    data: $("#inputErrandData")
      .val()
      .trim(),
    where: $("#inputErrandWhere")
      .val()
      .trim(),
    priority: parseInt($("#inputErrandPriority").val()),
    userId: userId
  };

  if (!(errandObject.data && errandObject.priority && errandObject.where)) {
    alert("You must enter an Errand and Priority!");
    return;
  }

  $("#inputErrandData").val("");
  $("#inputErrandWhere").val("");
  $("#inputErrandPriority").val("");
  console.log(errandObject);
  API.saveErrand(errandObject);
}

$("#inputErrandSubmit").on("click", function(event) {
  FormSubmitErrand(event);
});

function FormSubmitCorr(event) {
  event.preventDefault();
  var corrObject = {
    data: $("#inputCorrData")
      .val()
      .trim(),
    who: $("#inputCorrWho")
      .val()
      .trim(),
    priority: parseInt($("#inputCorrPriority").val()),
    userId: userId
  };

  if (!(corrObject.data && corrObject.priority && corrObject.who)) {
    alert("You must enter a Correspondence, Person and Priority!");
    return;
  }

  $("#inputCorrData").val("");
  $("#inputCorrWho").val("");
  $("#inputCorrPriority").val("");
  console.log(corrObject);
  API.saveCorr(corrObject);
}

$("#inputCorrSubmit").on("click", function(event) {
  FormSubmitCorr(event);
});

$(".modal-close").on("click", function(event) {
  event.preventDefault();
  // console.log("on click")
  refreshTasks();
});

$(document).ready(function() {
  refreshTasks();
});

var DeleteBtnClick = function(deleteID) {
  console.log(deleteID);

  API.deleteTodo(deleteID).then(function() {
    refreshTasks();
  });
};
$(document).on("click", ".todoDelete", function() {
  var deleteID = $(this).attr("data-id");
  DeleteBtnClick(deleteID);
});
//THIS IS A CODE BANK; STICK EM UP
//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick)
