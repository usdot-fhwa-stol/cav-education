# download source code
cd ~
mkdir cav_repos
cd ~/cav_repos
git clone https://github.com/usdot-fhwa-stol/cav-education
cd cav_box/docker

# comment out mysql and web container, then start kafka and zookeeper 
docker-compose up

# Download https://kafka.apache.org/downloads and extract the package
cd /home/cav_edu/Downloads/kafka_2.12-2.7.0
bin/kafka-topics.sh --bootstrap-server localhost:9092 --list
bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic incomming_dsrc_message

# produce data
{"value":"BSM","coreData": {"msgCnt": 117, "id": "a", "secMark": 24440, "lat": 389565434, "long": -771500475, "elev": 745, "accuracy": {"semiMajor": 255, "semiMinor": 255, "orientation": 65535}, "transmission": "neutral", "speed": 8191, "heading": 28800, "angle": 127, "accelSet": {"long": 2001, "lat": 2001, "vert": -127, "yaw": 0}, "brakes": {"wheelBrakes": [0, 5], "traction": "unavailable", "abs": "unavailable", "scs": "unavailable", "brakeBoost": "unavailable", "auxBrakes": "unavailable"}, "size": {"width": 200, "length": 500}}}

{"value":"SPAT","coreData": {"msgCnt": 117, "id": "a", "secMark": 24440, "lat": 389565434, "long": -771500475, "elev": 745, "accuracy": {"semiMajor": 255, "semiMinor": 255, "orientation": 65535}, "transmission": "neutral", "speed": 8191, "heading": 28800, "angle": 127, "accelSet": {"long": 2001, "lat": 2001, "vert": -127, "yaw": 0}, "brakes": {"wheelBrakes": [0, 5], "traction": "unavailable", "abs": "unavailable", "scs": "unavailable", "brakeBoost": "unavailable", "auxBrakes": "unavailable"}, "size": {"width": 200, "length": 500}}}

{"value":"TIM","coreData": {"msgCnt": 117, "id": "a", "secMark": 24440, "lat": 389565434, "long": -771500475, "elev": 745, "accuracy": {"semiMajor": 255, "semiMinor": 255, "orientation": 65535}, "transmission": "neutral", "speed": 8191, "heading": 28800, "angle": 127, "accelSet": {"long": 2001, "lat": 2001, "vert": -127, "yaw": 0}, "brakes": {"wheelBrakes": [0, 5], "traction": "unavailable", "abs": "unavailable", "scs": "unavailable", "brakeBoost": "unavailable", "auxBrakes": "unavailable"}, "size": {"width": 200, "length": 500}}}

{"value":"MAP","coreData": {"msgCnt": 117, "id": "a", "secMark": 24440, "lat": 389565434, "long": -771500475, "elev": 745, "accuracy": {"semiMajor": 255, "semiMinor": 255, "orientation": 65535}, "transmission": "neutral", "speed": 8191, "heading": 28800, "angle": 127, "accelSet": {"long": 2001, "lat": 2001, "vert": -127, "yaw": 0}, "brakes": {"wheelBrakes": [0, 5], "traction": "unavailable", "abs": "unavailable", "scs": "unavailable", "brakeBoost": "unavailable", "auxBrakes": "unavailable"}, "size": {"width": 200, "length": 500}}}

# start node js kafka consumer; port 8080
cd ~/cav-education/cav_box/node_services/kafka_service
npm install
node app.js
# stop it with ctrl+c

# start Django website;  port 8000
cd ~/cav_repos/cav-education/cav_box/web
python3 manage.py runserver
# stop it with ctrl+c

# stop kafka and zookeeper 
docker-compose down

# insert into database table
insert into cav_fe_incomming_dsrc_message (messageId,value,timestamp,payload) values('20','BasicSafetyMessage',now(),'{"coreData": {"msgCnt": 117, "id": "a", "secMark": 24440, "lat": 389565434, "long": -771500475, "elev": 745, "accuracy": {"semiMajor": 255, "semiMinor": 255, "orientation": 65535}, "transmission": "neutral", "speed": 8191, "heading": 28800, "angle": 127, "accelSet": {"long": 2001, "lat": 2001, "vert": -127, "yaw": 0}, "brakes": {"wheelBrakes": [0, 5], "traction": "unavailable", "abs": "unavailable", "scs": "unavailable", "brakeBoost": "unavailable", "auxBrakes": "unavailable"}, "size": {"width": 200, "length": 500}}}');

insert into cav_fe_incomming_dsrc_message (messageId,value,timestamp,payload) values('21','BasicSafetyMessage',now(),'{"coreData": {"msgCnt": 117, "id": "a", "secMark": 24440, "lat": 389565434, "long": -771500475, "elev": 745, "accuracy": {"semiMajor": 255, "semiMinor": 255, "orientation": 65535}, "transmission": "neutral", "speed": 8191, "heading": 28800, "angle": 127, "accelSet": {"long": 2001, "lat": 2001, "vert": -127, "yaw": 0}, "brakes": {"wheelBrakes": [0, 5], "traction": "unavailable", "abs": "unavailable", "scs": "unavailable", "brakeBoost": "unavailable", "auxBrakes": "unavailable"}, "size": {"width": 200, "length": 500}}}');

insert into cav_fe_incomming_dsrc_message (messageId,value,timestamp,payload) values('21','TravelerInformationMessage',now(),'{"coreData": {"msgCnt": 117, "id": "a", "secMark": 24440, "lat": 389565434, "long": -771500475, "elev": 745, "accuracy": {"semiMajor": 255, "semiMinor": 255, "orientation": 65535}, "transmission": "neutral", "speed": 8191, "heading": 28800, "angle": 127, "accelSet": {"long": 2001, "lat": 2001, "vert": -127, "yaw": 0}, "brakes": {"wheelBrakes": [0, 5], "traction": "unavailable", "abs": "unavailable", "scs": "unavailable", "brakeBoost": "unavailable", "auxBrakes": "unavailable"}, "size": {"width": 200, "length": 500}}}');

insert into cav_fe_incomming_dsrc_message (messageId,value,timestamp,payload) values('21','SPAT',now(),'{"coreData": {"msgCnt": 117, "id": "a", "secMark": 24440, "lat": 389565434, "long": -771500475, "elev": 745, "accuracy": {"semiMajor": 255, "semiMinor": 255, "orientation": 65535}, "transmission": "neutral", "speed": 8191, "heading": 28800, "angle": 127, "accelSet": {"long": 2001, "lat": 2001, "vert": -127, "yaw": 0}, "brakes": {"wheelBrakes": [0, 5], "traction": "unavailable", "abs": "unavailable", "scs": "unavailable", "brakeBoost": "unavailable", "auxBrakes": "unavailable"}, "size": {"width": 200, "length": 500}}}');



