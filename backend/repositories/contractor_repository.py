from sqlalchemy.orm import Session
from backend.models.contractor import Contractor


class ContractorRepository:

    @staticmethod
    def create(db: Session, contractor: Contractor) -> Contractor:
        db.add(contractor)
        db.commit()
        db.refresh(contractor)
        return contractor

    @staticmethod
    def get_by_id(db: Session, contractor_id: int) -> Contractor | None:
        return db.query(Contractor).filter(Contractor.id == contractor_id).first()

    @staticmethod
    def get_by_user_id(db: Session, user_id: int) -> Contractor | None:
        return db.query(Contractor).filter(Contractor.user_id == user_id).first()

    @staticmethod
    def update(db: Session, contractor: Contractor) -> Contractor:
        db.commit()
        db.refresh(contractor)
        return contractor

    @staticmethod
    def delete(db: Session, contractor: Contractor) -> None:
        db.delete(contractor)
        db.commit()
