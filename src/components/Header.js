import React from 'react'
import { Link } from 'react-router-dom'
import { faHome, faFighterJet, faPlane, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Header() {


  return (
    <>
      <div className='title'>
        <Link className='text-link' to={{ pathname: '/'}}> <h2>  Military Flight Tracker</h2></Link>  
      </div>
      <section className='header'>
        <Link to={{ pathname: '/info' }}><p><FontAwesomeIcon icon={faPlane} size='1x' /> Flight Info</p></Link>
        <Link to={{ pathname: '/' }}><p><FontAwesomeIcon icon={faHome} size='1x' /> Home</p></Link>
        <Link to={{ pathname: '/about' }}><p><FontAwesomeIcon icon={faQuestion} size='1x' /> About</p></Link>
      </section>


    </>
  )
}