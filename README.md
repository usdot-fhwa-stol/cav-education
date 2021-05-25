<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
<!-- [![LinkedIn][linkedin-shield]][linkedin-url]
 -->


<!-- PROJECT LOGO -->
<br />
<p align="center">
<!--   <a href="https://github.com/usdot-fhwa-stol/cav-education">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>
 -->
  <h3 align="center">Connected and Automated Vehicle Education</h3>

  <p align="center">
    Connected and Automated Vehicle Education in box is a platfrom for collecting and visualizing dsrc data.
    <br />
    <a href="https://github.com/usdot-fhwa-stol/cav-education"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/usdot-fhwa-stol/cav-education">View Demo</a>
    ·
    <a href="https://github.com/usdot-fhwa-stol/cav-education/issues">Report Bug</a>
    ·
    <a href="https://github.com/usdot-fhwa-stol/cav-education/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
[![Product Name Screen Shot][kafka-screenshot]]()
[![Product Name Screen Shot][database-screenshot]]()
[![Product Name Screen Shot][map-screenshot]]()

Connected and Automated Vehicle education (CAVe)-in-a-box is an educational tool developed under the FHWA Workforce Development (WFD) project. CAVe-in-a-box is an interconnected set of ITS equipment that was developed to serve as training and educational resources for the emerging ITS workforce. CAVe-in-a-box represents an ITS environment into a scaled-down portable kit. The kit can be installed at any location which can emulate an intesection where a traffic signals could be implemented, making it well-suited for application testing in the classroom for laboratory use, as well as real world deployment. The kit contains two major components as described below: a mobile kit, representing the vehicle, and an infrastructure kit, representing the environment of a CAV system:

|INFRASTRUCTURE KIT (Roadside Unit Kit) | MOBILE KIT (OnboardUnit Kit)|
|---------------------------------------| ---------------------------|
|RSU | OBU |
|Signal Controller | Controller Area Network(CAN Connector)|
|Wired Network Switchwith Power over Ethernet (PoE) | Wired Network Switch|
|Power Supply | Antenna Mount|
|Tablet PC (Windows/Linux) | Tablet PC (Windows/Linux)|
 |  | Car Power|

### Built With

* [Docker](https://docs.docker.com/get-docker/)
* [kafka](https://kafka.apache.org/)
* [sqlpad](https://sqlpad.github.io/sqlpad/#/)
* [J2735: Dedicated Short Range Communications](https://www.sae.org/standards/content/j2735_200911/)


<!-- GETTING STARTED -->
## Getting Started

To get started install the prerequisites and obtain a copy of J2735.py and place it inside kafka/src/dsrc_message_decoder.

### Prerequisites

cav in box uses docker container to start the services.

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

`J2735.py` to obtaine the source code for J2735.py contact [carmasupport@dot.gov](carmasupport@dot.gov)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/usdot-fhwa-stol/cav-education.git
   cd cavinbox/docker
   docker-compose up --build
   ```

<!-- USAGE EXAMPLES -->
## Usage

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

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/usdot-fhwa-stol/cav-education/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

carma support services - [carmasupport@dot.gov](carmasupport@dot.gov)

Project Link: [https://github.com/usdot-fhwa-stol/cav-education](https://github.com/usdot-fhwa-stol/cav-education)


<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Kafa](https://kafka.apache.org/)
* [sqlpad](https://sqlpad.github.io/sqlpad/#/)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/usdot-fhwa-stol/cav-education.svg?style=for-the-badge
[contributors-url]: https://github.com/usdot-fhwa-stol/cav-education/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/usdot-fhwa-stol/cav-education.svg?style=for-the-badge
[forks-url]: https://github.com/usdot-fhwa-stol/cav-education/network/members
[stars-shield]: https://img.shields.io/github/stars/usdot-fhwa-stol/cav-education.svg?style=for-the-badge
[stars-url]: https://github.com/usdot-fhwa-stol/cav-education/stargazers
[issues-shield]: https://img.shields.io/github/issues/usdot-fhwa-stol/cav-education.svg?style=for-the-badge
[issues-url]: https://github.com/usdot-fhwa-stol/cav-education/issues
[license-shield]: https://img.shields.io/github/license/usdot-fhwa-stol/cav-education.svg?style=for-the-badge
[license-url]: https://github.com/usdot-fhwa-stol/cav-education/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[product-screenshot]: images/screenshot.png
[map-screenshot]: images/map.png
[database-screenshot]: images/database.png
[kafka-screenshot]: images/kafka.png
