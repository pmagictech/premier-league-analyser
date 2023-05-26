FROM python:3.10-alpine

COPY ./requirements.txt /server/requirements.txt

WORKDIR /server

RUN apk add --no-cache --virtual .build-deps gcc libc-dev libxslt-dev
RUN pip install -r requirements.txt
RUN apk del .build-deps

EXPOSE 5000

ENTRYPOINT [ "python" ]

CMD ["main.py" ]