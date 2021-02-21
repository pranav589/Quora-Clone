import React from 'react'
import './styles.css'
import WidgetOptions from '../WidgetOption/index'


function Widget() {
    return (
        <div className='widget'>
            <div className="widget__header">
                <h5>Spaces to follow</h5>
            </div>
            <WidgetOptions/>
        </div>
    )
}

export default Widget
