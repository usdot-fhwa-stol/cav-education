# sleep 40
curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://kafka-connect-01:8083/connectors/ -d @register-mysql.json
python server.py