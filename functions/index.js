const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const app = express();
const main = express();

main.use(cors());
main.use('/api/v1', app);
main.use(bodyParser.json());

module.exports.webApi = functions.https.onRequest(main);

app.post('/place', async (request, response) => {
    try {
        const uuid = Math.random().toString(35).substr(2, 12);
        const {
            name,
            type,
            description,
            city,
            country,
            latitude,
            longitude,
            street,
            facilities,
            image_primary,
            image_others
        } = request.body;
        
        const data = {
            name,
            type,
            description,
            facilities,
            id: uuid,
            address: {
                street,
                city,
                country,
                latitude,
                longitude
            },
            images: {
                primary: image_primary,
                others: image_others
            }
        }
        
        const placeRef = await db.collection('place').add(data);
        const place = await placeRef.get();

        response.json({
            id: placeRef.id,
            data: place.data()
        });

    } catch (error) {

        response.status(500).send(error);

    }
});

app.get('/place/:id', async (request, response) => {
    try {
        const placeId = request.params.id;

        if (!placeId) throw new Error('Place ID is required');

        const place = await db.collection('place').doc(placeId).get();

        if (!place.exists) {
            throw new Error('Place doesnt exist.')
        }

        response.json({
            id: place.id,
            data: place.data()
        });

    } catch (error) {

        response.status(500).send(error);

    }
});

app.get('/place', async (request, response) => {
    try {
        const search = decodeURIComponent(request.query.search ? request.query.search : "");      
        const page = decodeURIComponent(request.query.page ? request.query.page : "");
        const type = decodeURIComponent(request.query.type ? request.query.type : 0);
        let placeQuerySnapshot;

        if(request.query.search){
            placeQuerySnapshot = await db.collection('place')
            .where('type', '==', Number(type))
            .where('address.city', '>=', search)
            .orderBy('address.city', 'asc')
            .limit(4)
            .get();
        }else{
            placeQuerySnapshot = await db.collection('place')
            .where('type', '==', Number(type))
            .where('name', '>', page)
            .orderBy('name', 'asc')
            .limit(4)
            .get();
        }
            
            
        const place = [];

        placeQuerySnapshot.forEach(
            (doc) => {
                place.push({
                    id: doc.id,
                    data: doc.data()
                });
            }
        );

        response.json(place);

    } catch (error) {

        response.status(500).send(error);

    }

});

app.put('/place/:id', async (request, response) => {
    try {

        const placeId = request.params.id;
        const {
            name,
            type,
            description,
            city,
            country,
            latitude,
            longitude,
            street,
            facilities,
            image_primary,
            image_others
        } = request.body;
        if (!placeId) throw new Error('id is blank');

        if (!name) throw new Error('Mame is required');
        if (!type) throw new Error('Type is required');
        if (!city) throw new Error('Type is required');

        const data = {
            name,
            type,
            description,
            facilities,
            address: {
                street,
                city,
                country,
                latitude,
                longitude
            },
            images: {
                primary: image_primary,
                others: image_others
            }
        }
        const placeRef = await db.collection('place')
            .doc(placeId)
            .set(data, {
                merge: true
            });

        response.json({
            id: placeId,
            data
        })


    } catch (error) {

        response.status(500).send(error);

    }

});

app.delete('/place/:id', async (request, response) => {
    try {

        const placeId = request.params.id;

        if (!placeId) throw new Error('id is blank');

        await db.collection('place')
            .doc(placeId)
            .delete();

        response.json({
            id: placeId,
        })


    } catch (error) {

        response.status(500).send(error);

    }

});

