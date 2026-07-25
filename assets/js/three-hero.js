/**
 * Deep Space Cosmic WebGL Engine
 * Features: 2500+ Twinkling Cosmic Stars, Shooting Stars / Comets, Saturn-like Accretion Rings & Cosmic Parallax
 */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('three-canvas-container');
    if (!container) return;

    // 1. Cosmic Scene & Fog Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040a, 0.012);

    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 35;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Central Cosmic Planet Core & Accretion Rings
    const cosmicGroup = new THREE.Group();
    scene.add(cosmicGroup);

    // Wireframe Celestial Sphere
    const planetGeo = new THREE.IcosahedronGeometry(8, 2);
    const planetMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    cosmicGroup.add(planetMesh);

    // Inner Glowing Core
    const coreGeo = new THREE.IcosahedronGeometry(4.5, 1);
    const coreMat = new THREE.MeshBasicMaterial({
        color: 0x9d4edd,
        wireframe: true,
        transparent: true,
        opacity: 0.55
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    cosmicGroup.add(coreMesh);

    // Saturn-like Accretion Disk Rings
    const ring1Geo = new THREE.TorusGeometry(14, 0.25, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.45 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.5;
    cosmicGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(18, 0.15, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xff007f, wireframe: true, transparent: true, opacity: 0.3 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 2.3;
    ring2.rotation.y = Math.PI / 6;
    cosmicGroup.add(ring2);

    // 4. Cosmic Deep Space Starfield (2,500 Star Nodes)
    const starCount = window.innerWidth < 768 ? 1000 : 2500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    const colorWhite = new THREE.Color(0xffffff);
    const colorCyan = new THREE.Color(0x00f0ff);
    const colorViolet = new THREE.Color(0x9d4edd);
    const colorMagenta = new THREE.Color(0xff007f);

    for (let i = 0; i < starCount; i++) {
        const radius = 30 + Math.random() * 120;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        starPositions[i * 3 + 2] = radius * Math.cos(phi);

        const rand = Math.random();
        const col = rand > 0.7 ? colorWhite : (rand > 0.4 ? colorCyan : (rand > 0.2 ? colorViolet : colorMagenta));
        starColors[i * 3] = col.r;
        starColors[i * 3 + 1] = col.g;
        starColors[i * 3 + 2] = col.b;

        starSizes[i] = 0.5 + Math.random() * 1.5;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
        size: 0.9,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
    });

    const starfield = new THREE.Points(starGeometry, starMaterial);
    scene.add(starfield);

    // 5. Shooting Stars / Cosmic Comets System
    const comets = [];
    function createComet() {
        if (comets.length > 4) return;
        const cometGeo = new THREE.BufferGeometry();
        const startX = (Math.random() - 0.5) * 100;
        const startY = 40 + Math.random() * 20;
        const startZ = (Math.random() - 0.5) * 40;

        const points = [
            new THREE.Vector3(startX, startY, startZ),
            new THREE.Vector3(startX - 8, startY - 8, startZ)
        ];
        cometGeo.setFromPoints(points);

        const cometMat = new THREE.LineBasicMaterial({
            color: 0x00f0ff,
            transparent: true,
            opacity: 1
        });

        const cometMesh = new THREE.Line(cometGeo, cometMat);
        scene.add(cometMesh);
        comets.push({
            mesh: cometMesh,
            vx: -0.8 - Math.random() * 0.5,
            vy: -0.8 - Math.random() * 0.5,
            life: 1.0
        });
    }

    // Trigger shooting stars periodically
    setInterval(createComet, 2500);

    // 6. Mouse Interaction & Cosmic Parallax
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
    });

    let currentScroll = 0;
    window.addEventListener('scroll', () => {
        currentScroll = window.scrollY;
    });

    // 7. Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Mouse Parallax
        targetX += (mouseX - targetX) * 0.04;
        targetY += (mouseY - targetY) * 0.04;

        // Rotate Celestial Core & Rings
        planetMesh.rotation.x = elapsed * 0.08 + targetY;
        planetMesh.rotation.y = elapsed * 0.12 + targetX;

        coreMesh.rotation.x = -elapsed * 0.15;
        coreMesh.rotation.y = -elapsed * 0.2;

        ring1.rotation.z = elapsed * 0.1;
        ring2.rotation.z = -elapsed * 0.08;

        // Floating Y Position based on Scroll
        const scrollFactor = currentScroll * 0.008;
        cosmicGroup.position.y = Math.sin(elapsed * 0.5) * 1.5 - scrollFactor;
        cosmicGroup.position.x = Math.cos(elapsed * 0.3) * 1.2;

        // Rotate Deep Space Starfield
        starfield.rotation.y = elapsed * 0.02 + targetX * 0.2;
        starfield.rotation.x = elapsed * 0.01 + targetY * 0.2;

        // Update Comets / Shooting Stars
        for (let i = comets.length - 1; i >= 0; i--) {
            const c = comets[i];
            c.mesh.position.x += c.vx;
            c.mesh.position.y += c.vy;
            c.life -= 0.025;
            c.mesh.material.opacity = c.life;

            if (c.life <= 0) {
                scene.remove(c.mesh);
                c.mesh.geometry.dispose();
                c.mesh.material.dispose();
                comets.splice(i, 1);
            }
        }

        renderer.render(scene, camera);
    }

    animate();

    // 8. Window Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
