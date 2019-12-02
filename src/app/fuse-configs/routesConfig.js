import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import { RegisterationConfig } from 'app/main/apps/registeration/RegisterationConfig';
import {LoginConfig} from 'app/main/login/LoginConfig';
import {LogoutConfig} from 'app/main/logout/LogoutConfig';

const routeConfigs = [
    RegisterationConfig,
    LoginConfig,
    LogoutConfig,
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
            // default url
        {
            path     : '/',
            exact    : true,
            component: () => (localStorage.getItem('jwt_access_token'))? <Redirect to="/app/registeration/registeration-forms"/> : <Redirect to="/login"/>
        },
        {
            component: () => <Redirect to="/pages/errors/error-404"/>
        }
];

export default routes;

