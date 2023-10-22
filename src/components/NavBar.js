import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faChartSimple, faAngleLeft, faFlag, faQuestion } from '@fortawesome/free-solid-svg-icons'

import { useState } from 'react'


const aboutIcon = <FontAwesomeIcon icon={faQuestion} />
const openIcon = <FontAwesomeIcon icon={faAngleRight} />
const closeIcon = <FontAwesomeIcon icon={faAngleLeft} />
const issueIcon = <FontAwesomeIcon icon={faFlag}  />
const chartsIcon = <FontAwesomeIcon icon={faChartSimple} />


const NavBar = () => {  

  const [openBar, setOpenBar] = useState(true)

  const handleClick = () => {
    setOpenBar(!openBar)
  }

  return (
    <nav className={`nav ${openBar? `active` : `inactive`}`}>
        <ul>
        <a onClick={handleClick}>{openBar? closeIcon : openIcon }</a>
        <CustomLink to="/" >{openBar? issueIcon : "" }</CustomLink>
        <CustomLink to="/charts" >{openBar? chartsIcon : "" }</CustomLink>  
        <CustomLink to="/about" >{openBar? aboutIcon : "" }</CustomLink>             
        </ul>        
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })  

  return (
    <li>
      <Link to={to} {...props} className={`custom-link ${isActive ? 'active' : ''}`}>
         {children}
      </Link>
    </li>
  )
}

export default NavBar

