
<script src="solar.js"></script>

// =================================
// GET HTML ELEMENT
// =================================

const $ = (id) => {

    return document.getElementById(id);

};


// =================================
// SENSOR DATA
// =================================

let telemetry = {

    voltage: 18.6,

    current: 1.65,

    temp: 31.5,

    battery: 78,

    load: 412

};


// =================================
// POWER CALCULATION
// P = V × I
// =================================

function power() {

    return (
        telemetry.voltage *
        telemetry.current
    ).toFixed(1);

}


// =================================
// UPDATE SENSOR DATA
// =================================

function updateTelemetry() {

    telemetry.voltage =
        (18.2 + Math.random() * 1.1)
        .toFixed(1);


    telemetry.current =
        (1.45 + Math.random() * .45)
        .toFixed(2);


    telemetry.temp =
        (30 + Math.random() * 3.5)
        .toFixed(1);


    const p = power();


    // Voltage

    $("voltage").textContent =
        telemetry.voltage + " V";


    // Current

    $("current").textContent =
        telemetry.current + " A";


    // Temperature

    $("temperature").textContent =
        telemetry.temp + " °C";


    // Power

    $("sensorPower").textContent =
        p + " W";


    $("powerValue").textContent =
        p + " W";


    // Hero

    $("heroPower").textContent =
        p + " W";


    // Floating cards

    $("floatVoltage").textContent =
        telemetry.voltage + " V";


    $("floatCurrent").textContent =
        telemetry.current + " A";


    $("floatTemp").textContent =
        telemetry.temp + " °C";


    // Marquee

    $("mqPower").textContent =
        p + " W";


    $("mqTemp").textContent =
        telemetry.temp + "°C";


    // Chart

    history.push(Number(p));

    if(history.length > 18) {

        history.shift();

    }

    drawChart();

}


// =================================
// LIVE CHART
// =================================

let history = [

    18,
    21,
    24,
    23,
    27,
    29,
    26,
    31,
    30,
    34,
    32,
    30.7

];


function drawChart() {

    const canvas =
        $("powerChart");


    const ctx =
        canvas.getContext("2d");


    const width =
        canvas.clientWidth;


    const height =
        240;


    canvas.width =
        width;


    canvas.height =
        height;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    // LINE

    ctx.beginPath();


    history.forEach(
        (value, index) => {

            const x =
                30 +
                index *
                (
                    (width - 60) /
                    (history.length - 1)
                );


            const y =
                height -
                30 -
                value * 5;


            if(index === 0) {

                ctx.moveTo(x, y);

            }
            else {

                ctx.lineTo(x, y);

            }

        }
    );


    ctx.strokeStyle =
        "#54e8a2";


    ctx.lineWidth = 3;


    ctx.stroke();

}


// =================================
// ENERGY CALCULATOR
// =================================

$("calcBtn").addEventListener(
    "click",
    function() {

        const watts =
            Number(
                $("watts").value
            );


        const hours =
            Number(
                $("hours").value
            );


        const energy =
            watts * hours;


        $("calcResult").textContent =
            energy +
            " Wh/day";

    }
);


// =================================
// DARK / LIGHT MODE
// =================================

$("themeBtn").addEventListener(
    "click",
    function() {

        document.body
            .classList
            .toggle("light");

    }
);


// =================================
// SEARCH
// =================================

$("searchBtn").addEventListener(
    "click",
    function() {

        const query =
            $("siteSearch")
            .value
            .toLowerCase();


        if(
            query.includes("sensor")
        ) {

            document
                .getElementById("sensors")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }

        else if(
            query.includes("battery")
        ) {

            document
                .getElementById("dashboard")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }

        else if(
            query.includes("future")
        ) {

            document
                .getElementById("future")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }

        else {

            alert(
                "Try: sensor, battery, future"
            );

        }

    }
);


// =================================
// WEATHER API
// =================================

$("weatherBtn").addEventListener(
    "click",
    async function() {

        const city =
            $("cityInput")
            .value;


        $("weatherResult")
            .textContent =
            "Loading...";


        try {

            /*
            REAL API EXAMPLE:

            const response =
                await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
                );

            const data =
                await response.json();

            */

            $("weatherResult")
                .textContent =
                `Weather request prepared for ${city}`;

        }

        catch(error) {

            $("weatherResult")
                .textContent =
                "API Error";

        }

    }
);


// =================================
// CHATBOT
// =================================

$("chatToggle")
.addEventListener(
    "click",
    function() {

        $("chatBox")
        .classList
        .toggle("show");

    }
);


$("chatClose")
.addEventListener(
    "click",
    function() {

        $("chatBox")
        .classList
        .remove("show");

    }
);


// =================================
// CHAT RESPONSE
// =================================

function assistantReply(question) {

    question =
        question.toLowerCase();


    if(
        question.includes("sensor")
    ) {

        return `
        Sensors measure voltage,
        current and temperature.
        `;

    }


    if(
        question.includes("battery")
    ) {

        return `
        Battery stores electrical energy
        for later use.
        `;

    }


    if(
        question.includes("esp32")
    ) {

        return `
        ESP32 is the IoT controller
        used to collect sensor data.
        `;

    }


    if(
        question.includes("api")
    ) {

        return `
        API allows two systems
        to exchange data.
        `;

    }


    if(
        question.includes("solar")
    ) {

        return `
        Solar panels convert sunlight
        into electrical energy.
        `;

    }


    return `
    Ask me about Solar,
    Sensors, Battery,
    ESP32 or API.
    `;

}


// =================================
// SEND CHAT
// =================================

$("chatSend")
.addEventListener(
    "click",
    function() {

        const input =
            $("chatInput");


        const question =
            input.value.trim();


        if(!question) return;


        $("chatMessages")
        .innerHTML += `

            <div class="user">

                ${question}

            </div>

            <div class="bot">

                ${assistantReply(question)}

            </div>

        `;


        input.value = "";

    }
);


// =================================
// VOICE SEARCH
// =================================

$("voiceBtn")
.addEventListener(
    "click",
    function() {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;


        if(!SpeechRecognition) {

            alert(
                "Voice search is not supported."
            );

            return;

        }


        const recognition =
            new SpeechRecognition();


        recognition.lang =
            "en-IN";


        recognition.start();


        recognition.onresult =
            function(event) {

                const text =
                    event
                    .results[0][0]
                    .transcript;


                $("siteSearch")
                    .value =
                    text;


                $("searchBtn")
                    .click();

            };

    }
);


// =================================
// DEVICE SWITCH
// =================================

document
    .querySelectorAll(
        ".switch input"
    )
    .forEach(
        function(input) {

            input.addEventListener(
                "change",
                function() {

                    console.log(
                        this.checked
                        ? "Device ON"
                        : "Device OFF"
                    );

                }
            );

        }
    );


// =================================
// LIVE UPDATE
// =================================

drawChart();


setInterval(
    updateTelemetry,
    3000
);