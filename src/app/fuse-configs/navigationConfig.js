const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                // 'id'   : 'example-component',
                // 'title': 'dowkdwodkwo',
                // 'type' : 'item',
                // 'icon' : 'whatshot',
                // 'url'  : '/example'
                'id'      : 'registeration',
                'title'   : 'Registeration',
                'type'    : 'collapse',
                'icon'    : 'how_to_reg',
                'children': [
                    {
                        'id'   : 'registration-forms',
                        'title': 'Registration Forms',
                        'type' : 'item',
                        'url'  : '/app/registeration/registeration-forms'
                    },
                    {
                        'id'   : 'badges',
                        'title': 'Badges',
                        'type' : 'item',
                        'url'  : '/app/registeration/badges'
                    },
                    {
                        'id'   : 'accreditation',
                        'title': 'Accreditation',
                        'type' : 'item',
                        'url'  : '/app/registeration/accreditation'
                    },
                    
                ]
            },
            {
                'id'      : 'workshop',
                'title'   : 'Workshop',
                'type'    : 'collapse',
                'icon'    : 'work',
                'children': [
                    {
                        'id'   : 'workshop-forms',
                        'title': 'Workshop-Forms',
                        'type' : 'item',
                        'url'  : '/app/workshop/workshop-forms'
                    },
                    {
                        'id'   : 'workshop-accreditations',
                        'title': 'Workshop Accreditations',
                        'type' : 'item',
                        'url'  : '/app/workshop/workshop-accreditations'
                    },    
                ]
            }
        ]
    },
];

export default navigationConfig;
