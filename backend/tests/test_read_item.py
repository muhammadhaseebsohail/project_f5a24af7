You can use the `TestClient` from the `fastapi.testclient` module and `pytest` as the testing framework. Here's how you could structure your tests:

```python
from fastapi.testclient import TestClient
from main import app, Item
import pytest

client = TestClient(app)

def test_read_item_success():
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

def test_read_item_bad_request():
    response = client.get("/items/")
    assert response.status_code == 400

@pytest.mark.parametrize("item_id, expected_status", [("123", 404), ("", 400)])
def test_read_item_edge_cases(item_id, expected_status):
    response = client.get(f"/items/{item_id}")
    assert response.status_code == expected_status
```

The `test_read_item_success` function tests a successful case where the item is found. 

The `test_read_item_not_found` function tests the error case where the item is not found and a 404 status code is returned.

The `test_read_item_bad_request` function tests the case when the request is bad (no item id is provided) and a 400 status code is returned.

The `test_read_item_edge_cases` function uses the `pytest.mark.parametrize` decorator to test edge cases. It tests the situation where the item id is a number (unexpected data type) and when the item id is an empty string. 

To run the tests, use the following command in your terminal:

```
pytest test_main.py
```

This command will automatically discover all the test cases in `test_main.py` and run them. Note that the database used here is a simple dictionary for demo purposes. In a real-world application, you should use a mock database for unit testing.