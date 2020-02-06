// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
//apiUrl: ' http://136.244.71.69/'
//apiUrl: ' http://lotapi.cweb.bg/'
//apiUrl: '/' // localhost lifeontime
//fileUplodeUrl: 'http://lotapp.cweb.bg/uploads/'
//fileUplodeUrl: 'http://localhost:8080/uploads/'
export const environment = {
  production: false,
  apiUrl: 'https://lifeontime.co.uk/api/',
  fileUplodeUrl: 'http://localhost:8080/uploads/',
  wp_url: 'https://lifeontime.co.uk/',
  google_calendar__url: 'http://localhost:8080/sync/',
};
