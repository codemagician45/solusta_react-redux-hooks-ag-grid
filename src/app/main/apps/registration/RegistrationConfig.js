import React from 'react';

import Registration from './registration-form/Registration'

export const RegistrationConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/app/registration/registration-forms/:id',
            component: React.lazy(() => import('./ImageEditor/Image'))
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
