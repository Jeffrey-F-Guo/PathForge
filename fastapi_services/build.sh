#!/usr/bin/env bash
# exit on error
set -o errexit

# 1. Install all your Python dependencies
pip install -r requirements.txt

# 2. Run the crawl4ai setup command
crawl4ai-setup