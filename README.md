# RandomWords2

# Random Words API

An API to generate random words from Wikipedia, Wiktionary, Fandom, and curated wordlists. CORS is enabled by default.

## Base URL
`[https://random-words-api-six.vercel.app/api](https://random-words-api-six.vercel.app/api)`

## Endpoints

### 1. Single Word
**Request:** `GET /api`

**Response:**
```json
{
  "word": "sunlight"
}
```

### 2. Multiple Words
**Request:** `GET /api?number=5`
*Max limit is 100. Requests exceeding this limit will automatically reduce to 100 and return a warning.*

**Response:**
```json
{
  "words": [
    "apple", 
    "tree", 
    "river", 
    "sky", 
    "cloud"
  ]
}
```

## Quick Start

**JavaScript**
```javascript
fetch('https://random-words-api-six.vercel.app/api?number=3')
  .then(response => response.json())
  .then(data => console.log(data.words));
```

**Python**
```python
import requests

url = "https://random-words-api-six.vercel.app/api?number=3"
response = requests.get(url).json()
print(response.get("words"))
```
