## Installation

cav in box uses docker container to start the services.

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

## Usage

```bash
git clone https://github.com/usdot-fhwa-stol/cav-education.git
cd cavinbox/docker
docker-compose up --build
```

Before usage place the J2735.py inside kafka/src/dsrc_message_decoder 
to obtaine the source code for J2735.py contact `carmasuport@dot.gov`

To take a look at the UI open browser and use bellow to access the UI

| Feature         | address         |
| --------------  | --------------- |
| CAV LIVE UI     | localhost:5000  |
| Control Center  | localhost:8083  |
| Sqlpad          | localhost:3000  |

Sqlpad will require username and password. 

## Local Tests

to run local test cases use the test folder to produce sample data
```bash
cd cavinbox/test
python client.py
```
