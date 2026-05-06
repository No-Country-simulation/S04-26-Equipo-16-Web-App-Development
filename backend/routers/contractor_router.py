from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.config.connection import get_db
from backend.services.contractor_service import ContractorService
from backend.schemas.contractor_schema import ContractorCreate

router = APIRouter(prefix="/contractors", tags=["Contractors"])


@router.post("/")
def create_contractor(data: ContractorCreate, db: Session = Depends(get_db)):
    return ContractorService.create_contractor(db, data)


@router.get("/{contractor_id}")
def get_contractor(contractor_id: int, db: Session = Depends(get_db)):
    return ContractorService.get_contractor(db, contractor_id)


@router.put("/{contractor_id}")
def update_contractor(
    contractor_id: int,
    data: ContractorCreate,
    db: Session = Depends(get_db),
):
    return ContractorService.update_contractor(db, contractor_id, data)


@router.delete("/{contractor_id}")
def deactivate_contractor(contractor_id: int, db: Session = Depends(get_db)):
    ContractorService.deactivate_contractor(db, contractor_id)
    return {"message": "Contractor deactivated"}
