async function checkAnswer(isCorrect) {
    if (isCorrect) {
        alert("Correct! Moving to the next question.");
        // Logic for moving to the next question
    } else {
        document.getElementById('question').classList.remove('active');
        document.getElementById('feedback').classList.add('active');
        const response = await getChatbotResponse("Review the case.");
        document.getElementById('chatbot').innerHTML += `<p><strong>AI Chatbot:</strong> ${response}</p>`;
        load3DModel();
    }
}

function load3DModel() {
    const container = document.getElementById('threeD-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    };

    animate();
}

async function getChatbotResponse(message) {
    const apiKey = "YOUR_GEMINI_API_KEY";
    const response = await fetch('https://gemini-api-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: message,
            max_tokens: 50
        })
    });
    const data = await response.json();
    return data.choices[0].text;
}

function nextQuestion() {
    document.getElementById('feedback').classList.remove('active');
    document.getElementById('question').classList.add('active');
}
