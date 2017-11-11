# OpenWeatherApp

A simple weather app that uses the [open weather map](http://openweathermap.org/) API. Build with 
[React.js](https://reactjs.org/) and [Hug.py](http://www.hug.rest/).

# Demo

[Open weather app](https://myapps.gallery/)

# Build instructions:

After cloning the repository, go into the repository roo. Use `pwd` and make sure your path is `.../OpenWeatherApp`. 
Now, do this:

---
**Frontend:**

From the repository root:

1.  `cd frontend`
2. `yarn install`
3. `yarn start`
---

---
**Backend:**

From the repository root:

1. `cd backend`
2. `virtualenv backend_env -p /usr/local/bin/python3` 
    <br>
    Note: Your `python3` path might be different. 
    Use a `python3` path as `hug.py` is not compatible with `python2`. 
3. `source backend_env/bin/activate`
4. `hug -f api_server.py`
---