const express = require('express');
const app = express();
const path = require('path');

// Middleware pour vérifier l'heure de la requête
const checkWorkingHours = (req, res, next) => {
    const date = new Date();
    const day = date.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
    const hour = date.getHours();
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Continuer la requête si dans les heures de travail
    } else {
        res.send('Désolé, l\'application n\'est disponible que pendant les heures de travail.');
    }
};

// Utiliser le moteur de template EJS et spécifier le chemin vers le dossier "view"
console.log(__dirname)
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

// Middleware pour servir les fichiers statiques (CSS, images, etc.)
app.use(express.static('public'));

// Utiliser le middleware de vérification des heures de travail pour toutes les routes
app.use(checkWorkingHours);

// Itinéraires
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
