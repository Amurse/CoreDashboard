import React from 'react'
import { Link } from 'react-router-dom'

const ComingSoon = ({punchLine}) => {
  return (
    <div className='flex flexCol align-center justify-center'>
      <h1 className='blue'>Coming Soon!</h1>
      <h2 className='textCenter'>{ punchLine }</h2>
      <h3>Click <Link to="/">here</Link> to return to homepage</h3>
    </div>
  )
}

export default ComingSoon