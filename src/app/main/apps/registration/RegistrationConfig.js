import React from 'react';

export const RegistrationConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/app/attendees/registration',
			exact: true,
			component: React.lazy(() => import('./registration/Registration')),
		},
		{
			path: '/app/attendees/registration/:id',
			component: React.lazy(() => import('./registration/RegistrationPhotoEditor')),
		},
		{
			path: '/app/attendees/badges',
			component: React.lazy(() => import('./badge/Badge')),
		},
		{
			path: '/app/attendees/collection',
			component: React.lazy(() => import('./collection/Collection')),
		},
		{
			path: '/app/attendees/security-approval',
			component: React.lazy(() => import('./security-approval/SecurityApproval')),
		},
		{
			path: '/app/attendees/attendee',
			exact: true,
			component: React.lazy(() => import('./attendee-registration')),
		},
		{
			path: '/app/attendees/attendee/speaker',
			component: React.lazy(() => import('./attendee-registration/Attendee'))
		},
		{
			path: '/app/attendees/attendee/organizer',
			component: React.lazy(() => import('./attendee-registration/Attendee'))
		},
		{
			path: '/app/attendees/attendee/participant',
			component: React.lazy(() => import('./attendee-registration/Attendee'))
		},
		{
			path: '/app/attendees/attendee/event-crew',
			component: React.lazy(() => import('./attendee-registration/Attendee'))
		},
		{
			path: '/app/attendees/attendee/media',
			component: React.lazy(() => import('./attendee-registration/Attendee'))
		},
		{
			path: '/app/attendees/attendee/security',
			component: React.lazy(() => import('./attendee-registration/Attendee'))
		},
		{
			path: '/app/attendees/attendee/contractor',
			component: React.lazy(() => import('./attendee-registration/Attendee'))
		},
	]
};
