import React, { useEffect, useState } from 'react'

export const IssueForm = ({addIssue, openText}) => {
    
    const [value, setValue] = useState({
      issue: "",
      line: "",
      severity: "",
      priority: "",
      statusKey: "",
      component: "",
      assignee: ""
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
            component !=="" && priority !=="" && 
            severity !=="" && statusKey !=="" && 
            assignee !==""){
            setIsValid(true)
        }else{
          setIsValid(false)
        }         

    }, [value, isValid])   
    
    const handleValidation = () =>{ 

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
    }

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
        
        if(issue && line && component && 
          priority && severity && 
          statusKey && assignee){
            addIssue(issue, line, 
              component, priority, 
              severity, statusKey, assignee)

            setValue({
              issue: "",
              line: "",
              severity: "",
              priority: "",
              statusKey: "",
              component: "",
              assignee: "",
            })
            setIsValid(()=>false)
        }else{
          handleValidation(e)
          return
        }
    }

 
  return (

    <div className={`IssueDiv ${openText}`}>
      <form className={`IssueForm`}
          onSubmit={handleSubmit}>
        <input type='text'
        name='issue'
        className='issue-input'
        value={value.issue}        
        placeholder='Issue(max. 120)' 
        onChange={handleChange}
        maxLength="275"
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
            <option value="High">High</option>            
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
        </select>  
        <select 
          name="statusKey"
          value={value.statusKey}          
          onChange={handleChange}
          >
            <option value="" disabled hidden >Status</option>
            <option value="Assigned">Assigned</option>
            <option value="Closed">Closed</option>            
            <option value="In Progress">In Progress</option>
            <option value="Open">Open</option>
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
      
        <button type='submit'
          //disabled={!isValid}           
          className='issue-btn'>Add issue</button>
      </form>
    </div>
  )
}

