Wurmmaps
========

A pastebin-like tool for annotating maps (from games etc.)
Create a new map, use the edit URL to edit it, give others the view-only url
so they can follow your progress.

Used for the wurm online game to mark areas while searching for boss monsters.

The backend is a django & django-rest-framework app, the frontend is
react + redux.


Live demo
----------

A live version of this code is at https://trewq.pl/wurm/maps


Running
-------

To run the backend tests, go to the `api` directory and do:
`python manage.py test`

To run the development server, use `python manage.py runserver` in the `api`
directory for the backend, and `npm run dev` in the `frontend` directory for
the frontend.

Attached is an example tmuxinator config that runs both, in `tmuxinator.yaml`.


Deployment
----------

The API is a standard django app that you can run using your favorite wsgi server,
eg. `uwsgi -w maps_api.wsgi`. Example settings file is in `maps_api/settings.py`

For the frontend, simply cd to the frontend directory, and run `webpack`, which
will build the app and place it in the `dist/` subdirectory.

For the actual map tiles, there's an example of how to split a big map .png
into tiles in `static/tiles/maketiles.sh`. You'll need `gdal2tiles.py`
(eg. on ubuntu, install the gdal-bin and python-gdal packages).


Notes
-----

The main idea of this is, there's no login and user management, and all access
control is only based on the URLs - when you create a map, you are redirected
to the "edit" url that allows editing, and you can copy the "view-only" url
that doesn't.


TODO
----

* add more kinds of features, not just the reveal square
* add some kind of free-form drawing (overlay canvas+png?)
* make a cleaner division between components & containers in the redux frontend