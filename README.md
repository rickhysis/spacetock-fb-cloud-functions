# spacetock-google-cloud-functions

API REST using Google Cloud Functions (Serverless)

## What we are going to build
1. Express API for CRUD services(create, read, update and delete) on a Firestore database.
2. Use Google Cloud Function to expose our Express server
3. Deploy our Google Cloud Function using Cloud CLI.

## Initializing project locally
```
$ npm install -g firebase-tools
```
Then, let's login into firebase account.
```
$ firebase login
........... input credentials
```

## Testing

Ready for deploying
```
$ firebase deploy
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/spacetock-store/overview
Hosting URL: https://spacetock-store.firebaseapp.com
```
***If everything is ok, Hosting URL will be our Google Cloud Function endpoint.***

```bash
# Testing create place (POST /places)
$ curl -d '{"name": "Apartemen 7", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.","latitude": 6.244025, "city": "TANGERANG", "country": "Indonesia", "street": "Jl. Boulevard Raya Gading Serpong",
"longitude": 106.625317, "type": 1, "facilities": ["Kamar mandi","Ruang Tamu"], "image_primary": "https://images.unsplash.com","image_others": [ "https://images.unsplash.com"]}' -H "Content-Type: application/json" -X POST "https://spacetock-store.firebaseapp.com/api/v1/place/"

>{"id":"mp96PPvPC4UPmYNyC3tk","data":{"id":"w63ryn64wr","facilities":["Kamar mandi","Ruang Tamu"],"description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry.","address":{"longitude":106.625317,"country":"Indonesia","street":"Jl. Boulevard Raya Gading Serpong","latitude":6.244025,"city":"TANGERANG"},"name":"Apartemen 7","type":1}}

# Testing  get a place (GET /place:id)
$ curl -G "https://spacetock-store.firebaseapp.com/api/v1/place/zC9QORei07hklkKUB1wGl/"

>{"id":"mp96PPvPC4UPmYNyC3tk","data":{"id":"w63ryn64wr","facilities":["Kamar mandi","Ruang Tamu"],"description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry.","address":{"longitude":106.625317,"country":"Indonesia","street":"Jl. Boulevard Raya Gading Serpong","latitude":6.244025,"city":"TANGERANG"},"name":"Apartemen 7","type":1}}


# Testing get places list (GET /places/)
$ curl -G "https://spacetock-store.firebaseapp.com/api/v1/place/"

> [{"id":"mp96PPvPC4UPmYNyC3tk","data":{"id":"w63ryn64wr","facilities":["Kamar mandi","Ruang Tamu"],"description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry.","address":{"longitude":106.625317,"country":"Indonesia","street":"Jl. Boulevard Raya Gading Serpong","latitude":6.244025,"city":"TANGERANG"},"images":{"others":["https://images.unsplash.com/"],"primary":"https://images.unsplash.com"},"name":"Apartemen 7","type":1}}]

# Testing update a place (PUT /places/:id)
$ curl -d '{"name": "Apartemen 7", "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.","latitude": 6.244025, "city": "TANGERANG", "country": "Indonesia", "street": "Jl. Boulevard Raya Gading Serpong",
"longitude": 106.625317, "type": 1, "facilities": ["Kamar mandi","Ruang Tamu"], "image_primary": "https://images.unsplash.com","image_others": [ "https://images.unsplash.com"]}' -H "Content-Type: application/json" -X PUT "https://spacetock-store.firebaseapp.com/api/v1/place/zC9QORei07hklkKUB1Gl/"

>{"id":"mp96PPvPC4UPmYNyC3tk","data":{"id":"w63ryn64wr","facilities":["Kamar mandi","Ruang Tamu"],"description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry.","address":{"longitude":106.625317,"country":"Indonesia","street":"Jl. Boulevard Raya Gading Serpong","latitude":6.244025,"city":"TANGERANG"},"name":"Apartemen 7","type":1}}

# Testing delete a place (DELETE /place/:id)
$ curl -X DELETE "https://spacetock-store.firebaseapp.com/api/v1/place/zC9QORei07hklkKUB1Gl/"

> {"id":"zC9QORei07hklkKUB1Gl"}

```

