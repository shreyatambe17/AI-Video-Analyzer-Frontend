"""
AI Video Summarizer - Frontend Forwarder
Allows running 'python run_all.py' directly from the 'my-react-app' folder.
"""
import sys
import runpy
from pathlib import Path

ROOT_SCRIPT = Path(__file__).resolve().parent.parent / "run_all.py"

if __name__ == "__main__":
    if ROOT_SCRIPT.exists():
        sys.path.insert(0, str(ROOT_SCRIPT.parent))
        runpy.run_path(str(ROOT_SCRIPT), run_name="__main__")
    else:
        print(f"Error: Could not find root script at {ROOT_SCRIPT}")
