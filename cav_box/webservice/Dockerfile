FROM python:3

LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.name="CAV"
LABEL org.label-schema.vendor="Leidos"

ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/

# Add docker-compose-wait tool -------------------
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait
CMD ["/code/app.sh"]