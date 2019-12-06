import React from 'react';

import Registration from './registration/Registration';

export const RegistrationConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/app/registration/registration-forms/:id',
            component: React.lazy(() => import('./registration/photo-editor/PhotoBeforePrint'))
        },
        {
            path     : '/app/registration/registration-forms',
            component: Registration
        },
        {
            path     : '/app/registration/category',
            exact    : true,
            component: React.lazy(() => import('./category/Category'))
        },
        {
            path     : '/app/registration/category/speaker',
            component: React.lazy(() => import('./category/components/NewCategory'))
        },
        {
            path     : '/app/registration/category/organizer',
            component: React.lazy(() => import('./category/components/NewCategory'))
        },
        {
            path     : '/app/registration/category/participant',
            component: React.lazy(() => import('./category/components/NewCategory'))
        },
        {
            path     : '/app/registration/category/event-crew',
            component: React.lazy(() => import('./category/components/NewCategory'))
        },
        {
            path     : '/app/registration/category/media',
            component: React.lazy(() => import('./category/components/NewCategory'))
        },
        {
            path     : '/app/registration/category/security',
            component: React.lazy(() => import('./category/components/NewCategory'))
        },
        {
            path     : '/app/registration/category/contractor',
            component: React.lazy(() => import('./category/components/NewCategory'))
        }
    ]
};

export const RegistrationEnvConfig = {
    env: {
        'ServerLink' : 'http://dee-mac.local:8088',
    }, 
    prod: {
        'ServerLink' : 'https://stage02.solusta.me',
    },
}

/**
 * env = 'server' or 'local'
 */
export const env = 'server';
