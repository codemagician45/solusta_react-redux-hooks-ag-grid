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
			path: '/app/attendees/category',
			exact: true,
			component: React.lazy(() => import('./category/Category')),
		},
		{
			path: '/app/attendees/category/speaker',
			component: React.lazy(() => import('./category/NewCategory'))
		},
		{
			path: '/app/attendees/category/organizer',
			component: React.lazy(() => import('./category/NewCategory'))
		},
		{
			path: '/app/attendees/category/participant',
			component: React.lazy(() => import('./category/NewCategory'))
		},
		{
			path: '/app/attendees/category/event-crew',
			component: React.lazy(() => import('./category/NewCategory'))
		},
		{
			path: '/app/attendees/category/media',
			component: React.lazy(() => import('./category/NewCategory'))
		},
		{
			path: '/app/attendees/category/security',
			component: React.lazy(() => import('./category/NewCategory'))
		},
		{
			path: '/app/attendees/category/contractor',
			component: React.lazy(() => import('./category/NewCategory'))
		},
	]
};
