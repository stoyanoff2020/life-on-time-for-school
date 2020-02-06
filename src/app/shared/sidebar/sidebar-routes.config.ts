import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '/values/all', title: 'Values', icon: 'ft-target', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: []
    },
    {
        path: '/ideas', title: 'My ideas', icon: 'ft-clipboard', class: '', badge: '', badgeClass: '', isExternalLink: false,
        submenu: []
    },
    { path: '/calendar', title: 'Calendar', icon: 'ft-calendar', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    {
        path: '/progress-dashboard', title: 'Progress', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    { path: '/help', title: 'Help', icon: 'ft-life-buoy', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
];
