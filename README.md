# RandomWords2

# Random Words API

An API to generate random words from Wikipedia, Wiktionary, Fandom, and curated wordlists. CORS is enabled by default.

## Base URL

`https://random-words-api-six.vercel.app/api`

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

### 3. Specific Language Words

**Request:** `GET /api?lang=Indonesian` or `GET /api?lang=Xhosa&number=3`
*Provide the exact language name as defined in the source repository's [languages.json](https://github.com/eymenefealtun/all-words-in-all-languages/blob/main/languages.json) (e.g., `English`, `Spanish`, `Indonesian`). Generates a word strictly from that language dictionary.*

**Response:**

```json
{
  "word": "merdeka"
}
```

## Quick Start

**JavaScript**

```javascript
// Fetch multiple random words generally
fetch('https://random-words-api-six.vercel.app/api?number=3')
  .then(response => response.json())
  .then(data => console.log(data.words));

// Fetch a single word in a specific language
fetch('https://random-words-api-six.vercel.app/api?lang=Indonesian')
  .then(response => response.json())
  .then(data => console.log(data.word));
```

**Python**

```python
import requests

url = "https://random-words-api-six.vercel.app/api?lang=Spanish&number=3"
response = requests.get(url).json()
print(response.get("words"))
```

## Credits & Acknowledgments

Special thanks to the open-source community for curating word datasets:

* Multi-language word datasets (`lang=` parameter functionality) are sourced from the repository: [eymenefealtun/all-words-in-all-languages](https://github.com/eymenefealtun/all-words-in-all-languages) by Eymen Efe Altun.
