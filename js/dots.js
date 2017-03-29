var camera, scene, renderer;

function init() {
	var container = document.createElement('background');
	container.style.position = 'fixed';
	container.style.zIndex = '-5';
	container.style.zoom = 1.0 / window.devicePixelRatio;
	document.body.appendChild(container);
	
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(0, 300, 500);

	scene = new THREE.Scene();

	for (let i = 0; i < window.innerWidth / 20; i ++) {
		var particle = new THREE.Particle(new THREE.ParticleCanvasMaterial({
			color: Math.random() * 0x808080 + 0x808080,
			program: function(context){
                context.beginPath();
                context.arc(0, 0, 1, 0, Math.PI * 2, true);
                context.closePath();
                context.fill();
			}}));
		particle.position.x = Math.random() * 800 - 400;
		particle.position.y = Math.random() * 800 - 400;
		particle.position.z = Math.random() * 800 - 400;
		particle.scale.x = particle.scale.y = Math.random() * 4 + 4;
		scene.add(particle);
	}
	renderer = new THREE.CanvasRenderer();
	renderer.setSize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
	container.appendChild(renderer.domElement);
	window.addEventListener('resize', function (camera, renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        renderer.setSize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
    }, false);
}

var radius = 800;
var theta = 0;

function animate() {
	requestAnimationFrame(animate);
    // rotate camera
    theta += 0.04 + 0.1 * (1674 / (window.innerWidth * window.devicePixelRatio));

    camera.position.x = radius * Math.sin( theta * Math.PI / 360 );
    camera.position.y = radius * Math.sin( theta * Math.PI / 360 );
    camera.position.z = radius * Math.cos( theta * Math.PI / 360 );
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

init();
animate();