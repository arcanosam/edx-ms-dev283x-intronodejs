#!/bin/bash

PRMDIR=$1
DIRPROJ=$PWD

case "$PRMDIR" in
    a01)
        if [ -e $DIRPROJ/$PRMDIR/customer-data.json ]
        then
            cd $DIRPROJ/$PRMDIR && rm customer-data.json
        fi
        cd $DIRPROJ/$PRMDIR && node csv-to-json.js
    ;;
    a02)
        echo "Not yet implemented."
    ;;
    a03)
        echo "Not yet implemented."
    ;;
    a04)
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
