from fastapi.testclient import TestClient
from main import DrawRequest, Prize, allocate_prize, app

client = TestClient(app)

def payload() -> dict:
    return {"email":"buyer@example.com","consent":True,"seed":43,"prizes":[{"id":"ten","label":"10% off","code":"PULSE10","weight":40,"inventory":20,"unit_cost":4},{"id":"ship","label":"Free shipping","code":"SHIPFREE","weight":30,"inventory":10,"unit_cost":7}]}

def test_health() -> None: assert client.get("/health").json() == {"status":"ok"}

def test_draw_allocates_weighted_prize_and_decrements_inventory() -> None:
    response = client.post("/v1/draws", json=payload())
    assert response.status_code == 200
    assert response.json() == {"prize_id":"ship","label":"Free shipping","code":"SHIPFREE","audit_roll":43,"remaining_inventory":9}

def test_out_of_stock_prize_is_never_selected() -> None:
    request = DrawRequest(email="buyer@example.com",consent=True,seed=0,prizes=[Prize(id="grand",label="Grand prize",code="GRAND",weight=99,inventory=0,unit_cost=50),Prize(id="ten",label="10% off",code="PULSE10",weight=1,inventory=3,unit_cost=4)])
    assert allocate_prize(request).prize_id == "ten"

def test_rejects_missing_consent() -> None:
    data=payload(); data["consent"]=False
    assert client.post("/v1/draws",json=data).status_code == 422

def test_rejects_invalid_email() -> None:
    data=payload(); data["email"]="not-an-email"
    assert client.post("/v1/draws",json=data).status_code == 422

def test_rejects_duplicate_ids_and_empty_inventory() -> None:
    data=payload(); data["prizes"][1]["id"]="ten"
    assert client.post("/v1/draws",json=data).status_code == 422
    data=payload()
    for prize in data["prizes"]: prize["inventory"]=0
    assert client.post("/v1/draws",json=data).status_code == 422
