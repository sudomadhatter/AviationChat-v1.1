#!/bin/bash

# Deploy script for Cloud Run
SERVICE_NAME="aviationchat-backend"
REGION="us-central1"
PROJECT_ID="aviationchat"

echo "Deploying $SERVICE_NAME to $REGION in project $PROJECT_ID..."

gcloud run deploy $SERVICE_NAME \
  --source . \
  --platform managed \
  --region $REGION \
  --project $PROJECT_ID \
  --allow-unauthenticated

echo "Deployment complete."
