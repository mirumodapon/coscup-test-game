from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.booths import booths
from app.profiles import profiles
from app.hextiles import hextiles

app = FastAPI(title="COSCUP 2025 GeoTrainPoly")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/booths")
def get_booths():
    return booths


@app.get("/api/profiles")
def get_profiles():
    return profiles

# 改 title
@app.put("/api/profiles")
def put_profiles():
    return profiles

@app.get("/api/hextiles")
def get_hextiles():
    """
    {
       "title": string
    }
    """
    return hextiles

@app.get("/api/hextiles/:id")
def get_hextile():
    return {
        id: 'mysql',
        msg: [
            {
                "msg_id": 1,
                "name": "TC",
                "title": "TC的簽名",
                "timestamp": 160000000,
                "msg": "hello world",
                "like": 4
            }
        ]
    }

@app.post("/api/collect")
def create_hextiles():
    """
    {
      "token": string
    }
    """
    return hextiles[0]

@app.post("/api/msg")
def create_msg():
    """
    {
       "booth_id": "tr201",
       "msg": "hello world"
    }
    """

@app.post("/api/send")
def send():
    """
    {
      "booth_token": "",
      "user_id": ""
    }
    """
    return {}



@app.get("/")
def root():
    return {"message": "Welcome to COSCUP 2025 GeoTrainPoly backend!"}
