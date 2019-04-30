$(function(){
    let edit = false;
    console.log("jQuery is WOrld");
    fetchTasks();
    $('#task-result').hide();

    $('#search').keyup(function(){
        if($('#search')){
            
            let search = $('#search').val();
            $.ajax({
                url:'task-search.php',
                type:'POST',
                data:{search } ,
                success: function(response){
                    let task = JSON.parse(response);
                    let template ="";
                    task.forEach(task => {
                        template +=`<li>
                            ${task.name}
                        </li>`
                    });
    
                    $('#countainer').html(template);
                    $('#task-result').show();
                }
            }) 
        }
    })

    $('#task-form').submit(function(e){
        const postData ={
            name: $('#name').val(),
            description: $('#description').val(),
            id: $('#taskId').val()
        };

        let url = edit === false ? 'task-add.php' : 'task-edit.php';
        console.log(url);

        $.post(url, postData, function(response){
            console.log(response);
            fetchTasks();
            $('#task-form').trigger('reset');
        }); 
        e.preventDefault();
    });

    function fetchTasks(){
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function(response) {
                const tasks = JSON.parse(response);
                let template = '';
                tasks.forEach(task => {
                    template += `
                    <tr taskId="${task.id}">
                        <td>${task.id}</td>
                        <td>
                            <a href='#' class="taskItem">${task.name}</a>
                        </td>
                        <td>${task.description}</td>
                        <td>
                            <button class="task-delete btn btn-danger">
                                Delete
                            </button>
                        </td>
                    </tr>
                    `
                });
                $('#tasks').html(template);
            }
        });
    }

    $(document).on('click', '.task-delete', function(){
       if(confirm('Are you sure you want to delete it?')){
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('taskId');
            $.post('task-delete.php',{id}, function(response){
                fetchTasks();
        });
       }
    });

    $(document).on('click', '.taskItem', function(){
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskid');
        $.post('task-single.php',{id}, function(response){
            const task = JSON.parse(response);
            $('#name').val(task.name);
            $('#description').val(task.description);
            $('#taskId').val(task.id);
            edit = true;
        })
    });
});