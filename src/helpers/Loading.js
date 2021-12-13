import React from 'react'
import loading  from '../assets/images/loader.gif'
// import '../CSS/custom.css'

function Loading() {
    return (
        <div className='loader show'>
            <img src={loading} alt="Loading..." />
        </div>
    )
}
export default Loading