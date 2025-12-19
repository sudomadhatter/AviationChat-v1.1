import firebase_admin
from firebase_admin import credentials, firestore
import logging

logger = logging.getLogger(__name__)

_db_client = None

def get_firestore_client():
    """
    Returns a singleton Firestore client.
    Initializes the Firebase Admin SDK if not already initialized.
    """
    global _db_client
    if _db_client is None:
        try:
            # Check if the default app is already initialized to prevent hot-reload crashes
            if not firebase_admin._apps:
                # Use Application Default Credentials (ADC)
                cred = credentials.ApplicationDefault()
                firebase_admin.initialize_app(cred)
                logger.info("Firebase Admin SDK initialized.")
            
            _db_client = firestore.client()
            logger.info("Firestore client created.")
        except Exception as e:
            logger.error(f"Error initializing Firestore: {e}")
            raise e
    return _db_client
