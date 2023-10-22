import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export const Issue = ({issue, toggleComplete, editIssue, deleteIssue}) => {
   return (
    <div className={`${issue.completed ? 'completed' : "Issue"}`}>
        <div className='bug-texts'>
          <label className='bug-title' onClick={() => toggleComplete(issue.id)}>Issue</label>
          <p className="bug-issue"
            >{issue.issue}</p>
        </div>
        <div className='bug-line'>
          <label className='bug-title'>Line</label>
          <p>{issue.line}</p>
        </div>
        <div className='bug-module'>
          <label className='bug-title'>Component</label>
          <p>{issue.component}</p>
        </div>

        <div className='bug-selects'>
          <label className='bug-title-select'>Severity</label>
          <p className='bug-select'>{issue.severity}</p>
          <label className='bug-title-select'>Priority</label>
          <p className='bug-select'>{issue.priority}</p>
          <label className='bug-title-select'>Status</label>
          <p className='bug-select'>{issue.statusKey}</p>
          <label className='bug-title-select'>Assignee</label>
          <p className='bug-select'>{issue.assignee}</p>
        </div>
        
        <div className="buttons-box">
          <FontAwesomeIcon icon={faPenToSquare} onClick={() => editIssue(issue.id)} />
          <FontAwesomeIcon icon={faTrash} onClick={() => deleteIssue(issue.id)} />
        </div>
        <label className="bug-date">Date Created: {issue.date}</label>
    </div>
    
  )
}
