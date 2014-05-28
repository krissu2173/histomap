#!/usr/bin/python

import cgi, sys, sqlite3 as sqlite
import cgitb; cgitb.enable()


formdata = cgi.FieldStorage()


databasefile = "data.db"
con = None

print "Content-type: text/plain"
print


query = "UPDATE location SET "


if (formdata.has_key("location_id") and formdata.has_key("location_name") and formdata.has_key("importance")):
	location_id = formdata["location_id"].value
	location_name = formdata["location_name"].value
	importance = formdata["importance"].value
	
	query = query + "location_name = \"" + location_name +"\" , importance = "+importance + " WHERE location_id = " +location_id 
	
	try:
		con = sqlite.connect(databasefile)
		con.execute(query)
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