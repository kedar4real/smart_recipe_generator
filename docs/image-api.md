# Image Recognition API Contract

The frontend calls `recognizeIngredientsFromImage(file)` in `src/services/imageRecognitionService.js`. When `VITE_API_URL` is defined it sends the file to the backend endpoint below:

```
POST {VITE_API_URL}/api/recognize-ingredients
Content-Type: multipart/form-data
Body: file=<binary image>
```

### Expected Response
```json
{
  "ingredients": [
    { "name": "tomato", "confidence": 0.93 },
    { "name": "basil", "confidence": 0.81 }
  ],
  "processingTimeMs": 840
}
```

- `ingredients`: ordered from most to least confident.
- `confidence`: decimal from 0–1.
- Returning an empty array is valid if nothing is detected.
- Error responses should use standard HTTP codes. The client displays a friendly message for 4xx/5xx and a specific message for `413 Payload Too Large`.

### Hosted mock
When no `VITE_API_URL` is provided the app now fetches from a real static endpoint that ships with the project:

```
GET https://<app-domain>/api/mock-ingredients.json
```

You can edit `public/api/mock-ingredients.json` to change the default suggestions or deploy your own API and point `VITE_API_URL` to it.
