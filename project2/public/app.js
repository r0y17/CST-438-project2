/* global $ */
$(document).ready(function() {
    $.getJSON("/api/userItemRoutes")
    .then(addItems)

    $("#todoInput").keypress(function(event) {
        if(event.which == 13) {
            createTodo()
        }
    });

    $('.list').on('click','span',function() {
        removeTodo($(this).parent())
        
    });
    $('.list').on('click','li',function() {
        updateTodo($(this));
        
    });
});

function addTodo(item) {
    var newItem = $('<li class="task"> '+item.name + '<span>X</span></li>');
    newItem.data('id',item._id);
    newItem.data('completed',item.completed);
    if(item.completed) {
        newItem.addClass("done");
    }
    $('.list').append(newTodo);
    
}

function addItem(item) {
    item.forEach(t => {
        addTodo(t);
    });
}

function createItem() {
    var newItem = $("#todoInput").val();
    
    $.post("api/userItemRoutes",{name: newItem})
    .then(function(newTodo) {
        $("#todoInput").val('');
        addTodo(newItem);
    })
    .catch((err) => {
        console.log(err);
    })
}

function removeItem(item) {
    var clickedId = todo.data('id');
    var deleterUrl = 'api/userItemRoutes/'+ clickedId;
    
    $.ajax({
        method: 'DELETE',
        url: deleterUrl
    })
    .then((data) => {
        todo.remove();
    })
}

const updateItem = (item) => {
    var updateUrl = 'api/userItemRoutes/'+ item.data('id');
    var isDone = item.data('completed');
    // console.log(isDone)
    var updateData = {$inc: {quantity: 1}};
    // console.log(updateData)
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData

    })
    .then(function(updatedSelectedItem) {
        item.toggleClass("done");
    })

}