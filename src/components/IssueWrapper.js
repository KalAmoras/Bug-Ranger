import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { IssueForm } from './IssueForm'
import { Issue } from './Issue'
import { EditIssueForm } from './EditIssueForm'
import Sorter from './Sorter'



const IssueWrapper = ({issues, setIssues}) => {
   
    const [query, setQuery] = useState("")
    const [open, setOpen] = useState(false)

    const addIssue = (
            issue, 
            line, 
            component, 
            priority, 
            severity, 
            statusKey, 
            assignee) => {

        const datePost = new Date().toLocaleString()

        setIssues([
            ...issues, 
            {
                id: uuidv4(),
                issue: issue,
                completed: false,
                isEditing: false,
                line: line,
                component: component,
                date: datePost,                
                severity: severity,
                priority: priority,
                statusKey: statusKey,
                assignee: assignee
            }
        ])
    }


    const toggleComplete = id => {
        setIssues(
          issues.map(issue =>
            issue.id === id ? { ...issue, completed: !issue.completed } : issue
            // issue.statusKey.value === 'Closed' ? { ...issue, completed: !issue.completed } : issue

          )
        );
    }

    const deleteIssue = id => {
        if (window.confirm('Are you sure you wish to delete this item?')){
        return setIssues(issues.filter(value=> value.id !== id))
        }
    }

    const editIssue = id =>{
        setIssues(issues.map(issue=> issue.id === id ?
            {...issue, isEditing: !issue.isEditing}: issue))
    }

    const handleCancel = id => {
        setIssues((prevIssue) => {
          const newIssue = [...prevIssue];
          const originalIssue = newIssue[id];
          newIssue[id] = { ...originalIssue, isEditing: false };
          return newIssue;
        });
      };
    
    
    const editTask = (
        idOriginal,
        issue, 
        line,
        component,  
        priority, 
        severity,
        statusKey,
        assignee) => {

            const datePost = new Date().toLocaleString()

            setIssues(issues.map(issueUnit => issueUnit.id === idOriginal ?
                {        
                    id: idOriginal,            
                    issue: issue,
                    completed: false,
                    isEditing: false,
                    line: line,
                    component: component,
                    date: datePost,
                    severity: severity,
                    priority: priority,
                    statusKey: statusKey,
                    assignee: assignee,
                } : issueUnit
            ))
        }
    
    const keys = [
        "issue", 
        "line", 
        "component", 
        "priority", 
        "severity", 
        "statusKey",
        "assignee",
        "date"
    ]

   const handleSort = (order, key) => {
        if(order === "ASC"){
            const sorted = [...issues].sort((a,b) =>
                a[key] > b[key] ? 1 : -1
            )
            setIssues(sorted)
        }
        if(order === "DSC"){
            const sorted = [...issues].sort((a,b) =>
                a[key] < b[key] ? 1 : -1
            )
            setIssues(sorted)
        }
   }
   
 
   const handleButton = ()=>{
    setOpen(!open)
  }

  
  return (
    <div className='IssueWrapper'>
        <br></br>
        <div className='IssueForm-background'>
            <button className={`add-button ${open? 'open' : 'close'}`} onClick={()=>handleButton()}>Add an Issue</button>
            <IssueForm addIssue={addIssue} openText={open ? 'active' : 'inactive'}/>
        </div>
        <input className='search-bar'
            placeholder='Search your issue'
            onChange={e=>setQuery(e.target.value)}
            ></input>
        <Sorter onSort={handleSort}/>
        {issues.filter(issue=>(
            query !== ""?
            keys.some(key=>issue[key].includes(query)) :
            issues
        ))
        .map((issue,index)=>(
            issue.isEditing ? (
                <EditIssueForm editBug={editTask} 
                issuePrev={issue}
                idIssue={issue.id}
                onCancel={() => handleCancel(index)}/>
            ) : (
                <Issue issue={issue}
                key={index}
                deleteIssue={deleteIssue}
                editIssue={editIssue}
                toggleComplete={toggleComplete}/>
            )
        ))}
    </div>
  )
}

export default IssueWrapper