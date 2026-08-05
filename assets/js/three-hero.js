/**
 * Ultra-Modern Interactive 3D WebGL Motion Graphic Engine
 * Author: Chaitanya Sandip Sonaje - AI Full Stack Engineer
 * 
 * Features:
 * - Real-time Mouse Attraction & Field Distortion
 * - Click 3D Shockwave Particle Impulse
 * - Dynamic Wave Grid Terrain with Perlin-style displacement
 * - Preset 3D Modes: Cosmic Core, Quantum Swarm, Cyber Matrix Grid
 * - Global Engine Controller (window.ThreeEngine) for HUD integration
 */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('three-canvas-container');
    if (!container) return;

    // ----------------------------------------------------
    // 0. Global State & Engine Controls
    // ----------------------------------------------------
    let currentMode = 'cosmic'; // 'cosmic' | 'quantum' | 'cyber'
    let mouseForceActive = true;
    let highPerformance = window.innerWidth > 768;

    // Mouse Tracking Physics
    let rawMouseX = 0, rawMouseY = 0;
    let normMouseX = 0, normMouseY = 0;
    let targetX = 0, targetY = 0;
    let mouseVelocityX = 0, mouseVelocityY = 0;
    let lastMouseX = 0, lastMouseY = 0;

    // 3D Click Ripples
    const activeRipples = []; // { x, z, radius, maxRadius, strength }

    // Helper: Create soft circular glowing particle texture
    function createGlowParticleTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(0, 240, 255, 0.9)');
        gradient.addColorStop(0.5, 'rgba(157, 78, 221, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    const particleTexture = createGlowParticleTexture();

    // ----------------------------------------------------
    // 1. Scene, Camera & WebGL Renderer Setup
    // ----------------------------------------------------
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040a, 0.007);

    const camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 34);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ----------------------------------------------------
    // 2. Cosmic Celestial Group (Mode 1)
    // ----------------------------------------------------
    const cosmicGroup = new THREE.Group();
    scene.add(cosmicGroup);

    // Outer Neon Cyber Mesh
    const planetGeo = new THREE.IcosahedronGeometry(7.5, 3);
    const planetMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.28
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    cosmicGroup.add(planetMesh);

    // Inner Glowing Violet Core
    const coreGeo = new THREE.IcosahedronGeometry(4.2, 2);
    const coreMat = new THREE.MeshBasicMaterial({
        color: 0x9d4edd,
        wireframe: true,
        transparent: true,
        opacity: 0.55
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    cosmicGroup.add(coreMesh);

    // Orbiting Torus Rings
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

    const ring3Geo = new THREE.TorusGeometry(21.5, 0.08, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x00e676, transparent: true, opacity: 0.25 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = Math.PI / 3;
    ring3.rotation.y = -Math.PI / 4;
    cosmicGroup.add(ring3);

    // ----------------------------------------------------
    // 3. Quantum Swarm Group (Mode 2)
    // ----------------------------------------------------
    const quantumGroup = new THREE.Group();
    quantumGroup.visible = false;
    scene.add(quantumGroup);

    const qCoreGeo = new THREE.TorusKnotGeometry(6, 1.8, 120, 16);
    const qCoreMat = new THREE.MeshBasicMaterial({
        color: 0xff007f,
        wireframe: true,
        transparent: true,
        opacity: 0.4
    });
    const qCoreMesh = new THREE.Mesh(qCoreGeo, qCoreMat);
    quantumGroup.add(qCoreMesh);

    // ----------------------------------------------------
    // 4. Cyber Matrix Grid Group (Mode 3)
    // ----------------------------------------------------
    const cyberGroup = new THREE.Group();
    cyberGroup.visible = false;
    scene.add(cyberGroup);

    const gridHelperTop = new THREE.GridHelper(120, 40, 0x00f0ff, 0x9d4edd);
    gridHelperTop.position.y = 22;
    gridHelperTop.material.transparent = true;
    gridHelperTop.material.opacity = 0.25;
    cyberGroup.add(gridHelperTop);

    const gridHelperBottom = new THREE.GridHelper(120, 40, 0xff007f, 0x00f0ff);
    gridHelperBottom.position.y = -22;
    gridHelperBottom.material.transparent = true;
    gridHelperBottom.material.opacity = 0.25;
    cyberGroup.add(gridHelperBottom);

    // ----------------------------------------------------
    // 5. Nebulae Glowing Spheres
    // ----------------------------------------------------
    const nebulae = [];
    const nebulaColors = [0x00f0ff, 0x9d4edd, 0xff007f, 0x00e676];
    for (let i = 0; i < 4; i++) {
        const geo = new THREE.SphereGeometry(12 + i * 4, 16, 16);
        const mat = new THREE.MeshBasicMaterial({
            color: nebulaColors[i % nebulaColors.length],
            transparent: true,
            opacity: 0.07,
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

    // ----------------------------------------------------
    // 6. Mouse Interactive Undulating Particle Wave Grid
    // ----------------------------------------------------
    const waveWidth = 70;
    const waveDepth = 70;
    const numWaveParticles = waveWidth * waveDepth;
    const waveGeo = new THREE.BufferGeometry();
    const wavePositions = new Float32Array(numWaveParticles * 3);
    const waveBasePositions = new Float32Array(numWaveParticles * 3);
    const waveColors = new Float32Array(numWaveParticles * 3);

    const cCyan = new THREE.Color(0x00f0ff);
    const cViolet = new THREE.Color(0x9d4edd);
    const cPink = new THREE.Color(0xff007f);

    let waveIdx = 0;
    for (let x = 0; x < waveWidth; x++) {
        for (let z = 0; z < waveDepth; z++) {
            const posX = (x - waveWidth / 2) * 1.85;
            const posY = -18;
            const posZ = (z - waveDepth / 2) * 1.85;

            wavePositions[waveIdx * 3] = posX;
            wavePositions[waveIdx * 3 + 1] = posY;
            wavePositions[waveIdx * 3 + 2] = posZ;

            waveBasePositions[waveIdx * 3] = posX;
            waveBasePositions[waveIdx * 3 + 1] = posY;
            waveBasePositions[waveIdx * 3 + 2] = posZ;

            const ratio = x / waveWidth;
            const mixColor = cCyan.clone().lerp(cViolet, ratio).lerp(cPink, Math.sin(z / waveDepth * Math.PI));
            waveColors[waveIdx * 3] = mixColor.r;
            waveColors[waveIdx * 3 + 1] = mixColor.g;
            waveColors[waveIdx * 3 + 2] = mixColor.b;

            waveIdx++;
        }
    }

    waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
    waveGeo.setAttribute('color', new THREE.BufferAttribute(waveColors, 3));

    const waveMat = new THREE.PointsMaterial({
        size: 2.3,
        map: particleTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const waveParticles = new THREE.Points(waveGeo, waveMat);
    scene.add(waveParticles);

    // ----------------------------------------------------
    // 7. Dynamic Ambient Floating 3D Starfield
    // ----------------------------------------------------
    const starCount = highPerformance ? 2400 : 1200;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
        const radius = 25 + Math.random() * 115;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        starPositions[i * 3 + 2] = radius * Math.cos(phi);

        const rand = Math.random();
        const col = rand > 0.6 ? cCyan : (rand > 0.3 ? cViolet : cPink);
        starColors[i * 3] = col.r;
        starColors[i * 3 + 1] = col.g;
        starColors[i * 3 + 2] = col.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
        size: 2.4,
        map: particleTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const starfield = new THREE.Points(starGeometry, starMaterial);
    scene.add(starfield);

    // ----------------------------------------------------
    // 8. Dynamic Shockwave Mesh Ring Helper
    // ----------------------------------------------------
    const shockwaveRipplesGroup = new THREE.Group();
    scene.add(shockwaveRipplesGroup);

    function spawnVisualShockwave(worldX, worldZ) {
        const ringGeo = new THREE.RingGeometry(0.5, 1.2, 32);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x00f0ff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.set(worldX, -18, worldZ);
        ringMesh.rotation.x = Math.PI / 2;
        shockwaveRipplesGroup.add(ringMesh);

        activeRipples.push({
            mesh: ringMesh,
            x: worldX,
            z: worldZ,
            radius: 1,
            maxRadius: 35,
            strength: 8
        });
    }

    // ----------------------------------------------------
    // 9. Shooting Stars / Cosmic Comets System
    // ----------------------------------------------------
    const comets = [];
    function createComet() {
        if (comets.length > 5) return;
        const cometGeo = new THREE.BufferGeometry();
        const startX = (Math.random() - 0.5) * 120;
        const startY = 40 + Math.random() * 25;
        const startZ = (Math.random() - 0.5) * 45;

        const points = [
            new THREE.Vector3(startX, startY, startZ),
            new THREE.Vector3(startX - 14, startY - 14, startZ)
        ];
        cometGeo.setFromPoints(points);

        const cometMat = new THREE.LineBasicMaterial({
            color: Math.random() > 0.5 ? 0x00f0ff : 0xff007f,
            transparent: true,
            opacity: 0.95
        });

        const cometMesh = new THREE.Line(cometGeo, cometMat);
        scene.add(cometMesh);
        comets.push({
            mesh: cometMesh,
            vx: -0.9 - Math.random() * 0.5,
            vy: -0.9 - Math.random() * 0.5,
            life: 1.0
        });
    }

    setInterval(createComet, 2000);

    // ----------------------------------------------------
    // 10. Mouse Interaction & Screen Unprojection
    // ----------------------------------------------------
    window.addEventListener('mousemove', (e) => {
        rawMouseX = e.clientX;
        rawMouseY = e.clientY;

        normMouseX = (e.clientX / window.innerWidth) * 2 - 1;
        normMouseY = -(e.clientY / window.innerHeight) * 2 + 1;

        mouseVelocityX = e.clientX - lastMouseX;
        mouseVelocityY = e.clientY - lastMouseY;

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        targetX = normMouseX * 0.5;
        targetY = normMouseY * 0.5;
    });

    // Handle Click Shockwaves
    window.addEventListener('click', (e) => {
        // Exclude UI control elements
        if (e.target.closest('#hud-control-dock, .theme-btn, .modal-container, a, button, input')) return;

        // Unproject screen coordinates to 3D world space
        const vector = new THREE.Vector3(normMouseX, normMouseY, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = (-18 - camera.position.y) / dir.y;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));

        spawnVisualShockwave(pos.x, pos.z);
    });

    let currentScroll = 0;
    window.addEventListener('scroll', () => {
        currentScroll = window.scrollY;
    });

    // ----------------------------------------------------
    // 11. Main WebGL Animation Loop
    // ----------------------------------------------------
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Smooth camera mouse parallax lerp
        camera.position.x += (targetX * 6 - camera.position.x) * 0.04;
        camera.position.y += (targetY * 4 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

        // Mode-specific Object Animations
        if (currentMode === 'cosmic') {
            planetMesh.rotation.x = elapsed * 0.07 + targetY * 0.5;
            planetMesh.rotation.y = elapsed * 0.1 + targetX * 0.5;

            coreMesh.rotation.x = -elapsed * 0.14;
            coreMesh.rotation.y = -elapsed * 0.18;

            ring1.rotation.z = elapsed * 0.09;
            ring2.rotation.z = -elapsed * 0.07;
            ring3.rotation.z = elapsed * 0.05;
        } else if (currentMode === 'quantum') {
            qCoreMesh.rotation.x = elapsed * 0.35 + targetY * 0.8;
            qCoreMesh.rotation.y = elapsed * 0.45 + targetX * 0.8;
            const qScale = 1 + Math.sin(elapsed * 2) * 0.15;
            qCoreMesh.scale.set(qScale, qScale, qScale);
        } else if (currentMode === 'cyber') {
            gridHelperTop.rotation.y = elapsed * 0.05 + targetX * 0.3;
            gridHelperBottom.rotation.y = elapsed * 0.05 + targetX * 0.3;
        }

        // Pulse Nebulae
        nebulae.forEach((neb, idx) => {
            const scale = 1 + Math.sin(elapsed * neb.speed + idx) * 0.18;
            neb.mesh.scale.set(scale, scale, scale);
        });

        // Update Shockwave Ripples
        for (let i = activeRipples.length - 1; i >= 0; i--) {
            const r = activeRipples[i];
            r.radius += 0.6;
            r.mesh.scale.set(r.radius, r.radius, 1);
            r.mesh.material.opacity = Math.max(0, 1 - (r.radius / r.maxRadius));

            if (r.radius >= r.maxRadius) {
                shockwaveRipplesGroup.remove(r.mesh);
                r.mesh.geometry.dispose();
                r.mesh.material.dispose();
                activeRipples.splice(i, 1);
            }
        }

        // Update Undulating Wave Terrain with Mouse & Ripple Deformation
        const posAttr = waveParticles.geometry.attributes.position;
        let pIdx = 0;

        // Calculate Mouse 3D projection on wave plane
        const mouseWorldX = normMouseX * 35;
        const mouseWorldZ = -normMouseY * 35;

        for (let x = 0; x < waveWidth; x++) {
            for (let z = 0; z < waveDepth; z++) {
                const baseX = waveBasePositions[pIdx * 3];
                const baseZ = waveBasePositions[pIdx * 3 + 2];

                const u = x * 0.18 + elapsed * 1.3;
                const v = z * 0.18 + elapsed * 1.3;
                let yVal = -18 + Math.sin(u) * 2.6 + Math.cos(v) * 2.6;

                // Mouse Magnetic Wave Distortion
                if (mouseForceActive) {
                    const dx = baseX - mouseWorldX;
                    const dz = baseZ - mouseWorldZ;
                    const distSq = dx * dx + dz * dz;
                    if (distSq < 220) {
                        const dist = Math.sqrt(distSq);
                        const force = (1 - dist / Math.sqrt(220));
                        yVal += Math.sin(dist * 0.4 - elapsed * 5) * force * 4.5;
                    }
                }

                // Active Click Ripple Wave Impulses
                activeRipples.forEach(r => {
                    const rdx = baseX - r.x;
                    const rdz = baseZ - r.z;
                    const rDist = Math.sqrt(rdx * rdx + rdz * rdz);
                    const diff = Math.abs(rDist - r.radius * 1.5);
                    if (diff < 4) {
                        yVal += Math.sin((4 - diff) * Math.PI) * (1 - r.radius / r.maxRadius) * r.strength;
                    }
                });

                posAttr.setY(pIdx, yVal);
                pIdx++;
            }
        }
        posAttr.needsUpdate = true;

        // Floating Position based on Scroll
        const scrollFactor = currentScroll * 0.007;
        cosmicGroup.position.y = Math.sin(elapsed * 0.4) * 1.2 - scrollFactor;
        quantumGroup.position.y = Math.cos(elapsed * 0.4) * 1.2 - scrollFactor;

        // Rotate Starfield
        starfield.rotation.y = elapsed * 0.012 + targetX * 0.15;
        starfield.rotation.x = elapsed * 0.006 + targetY * 0.15;

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

    // ----------------------------------------------------
    // 12. Window Resize Handler
    // ----------------------------------------------------
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // ----------------------------------------------------
    // 13. Expose Global Controller for HUD Interface
    // ----------------------------------------------------
    window.ThreeEngine = {
        setMode: function (mode) {
            currentMode = mode;
            cosmicGroup.visible = (mode === 'cosmic');
            quantumGroup.visible = (mode === 'quantum');
            cyberGroup.visible = (mode === 'cyber');
        },
        toggleMouseForce: function () {
            mouseForceActive = !mouseForceActive;
            return mouseForceActive;
        },
        triggerRipple: function () {
            spawnVisualShockwave((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30);
        },
        getCurrentMode: function () {
            return currentMode;
        }
    };
});
