var container;
var camera, scene, projector, renderer, pointCount;
var screenWidth;

var PI2 = Math.PI * 2;

var programFill = function ( context ) {
	context.beginPath();
	context.arc( 0, 0, 1, 0, PI2, true );
	context.closePath();
	context.fill();
}

init();
animate();

function init() {
	container = document.createElement( 'div' );
	container.id = 'bgc';
	container.style.position = 'fixed';
	container.style.zIndex = '-5';
	document.body.appendChild( container );
	
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 0, 300, 500 );

	scene = new THREE.Scene();
	
	screenWidth = document.body.offsetWidth;

	for ( var i = 0; i < 1.5 * screenWidth / 20; i ++ ) {
		var particle = new THREE.Particle( new THREE.ParticleCanvasMaterial( { color: Math.random() * 0x808080 + 0x808080, program: programFill } ) );
		particle.position.x = Math.random() * 800 - 400;
		particle.position.y = Math.random() * 800 - 400;
		particle.position.z = Math.random() * 800 - 400;
		particle.scale.x = particle.scale.y = Math.random() * 4 + 4;
		scene.add( particle );
	}
	projector = new THREE.Projector();
	renderer = new THREE.CanvasRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}


function animate() {
	requestAnimationFrame( animate );
	render();
}

var radius = 800;
var theta = 0;

function render() {
	// rotate camera
	theta += 0.04 + 0.1 * (1674 / screenWidth);

	camera.position.x = radius * Math.sin( theta * Math.PI / 360 );
	camera.position.y = radius * Math.sin( theta * Math.PI / 360 );
	camera.position.z = radius * Math.cos( theta * Math.PI / 360 );
	camera.lookAt( scene.position );

	renderer.render( scene, camera );

}