const PROXY_CONFIG = [
    {
        context: [
            "/auth/login",
            "/auth/register",
            "/auth/logout",
            "/me",
            "/api/aplicationtypes",
            "/api/values",
            "/api/goals/",
            "/api/me/goals",
            "/api/me/goals/completed",
            "/api/me/goals/fromideas",
            "/api/me/goals/rate",
            "/api/tasks",
            "/api/tasks/",
            "/api/me/tasks",
            "/api/me/tasks/completed",
            "/api/me/tasks/dayscompletelastaction",
            "/api/ideas",
            "/api/ideas/",
            "/api/me/ideas",
        ],
        target: "http://136.244.71.69",
        secure: false
    }
]

module.exports = PROXY_CONFIG;
//,"proxyConfig": "proxy.conf.ts"
// {

//     "/api/me/tasks/": {
//         "target": "http://136.244.71.69/",
//         "secure": false
//     },
//     "/api/me/tasks/completed/": {
//         "target": "http://136.244.71.69",
//         "secure": false
//     },
//     "/api/me/tasks/dayscompletelastaction/": {
//         "target": "http://136.244.71.69",
//         "secure": false
//     },
//     "/api/me/goals/": {
//         "target": "http://136.244.71.6",
//         "secure": false
//     },
//     "/api/me/goals/completed/": {
//         "target": "http://136.244.71.69",
//         "secure": false
//     },
//     "/api/me/goals/fromideas/": {
//         "target": "http://136.244.71.69",
//         "secure": false
//     },
//     "/api/me/goals/rate/": {
//         "target": "http://136.244.71.69",
//         "secure": false
//     },
//     "/api/goals/": {
//         "target": "http://136.244.71.69/",
//         "secure": false
//     },
//     "/api/tasks/": {
//         "target": "http://136.244.71.69/",
//         "secure": false
//     },
//     "/api/ideas/": {
//         "target": "http://136.244.71.69/",
//         "secure": false
//     },
//     "/api/me/goals/bycategoryall": {
//         "target": "http://136.244.71.69/",
//         "secure": false
//     },

//     "/api/me/ideas/*": {
//         "target": "http://136.244.71.69/",
//         "secure": false
//     },
//     "/api/goals/*": {
//         "target": "http://136.244.71.69/",
//         "secure": false
//     },
//     "/api/tasks/*": {
//         "target": "http://136.244.71.69/",
//         "secure": false
//     },
//     "/api/ideas/*": {
//         "target": "http://136.244.71.69/",
//         "secure": false
//     }
// }
