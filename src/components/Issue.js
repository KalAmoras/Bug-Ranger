import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Issue = ({issue, toggleComplete, editIssue, deleteIssue}) => {
   return (
    <div className={`${issue.completed ? 'completed' : "Issue"}`} >
        <div className='bug-texts'>
          <label className='bug-title'>Issue</label>
          <p className="bug-issue" 
            onClick={() => toggleComplete(issue.id)}
            >{issue.issue}</p>
          <br/>
        </div>
        <div className='bug-info'>
          <label className='bug-title'>Line</label>
          <p className='bug-line'>{issue.line}</p>
          <label className='bug-title'>Component</label>
          <p className='bug-line'>{issue.component}</p>
          <br/>
        </div>

        <div className='bug-selects'>
          <label className='bug-title'>Error</label>
          <p className='bug-select'>{issue.error}</p>
          <label className='bug-title'>Severity</label>
          <p className='bug-select'>{issue.severity}</p>
          <label className='bug-title'>Priority</label>
          <p className='bug-select'>{issue.priority}</p>
          <label className='bug-title'>Status</label>
          <p className='bug-select'>{issue.statusKey}</p>
          <label className='bug-title'>Assignee</label>
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
