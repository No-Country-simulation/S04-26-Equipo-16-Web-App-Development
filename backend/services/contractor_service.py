from sqlalchemy.orm import Session
from datetime import datetime, timezone

from models.contractor import Contractor
from repositories.contractor_repository import ContractorRepository

from schemas.contractor_schema import ContractorCreate

# exceptions
from core.exceptions import (
    NotFoundException,
    ConflictException,
    BadRequestException,
)


class ContractorService:

    @staticmethod
    def create_contractor(db: Session, data: ContractorCreate) -> Contractor:
        # regla MVP: 1 contractor por user
        existing = ContractorRepository.get_by_user_id(db, data.user_id)

        if existing:
            raise ConflictException("User already has a contractor")

        contractor = Contractor(
            user_id=data.user_id,
            full_name=data.full_name,
            birth_date=data.birth_date,
            nationality=data.nationality,
            address=data.address,
            document_type=data.document_type,
            identification_number=data.identification_number,
            phone=data.phone,
        )

        return ContractorRepository.create(db, contractor)

    @staticmethod
    def get_contractor(db: Session, contractor_id: int) -> Contractor:
        contractor = ContractorRepository.get_by_id(db, contractor_id)

        if not contractor:
            raise NotFoundException("Contractor not found")

        return contractor

    @staticmethod
    def update_contractor(
        db: Session, contractor_id: int, data: ContractorCreate
    ) -> Contractor:
        contractor = ContractorRepository.get_by_id(db, contractor_id)

        if not contractor:
            raise NotFoundException("Contractor not found")

        if not contractor.is_active:
            raise BadRequestException("Contractor is inactive")

        # update limpio (no dict suelto)
        contractor.full_name = data.full_name
        contractor.birth_date = data.birth_date
        contractor.nationality = data.nationality
        contractor.address = data.address
        contractor.document_type = data.document_type
        contractor.identification_number = data.identification_number
        contractor.phone = data.phone

        contractor.updated_at = datetime.now(timezone.utc)

        return ContractorRepository.update(db, contractor)

    @staticmethod
    def deactivate_contractor(db: Session, contractor_id: int) -> None:
        contractor = ContractorRepository.get_by_id(db, contractor_id)

        if not contractor:
            raise NotFoundException("Contractor not found")

        if not contractor.is_active:
            raise BadRequestException("Contractor already inactive")

        contractor.is_active = False
        contractor.updated_at = datetime.now(timezone.utc)

        ContractorRepository.update(db, contractor)
