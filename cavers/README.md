## Installation

CAVERS uses docker to start the services.

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

## Usage

Before usage place the J2735.py inside kafka/src/dsrc_message_decoder 
To obtain the source code for J2735.py contact `CAVSupportServices@dot.gov`

```bash
git clone https://github.com/usdot-fhwa-stol/cav-education.git
mv <directoryToFile>/J2735.py cav-education/cavers/kafka/src/dsrc_message_decoder/
cd cav-education/cavers/docker
sudo docker-compose up
```

To take a look at the UI, open browser and use the table below to access the UI

| Feature         | Address         |
| --------------  | --------------- |
| CAV LIVE UI     | localhost:5000  |
| Control Center  | localhost:8083  |
| Sqlpad          | localhost:3000  |

Sqlpad will require username and password. 

## Local Tests

To run local test cases use the test folder to produce sample data
```bash
cd cav-education/cavers/test
python msggateway.py
```
Open a new terminal tab and run:
```bash
python client.py
```