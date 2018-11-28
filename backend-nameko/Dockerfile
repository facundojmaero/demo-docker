FROM python:3.6

ENV PYTHONUNBUFFERED 1

# RUN apt update
RUN pip install pipenv

WORKDIR /backend
COPY ./Pipfile /backend/Pipfile
COPY ./Pipfile.lock /backend/Pipfile.lock

RUN pipenv install --system --deploy --ignore-pipfile

# EXPOSE 8000

# CMD python manage.py runserver 0.0.0.0:8000
CMD nameko run nameko-server --broker amqp://guest:guest@rabbitmq