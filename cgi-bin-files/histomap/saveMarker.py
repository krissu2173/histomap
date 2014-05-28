#!/usr/bin/python

import cgi, sys, sqlite3 as sqlite
import cgitb; cgitb.enable()

fields = {
"latitude": "int", 
"longitude": "int", 
"location_name": "string",
"importance": "int"
}

formdata = cgi.FieldStorage()


databasefile = "data.db"
con = None

print "Content-type: text/plain"
print


query = "INSERT INTO location ( "

for field in fields:

	if formdata.has_key(field):
		value = formdata[field].value
		if fields[field] == "string":
			value = "\"" + value + "\""
		fields[field] = value
	else:
		print "0"
		sys.exit(1)
		
		

for field in fields.keys()[0:-1]:
	query = query + field + " , "
field = fields.keys()[-1]
query = query + field + " ) VALUES ( "

for field in fields.keys()[0:-1]:
	query = query + fields[field] + " , "
field = fields.keys()[-1]
query = query + fields[field] + " );"

try:
	con = sqlite.connect(databasefile)
	con.execute(query)
	con.commit()
	cur = con.cursor()
	cur.execute("SELECT last_insert_rowid();")
	myId = cur.fetchall()
	name = formdata["location_name"].value
	
	print "[{ \"addedId\" : \" %d \", \"addedName\" : \" %s \"}]" % (myId[0][0],name)
	
except sqlite.Error, e:
	print "Error: %s" % e.args[0]
	print "0"
	sys.exit(1)
finally:
	if con:
		con.close()