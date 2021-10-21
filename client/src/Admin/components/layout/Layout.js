import React from 'react'

import './layout.css'

import Sidebar from '../sidebar/Sidebar'

import Routes from 'Admin/index'

import Topnav from 'Admin/components/topnav/TopNav'

import { BrowserRouter, Route, useRouteMatch } from 'react-router-dom'


const Layout = () => {

    return (
        <BrowserRouter>
            <Route render={(props) => (
                <div>
                    <Sidebar {...props}/>
                    <div className="layout__content">
                        <Topnav/>
                        <div className="layout__content-main">
                            <Routes/>
                        </div>
                    </div>
                </div>
            )}/>
        </BrowserRouter>
    )
}

export default Layout
