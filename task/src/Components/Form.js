import React,{useState,useEffect} from 'react'

const getTodosFromLS=()=>{
    const data = localStorage.getItem('Todos');
    if(data){
        return JSON.parse(data);
    }
    else{
        return []
    }
}

export const Form = () => {

    const [todoValue, setTodoValue]=useState('');
    const [todos, setTodos]=useState(getTodosFromLS());

    const handleSubmit=(e)=>{
        e.preventDefault();

        const date = new Date();
        const time = date.getTime();

        let todoObject={
          ID: time,
          TodoValue:todoValue,
          completed: false
        }
        setTodos([...todos,todoObject]);
        setTodoValue('');
    }

    useEffect(() => {
        localStorage.setItem('Todos',JSON.stringify(todos));
    }, [todos])

    const handleDelete=(id)=>{
      
      const filtered = todos.filter((todo)=>{
        return todo.ID!==id
      });
      setTodos(filtered);
    }

    const [editForm, setEditForm]=useState(false);

    const [id,setId]=useState();

    const handleEdit=(todo,index)=>{
      setEditForm(true);
      setTodoValue(todo.TodoValue);
      setId(index);
    }

    const handleEditSubmit=(e)=>{
      e.preventDefault();
      let items = [...todos];
      let item = items[id];
      
      item.TodoValue=todoValue;
      item.completed=false;
      items[id]=item;
      
      setTodos(items);
      setEditForm(false);
      setTodoValue('');
    }
   
   
    const handleCheckbox=(id)=>{
      let todoArray=[];
      todos.forEach((todo)=>{
        if(todo.ID===id){
          if(todo.completed===false){
            todo.completed=true;
          }
          else if(todo.completed===true){
            todo.completed=false;
          }
        }
        todoArray.push(todo);
        
        setTodos(todoArray);
      })
    }

    return (
        <div>

          
          {editForm===false&&(
            <div className="form">
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="input-and-button">
                  <input type='text' placeholder="Enter the new task" required
                  onChange={(e)=>setTodoValue(e.target.value)} value={todoValue}/>
                  <div className='button'>
                    <button type="submit">
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          
          {editForm===true&&(
            <div className="form">
              <form autoComplete="off" onSubmit={handleEditSubmit}>
                <div className="input-and-button">
                  <input type='text' placeholder="Edit your Item" required
                  onChange={(e)=>setTodoValue(e.target.value)} value={todoValue}/>
                  <div className='button edit'>
                    <button type="submit">
                      UPDATE
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
         

          
          {todos.length>0&&(
            <>
              {todos.map((individualTodo,index)=>(
                <div className='todo' key={individualTodo.ID}>
                  <div>
                      
                      {editForm===false&&(
                        <input type='checkbox' checked={individualTodo.completed}
                        onChange={()=>handleCheckbox(individualTodo.ID)}/>
                      )}
                      <span
                      style={individualTodo.completed===true?{textDecoration:'line-through'}:{textDecoration:'none'}}>{individualTodo.TodoValue}</span>
                  </div>

                  {editForm===false&&(
                    <div className='edit-and-delete'>
                      <div style={{marginRight:7+'px'}}
                      onClick={()=>handleEdit(individualTodo,index)}>
                          Edit
                      </div>
                      <div onClick={()=>handleDelete(individualTodo.ID)}>
                          Delete
                      </div>
                    </div>
                  )}

                </div>
              ))} 

              {editForm===false&&(
                <div style={{display:'flex',justifyContent:'flex-end'}}>
                  <button className='delete-all'
                  onClick={()=>setTodos([])}>Delete All Items</button>
                </div>
              )}
            </>
          )}
          

        </div>
    )
}