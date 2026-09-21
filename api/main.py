from typing import Annotated

from fastapi import FastAPI
from pydantic import BaseModel, EmailStr, Field, model_validator

app = FastAPI(title="PrizePulse Allocation API", version="0.1.0")

class Prize(BaseModel):
    id: str = Field(min_length=2, max_length=30, pattern=r"^[a-z][a-z0-9-]*$")
    label: str = Field(min_length=2, max_length=60)
    code: str = Field(min_length=3, max_length=32, pattern=r"^[A-Z0-9-]+$")
    weight: Annotated[int, Field(ge=1, le=100)]
    inventory: Annotated[int, Field(ge=0, le=1_000_000)]
    unit_cost: Annotated[float, Field(ge=0, le=10_000)] = 0

class DrawRequest(BaseModel):
    email: EmailStr
    consent: bool
    prizes: list[Prize] = Field(min_length=2, max_length=20)
    seed: Annotated[int, Field(ge=0, le=2_147_483_647)]

    @model_validator(mode="after")
    def validate_campaign(self) -> "DrawRequest":
        if not self.consent: raise ValueError("consent is required")
        ids = [prize.id for prize in self.prizes]
        if len(ids) != len(set(ids)): raise ValueError("prize ids must be unique")
        if not any(prize.inventory > 0 for prize in self.prizes): raise ValueError("at least one prize must have inventory")
        return self

class DrawResult(BaseModel):
    prize_id: str
    label: str
    code: str
    audit_roll: int
    remaining_inventory: int

def allocate_prize(request: DrawRequest) -> DrawResult:
    """Allocate only among in-stock prizes using explicit integer weights."""
    available = [prize for prize in request.prizes if prize.inventory > 0]
    total_weight = sum(prize.weight for prize in available)
    roll = request.seed % total_weight
    cursor = roll
    selected = available[-1]
    for prize in available:
        cursor -= prize.weight
        if cursor < 0:
            selected = prize
            break
    return DrawResult(prize_id=selected.id, label=selected.label, code=selected.code, audit_roll=roll, remaining_inventory=selected.inventory - 1)

@app.get("/health")
def health() -> dict[str, str]: return {"status": "ok"}

@app.post("/v1/draws", response_model=DrawResult)
def create_draw(request: DrawRequest) -> DrawResult: return allocate_prize(request)
