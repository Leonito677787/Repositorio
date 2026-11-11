from flask import Flask, render_template, request, redirect, flash, url_for, flash
from flask_mysqldb import MySQL
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from config import config
from werkzeug.security import generate_password_hash
from models.entities.User import User
from models.ModelUser import ModelUser


ourpathApp = Flask(__name__)
ourpathApp.config.from_object(config['development'])
db         = MySQL(ourpathApp) 
adminUsuarios = LoginManager(ourpathApp)

@adminUsuarios.user_loader
def agregarUsuario(id):
    return ModelUser.get_by_id(db, id)

@ourpathApp.route('/')
def home():
    return render_template('home.html')

@ourpathApp.route('/signup', methods=['GET','POST'])
def signup():
     if request.method == 'POST':
        nombre = request.form['nombre']
        correo = request.form['correo']
        clave   = request.form['clave']
        claveCifrada = generate_password_hash(clave)
        regUsuario = db.connection.cursor()
        regUsuario.execute("INSERT INTO usuario (nombre,correo,clave) VALUES (%s, %s, %s)", (nombre,correo,claveCifrada))

        db.connection.commit()
        regUsuario.close()
        return redirect(url_for('home'))



@ourpathApp.route('/signin', methods=['GET','POST'])
def signin():
    if request.method == 'POST':
        usuario = User(0,None,request.form['correo'],request.form['clave'], None)
        usuarioAutenticado = ModelUser.signin(db,usuario)
        if usuarioAutenticado is not None:
            if usuarioAutenticado.clave:
                login_user(usuarioAutenticado)
                if usuarioAutenticado.perfil == 'A':
                    return redirect (url_for('home_admin'))
                else:
                    return redirect (url_for('home_user'))
            else:
                flash('Contraseña Incorrecta')
                redirect(url_for('home'))
        else:
            flash('Usuario inexistente')
            redirect(url_for('home'))
    else:
        render_template('home.html')   

@ourpathApp.route('/signout', methods=['GET','POST'])
def signout():
    logout_user()
    return redirect(url_for('home'))

@ourpathApp.route('/home_admin', methods=['GET','POST'])
@login_required
def home_admin():
    return render_template('admin.html')

@ourpathApp.route('/home_user', methods=['GET','POST'])
@login_required
def home_user():
    return render_template('home_user.html')

@ourpathApp.route('/sUsuario', methods=['GET','POST'])
@login_required
def sUsuario():
    if current_user.perfil == 'A':
        selUsuario = db.connection.cursor()
        selUsuario.execute("SELECT * FROM usuario")
        u = selUsuario.fetchall()
        selUsuario.close()
        return render_template('users.html', usuarios = u)
    else:
        return render_template('home.html') 

@ourpathApp.route('/uUsuario/<int:id>', methods=['GET','POST'])
@login_required
def uUsuario(id):
    if current_user.perfil == 'A':
        nombre = request.form['nombre']
        correo = request.form['correo']
        perfil = request.form['perfil']
        actUsuario = db.connection.cursor()
        actUsuario.execute("UPDATE usuario SET nombre=%s, correo=%s, perfil=%s WHERE id=%s", (nombre, correo, perfil, id))
        actUsuario.close()
        flash('Registro actualizado correctamente')
        return redirect(url_for('sUsuario'))
    else:
        return render_template('home.html')

@ourpathApp.route('/iUsuario', methods=['GET','POST'])
@login_required
def iUsuario():
    if current_user.perfil == 'A':
        nombre = request.form['nombre']
        correo = request.form['correo']
        perfil = request.form['perfil']
        clave = request.form['clave']
        claveCifrada = generate_password_hash(clave)
        regUsuario = db.connection.cursor()
        regUsuario.execute("INSERT INTO usuario (nombre,correo,perfil,clave) VALUES (%s, %s, %s, %s)", (nombre,correo,perfil,claveCifrada))
        db.connection.commit()
        flash('Registro registrado satisfactoriamente ;)')
        regUsuario.close()
        return redirect(url_for('iUsuario'))
    else:
        return render_template('home.html')


@ourpathApp.route('/dUsuario/<int:id>', methods=['GET','POST'])
@login_required
def dUsuario(id):
    if current_user.perfil == 'A':
        delUsuario = db.connection.cursor()
        delUsuario.execute("DELETE FROM usuario WHERE id=%s", (id,))
        db.connection.commit()
        delUsuario.close()
        flash('Registro eliminado correctamente')
        return redirect(url_for('sUsuario'))
    else:
        return render_template('home.html')

if __name__== '__main__':   
    ourpathApp.run(port=8787) 

