Your task description seems to be a bit confused. FastAPI is a Python framework and Node.js is a JavaScript runtime. They don't directly work together unless you're using a microservice architecture. If you want to set up a server and deployment with FastAPI, we don't need Node.js.

Here's an example of a simple FastAPI application:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
```

As for deployment, there are many ways to do it depending on your specific requirements and infrastructure. A common method is to use Docker with a WSGI server like Gunicorn or Uvicorn.

Here's a basic `Dockerfile` for such a setup:

```dockerfile
FROM python:3.8

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

With this, you can build the Docker image with `docker build -t myimage .` and then run it with `docker run -p 8000:8000 myimage`.

If you want to deploy the application to a platform like Heroku, you would need a `Procfile`:

```Procfile
web: uvicorn main:app --host=0.0.0.0 --port=${PORT:-5000}
```

And then you can deploy it with the Heroku CLI with `heroku create` and `git push heroku master`.

This is a very basic setup and doesn't include things like logging, error handling, data validation, or authentication. But it should give you a starting point. If you need more advanced features, you might want to consider using a more full-featured web framework like Django or Flask.
