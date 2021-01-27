# set base image (host OS)
FROM python:3.8

# set the working directory in the container
WORKDIR /code

# copy the dependencies file to the working directory
COPY requirements.txt .

# install dependencies
RUN pip install -r requirements.txt

RUN git clone https://github.com/P1sec/pycrate.git && \
    cd pycrate && \
    python setup.py install

# copy the content of the local src directory to the working directory
COPY src/ .

# Add docker-compose-wait tool -------------------
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

# # command to run on container start
# CMD [ "python", "./server.py" ]
CMD ["/code/app.sh"]