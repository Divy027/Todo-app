let todoBox = document.getElementById('todoBox'); //div in which all todos resides
//todoBox.style = "margin-top: 12px";

let todos;

const savedTodo = JSON.parse(localStorage.getItem('key')); //retrieving todos from savetodo();
if (Array.isArray(savedTodo)){   // checking if savedTodo is Array?
    todos = savedTodo;
}
else {                      //use default values
     todos = [{
        title : 'Wash car',
        dueDate: '2022-02-12',
        id: 'id1'
    },{
        title: 'get groceries',
        dueDate: '2022-03-12',
        id: 'id2'
    }
    ];
}


const AddNewTodo = ( newTitle,newDate) =>{
    const id = '' + new Date().getTime();  // generating a random string id for new todo
    todos.push({          // adding new object at last of array
        title: newTitle,
        dueDate: newDate,
        id: id
    });
    
}

const removeTodo = (IdtoDelete) =>{
    todos = todos.filter((todo)=>{    // using filter to copying an array
        if (IdtoDelete === todo.id){
            return false;     // do not copy
        }
        else {
            return true;  // do copy
        }
    });
    
}

const checkTodo = (IdtoCheck,checked) =>{

    todos.forEach((todo)=>{
        if(IdtoCheck === todo.id){
            todo.isDone = checked;  // sending the values of checked to a variable
        }
    })
}

const editTodo = (idtoEdit) =>{
    todos.forEach((todo)=>{
        if (idtoEdit === todo.id){
            todo.isEditing = true;  // putting true to a variable
        }
    });
}

const updateTodo = (idtoUpdate,updateTitle,updateDate) =>{
    todos.forEach((todo)=>{
        if(idtoUpdate === todo.id){
            todo.title = updateTitle;  // updating new values of todo
            todo.dueDate = updateDate;
            todo.isEditing = false;    
        }
    });
}

const saveTodo = ()=> {
    localStorage.setItem('key', JSON.stringify(todos));
}


const onADD =()=>{
    const searchBar = document.getElementById('searchBar');
    const Title = searchBar.value;  // geting todo string from searchbar

    const dateBar = document.getElementById('dateBar');
    const Date = dateBar.value;  // getting dates from datebar
      

    AddNewTodo(Title,Date);  // doing task of checking over here and addding new todo
    saveTodo();
    DisplayTodo();
}

const onRemove = (todotoDelete)=>{
    return () =>{
        removeTodo(todotoDelete.id);
        saveTodo();
        DisplayTodo();
    }
}

const onCheck = (todotoCheck, checkBox)=>{
   // const checkBox = event.target;    // selecting a selected checkbox
    //const IdtoCheck = checkBox.dataset.todoId;  // generating the todo associated
    //const checked = checkBox.checked;   // getting values of checked i.e true or false from checkbox
    return () =>{
        checkTodo(todotoCheck.id,checkBox.checked);
        saveTodo();
    }
    

}

const onEdit = (todotoEdit)=> {
    return () => {
        editTodo(todotoEdit.id);
        saveTodo();
        DisplayTodo();
    }
}

const onUpdate = (todotoUpdate,NewtitleBox,NewduedateBox)=>{
   // const todoUpdate = event.target;  // selecting the right update button
   // const idtoUpdate = todoUpdate.dataset.todoId;   // retrieving id to update

  // getting values from titlebox and datebox to be updated
   // const NewtitleBox = document.getElementById('titlebox');                                                     
   // const updateTitle = NewtitleBox.value;

   // const NewduedateBox = document.getElementById('datebox');
   // const updateDate = NewduedateBox.value;
    return () => {
        updateTodo(todotoUpdate.id,NewtitleBox.value,NewduedateBox.value);
        saveTodo();
        DisplayTodo();
    }
    
}


const DisplayTodo = ()=>{
    todoBox.innerText= '';

    todos.forEach((todo)=>{
        let div = document.createElement('div');
        div.id = "idbox";
    
        if(todo.isEditing === true){  // if todo is selected for editing it 
            const searchbar = document.createElement('input'); // new search bar
            searchbar.type = 'text';
            searchbar.id = 'titlebox';
            div.appendChild(searchbar);

            const duedatebar = document.createElement('input'); // new datebar
            duedatebar.type = 'date';
            duedatebar.id = 'datebox';
            div.appendChild(duedatebar);

            const updateButton = document.createElement('button');
            updateButton.innerText = 'Update';
           // updateButton.dataset.todoId = todo.id;
            updateButton.style = "background-color: orange" ;
            updateButton.onclick = onUpdate(todo,searchbar,duedatebar);
            div.appendChild(updateButton);

        }
        else {   // todo is not selected for updating
        div.innerHTML = todo.title +' '+ todo.dueDate;
        div.style = "margin-top: 10px ";

        const checkBar = document.createElement('input');
        checkBar.type = 'checkbox';
        checkBar.onchange = onCheck(todo,checkBar);   // using onchange instead of onClick
        //checkBar.dataset.todoId = todo.id;
        if(todo.isDone === true){       // if value is true means it is checked and it is associated to the right todo
            checkBar.checked = true;   // making checked value true
        }
        else checkBar.checked = false;
        div.prepend(checkBar);      // attacing checkbox before todo(div)


        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.style = "background-color: orange" ;
       // editButton.dataset.todoId = todo.id;
        editButton.onclick = onEdit(todo);
        div.appendChild(editButton);

        const DelButton = document.createElement('button');
        DelButton.innerText = 'Remove';
        DelButton.style = "background-color: orange" ;
        DelButton.onclick = onRemove(todo);
        div.appendChild(DelButton);

       
    }
        todoBox.appendChild(div);   // attaching all the todo (div) inside todoBox

    });

    
}

DisplayTodo();