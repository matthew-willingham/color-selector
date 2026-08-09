/// Author: Matthew Willingham
/// Date: 08/06/2026
/// Description: Testing implementation for color-selector microservice

const BASE_URL = "http://localhost:5558";

async function runTests() {

    console.log("Starting Color Selector tests...\n");

    // TEST 1
    // Get all available dashboard colors

    console.log("TEST 1: GET /colors");

    let response = await fetch(`${BASE_URL}/colors`);
    let data = await response.json();

    console.log("Response:", data);

    if (
        response.status === 200 &&
        Array.isArray(data.colors) &&
        data.colors.includes("blue")
    ) {
        console.log("PASS\n");
    } else {
        console.log("FAIL\n");
    }

    // TEST 2
    // Get current dashboard color

    console.log("TEST 2: GET /dashboard/color");

    response = await fetch(`${BASE_URL}/dashboard/color`);
    data = await response.json();

    console.log("Response:", data);

    if (
        response.status === 200 &&
        data.color
    ) {
        console.log("PASS\n");
    } else {
        console.log("FAIL\n");
    }

    // TEST 3
    // Change dashboard color to violet

    console.log("TEST 3: PUT /dashboard/color with valid color");

    response = await fetch(`${BASE_URL}/dashboard/color`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            color: "violet"
        })
    });

    data = await response.json();

    console.log("Response:", data);

    if (
        response.status === 200 &&
        data.success === true &&
        data.color === "violet"
    ) {
        console.log("PASS\n");
    } else {
        console.log("FAIL\n");
    }

    // TEST 4
    // Make sure violet dashboard color was saved

    console.log("TEST 4: Check that dashboard color was saved");

    response = await fetch(`${BASE_URL}/dashboard/color`);
    data = await response.json();

    console.log("Response:", data);

    if (
        response.status === 200 &&
        data.color === "violet"
    ) {
        console.log("PASS\n");
    } else {
        console.log("FAIL\n");
    }

    // TEST 5
    // Try an invalid dashboard color
    
    console.log("TEST 5: PUT /dashboard/color with invalid color");

    response = await fetch(`${BASE_URL}/dashboard/color`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            color: "white"
        })
    });

    data = await response.json();

    console.log("Response:", data);

    if (response.status === 400) {
        console.log("PASS\n");
    } else {
        console.log("FAIL\n");
    }

    // TEST 6
    // Get rare item color

    console.log("TEST 6: GET /rarity/rare");

    response = await fetch(`${BASE_URL}/rarity/rare`);
    data = await response.json();

    console.log("Response:", data);

    if (
        response.status === 200 &&
        data.rarity === "rare" &&
        data.color === "blue"
    ) {
        console.log("PASS\n");
    } else {
        console.log("FAIL\n");
    }

    // TEST 7
    // Get legendary item color

    console.log("TEST 7: GET /rarity/legendary");

    response = await fetch(`${BASE_URL}/rarity/legendary`);
    data = await response.json();

    console.log("Response:", data);

    if (
        response.status === 200 &&
        data.rarity === "legendary" &&
        data.color === "orange"
    ) {
        console.log("PASS\n");
    } else {
        console.log("FAIL\n");
    }

    // TEST 8
    // Unknown rarity should use default gray

    console.log("TEST 8: Unknown rarity uses default color");

    response = await fetch(`${BASE_URL}/rarity/unknown`);
    data = await response.json();

    console.log("Response:", data);

    if (
        response.status === 200 &&
        data.color === "gray"
    ) {
        console.log("PASS\n");
    } else {
        console.log("FAIL\n");
    }

    console.log("Testing complete.");
}


runTests();