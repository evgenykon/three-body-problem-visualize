function createCamera() {
    const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 1000);
    return camera;
}
function createRenderer() {
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance"
    });
    if (window.innerWidth < viewSize) {
        renderer.setSize(window.innerWidth, window.innerWidth);
    } else {
        renderer.setSize(viewSize, viewSize);
    }
    renderer.setClearColor(0xcccccc);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    return renderer;
}

function createLights() {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.castShadow = true; // Включаем тени для направленного света
    directionalLight.position.set(-15, 50, 15);
    return { ambientLight, directionalLight };
}

function createFloor(size) {
    const floorGeometry = new THREE.PlaneGeometry(size, size);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x888888,
        roughness: 0.8,
        metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2; // Поворачиваем плоскость горизонтально
    floor.position.y = 0;
    floor.receiveShadow = true; // Включаем тени для пола
    return floor;
}

function createGrid() {
    if (gridHelper) {
        scene.remove(gridHelper);
    }
    gridHelper = new THREE.GridHelper(gridConfig.size, gridConfig.divisions, gridConfig.colorCenterLine, gridConfig.colorGrid);
    if (typeof floor !== 'undefined') {
        gridHelper.position.y = floor.position.y + 0.01; // Немного выше пола
    } else {
        gridHelper.position.y = 0; // Если пола нет, просто немного выше нуля
    }
    scene.add(gridHelper);
}

function bindEvents() {
    window.addEventListener('resize', () => {
        if (window.innerWidth < viewSize) {
            renderer.setSize(window.innerWidth, window.innerWidth);
        } else {
            renderer.setSize(viewSize, viewSize);
        }
        //camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
}
