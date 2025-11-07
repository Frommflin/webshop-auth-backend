#!/bin/bash
# ===============================
# Generate self-signed certificate for local HTTPS
# Works on Windows (Git Bash), macOS, and Linux
# ===============================

set -e  # stop script on first error

# Create the certs directory if it doesn't exist
mkdir -p certs

# Detect environment to fix Git Bash path parsing
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
  # Windows Git Bash (needs //CN)
  SUBJ="//CN=localhost"
else
  # macOS / Linux
  SUBJ="/CN=localhost"
fi

# Generate the certificate and key
openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout ./certs/server.key \
  -out ./certs/server.cert \
  -subj "$SUBJ"

# Success message
echo "✅ Self-signed certificate and key have been generated in the 'certs' directory."
