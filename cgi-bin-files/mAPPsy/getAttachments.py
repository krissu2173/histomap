#!/usr/bin/python

def jsonstr(data):
  if data:
    try:
      data = str(data)
    except Exception, e:
      data = data.encode('UTF-8')
    return str(data)
  else:
    return ""




import cgi, sys, sqlite3 as sqlite
import cgitb; cgitb.enable()

attachment_fields = ['attachment_id','attachment_fileName','attachment_name', 'attachment_year', 'attachment_type','attachment_description','attachment_link','create_time','location_id']

databasefile = "data.db"
con = None

print "Content-type: text/plain"
print

formdata = cgi.FieldStorage()

if (formdata.has_key("location_id")):
	try:
		location_id = formdata["location_id"].value
		con = sqlite.connect(databasefile)
		cur = con.cursor()
		fields = attachment_fields
		cur.execute('SELECT * FROM attachment WHERE location_id = '+location_id+' ORDER BY attachment_year DESC, create_time DESC;')
		data = cur.fetchall()
		data
		
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