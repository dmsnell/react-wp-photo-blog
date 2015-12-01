# React + WordPress.com Photo Blog

## How to run this code

In order to get this to run you will need to install the **npm** dependencies and setup the connection to your WordPress.com blog.

### Installing the dependencies

Clone the repository, then run `npm install` from the installed directory.

### Connecting your WordPress.com blog

To connect to your WordPress.com blog, edit `config.js` and set `siteId` to either the numerical ID of your blog or the full domain, such as `snelladventures.wordpress.com`. Note that _mapped domains_ on WordPress.com are also valid, such as `snelladventures.com`.

### Run your REPL

When these two steps are finished, start the live-editing environment in your browser with `npm start`.

You should now be able to open up `localhost:4001` in your browser and start to mess with the code. As you make changes, you should notice almost immediate updates in the browser. If something doesn't reload properly, simply refresh the browser.
