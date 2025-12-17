{ pkgs, ... }: {
  # Standard channel configuration
  channel = "stable-24.11";

  # 1. PACKAGES: Combined Node (Frontend) and Python (Backend)
  packages = [
    pkgs.nodejs_20
    pkgs.python311  # Required for your ADK/Agents
    pkgs.git
    # pkgs.zulu    # (Optional: Java, removed since we are using Python)
  ];

  # 2. ENV & SERVICES: Standard Firebase defaults (Keep these!)
  env = {};
  services.firebase.emulators = {
    detect = false;
    projectId = "demo-app";
    services = ["auth" "firestore"];
  };

  # 3. IDX CONFIGURATION
  idx = {
    # Python Extension for VS Code
    extensions = [
      "ms-python.python"
    ];

    workspace = {
      onCreate = {
        # The Critical Setup: Create venv, install ADK, and install Node modules
        venv = "python3 -m venv .venv && source .venv/bin/activate && pip install -r backend/requirements.txt";
        install = "npm install";
        
        # Open your main file by default
        default.openFiles = [ "src/app/page.tsx" ];
      };
      
      onStart = {
        "run-server" = "npm run dev";
      };
    };

    # 4. PREVIEWS: Restored from your old file
    previews = {
      enable = true;
      previews = {
        web = {
          # This command starts Next.js on the specific Cloud port
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--hostname" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}