from flask import Flask, render_template
app=Flask(__name__)
@app.route("/")
def home():
	return render_template('ImageBol.html')
@app.route("/About")
def about():
	return render_template('AboutUs.html')
app.run(debug=True)
