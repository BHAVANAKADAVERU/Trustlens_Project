# TrustLens

Explainable machine learning framework for deceptive online review detection.

## Project Overview

TrustLens detects whether a review is deceptive (fake) or truthful using NLP + ML models and provides lightweight explanations for linear models.

Core capabilities:
- Single review prediction with confidence score
- Multi-model comparison
- Batch CSV inference
- Analytics dashboard
- Persistent storage of predictions

## Tech Stack

- Backend: Flask, SQLAlchemy
- ML: scikit-learn, XGBoost, SciPy
- Data: pandas, NumPy
- Frontend: HTML, CSS, vanilla JavaScript
- Storage: PostgreSQL (production) or SQLite (local fallback)

## Repository Layout

- `app.py`: Flask application and API routes
- `final_training.ipynb`: model development and experimentation notebook
- `templates/`: UI pages
- `static/`: CSS and JavaScript assets
- `reviews.csv`: dataset used for training
- `rev.csv`: sample CSV for batch prediction
- `docs/`: project documentation artifacts
- `tests/`: test scaffolding

## Setup

1. Create and activate a virtual environment.
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Configure environment variables:

```bash
DATABASE_URL=sqlite:///instance/trustlens.db
MODEL_PATH=trustlens_chicago_models.pkl
FLASK_ENV=development
```

4. Run:

```bash
python app.py
```

## API Endpoints

- `GET /`: Home page
- `POST /predict`: Predict one review
- `POST /compare`: Compare predictions across models
- `POST /batch_predict`: Predict reviews from CSV file
- `GET /analytics`: Aggregate analytics
- `GET /health`: Service and model health status

## Dataset + Labels

Training data is expected to contain:
- `text`: raw review text
- `deceptive`: `deceptive` or `truthful` (mapped to binary labels)

## Explainability

For linear models, TrustLens surfaces top contributing words from TF-IDF features:
- `fake_indicators`
- `truthful_indicators`

## Major-Project Deliverables Checklist

- Problem definition and research motivation
- Dataset description, preprocessing, and labeling strategy
- Baseline vs model comparison
- Explainability strategy and examples
- Architecture and deployment setup
- API and UI walkthrough
- Error analysis and limitations
- Future work and ethical considerations

## Notes

- Ensure `trustlens_chicago_models.pkl` exists before serving predictions.
- For production deployments, set a PostgreSQL `DATABASE_URL`.
