import React, { useState, useEffect, useRef } from 'react'

//TODO: Date Updated



export const EditIssueForm = ({editBug, issuePrev, idIssue, onCancel}) => {
  
  const [value, setValue] = useState({
    id: idIssue,
    isEditing: issuePrev.isEditing,
    issue: issuePrev.issue,
    line: issuePrev.line,
    severity: issuePrev.severity,
    priority: issuePrev.priority,
    statusKey: issuePrev.statusKey,
    component: issuePrev.component,
    assignee: issuePrev.assignee
  })
  
  const [isValid, setIsValid] = useState(false)
  
  
  useEffect(() => {
    const { 
      issue, 
      line,
      component, 
      priority, 
      severity,
      statusKey,
      assignee } = value

      if(issue !=="" && line !=="" && 
          component !=="" && 
          priority !=="" && severity !=="" && 
          statusKey !=="" && assignee !==""){
          setIsValid(true)
      }else{
        setIsValid(false)
      }         

  }, [value, isValid])   
  
  
  let useClickOutside = handler => {
    let formRef = useRef()

    useEffect(() => {
      let switchHandler = e => {
        if (!formRef.current.contains(e.target)){
          handler();
        }
      }

      document.addEventListener("mousedown", switchHandler)

      return () => {
        document.removeEventListener("mousedown", switchHandler)
      }
    })
    return formRef
  }
  

  const handleClick = () =>{
             
    let message
    Object.entries(value).map(x=> 
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

  const handleCancel = () => {
    onCancel();
  };

  const handleSubmit = e =>{             
      e.preventDefault() 

      const {  
        issue, 
        line,
        component, 
        priority, 
        severity,
        statusKey,
        assignee } = value        
                
        console.log(issuePrev)
        console.log(value)
        
      if(issue && line && component &&
         priority && severity && 
        statusKey && assignee){
          editBug(issuePrev.id, issue, line, 
            component, priority, 
            severity, statusKey, assignee)

          setIsValid(()=>false)
      }else{
        handleClick(e)
        return
      }
  }

  let formRef = useClickOutside (()=>{
    handleCancel()
  })

return (
  <div className='IssueDiv'>
     
    <form className='IssueForm'
          onSubmit={handleSubmit}
          ref={formRef}>
        <input type='text'
        name='issue'
        className='issue-input'
        value={value.issue}

        placeholder='Issue(max. 120)' 
        onChange={handleChange}
        maxLength="126"
        />

        <input type='number'
        name='line'
        className='issue-line'
        value={value.line}
        placeholder='Line' 
        onChange={handleChange}
        /> 

        <input type='text'
        name='component'
        className='issue-compo'
        value={value.component}
        placeholder='Component' 
        onChange={handleChange}
        maxLength="50"
        />

      <div className='formSelects'>     
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
        </div>
        <div className ='issue-btns'>   
        <button type='submit'
          //disabled={!isValid}           
          className='issue-btn'>Edit issue</button>
        <button type='button'
          //disabled={!isValid}           
          className='issue-btn'
          onClick={handleCancel}>Cancel edit</button>
          </div>
    </form>
  </div>
)

}

