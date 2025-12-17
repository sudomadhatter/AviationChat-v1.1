# Project IDX Environment Configuration
{
  "pkgs": [
    "pkgs.nodejs_20",
    "pkgs.python311",
    "pkgs.python311Packages.pip",
    "pkgs.python311Packages.venv",
    "pkgs.git"
  ],
  "idx": {
    "extensions": [
      "ms-python.python"
    ],
    "workspace": {
      "onCreate": {
        "venv": "python3 -m venv .venv && source .venv/bin/activate && pip install -r backend/requirements.txt",
        "install": "npm install"
      },
      "onStart": {
        "run-server": "npm run dev"
      }
    }
  }
}
