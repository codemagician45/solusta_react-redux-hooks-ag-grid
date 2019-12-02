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
        }        
        
    ]
};