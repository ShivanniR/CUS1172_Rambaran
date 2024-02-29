
document.addEventListener('DOMContentLoaded', function(){

    document.querySelector("#new_task").onsubmit = function(){
        const li = document.createElement('li');
        
        let task_text = document.querySelector('#task').value;
        let new_html_task = `
                <span> <p id="task-title"> Task Title: ${task_text}</p></span>
                <label for="priority">Task Priority:</label>
                <select name="task-priority" id="priority">
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
                <br><br>
                <label for="task-status">Task Status:</label>
                <input type="radio" id="completed" name="task-status" class="completed">
                <label for="completed">Completed</label>
                <button class="remove"> Remove </button>
                <br><br>
                `
                ;
        li.innerHTML = new_html_task;



        document.querySelector("#tasks_list").append(li);
        document.querySelector("#task").value= '';
        
      
        return false;
    }
   

    document.addEventListener('click', function(event){
        element= event.target;
        if(element.className === 'remove'){
            element.parentElement.remove();
        }
    })
  
    document.addEventListener('click', function(event){
        element = event.target;
        if(element.className === 'completed'){
            if(element.checked) {
                element.parentElement.querySelector('span').style.textDecoration = "line-through";
            } 
            else {
                element.parentElement.querySelector('span').style.textDecoration = "none";
            }
        }
    }) 
    
});
