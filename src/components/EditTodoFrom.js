import React, { useState, useEffect } from 'react'


export const EditTodoForm = ({editBug, issuePrev, idIssue}) => {
   
  //TODO: Cancel edit
  
  const [value, setValue] = useState({
    id: idIssue,
    issue: issuePrev.issue,
    line: issuePrev.line,
    error: issuePrev.error,
    severity: issuePrev.severity,
    priority: issuePrev.priority,
    statusKey: issuePrev.statusKey,
    component: issuePrev.component,
    assignee: issuePrev.assignee
  })
  const [isValid, setIsValid] = useState(false)
  

  console.log(issuePrev)
  console.log(issuePrev.id)
  console.log(value.id)

  
  useEffect(() => {
    const { 
      issue, 
      line,
      component, 
      error, 
      priority, 
      severity,
      statusKey,
      assignee } = value

      if(issue !=="" && line !=="" && 
          component !=="" && error !=="" && 
          priority !=="" && severity !=="" && 
          statusKey !=="" && assignee !==""){
          setIsValid(true)
      }else{
        setIsValid(false)
      }         

  }, [value, isValid])   
  
  
  const handleClick = () =>{
             
    let message
    let obj = Object.entries(value)
    const isFilled = obj.map(x=> 
      x[1] === "" ? message = x[0] : ""
    )         
    
    if(!isValid) alert(`
      Please fill ${message} field to submit the issue`)      
  }
  
  const handleChange = e =>{
              
    const { name, value } = e.target           
    
    setValue((prevVal) => ({
      ...prevVal,
      [name]: value
    }))

    console.log({[name]:value})        
  }

  const handleSubmit = e =>{             
      e.preventDefault() 

      const {  
        issue, 
        line,
        component, 
        error, 
        priority, 
        severity,
        statusKey,
        assignee } = value        
                
        console.log(issuePrev)
        console.log(value)
        
      if(issue && line && component && 
        error && priority && severity && 
        statusKey && assignee){
          editBug(issuePrev.id, issue, line, 
            component, error, priority, 
            severity, statusKey, assignee)

            console.log(issuePrev)
            console.log(value)

            /*setValue({
              issue: "",
              line: "",
              error: "",
              severity: "",
              priority: "",
              statusKey: "",
              component: "",
              assignee: "",
            })*/
            
       
          setIsValid(()=>false)
      }else{
        handleClick(e)
        return
      }
  }

return (
  <form className='TodoForm'
        onSubmit={handleSubmit}>
      <input type='text'
      name='issue'
      className='todo-input'
      value={value.issue}

      placeholder='Issue(max. 120)' 
      onChange={handleChange}
      maxLength="126"
      />

      <input type='number'
      name='line'
      className='todo-input'
      value={value.line}
      placeholder='Line' 
      onChange={handleChange}
      /> 

      <input type='text'
      name='component'
      className='todo-input'
      value={value.component}
      placeholder='Component' 
      onChange={handleChange}
      maxLength="50"
      />   

      <select
        name="error"
        value={value.error}         
        onChange={handleChange}
        >
          <option value="" disabled hidden >Type of Error</option>
          <option value="Syntax Error" >Syntax Error</option>
          <option value="Logic Error">Logic Error</option>
          <option value="Type Error">Type Error</option>
          <option value="Runtime Error">Runtime Error</option>
          <option value="Null Pointer Error">Null Pointer Error</option>
          <option value="Other" >Other</option>
      </select>
      <select 
        name="severity"
        value={value.severity}          
        onChange={handleChange}
        placeholder='Severity'
        >            
          <option value="" disabled hidden >Severity</option>
          <option value="Minor">Minor</option>
          <option value="Major">Major</option>
          <option value="Critical">Critical</option>            
      </select>  

      <select 
        name="priority"
        value={value.priority}          
        onChange={handleChange}
        placeholder='Priority'
        >
          <option value="" disabled hidden >Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>            
      </select>  
      <br/>
      <select 
        name="statusKey"
        value={value.statusKey}          
        onChange={handleChange}
        >
          <option value="" disabled hidden >Status</option>
          <option value="Open">Open</option>
          <option value="Assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>            
      </select> 

      <select 
        name="assignee"
        value={value.assignee}          
        onChange={handleChange}
        >
          <option value="" disabled hidden >Assignee</option>
          <option value="John">John</option>
          <option value="James">James</option>
          <option value="Jack">Jack</option>
      </select>   
      <br/>
      <button type='submit'
        //disabled={!isValid}           
        className='todo-btn'>Edit issue</button>
  </form>
)


}

