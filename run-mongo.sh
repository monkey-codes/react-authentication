#!/bin/bash
docker run --name react-auth-mongo --rm -p 27017:27017 -v $(pwd)/mongo-data:/data/db mongo
