from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
# from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app=Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})
# CORS(app)

# app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:root@localhost/motordreamers1'
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://hmollis:clave@hmollis.mysql.pythonanywhere-services.com/hmollis$Proyecto'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db=SQLAlchemy(app)
ma=Marshmallow(app)

class Escuderia(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    nombre=db.Column(db.String(100))
    base=db.Column(db.String(100))
    presidente=db.Column(db.String(100))
    director=db.Column(db.String(100))
    dir_tecnico=db.Column(db.String(100))
    primera_participacion=db.Column(db.Integer)
    chasis=db.Column(db.String(100))
    motor=db.Column(db.String(100))
    neumaticos=db.Column(db.String(100))
    mejor_vuelta=db.Column(db.Integer)
    pole_positions=db.Column(db.Integer)
    mundiales=db.Column(db.Integer)
    logo=db.Column(db.String(400))
    def __init__(self,nombre,base,presidente,director,dir_tecnico,primera_participacion,chasis,motor,neumaticos,mejor_vuelta,pole_positions,mundiales,logo):
        self.nombre=nombre
        self.base=base
        self.presidente=presidente
        self.director=director
        self.dir_tecnico=dir_tecnico
        self.primera_participacion=primera_participacion
        self.chasis=chasis
        self.motor=motor
        self.neumaticos=neumaticos
        self.mejor_vuelta=mejor_vuelta
        self.pole_positions=pole_positions
        self.mundiales=mundiales
        self.logo=logo
    
with app.app_context():
    db.create_all()

class EscuderiaSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','base','presidente','director','dir_tecnico','primera_participacion','chasis','motor','neumaticos','mejor_vuelta','pole_positions','mundiales','logo')

escuderia_schema=EscuderiaSchema()
escuderias_schema=EscuderiaSchema(many=True)

@app.route('/escuderias',methods=['GET'])
def get_escuderias():
    all_escuderias=Escuderia.query.all()
    result=escuderias_schema.dump(all_escuderias)
    return jsonify(result)

@app.route('/escuderias/<id>', methods=['GET'])
def get_escuderia(id):
    escuderia=Escuderia.query.get(id)
    return escuderia_schema.jsonify(escuderia)

@app.route('/escuderias/<id>', methods=['DELETE'])
def delete_escuderia(id):
    escuderia=Escuderia.query.get(id)
    db.session.delete(escuderia)
    db.session.commit()
    return escuderia_schema.jsonify(escuderia)

@app.route('/escuderias',methods=['POST'])
def create_escuderia():
    nombre=request.json['nombre']
    base=request.json['base']
    presidente=request.json['presidente']
    director=request.json['director']
    dir_tecnico=request.json['dir_tecnico']
    primera_participacion=request.json['primera_participacion']
    chasis=request.json['chasis']
    motor=request.json['motor']
    neumaticos=request.json['neumaticos']
    mejor_vuelta=request.json['mejor_vuelta']
    pole_positions=request.json['pole_positions']
    mundiales=request.json['mundiales']
    logo=request.json['logo']

    new_escuderia=Escuderia(nombre,base,presidente,director,dir_tecnico,primera_participacion,chasis,motor,neumaticos,mejor_vuelta,pole_positions,mundiales,logo)
    db.session.add(new_escuderia)
    db.session.commit()
    return escuderia_schema.jsonify(new_escuderia)

@app.route('/escuderias/<id>',methods=['PUT'])
def update_escuderia(id):
    escuderia=Escuderia.query.get(id)

    nombre=request.json['nombre']
    base=request.json['base']
    presidente=request.json['presidente']
    director=request.json['director']
    dir_tecnico=request.json['dir_tecnico']
    primera_participacion=request.json['primera_participacion']
    chasis=request.json['chasis']
    motor=request.json['motor']
    neumaticos=request.json['neumaticos']
    mejor_vuelta=request.json['mejor_vuelta']
    pole_positions=request.json['pole_positions']
    mundiales=request.json['mundiales']
    logo=request.json['logo']

    escuderia.nombre=nombre
    escuderia.base=base
    escuderia.presidente=presidente
    escuderia.director=director
    escuderia.dir_tecnico=dir_tecnico
    escuderia.primera_participacion=primera_participacion
    escuderia.chasis=chasis
    escuderia.motor=motor
    escuderia.neumaticos=neumaticos
    escuderia.mejor_vuelta=mejor_vuelta
    escuderia.pole_positions=pole_positions
    escuderia.mundiales=mundiales
    escuderia.logo=logo

    db.session.commit()
    return escuderia_schema.jsonify(escuderia)

if __name__=='__main__':
     app.run(debug=True, port=5000)
