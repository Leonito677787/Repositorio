from flask import Flask, render_template, request, redirect, url_for
from flask_mysqldb import MySQL
from config import config

ourpathApp = Flask(__name__)
db         = MySQL(ourpathApp) 

@ourpathApp.route('/')
def home():
    return render_template('home.html')

if __name__== '__main__':
    ourpathApp.run(port=8787)