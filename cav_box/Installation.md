# download source code
```cd ~```<br>
```mkdir cav_repos```<br>
```cd ~/cav_repos```<br>
```git clone https://github.com/usdot-fhwa-stol/cav-education```<br>
```cd cav_box/docker```<br>

# comment out mysql and web container, then start kafka and zookeeper 
```docker-compose up```<br>

# Download https://kafka.apache.org/downloads and extract the package
```cd /home/cav_edu/Downloads/kafka_2.12-2.7.0```<br>
```bin/kafka-topics.sh --bootstrap-server localhost:9092 --list```<br>
```bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic incomming_dsrc_message```<br>

# produce data
```{"value":"BSM","coreData": {"msgCnt": 117, "id": "a", "secMark": 24440, "lat": 389565434, "long": -771500475, "elev": 745, "accuracy": {"semiMajor": 255, "semiMinor": 255, "orientation": 65535}, "transmission": "neutral", "speed": 8191, "heading": 28800, "angle": 127, "accelSet": {"long": 2001, "lat": 2001, "vert": -127, "yaw": 0}, "brakes": {"wheelBrakes": [0, 5], "traction": "unavailable", "abs": "unavailable", "scs": "unavailable", "brakeBoost": "unavailable", "auxBrakes": "unavailable"}, "size": {"width": 200, "length": 500}}}```<br>

```{"value":"SPAT","coreData": {"msgCnt": 117, "id": "a", "secMark": 24440, "lat": 389565434, "long": -771500475, "elev": 745, "accuracy": {"semiMajor": 255, "semiMinor": 255, "orientation": 65535}, "transmission": "neutral", "speed": 8191, "heading": 28800, "angle": 127, "accelSet": {"long": 2001, "lat": 2001, "vert": -127, "yaw": 0}, "brakes": {"wheelBrakes": [0, 5], "traction": "unavailable", "abs": "unavailable", "scs": "unavailable", "brakeBoost": "unavailable", "auxBrakes": "unavailable"}, "size": {"width": 200, "length": 500}}}```<br>

```{"value":"TIM","coreData": {"msgCnt": 117, "id": "a", "secMark": 24440, "lat": 389565434, "long": -771500475, "elev": 745, "accuracy": {"semiMajor": 255, "semiMinor": 255, "orientation": 65535}, "transmission": "neutral", "speed": 8191, "heading": 28800, "angle": 127, "accelSet": {"long": 2001, "lat": 2001, "vert": -127, "yaw": 0}, "brakes": {"wheelBrakes": [0, 5], "traction": "unavailable", "abs": "unavailable", "scs": "unavailable", "brakeBoost": "unavailable", "auxBrakes": "unavailable"}, "size": {"width": 200, "length": 500}}}```<br>

```{"value":"MAP","coreData": {"msgCnt": 117, "id": "a", "secMark": 24440, "lat": 389565434, "long": -771500475, "elev": 745, "accuracy": {"semiMajor": 255, "semiMinor": 255, "orientation": 65535}, "transmission": "neutral", "speed": 8191, "heading": 28800, "angle": 127, "accelSet": {"long": 2001, "lat": 2001, "vert": -127, "yaw": 0}, "brakes": {"wheelBrakes": [0, 5], "traction": "unavailable", "abs": "unavailable", "scs": "unavailable", "brakeBoost": "unavailable", "auxBrakes": "unavailable"}, "size": {"width": 200, "length": 500}}}```<br>

# start node js kafka consumer; port 8080
```cd ~/cav-education/cav_box/node_services/kafka_service```<br>
```npm install```<br>
```node app.js```<br>
# stop it with ctrl+c

# start Django website;  port 8000
```cd ~/cav_repos/cav-education/cav_box/web```<br>
```python3 manage.py runserver```<br>
# stop it with ctrl+c

# stop kafka and zookeeper 
```docker-compose down```<br>

# insert into database table
```insert into cav_fe_incomming_dsrc_message (messageId,value,timestamp,payload) values('20','BasicSafetyMessage',now(),'{"coreData": {"msgCnt": 117, "id": "a", "secMark": 24440, "lat": 389565434, "long": -771500475, "elev": 745, "accuracy": {"semiMajor": 255, "semiMinor": 255, "orientation": 65535}, "transmission": "neutral", "speed": 8191, "heading": 28800, "angle": 127, "accelSet": {"long": 2001, "lat": 2001, "vert": -127, "yaw": 0}, "brakes": {"wheelBrakes": [0, 5], "traction": "unavailable", "abs": "unavailable", "scs": "unavailable", "brakeBoost": "unavailable", "auxBrakes": "unavailable"}, "size": {"width": 200, "length": 500}}}');```<br>

```insert into cav_fe_incomming_dsrc_message (messageId,value,timestamp,payload) values('21','BasicSafetyMessage',now(),'{"coreData": {"msgCnt": 117, "id": "a", "secMark": 24440, "lat": 389565434, "long": -771500475, "elev": 745, "accuracy": {"semiMajor": 255, "semiMinor": 255, "orientation": 65535}, "transmission": "neutral", "speed": 8191, "heading": 28800, "angle": 127, "accelSet": {"long": 2001, "lat": 2001, "vert": -127, "yaw": 0}, "brakes": {"wheelBrakes": [0, 5], "traction": "unavailable", "abs": "unavailable", "scs": "unavailable", "brakeBoost": "unavailable", "auxBrakes": "unavailable"}, "size": {"width": 200, "length": 500}}}');```<br>

```insert into cav_fe_incomming_dsrc_message (messageId,value,timestamp,payload) values('21','TravelerInformationMessage',now(),'{"coreData": {"msgCnt": 117, "id": "a", "secMark": 24440, "lat": 389565434, "long": -771500475, "elev": 745, "accuracy": {"semiMajor": 255, "semiMinor": 255, "orientation": 65535}, "transmission": "neutral", "speed": 8191, "heading": 28800, "angle": 127, "accelSet": {"long": 2001, "lat": 2001, "vert": -127, "yaw": 0}, "brakes": {"wheelBrakes": [0, 5], "traction": "unavailable", "abs": "unavailable", "scs": "unavailable", "brakeBoost": "unavailable", "auxBrakes": "unavailable"}, "size": {"width": 200, "length": 500}}}');```<br>

```insert into cav_fe_incomming_dsrc_message (messageId,value,timestamp,payload) values('21','SPAT',now(),'{"coreData": {"msgCnt": 117, "id": "a", "secMark": 24440, "lat": 389565434, "long": -771500475, "elev": 745, "accuracy": {"semiMajor": 255, "semiMinor": 255, "orientation": 65535}, "transmission": "neutral", "speed": 8191, "heading": 28800, "angle": 127, "accelSet": {"long": 2001, "lat": 2001, "vert": -127, "yaw": 0}, "brakes": {"wheelBrakes": [0, 5], "traction": "unavailable", "abs": "unavailable", "scs": "unavailable", "brakeBoost": "unavailable", "auxBrakes": "unavailable"}, "size": {"width": 200, "length": 500}}}');```<br>



