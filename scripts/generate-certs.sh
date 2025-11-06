#!/bin/bash
mkdir -p certs

openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout ./certs/server.key \
  -out  ./certs/server.cert \
  -subj "/C=SE/ST=Stockholm/L=Stockholm/O=LocalDev/OU=Dev/CN=localhost/emailAddress=dev@example.com"
echo "Self-signed certificate and key have been generated in the 'certs' directory."