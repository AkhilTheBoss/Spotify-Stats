from flask import Flask
from views import MyPages

app = Flask(__name__)
app.register_blueprint(MyPages, url_prefix = "/")

if __name__ == '__main__':
    app.run(debug = True, port = 8000)
