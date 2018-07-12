/*
 Documentation:

 The api for interacting with the server is declared here. It's defined declaratively, which should
 make it easier to alter and understand. The top level of the configuration object is a division of
 api endpoints by "topic" -- so API calls related to users might go in the 'users' category, API
 calls related to the events dashboard might go under 'events' etc. Within each topic is a list of
 endpoint definitions that will be transformed into API method calls when the app starts up.

 There are three ways of defining an API endpoint:
 - A string
 - An object
 - A function

 String definitions will generate a new API endpoint with a GET method and that requires an
 authentication header.

 Object definitions allow you to specifcy the route, method, and whether or not the API call should
 require an auth header. By default, the method is GET and authentication is required.

 Function definitions are an 'escape hatch' that let you make an arbitrary request with whatever
 behavior you want to include. When an API method defined with a function is called, it is passed
 a request function for the first argument, any parameters passed in, and any request body. The
 only expectation is that the return value will be a Promise over the result.

 You can call an API endpoint by pulling the 'api' service out of the global system. For example, to
 fetch the current users, you can call:

 system.api.users.fetchCurrentUser({ id: currentUserId })

 This requires a reference to the system global, which is available in route handlers and thunk
 actions. This *should* be the only place you need to call out to the API. In the development
 environment, for testing purposes, the `system` global is exposed on the global object. So you can
 run the above line in the console and it will return a promise over the current user object.
 */

// All the API calls the ApiService/RequestService knows about:
export default {
  spreadsheets: {
    fetchSheet: {
      url: 'spreadsheets.google.com/feeds/cells/:key/od6/public/basic',
      method: 'JSONP',
      defaultParams:{alt: 'json-in-script'}
    }
  }
}
