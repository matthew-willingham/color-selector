/// Author: Matthew Willingham
/// Date: 08/06/2026
/// Description: Color selector microservice implementation. Allows for changing of dashboard colors 
// as well as item rarity color viewing

import express from "express";
import fs from "fs";

const app = express();
const PORT = 5558;

app.use(express.json());

/// Dashboard colors

const availableColors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet"
];

/// Item rarity colors

const rarityColors = {
    common: "gray",
    uncommon: "green",
    rare: "blue",
    very_rare: "purple",
    legendary: "orange"
};

const SETTINGS_FILE = "./settings.json"

/// Reads saved settings

function readSettings() {
    
    try {
        const data = fs.readFileSync(SETTINGS_FILE, "utf8");
        return JSON.parse(data);
    }

    catch (error) {
        return {
            dashboardColor : "blue"
        };
    }
}

/// Saves settings

function saveSettings(settings) {
    fs.writeFileSync(
        SETTINGS_FILE,
        JSON.stringify(settings, null, 4)
    );
}

/// Returns all dashboard colors

app.get("/colors", (req, res) => {

    res.json({
        colors: availableColors
    });

});

/// Returns currently selected dashboard color

app.get("/dashboard/color", (req, res) => {

    const settings = readSettings();

    res.json({
        color: settings.dashboardColor
    });

});

/// Changes dashboard color

app.put("/dashboard/color", (req, res) => {

    const { color } = req.body;

    if (!color) {
        
        return res.status(400).json({
            error: "A color must be provided."
        });
    }

    if (!availableColors.includes(color)) {
        
        return res.status(400).json({
            error: "Invalid color.",
            availableColors: availableColors
        });
    }

    const settings = readSettings();

    settings.dashboardColor = color;

    saveSettings(settings);

    res.json({
        success: true,
        color: color
    });

});

/// Returns color based on item rarity

app.get("/rarity/:rarity", (req, res) => {
    const rarity = req.params.rarity.toLowerCase();

    const color = rarityColors[rarity] || "gray";

    res.json({
        rarity: rarity,
        color: color
    });

});

app.listen(PORT, () => {
    console.log(`Color-Selector running on port ${PORT}`)
})