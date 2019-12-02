import Registeration from './registeration-form/Registeration'
import PrintModal from './ImageEditor/ImagePrintModal'
import React from 'react';
export const RegisterationConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/app/registeration/registeration-forms/:id',
            component: React.lazy(() => import('./ImageEditor/Image'))
        },
        {
            path     : '/app/registeration/registeration-forms',
            component: Registeration
        },
        {
            path     : '/app/registeration/badges',
            component: PrintModal
        }         
        
    ]
};