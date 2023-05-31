import React, { useState, useEffect } from 'react'
import { IssueForm } from './IssueForm'
import { Issue } from './Issue'
import { v4 as uuidv4 } from 'uuid'
import { EditTodoForm } from './EditTodoFrom'



const IssueWrapper = () => {
    const[issues,setIssues] = useState(()=>{
        const tempJson = localStorage.getItem("ISSUES")
        if(tempJson==null) return []

        return JSON.parse(tempJson)
    })

    useEffect(()=>{
        localStorage.setItem("ISSUES", JSON.stringify(issues))
    },[issues])

  
    const addIssue = (
            issue, 
            line, 
            component, 
            error, 
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
                error: error,
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
          )
        );
    }

    const deleteIssue = id => {
        setIssues(issues.filter(value=> value.id !== id))
    }

    const editIssue = id =>{
        setIssues(issues.map(issue=> issue.id === id ?
            {...issue, isEditing: !issue.isEditing}: issue))
    }
    
    /*const editTask = (task, id) =>{
        setIssues(issues.map(issue => issue.id === id ?
            {...issue, task, isEditing: !issue.isEditing} : issue
        ))
    }*/

    const editTask = (
        idOriginal,
        issue, 
        line,
        component, 
        error, 
        priority, 
        severity,
        statusKey,
        assignee) => {

            console.log(idOriginal)

            issues.map(issueUnit => issueUnit.id === idOriginal ?
                console.log(issueUnit.id, idOriginal) : 
                console.log("diferente"))

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
                    error: error,
                    severity: severity,
                    priority: priority,
                    statusKey: statusKey,
                    assignee: assignee,
                } : issueUnit
            ))

            issues.map(issueUnit => issueUnit.id === idOriginal ?
                console.log(issueUnit.id, idOriginal) : 
                console.log(issueUnit.id, idOriginal))
            console.log(idOriginal)
            console.log(issues)
        }
    

    
  return (
    <div className='TodoWrapper'>
        <h1>Bug Ranger</h1>
        <IssueForm addIssue={addIssue}/>
        {issues.map((issue,index)=>(
            issue.isEditing ? (
                <EditTodoForm editBug={editTask} 
                issuePrev={issue}
                idIssue={issue.id}
                />
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