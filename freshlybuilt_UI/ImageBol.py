from flask import Flask, render_template,request,redirect,url_for,jsonify,json,flash
import os
from utils import preprocess,convert_audio
from freshlybuiltimagebol import bhasha_codes
from werkzeug.utils import secure_filename

app=Flask(__name__)

app.config['ALLOWED_IMAGE_EXTENSIONS']=['PNG','JPG','JPEG','GIF']

app.config["UPLOADED_PHOTOS_PATH"]=os.path.join('static','image','uploads')
app.config["AUDIO_FILES"]=os.path.join('static','audio')

@app.route('/home')
@app.route("/", methods=["GET","POST"])
def home():
	languages=bhasha_codes.bhasha_kosh.values()
	return render_template('ImageBol.html',languages=languages)

@app.route("/About")
def about():
	return render_template('AboutUs.html')


def allowed_image(imgname):
    if not '.' in imgname:
        return False
    ext=imgname.split('.')[-1]
    if ext.upper() in app.config['ALLOWED_IMAGE_EXTENSIONS']:
        return True
    else:
        return False




@app.route("/upload-image", methods=["POST"])
def upload_image():
	if request.method == "POST":
		if request.files:
			image = request.files["original-image"]
			if image.filename=="":
				flash('Image must have a filename!!')
			if not allowed_image(image.filename):
				flash('File not supported!!')
			language = request.form.get('languages')
			img_save_path=os.path.join(app.config["UPLOADED_PHOTOS_PATH"],image.filename)
			image.save(img_save_path)
			preprocess(image.filename)
			imgname=secure_filename(image.filename)
			audio_file=convert_audio(imgname,language)
			#return show_image(image=imgname,text='yo.mp3')
			#return redirect(url_for('show_image',image=imgname,text='yo.mp3')) 
			return jsonify({'image':imgname,'text' : audio_file})

		return jsonify({'error' : 'Something went wrong!!'})

'''
@app.route('/show_image/<image>/<text>',methods=["GET", "POST"])
def show_image(image,text):
	return render_template('ImageBol.html',image=image, text='yo.mp3')
'''
app.run(debug=True)
