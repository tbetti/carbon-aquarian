import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .carbon_engine import calculate_carbon_savings
from .algorand_utils import send_carbon_points

load_dotenv()
app = FastAPI()

ASSET_ID = int(os.getenv("ASSET_ID", "0"))
SENDER_ADDR = os.getenv("ALGORAND_ADDRESS", "")
SENDER_MNEMONIC = os.getenv("ALGORAND_MNEMONIC", "")

class Trip(BaseModel):
    vehicle_model_id: str
    distance_km: float
    actual_mode: str
    wallet_address: str

@app.post("/calculate_and_reward")
def process_trip(trip: Trip):
    if not (SENDER_ADDR and SENDER_MNEMONIC and ASSET_ID):
        raise HTTPException(500, "Set ALGORAND_ADDRESS, ALGORAND_MNEMONIC, ASSET_ID in .env")
    result = calculate_carbon_savings(trip.vehicle_model_id, trip.distance_km, trip.actual_mode)
    txid = send_carbon_points(SENDER_MNEMONIC, SENDER_ADDR, trip.wallet_address, ASSET_ID, result["carbon_points"])
    return {"carbon_saved_kg": result["carbon_saved_kg"], "carbon_points": result["carbon_points"], "txid": txid}
