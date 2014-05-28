#!/usr/bin/python

import cgi, sys, sqlite3 as sqlite
import cgitb; cgitb.enable()

def jsonstr(data):
  if data:
    try:
      data = str(data)
    except Exception, e:
      data = data.encode('UTF-8')
    return str(data)
  else:
    return ""



tables = ['location', 'importance']
location_fields = ['location_id','latitude','longitude', 'location_name', 'importance','create_time']
importance_fields = ['importance_id', 'importance_name']

databasefile = "data.db"
con = None

print "Content-type: text/plain"
print

formdata = cgi.FieldStorage()

if (formdata.has_key("table") and formdata["table"].value in tables):
	try:
		con = sqlite.connect(databasefile)
		cur = con.cursor()
		table = formdata["table"].value
		fields = []
		if (table == tables[0]):
			fields = location_fields
		elif (table == tables[1]):
			fields = importance_fields
		cur.execute('SELECT * FROM ' + table)
		data = cur.fetchall()
		print "["
		for row in data[0:-1]:
			print "{",
			i = 0
			for column in row[0:-1]:
				print "\"" + fields[i] + "\": \"" + jsonstr(column) + "\" , ",
				i = i + 1
			print "\"" + fields[i] + "\": \"" + jsonstr(row[-1]) + "\"",
			print "} ,"
		row = data[-1]
		print "{",
		i = 0
		for column in row[0:-1]:
			print "\"" + fields[i] + "\": \"" + jsonstr(column) + "\" , ",
			i = i + 1
		print "\"" + fields[i] + "\": \"" + jsonstr(row[-1]) + "\"",
		print "}"
		print "]"
	except sqlite.Error, e:
		print "Error: %s" % e.args[0]
		sys.exit(1)
	finally:
		if con:
			con.close()
else:
	print "0"