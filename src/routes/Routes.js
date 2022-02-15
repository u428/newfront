import React from 'react'
import { Redirect, Switch } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import Admin from '../pages/admin/Admin'
import Login from '../pages/auth/Login'
import Registration from '../pages/auth/Registration'
import { ProtectedRouteAdmin } from './ProtectedRouteAdmin'
import { ProtectedRouteAuth } from './ProtectedRouteAuth'




function Routes () {
    return (
        <Router>
            <Switch>
                <Redirect exact from={ `/` } to={ `/admin` } />
                <ProtectedRouteAdmin path={ `/admin` } component={ Admin } />
                <ProtectedRouteAuth path={ `/login` } component={ Login } />
                <Redirect exact from={ `/*` } to={ `/admin` } />
            </Switch>
        </Router>

    )
}

export default Routes;
