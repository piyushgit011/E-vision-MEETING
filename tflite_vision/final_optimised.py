
# from keras.models import load_model
# from time import sleep
import math
import mediapipe as mp
import tensorflow as tf
import requests
import json
from tensorflow.keras.utils import img_to_array
# from keras.preprocessing import image
import cv2
import numpy as np
from flask import Flask, render_template, Response, request
import os
mp_face_mesh = mp.solutions.face_mesh
LEFT_EYE =[362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398]
RIGHT_EYE=[33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]
LEFT_IRIS = [474, 475, 476, 477]
RIGHT_IRIS = [469, 470, 471, 472]
L_H_LEFT = [33]  # right eye right most landmark
L_H_RIGHT = [133]  # right eye left most landmark
R_H_LEFT = [362]  # left eye right most landmark
R_H_RIGHT = [263]  # left eye left most landmark
L_E_TOP = [159]
L_E_BOT = [145]
R_E_TOP = [386]
R_E_BOT = [252]
def dist(point1, point2):
    x1, y1 = point1.ravel()
    x2, y2 = point2.ravel()
    distance = math.sqrt((x2-x1)**2 + (y2-y1)**2)
    return distance
def iris_position(iris_center, right_point, left_point):
    center_to_right_dist = dist(iris_center, right_point)
    total_distance = dist(right_point, left_point)
    ratio = center_to_right_dist/total_distance
    iris_position = ""
    # if ratio<2.67:
    #     iris_position="right"
    if ratio>2.5 and ratio<=2.99:
        iris_position="focused"    
    else:
        iris_position = "not focused"
    return iris_position, ratio    
arr = []


# Create a Twilio client

# from pygame import mixer

# mixer.init()
# sound = mixer.Sound('emotion/alarm.wav')


face = cv2.CascadeClassifier('emotion\haar cascade files\haarcascade_frontalface_alt.xml')

lbl=['Close','Open']
arr = []


path = os.getcwd()
cap = cv2.VideoCapture(0)


font = cv2.FONT_HERSHEY_COMPLEX_SMALL


emotion_interpreter = tf.lite.Interpreter(model_path="emotion/models/new_emot_lite.tflite")
emotion_interpreter.allocate_tensors()

emotion_input_details = emotion_interpreter.get_input_details()
emotion_output_details = emotion_interpreter.get_output_details()

emotion_input_shape = emotion_input_details[0]['shape']

class_labels = ['Angry','Disgust','Fear','Happy','Neutral', 'Sad', 'Surprise']
app=Flask(__name__)


def gen_frames():
 with mp_face_mesh.FaceMesh(
    max_num_faces=1, 
    refine_landmarks=True,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
) as face_mesh:   
    while True:
     ret, frame = cap.read()
     height,width = frame.shape[:2]
    #  labels = []
     gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
     frame = cv2.flip(frame, 1)
     faces = face.detectMultiScale(gray)

     for (x,y,w,h) in faces:
        # cv2.rectangle(frame,(x,y),(x+w,y+h),(0,255,255),2)
        roi_gray = gray[y:y+h,x:x+w]
        roi_gray = cv2.resize(roi_gray,(48,48),interpolation=cv2.INTER_AREA)



        if np.sum([roi_gray])!=0:
            roi = roi_gray.astype('float')/255.0
            roi = img_to_array(roi)
            roi = np.expand_dims(roi,axis=0)

            emotion_interpreter.set_tensor(emotion_input_details[0]['index'], roi)
            emotion_interpreter.invoke()
            emotion_preds = emotion_interpreter.get_tensor(emotion_output_details[0]['index'])
            
            label=class_labels[emotion_preds.argmax()]  #Find the label
            label_position=(x,y)
            # cv22.imwrite(os.path.join(path,'image.jpg'),frame)
            # cv22.putText(frame,label,label_position,cv22.FONT_HERSHEY_SIMPLEX,1,(0,255,0),2)
            # cv2.putText(frame,label,label_position, font, 1,(255,255,0),1,cv2.LINE_AA)
            cv2.putText(frame,label,(30,80),cv2.FONT_HERSHEY_SIMPLEX,1,(245,255,0),2, cv2.LINE_AA)
            arr.append(label)
        else:
            cv2.putText(frame,'No Faces',(30,80),cv2.FONT_HERSHEY_SIMPLEX,1,(0,255,0),2)

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        img_h, img_w = frame.shape[:2]
        results = face_mesh.process(rgb_frame)
        isClosed = True
        if results.multi_face_landmarks:
         mesh_points = np.array(
             [
                 np.multiply([p.x, p.y], [img_w, img_h]).astype(int) 
                 for p in results.multi_face_landmarks[0].landmark
             ]
             )
         
         (l_cx, l_cy), l_radius = cv2.minEnclosingCircle(mesh_points[LEFT_IRIS])
         (r_cx, r_cy), r_radius = cv2.minEnclosingCircle(mesh_points[RIGHT_IRIS])
         center_left = np.array([l_cx, l_cy], dtype=np.int32)
         center_right = np.array([r_cx, r_cy], dtype=np.int32)
         cv2.circle(frame, center_left, int(l_radius), (255,0,255),1 , cv2.LINE_AA )
         cv2.circle(frame, center_right, int(r_radius), (255,0,255),1 , cv2.LINE_AA )
         cv2.circle(frame, mesh_points[R_H_RIGHT][0],2, (255,255,255), -1 , cv2.LINE_AA )
         cv2.circle(frame, mesh_points[R_H_LEFT][0], 2, (0,255,255), -1 , cv2.LINE_AA )
         iris_pos, ratio=iris_position(center_right, mesh_points[R_H_RIGHT], mesh_points[R_H_LEFT][0])
        #  print(iris_pos)
         cv2.putText(frame,f"{iris_pos}",(30,30),cv2.FONT_HERSHEY_SIMPLEX,1,(0,255,0),2, cv2.LINE_AA)
         
     url ="http://192.168.1.7:5000/mlData"
# jsonStr = json.dumps(arr, default = str)
# print(jsonStr)   
     headers = {'Content-Type': 'application/json', 'Accept':'application/json'}
# r = requests.post(url ="http://192.168.230.29:5000/mlData", data = payload)
     requests.post(url,data=json.dumps(arr), headers=headers)   
    #  requests.post(url,data=json.dumps(iris_pos), headers=headers)   
     
     ret, buffer = cv2.imencode('.jpg', frame)
     frame = buffer.tobytes()
     yield(b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


#      cv2.imshow('img', frame)
#      key = cv2.waitKey(1)
#      if key == ord('q'):
#            break
    
# cap.realease()    
# cv2.destroyAllWindows()




# jsonStr = json.dumps(arr, default = str)
# print(jsonStr)   

# r = requests.post(url ="http://192.168.230.29:5000/mlData", data = payload)
   
# cap.release()
# cv22.destroyAllWindows()
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video') 
def video():
    return Response(gen_frames(),mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__=="__main__":
    app.run(host="0.0.0.0", debug=True)

url ="http://192.168.20.177:5000/mlData"
# jsonStr = json.dumps(arr, default = str)
# print(jsonStr)   
headers = {'Content-Type': 'application/json', 'Accept':'application/json'}
# r = requests.post(url ="http://192.168.230.29:5000/mlData", data = payload)
requests.post(url,data=json.dumps(arr), headers=headers)
