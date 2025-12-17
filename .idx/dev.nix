{ pkgs, ... }: {
  # Learn more about development environment configuration at
  # https://idx.dev/docs/config-dev-env
  
  # CHANGE 1: Use 'packages' directly, not 'idx.packages'
  packages = [
    pkgs.nodejs_20
    pkgs.python311
    pkgs.git
  ];

  # CHANGE 2: 'idx' is a nested object for extensions and workspace settings
  idx = {
    extensions = [
      "ms-python.python"
    ];

    workspace = {
      onCreate = {
        venv = "python3 -m venv .venv && source .venv/bin/activate && pip install -r backend/requirements.txt";
        install = "npm install";
      };
      onStart = {
        "run-server" = "npm run dev";
      };
    };
  };
}
