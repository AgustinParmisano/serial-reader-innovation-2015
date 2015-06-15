import urllib2
from BaseHTTPServer import HTTPServer
from BaseHTTPServer import BaseHTTPRequestHandler
import os
from mimetypes import types_map
import json

class MyRequestHandler (BaseHTTPRequestHandler) :
    
    def do_GET(self) :
        response = urllib2.urlopen("http://192.168.0.9:8003/data")
        data = json.load(response)
        if self.path == "/data" :
            #send response code:
            self.send_response(200)
            #send headers:
            self.send_header("Content-type:", "text/html")
            # send a blank line to end headers:
            self.wfile.write("\n")

            #send response:
            json.dump(data, self.wfile)
        else:
            if self.path == "favico.ico":
                return
            try:
                fname,ext = os.path.splitext(self.path)
                print os.getcwd()
                with open(os.getcwd() + self.path) as f:
                    self.send_response(200)
                    self.send_header('Content-type', types_map[ext])
                    self.end_headers()
                    self.wfile.write(f.read())
                return
            except IOError:
                self.send_error(404)

    """
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin','*')
        http.server.SimpleHTTPRequestHandler.end_headers(self)
    """
server = HTTPServer(("", 8003), MyRequestHandler)

server.serve_forever()
