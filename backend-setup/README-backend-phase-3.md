```bash
npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string
```
```bash
npx dotenv sequelize db:migrate
```
```bash
npx dotenv sequelize db:migrate:undo
```
```bash
sqlite3 db/dev.db ".schema Users"
```
```bash
npx sequelize seed:generate --name demo-user
```
```bash
npx dotenv sequelize db:seed:all
```
```bash
npx dotenv sequelize db:seed:undo
```
```bash
npx dotenv sequelize db:seed:undo:all
```
```bash
sqlite3 db/dev.db 'SELECT * FROM "Users"'
```
## User Auth Middlewares

There are three functions in this section that will aid you in authentication.

Create a folder called `utils` in your `backend` folder. Inside that folder, add
a file named `auth.js` to store the auth helper functions.

At the top of the file, add the following imports:

```js
// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;
```

### `setTokenCookie`

This first function is setting the JWT cookie after a user is logged in or
signed up. It takes in the response and the session user and generates a JWT
using the imported secret. It is set to expire in however many seconds you
set on the `JWT_EXPIRES_IN` key in the `.env` file. The payload of the JWT will
be the user's `id`, `username`, and `email` attributes. Do NOT add the user's
`hashedPassword` attribute to the payload. After the JWT is created, it's set to
an HTTP-only cookie on the response as a `token` cookie.

```js
// backend/utils/auth.js
// ...

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
  // Create the token.
  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
  };
  const token = jwt.sign(
    { data: safeUser },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax"
  });

  return token;
};
```

This function will be used in the login and signup routes later.

### `restoreUser`

Certain authenticated routes will require the identity of the current session
user. You will create and utilize a middleware function called restoreUser that
will restore the session user based on the contents of the JWT cookie.

Create a middleware function that will verify and parse the JWT's payload and
search the database for a `User` with the id in the payload. The default scope
on the `User` model, however, prevents the `hashedPassword`, `email`,
`createdAt`, and `updatedAt` attributes from returning from that search. You
want to include the `email`, `createdAt`, and `updatedAt` attributes to be
returned in the search (but not `hashedPassword`).

If there is a `User` found in the search, then save the user to a key of
`user` onto the Request (`req.user`). If there is an error verifying the JWT or
a `User`cannot be found with the `id` in the JWT payload, then clear the `token`
cookie from the response and set `req.user` to `null`.

```js
// backend/utils/auth.js
// ...

const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.findByPk(id, {
        attributes: {
          include: ['email', 'createdAt', 'updatedAt']
        }
      });
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};
```

The `restoreUser` middleware will be connected to the API router so that all API
route handlers will check if there is a current user logged in or not.

### `requireAuth`

The last authentication middleware to add is for requiring a session user to be
authenticated before accessing a route.

Create an Express middleware called `requireAuth`. Define this middleware as an
array with the `restoreUser` middleware function you just created as the first
element in the array. This will ensure that if a valid JWT cookie exists, the
session user will be loaded into the `req.user` attribute. The second middleware
will check `req.user` and will go to the next middleware if there is a session
user present there. If there is no session user, then an error will be created
and passed along to the error-handling middlewares.

```js
// backend/utils/auth.js
// ...

// If there is no current user, return an error
const requireAuth = function (req, _res, next) {
  if (req.user) return next();

  const err = new Error('Authentication required');
  err.title = 'Authentication required';
  err.errors = { message: 'Authentication required' };
  err.status = 401;
  return next(err);
}
```

`requireAuth` will be connected directly to route handlers where there needs to
be a current user logged in for the actions in those route handlers.

Finally, export all the functions at the bottom of the file.

```js
// backend/utils/auth.js
// ...

module.exports = { setTokenCookie, restoreUser, requireAuth };
```

### Test User Auth Middlewares

Let's do some testing! It's always good to test your code anytime you have an
opportunity to do it. Testing at the very end is not a good idea because it will
be hard to pinpoint the location of the error in your code.

Add a test route in your `backend/routes/api/index.js` file that will test the
`setTokenCookie` function by getting the demo user and calling `setTokenCookie`.

```js
// backend/routes/api/index.js
// ...

// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

// ...
```

