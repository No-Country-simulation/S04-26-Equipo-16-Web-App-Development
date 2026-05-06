from sqlalchemy.orm import Session
from backend.models.contractor import Contractor
from backend.repositories.contractor_repository import ContractorRepository
from datetime import datetime, timezone


class ContractorService:

    @staticmethod
    def create_contractor(db: Session, data: dict) -> Contractor:
        # regla MVP: 1 contractor por user
        existing = ContractorRepository.get_by_user_id(db, data["user_id"])
        if existing:
            raise ValueError("El usuario ya tiene un contractor asociado")

        contractor = Contractor(
            user_id=data["user_id"],
            full_name=data["full_name"],
            birth_date=data["birth_date"],
            nationality=data["nationality"],
            address=data["address"],
            document_type=data["document_type"],
            identification_number=data["identification_number"],
            phone=data["phone"],
        )

        return ContractorRepository.create(db, contractor)

    @staticmethod
    def get_contractor(db: Session, contractor_id: int) -> Contractor:
        contractor = ContractorRepository.get_by_id(db, contractor_id)
        if not contractor:
            raise ValueError("Contractor no encontrado")
        return contractor

    @staticmethod
    def update_contractor(db: Session, contractor_id: int, data: dict) -> Contractor:
        contractor = ContractorRepository.get_by_id(db, contractor_id)
        if not contractor:
            raise ValueError("Contractor no encontrado")

        # update parcial (MVP simple)
        for field, value in data.items():
            setattr(contractor, field, value)

        contractor.updated_at = datetime.now(timezone.utc)

        return ContractorRepository.update(db, contractor)

    @staticmethod
    def deactivate_contractor(db: Session, contractor_id: int) -> None:
        contractor = ContractorRepository.get_by_id(db, contractor_id)
        if not contractor:
            raise ValueError("Contractor no encontrado")

        contractor.is_active = False
        contractor.updated_at = datetime.now(timezone.utc)

        ContractorRepository.update(db, contractor)
