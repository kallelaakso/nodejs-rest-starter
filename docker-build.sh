#!/usr/bin/env bash
npm run build
docker build -t node-rest-api .
docker run node-rest-api:latest
