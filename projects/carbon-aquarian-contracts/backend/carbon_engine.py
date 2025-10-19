import os, requests
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv("CARBON_API_KEY", "IG9XJwcWhO71ce7DvPuHQ")
headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}

EMISSION_FACTORS = {
    "bike": 0.0,
    "train": 0.03546,
    "london_underground": 0.02780,
    "bus": 0.10846,
    "coach": 0.02717,
}

def calculate_carbon_savings(vehicle_model_id, distance_km, actual_mode):
    url = "https://www.carboninterface.com/api/v1/estimates"
    data = {
        "type": "vehicle",
        "distance_unit": "km",
        "distance_value": distance_km,
        "vehicle_model_id": vehicle_model_id,
    }
    result = requests.post(url, headers=headers, json=data).json()
    if "data" not in result:
        raise Exception(f"Error retrieving car emissions: {result}")

    car_emission_kg = result["data"]["attributes"]["carbon_kg"]
    if actual_mode not in EMISSION_FACTORS:
        raise ValueError(f"Unsupported mode: {list(EMISSION_FACTORS.keys())}")

    alt_emission_kg = distance_km * EMISSION_FACTORS[actual_mode]
    carbon_saved = max(0, car_emission_kg - alt_emission_kg)
    carbon_points = round(carbon_saved * 0.91)

    return {
        "carbon_saved_kg": carbon_saved,
        "carbon_points": carbon_points,
        "car_emission_kg": car_emission_kg,
        "alt_emission_kg": alt_emission_kg,
    }
