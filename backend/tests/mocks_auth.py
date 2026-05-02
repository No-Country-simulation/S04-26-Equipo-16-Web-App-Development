from unittest.mock import MagicMock

def override_user_register():
    db = MagicMock()
    query = MagicMock()
    filter_ = MagicMock()

    db.query.return_value = query
    query.filter.return_value = filter_
    filter_.first.return_value = None

    return db


def override_user_register_conflict():
    db = MagicMock()
    query = MagicMock()
    filter_ = MagicMock()

    db.query.return_value = query
    query.filter.return_value = filter_
    filter_.first.return_value = {"email": "test@gmail.com"}

    return db

def override_get_permission_role():
    return {
        "id": 1,
        "email": "test@gmail.com",
        "role": "OPERATOR"
    }