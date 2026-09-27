#!/usr/bin/env python3
"""MovieBazar dev server — sob file no-cache header soho pathay
(browser puraton version cache kore rakhe na).

Chalano:  python3 tools/serve.py [port]     (default 8080)
"""
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
from functools import partial


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def guess_type(self, path):
        t = super().guess_type(path)
        if path.endswith('.js'):
            return 'text/javascript'
        if path.endswith('.svg'):
            return 'image/svg+xml'
        return t

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    handler = partial(NoCacheHandler, directory='.')
    httpd = HTTPServer(('0.0.0.0', port), handler)
    print(f"MovieBazar running → http://localhost:{port}  (no-cache mode)")
    httpd.serve_forever()
