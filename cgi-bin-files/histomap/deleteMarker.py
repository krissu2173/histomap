#!/usr/bin/python

import cgi, sys, sqlite3 as sqlite
import cgitb; cgitb.enable()

databasefile = "data.db"
con = None

print "Content-type: text/plain"
print

formdata = cgi.FieldStorage()


if (formdata.has_key("location_id")):
	location_id = formdata["location_id"].value
	try:
		con = sqlite.connect(databasefile)
		con.execute('DELETE FROM location where location_id = ' + location_id)
		con.commit()
		print "1"
	except sqlite.Error, e:
		print "Error: %s" % e.args[0]
		sys.exit(1)
	finally:
		if con:
			con.close()
else:
	print "0"