require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();


app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;


// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

app.get('/update-cobj', async(req, res) => {
    res.render('updates',
      {
          title: 'Update Custom Object Form | Integrating With HubSpot I Practicum',
      });
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

app.post('/update-cobj', async (req, res) => {
    const { name, difficulty, total_time } = req.body;

    try {
        const response = await axios.post('https://api.hubapi.com/crm/v3/objects/2-141130435', {
            properties: {
                name: name,
                difficulty: difficulty,
                total_time: total_time
            }
        }, {
            headers: {
                Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
            }
        });

        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error creating record');
        console.log(error);
    }
});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));