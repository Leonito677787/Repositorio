from models.entitite.User import User

class ModelUser:
    @classmethod
    def signin(self, db, usuario):
        try:
            selUsuario = db.connection.cursor()
            selUsuario.execute("SELECT * FROM uisuario WHERE correo = %s", (usuario.correo,))
            u = selUsuario.fetchone()
            if u is not None: 
                return User(u[0], u[1], u[2], User.valideClave(u[3], usuario.clave), u[4])
            else:
                return None
        except Exception as es:
            raise Exception(ex)

    @classmethod
    def signin(self, db, usuario):
        try:
            selUsuario = db.connection.cursor()
            selUsuario.execute("SELECT * FROM usuarios WHERE correo = %s", (usuario.id,))
            u = selUsuario.fetchone()
            if u is not None: 
                return User(u[0], u[1], u[2], (u[3], u[4])
            else:
                return None
        except Exception as es:
            raise Exception(ex)