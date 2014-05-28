#!/usr/bin/python

import cgi, sys, sqlite3 as sqlite
import cgitb; cgitb.enable()

fields = {
"location_id": "int",
"attachment_type": "string",
}

formdata = cgi.FieldStorage()


if(formdata.has_key('attachment_fileName')): fields['attachment_fileName'] = "string";
if(formdata.has_key('attachment_name')): fields['attachment_name'] = "string";
if(formdata.has_key('attachment_year')): fields['attachment_year'] = "int";
if(formdata.has_key('attachment_type')): fields['attachment_type'] = "string";
if(formdata.has_key('attachment_description')): fields['attachment_description'] = "string";
if(formdata.has_key('attachment_link')): fields['attachment_link'] = "string";

databasefile = "data.db"
con = None

print "Content-type: text/plain"
print


query = "INSERT INTO attachment ( "

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
	print "1"
	
except sqlite.Error, e:
	print "Error: %s" % e.args[0]
	print "0"
	sys.exit(1)
finally:
	if con:
		con.close()