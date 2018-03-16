#!/bin/bash

echo "Droping database, if exists..."
mongo edxmsnodejs-a03 --eval "db.dropDatabase()"

echo "Importing customers data..."

mongoimport --db edxmsnodejs-a03 --collection customersdata --file m3-customer-data.json --jsonArray

echo "Importing customers address data..."
mongoimport --db edxmsnodejs-a03 --collection customersaddr --file m3-customer-address-data.json --jsonArray 
