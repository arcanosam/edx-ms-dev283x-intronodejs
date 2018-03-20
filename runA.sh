#!/bin/bash

PRMA=$1
DIRPROJ=$PWD

case "$PRMA" in
    a01)
        clear

        if [ -e $DIRPROJ/$PRMA/customer-data.json ]
        then
            cd $DIRPROJ/$PRMA && rm customer-data.json
        fi
        cd $DIRPROJ/$PRMA && node csv-to-json.js
    ;;
    a02)
        clear

        echo "Running RESTful Blog API server..."
        npm run-script starta02
    ;;
    a03)
        clear

        PRMPROC=$2

        cd $DIRPROJ/$PRMA

        echo "Droping database, if exists..."
        mongo edxmsnodejs-a03 --eval "db.dropDatabase()"

        echo "Importing customers data..."

        mongoimport --db edxmsnodejs-a03 --collection customersdata --file m3-customer-data.json --jsonArray

        echo "Importing customers address data..."
        mongoimport --db edxmsnodejs-a03 --collection customersaddr --file m3-customer-address-data.json --jsonArray

        node migrate-data.js $PRMPROC
    ;;
    a04)
        clear

        echo "Not yet implemented."
    ;;
    *)
        echo "Usage: ./runA {a01|a02|a03|a04}"
        echo "Parameters:"
        echo "   a01"
        echo "       Run assignment 01 - csv to json"
        echo "   a02"
        echo "       Run assignment 02 - REST API server"
        echo "   a03"
        echo "       not yet implemented"
        echo "   a04"
        echo "       not yet implemented"
        exit 1
esac
