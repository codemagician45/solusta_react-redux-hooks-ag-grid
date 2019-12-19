const navigationConfig = [
    {
        'id': 'applications',
        'title': 'Applications',
        'type': 'group',
        'icon': 'apps',
        'children': [
            {
                'id': 'attendees',
                'title': 'Attendees',
                'type': 'collapse',
                'icon': 'how_to_reg',
                'children': [
                    {
                        'id': 'registration',
                        'title': 'Registration',
                        'type': 'item',
                        'url': '/app/attendees/registration'
                    },
                    {
                        'id': 'badges',
                        'title': 'Badges',
                        'type': 'item',
                        'url': '/app/attendees/badges'
                    },
                    {
                        'id': 'collection',
                        'title': 'Collection',
                        'type': 'item',
                        'url': '/app/attendees/collection'
                    },
                    {
                        'id': 'security-approval',
                        'title': 'Security Approval',
                        'type': 'item',
                        'url': '/app/attendees/security-approval'
                    },
                    {
                        'id': 'category',
                        'title': 'Attendee Registration',
                        'type': 'item',
                        'url': '/app/attendees/attendee'
                    },
                ]
            },
            {
                'id': 'workshop',
                'title': 'Workshop',
                'type': 'collapse',
                'icon': 'work',
                'children': [
                    {
                        'id': 'workshop-forms',
                        'title': 'Workshop-Forms',
                        'type': 'item',
                        'url': '/app/workshop/workshop-forms'
                    },
                    {
                        'id': 'workshop-accreditations',
                        'title': 'Workshop Accreditations',
                        'type': 'item',
                        'url': '/app/workshop/workshop-accreditations'
                    },
                ]
            },
        ]
    },
];

export default navigationConfig;
