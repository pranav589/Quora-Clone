import React from 'react'
import './styles.css'
import Feed from '../Feed/index'
import NavigationBar from '../NavigationBar/index'
import Sidebar from '../Sidebar/index'
import Widget from '../Widget/index'

function Quora() {
    return (
        <div className="quora">
            <NavigationBar/>
            <div className="quora__content">
            <Sidebar/>
            <Feed/>
            <Widget/>
            </div>
            
        </div>
    )
}

export default Quora
