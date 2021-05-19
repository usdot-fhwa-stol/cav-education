# cav_in_box

cav in box is a platfrom for collecting dsrc data.

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
| CAV LIVE UI     | localhost:6066  |
| Control Center  | localhost:8083  |
| Sqlpad          | localhost:3000  |

Sqlpad will require username and password. 

## Local Tests

to run local test cases use the test folder to produce sample data
```bash
cd cavinbox/test
python client.py
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
