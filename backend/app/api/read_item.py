To implement automated testing for the FastAPI backend, we can use the built-in `TestClient` from the `fastapi.testclient` module and `pytest` as the testing framework. 

Firstly, install pytest using pip:
```
pip install pytest
```

Let's assume our application main file is `main.py` and it has a simple API endpoint `/items/{item_id}` for getting the item with id `item_id`.

Here is the `main.py`:

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str
    price: float

items = {
    "item1": {"name": "Item One", "description": "This is item one.", "price": 49.99},
    "item2": {"name": "Item Two", "description": "This is item two.", "price": 99.99},
}

@app.get("/items/{item_id}", response_model=Item)
async def read_item(item_id: str):
    """
    Retrieve item by id
    """
    return items.get(item_id)
```

Now, let's write some tests in a `test_main.py` file:

```python
from fastapi.testclient import TestClient
from main import app, Item

client = TestClient(app)

def test_read_item():
    response = client.get("/items/item1")
    assert response.status_code == 200
    assert response.json() == {
        "name": "Item One", 
        "description": "This is item one.", 
        "price": 49.99
    }

def test_read_item_not_found():
    response = client.get("/items/non_existing_item")
    assert response.status_code == 404
```

In the above test code, we have created two tests, `test_read_item` and `test_read_item_not_found`. The first test is a positive case where the item exists in the database, and the second test is a negative case where the item does not exist.

To run these tests, use the following command in the terminal:

```
pytest test_main.py
```

The `pytest` command will automatically discover all the test cases in `test_main.py` and run them.

Please note that these are unit tests. For integration tests, you might need to set up a test database and use it during the tests. This could involve a more complex setup and cleanup procedure, and it's generally specific to the database you are using.