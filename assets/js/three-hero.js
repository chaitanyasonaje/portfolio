/**
 * Modern High-Aesthetic WebGL Motion Graphic Engine
 * Features: Soft Circular Glowing Particles, Ambient Mesh Glow Nebulae, Undulating Waves, Smooth Dynamic Motion
 */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('three-canvas-container');
    if (!container) return;

    // Helper: Create soft circular glowing particle texture (No hard square edges)
    function createGlowParticleTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    const particleTexture = createGlowParticleTexture();

    // 1. Cosmic Scene & Fog Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030612, 0.008);

    const camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 32;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Central Cosmic Celestial Group & Smooth Gradient Rings
    const cosmicGroup = new THREE.Group();
    scene.add(cosmicGroup);

    // Smooth Soft Glowing Core Sphere
    const planetGeo = new THREE.IcosahedronGeometry(7.5, 3);
    const planetMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.25
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    cosmicGroup.add(planetMesh);

    // Inner Radiant Violet Core
    const coreGeo = new THREE.IcosahedronGeometry(4.2, 2);
    const coreMat = new THREE.MeshBasicMaterial({
        color: 0x9d4edd,
        wireframe: true,
        transparent: true,
        opacity: 0.45
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    cosmicGroup.add(coreMesh);

    // Sleek Orbiting Torus Rings
    const ring1Geo = new THREE.TorusGeometry(13.5, 0.15, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.45 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.5;
    cosmicGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(17.5, 0.1, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xff007f, transparent: true, opacity: 0.35 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 2.3;
    ring2.rotation.y = Math.PI / 6;
    cosmicGroup.add(ring2);

    // 4. Soft Glowing Nebulae / Energy Glow Spheres
    const nebulae = [];
    const nebulaColors = [0x00f0ff, 0x9d4edd, 0xff007f];
    for (let i = 0; i < 4; i++) {
        const geo = new THREE.SphereGeometry(12 + i * 4, 16, 16);
        const mat = new THREE.MeshBasicMaterial({
            color: nebulaColors[i % nebulaColors.length],
            transparent: true,
            opacity: 0.06,
            blending: THREE.AdditiveBlending
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 30 - 15
        );
        scene.add(mesh);
        nebulae.push({ mesh, speed: 0.2 + Math.random() * 0.3 });
    }

    // 5. Undulating Smooth Particle Wave Grid (Modern Motion Graphic Layer)
    const waveWidth = 65;
    const waveDepth = 65;
    const numWaveParticles = waveWidth * waveDepth;
    const waveGeo = new THREE.BufferGeometry();
    const wavePositions = new Float32Array(numWaveParticles * 3);
    const waveColors = new Float32Array(numWaveParticles * 3);

    const cCyan = new THREE.Color(0x00f0ff);
    const cViolet = new THREE.Color(0x9d4edd);

    let waveIdx = 0;
    for (let x = 0; x < waveWidth; x++) {
        for (let z = 0; z < waveDepth; z++) {
            wavePositions[waveIdx * 3] = (x - waveWidth / 2) * 1.8;
            wavePositions[waveIdx * 3 + 1] = -20;
            wavePositions[waveIdx * 3 + 2] = (z - waveDepth / 2) * 1.8;

            const ratio = x / waveWidth;
            const mixColor = cCyan.clone().lerp(cViolet, ratio);
            waveColors[waveIdx * 3] = mixColor.r;
            waveColors[waveIdx * 3 + 1] = mixColor.g;
            waveColors[waveIdx * 3 + 2] = mixColor.b;

            waveIdx++;
        }
    }

    waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
    waveGeo.setAttribute('color', new THREE.BufferAttribute(waveColors, 3));

    const waveMat = new THREE.PointsMaterial({
        size: 2.2,
        map: particleTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const waveParticles = new THREE.Points(waveGeo, waveMat);
    scene.add(waveParticles);

    // 6. Modern Ambient Floating Soft Particle Field (2,000 Circular Glow Nodes)
    const starCount = window.innerWidth < 768 ? 900 : 2200;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorWhite = new THREE.Color(0xffffff);
    const colorCyan = new THREE.Color(0x00f0ff);
    const colorViolet = new THREE.Color(0x9d4edd);
    const colorMagenta = new THREE.Color(0xff007f);

    for (let i = 0; i < starCount; i++) {
        const radius = 25 + Math.random() * 110;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        starPositions[i * 3 + 2] = radius * Math.cos(phi);

        const rand = Math.random();
        const col = rand > 0.65 ? colorWhite : (rand > 0.4 ? colorCyan : (rand > 0.2 ? colorViolet : colorMagenta));
        starColors[i * 3] = col.r;
        starColors[i * 3 + 1] = col.g;
        starColors[i * 3 + 2] = col.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
        size: 2.5,
        map: particleTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const starfield = new THREE.Points(starGeometry, starMaterial);
    scene.add(starfield);

    // 7. Shooting Stars / Cosmic Comets System with Glow
    const comets = [];
    function createComet() {
        if (comets.length > 4) return;
        const cometGeo = new THREE.BufferGeometry();
        const startX = (Math.random() - 0.5) * 110;
        const startY = 40 + Math.random() * 25;
        const startZ = (Math.random() - 0.5) * 40;

        const points = [
            new THREE.Vector3(startX, startY, startZ),
            new THREE.Vector3(startX - 12, startY - 12, startZ)
        ];
        cometGeo.setFromPoints(points);

        const cometMat = new THREE.LineBasicMaterial({
            color: Math.random() > 0.5 ? 0x00f0ff : 0xff007f,
            transparent: true,
            opacity: 0.9
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

    setInterval(createComet, 2200);

    // 8. Mouse Interaction & Smooth Parallax
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
    });

    let currentScroll = 0;
    window.addEventListener('scroll', () => {
        currentScroll = window.scrollY;
    });

    // 9. Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Mouse Parallax Smooth Interpolation
        targetX += (mouseX - targetX) * 0.03;
        targetY += (mouseY - targetY) * 0.03;

        // Rotate Central Core & Torus Rings
        planetMesh.rotation.x = elapsed * 0.06 + targetY;
        planetMesh.rotation.y = elapsed * 0.09 + targetX;

        coreMesh.rotation.x = -elapsed * 0.12;
        coreMesh.rotation.y = -elapsed * 0.15;

        ring1.rotation.z = elapsed * 0.08;
        ring2.rotation.z = -elapsed * 0.06;

        // Pulse Nebulae
        nebulae.forEach((neb, idx) => {
            const scale = 1 + Math.sin(elapsed * neb.speed + idx) * 0.15;
            neb.mesh.scale.set(scale, scale, scale);
        });

        // Animate Undulating Fluid Wave Grid
        const posAttr = waveParticles.geometry.attributes.position;
        let pIdx = 0;
        for (let x = 0; x < waveWidth; x++) {
            for (let z = 0; z < waveDepth; z++) {
                const u = x * 0.18 + elapsed * 1.2;
                const v = z * 0.18 + elapsed * 1.2;
                const yVal = -18 + Math.sin(u) * 2.5 + Math.cos(v) * 2.5;
                posAttr.setY(pIdx, yVal);
                pIdx++;
            }
        }
        posAttr.needsUpdate = true;

        // Floating Y Position based on Scroll
        const scrollFactor = currentScroll * 0.006;
        cosmicGroup.position.y = Math.sin(elapsed * 0.4) * 1.2 - scrollFactor;
        cosmicGroup.position.x = Math.cos(elapsed * 0.25) * 1.0;

        // Rotate Starfield & Wave Grid
        starfield.rotation.y = elapsed * 0.015 + targetX * 0.2;
        starfield.rotation.x = elapsed * 0.008 + targetY * 0.2;
        waveParticles.rotation.y = elapsed * 0.01 + targetX * 0.1;

        // Update Comets
        for (let i = comets.length - 1; i >= 0; i--) {
            const c = comets[i];
            c.mesh.position.x += c.vx;
            c.mesh.position.y += c.vy;
            c.life -= 0.02;
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

    // 10. Window Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});


