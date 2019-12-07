import React from 'react';

export const RegistrationConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/app/registration/registration',
			exact: true,
			component: React.lazy(() => import('./registration/Registration')),
		},
		{
			path: '/app/registration/registration/:id',
			component: React.lazy(() => import('./registration/PhotoEditor')),
		},
		{
			path: '/app/registration/category',
			exact: true,
			component: React.lazy(() => import('./category/Category')),
		},
		{
			path: '/app/registration/category/speaker',
			component: React.lazy(() => import('./category/NewCategory'))
		},
		{
			path: '/app/registration/category/organizer',
			component: React.lazy(() => import('./category/NewCategory'))
		},
		{
			path: '/app/registration/category/participant',
			component: React.lazy(() => import('./category/NewCategory'))
		},
		{
			path: '/app/registration/category/event-crew',
			component: React.lazy(() => import('./category/NewCategory'))
		},
		{
			path: '/app/registration/category/media',
			component: React.lazy(() => import('./category/NewCategory'))
		},
		{
			path: '/app/registration/category/security',
			component: React.lazy(() => import('./category/NewCategory'))
		},
		{
			path: '/app/registration/category/contractor',
			component: React.lazy(() => import('./category/NewCategory'))
		},
		{
			path: '/app/registration/badges',
			component: React.lazy(() => import('./badge/Badge')),
		}
	]
};
