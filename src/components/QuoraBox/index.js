import React from 'react'
import './styles.css'
import {Avatar} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'

function QuoraBox() {
    const user=useSelector(selectUser)
    
    return (
        <div className='quoraBox'>
            <div className="quoraBox__info">
                <Avatar src={user.photoUrl} style={{width:"28px",height:"28px"}} />
                <h5>{user.displayName}</h5>
            </div>
            <div className="quoraBox__quora">
                <p>What is your question or link?</p>
            </div>
        </div>
    )
}

export default QuoraBox
