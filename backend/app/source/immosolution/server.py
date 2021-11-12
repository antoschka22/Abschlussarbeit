import os
from flask_cors import CORS, cross_origin
import connexion
from dao import db
from updateDB import *

abs_file_path = os.path.abspath(os.path.dirname(__file__))
openapi_path = os.path.join(abs_file_path, "../", "../", "openapi")

db.connect(server="database", database="postgres",
            user="postgres", password="Immosolution_Abschlussarbeit")


def update_db():
    return updateDatabase()
update_db()

app = connexion.FlaskApp(
    __name__, specification_dir=openapi_path, options={"swagger_ui": True, "serve_spec": True}
)

# allow cross-origin use of the REST API
CORS(app.app)

app.add_api('specification.yml')
app.run(port=5000)
