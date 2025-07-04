// Black Cube inspired scroll-controlled rotation
const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Cube with black material and subtle edges highlight
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.5, metalness: 0.9 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Edge lines
const edges = new THREE.EdgesGeometry(geometry);
const edgeLines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x111111 }));
scene.add(edgeLines);

// Lighting
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

function onScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = scrollY / docHeight; // 0 a 1
    const angle = progress * Math.PI * 4; // 2 voltas completas
    cube.rotation.y = angle;
    cube.rotation.x = angle * 0.6;
    edgeLines.rotation.copy(cube.rotation);
}
window.addEventListener('scroll', onScroll);
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