Go to [http://localhost:8000/api/set-token-cookie] and see if there is a `token`
cookie set in your browser's DevTools. If there isn't, then check your backend
server logs in the terminal where you ran `npm start`. Also, check the syntax
of your `setTokenCookie` function as well as the test route.

Import the `restoreUser` middleware and connect it to the router before any
other middleware or route handlers are connected to the router.

Next, add a test route in your `backend/routes/api/index.js` file that will test
the `restoreUser` middleware and check whether or not the `req.user` key has
been populated by the middleware properly.

```js
// backend/routes/api/index.js
// ...

// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

// ...
```

Go to [http://localhost:8000/api/restore-user] and see if the response has the
demo user information returned as JSON. Then, remove the `token` cookie manually
in your browser's DevTools and refresh. The JSON response should be empty.

If this isn't the behavior, then check your backend server logs in the terminal
where you ran `npm start` as well as the syntax of your `restoreUser` middleware
and test route.

To set the `token` cookie back, just go to the `GET /api/set-token-cookie` route
again: [http://localhost:8000/api/set-token-cookie].

Lastly, test your `requireAuth` middleware by adding a test route in your
`backend/routes/api/index.js` file. If there is no session user, the route will
return an error. Otherwise it will return the session user's information.

```js
// backend/routes/api/index.js
// ...

router.use(restoreUser);

// ...

// GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

// ...
```

Set the `token` cookie back by accessing the `GET /api/set-token-cookie` route
again: [http://localhost:8000/api/set-token-cookie].

Go to [http://localhost:8000/api/require-auth] and see if the response has the
demo user's information returned as JSON. Then, remove the `token` cookie
manually in your browser's DevTools and refresh. The JSON response should now
be an `"Unauthorized"` error.

If this isn't the behavior, then check your backend server logs in the terminal
where you ran `npm start` as well as the syntax of your `requireAuth` middleware
and test route.

To set the `token` cookie back, just go to the `GET /api/set-token-cookie` route
again: [http://localhost:8000/api/set-token-cookie].

**Once you are satisfied with the test results, you can remove all code for
testing the user auth middleware routes.**

**Make sure to keep the `restoreUser` middleware connected before any other
middleware or route handlers are connected to the router.** This will allow
all route handlers connected to this router to retrieve the current user on the
Request object as `req.user`. If there is a valid current user session, then
`req.user` will be set to the `User` in the database. If there is NO valid
current user session, then `req.user` will be set to `null`.

Your `backend/routes/api/index.js` should look something like this:

```js
// backend/routes/api/index.js
const router = require("express").Router();
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

module.exports = router;
```

## Commit your code

Now is a good time to commit and push your code to GitHub!

Here's a recommendation for what to write as your commit message:
"Add User authentication Express middleware"

## Merge your feature branch into your dev branch

Once you thoroughly test that your `auth-setup` feature branch is working,
merge the branch into the `dev` branch.

To do this, first checkout the `dev` branch:

```bash
git checkout dev
```

Then, make sure you have the latest changes in the development branch from
your remote repository in your local repository (this is useful when
collaborating with other developers):

```bash
git pull origin dev
```

Then, merge the feature branch into the `dev` branch:

```bash
git merge auth-setup
```

Finally, push your changes to the development branch to the remote repository:

```bash
git push origin dev
```

[helmet on the `npm` registry]: https://www.npmjs.com/package/helmet
[Express error-handling middleware]: https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling
[model-level validations]: https://sequelize.org/master/manual/validations-and-constraints.html
[model scoping]: https://sequelize.org/master/manual/scopes.html
[Content Security Policy]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
[Cross-Site Scripting]: https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting
[crossOriginResourcePolicy]: https://www.npmjs.com/package/helmet
[http://localhost:8000/hello/world]: http://localhost:8000/hello/world
[http://localhost:8000/not-found]: http://localhost:8000/not-found
[http://localhost:8000/api/set-token-cookie]: http://localhost:8000/api/set-token-cookie
[http://localhost:8000/api/restore-user]: http://localhost:8000/api/restore-user
[http://localhost:8000/api/require-auth]: http://localhost:8000/api/require-auth
[http://localhost:8000/api/session]: http://localhost:8000/api/session
[http://localhost:8000/api/csrf/restore]: http://localhost:8000/api/csrf/restore
