from flask import Flask, render_template, request, redirect, url_for

ourpathApp = Flask(__name__)

@ourpathApp.route('/')
def home():
    return render_template('home.html')

if __name__== '__main__':
    ourpathApp.run(port=8787,debug=True)