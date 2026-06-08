from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "ML_FINAL(1).pkl")

with open(model_path, "rb") as f:
    model = pickle.load(f)

@app.get("/")
def home():
    return {"message": "Asthma Predictor API Running"}

@app.post("/predict")
def predict(data: dict):

    features = np.array([[
        data["Age"],
        data["Smoking"],
        data["PollutionExposure"],
        data["PollenExposure"],
        data["PM2.5"],
        data["Temp_C"]
    ]])

    prediction = model.predict(features)[0]

    return {"prediction": int(prediction)}