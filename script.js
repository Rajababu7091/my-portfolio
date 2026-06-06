$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Full stack Developer", "Data Analyst", "Freelancer", "Software Engineer", "Problem Solver"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed2 = new Typed(".typing-2", {
        strings: ["Full stack Developer", "Data Analyst", "Freelancer", "Software Engineer", "Problem Solver"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});

// --- 3D Effects added ---

// 1. Vanilla Tilt
VanillaTilt.init(document.querySelectorAll(".card, .about-content .left img, .contact-content .row"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    scale: 1.05
});

// 2. Scroll Reveal
ScrollReveal({ 
    reset: false,
    distance: '60px',
    duration: 2000,
    delay: 200
});
ScrollReveal().reveal('.home-content .text-2, .title, .about-content .right', { origin: 'top' });
ScrollReveal().reveal('.home-content .text-3, .about-content .left img, .contact-content .left', { origin: 'left' });
ScrollReveal().reveal('.serv-content .card, .skills-content .right, .contact-content .right', { origin: 'bottom' });

// 3. Dynamic Three.js Sections
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 30;

    // SCENES GROUPS
    const homeGroup = new THREE.Group();
    const aboutGroup = new THREE.Group();
    const skillsGroup = new THREE.Group();
    const educationGroup = new THREE.Group(); // New separate 3D element for education
    const projectsGroup = new THREE.Group();
    const contactGroup = new THREE.Group();

    scene.add(homeGroup);
    scene.add(aboutGroup);
    scene.add(skillsGroup);
    scene.add(educationGroup);
    scene.add(projectsGroup);
    scene.add(contactGroup);

    // --- HOME: Particle Galaxy ---
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1200;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    const colorCyan = new THREE.Color('#00f2fe');
    const colorPurple = new THREE.Color('#9b51e0');
    const colorPink = new THREE.Color('#ff007f');
    
    for(let i = 0; i < particlesCount * 3; i+=3) {
        posArray[i] = (Math.random() - 0.5) * 120;
        posArray[i+1] = (Math.random() - 0.5) * 120;
        posArray[i+2] = (Math.random() - 0.5) * 120;
        
        const mixedColor = new THREE.Color();
        const rand = Math.random();
        if (rand < 0.4) {
            mixedColor.copy(colorCyan);
        } else if (rand < 0.8) {
            mixedColor.copy(colorPurple);
        } else {
            mixedColor.copy(colorPink);
        }
        
        colorArray[i] = mixedColor.r;
        colorArray[i+1] = mixedColor.g;
        colorArray[i+2] = mixedColor.b;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.25, vertexColors: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    homeGroup.add(particlesMesh);

    // --- ABOUT: Torus Knot ---
    const torusGeometry = new THREE.TorusKnotGeometry(9, 2.5, 120, 16);
    const torusMaterial = new THREE.MeshBasicMaterial({ color: 0x9b51e0, wireframe: true, transparent: true, opacity: 0.25 });
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    aboutGroup.add(torusMesh);
    torusMesh.position.set(13, 0, -10); // Offset to the right side where empty space is usually

    // --- SKILLS: Floating Cubes ---
    for(let i=0; i<30; i++) {
        const boxGeo = new THREE.BoxGeometry(2, 2, 2);
        const color = i % 2 === 0 ? 0x00f2fe : 0x9b51e0;
        const boxMat = new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.5 });
        const box = new THREE.Mesh(boxGeo, boxMat);
        box.position.set((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 60);
        box.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        skillsGroup.add(box);
    }
    
    // --- EDUCATION: Floating Octahedrons ---
    for(let i=0; i<25; i++) {
        const octGeo = new THREE.OctahedronGeometry(2);
        const color = i % 2 === 0 ? 0x9b51e0 : 0xff007f;
        const octMat = new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.4 });
        const oct = new THREE.Mesh(octGeo, octMat);
        oct.position.set((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 60);
        oct.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        educationGroup.add(oct);
    }

    // --- PROJECTS: Animated Wireframe Wave ---
    const waveGeometry = new THREE.PlaneGeometry(120, 100, 30, 30);
    const waveMaterial = new THREE.MeshBasicMaterial({ color: 0x00f2fe, wireframe: true, transparent: true, opacity: 0.15 });
    const waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
    waveMesh.rotation.x = -Math.PI / 2;
    waveMesh.position.y = -15;
    projectsGroup.add(waveMesh);

    // --- CONTACT: Network Nodes ---
    const networkGeo = new THREE.BufferGeometry();
    const networkCount = 300;
    const netPos = new Float32Array(networkCount * 3);
    const netColors = new Float32Array(networkCount * 3);
    for(let i=0; i<networkCount*3; i+=3) {
        netPos[i] = (Math.random() - 0.5) * 80;
        netPos[i+1] = (Math.random() - 0.5) * 80;
        netPos[i+2] = (Math.random() - 0.5) * 80;
        
        const mixedColor = new THREE.Color();
        if (Math.random() < 0.5) {
            mixedColor.copy(colorCyan);
        } else {
            mixedColor.copy(colorPurple);
        }
        netColors[i] = mixedColor.r;
        netColors[i+1] = mixedColor.g;
        netColors[i+2] = mixedColor.b;
    }
    networkGeo.setAttribute('position', new THREE.BufferAttribute(netPos, 3));
    networkGeo.setAttribute('color', new THREE.BufferAttribute(netColors, 3));
    const networkMat = new THREE.PointsMaterial({
        size: 0.3, vertexColors: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending
    });
    const networkMesh = new THREE.Points(networkGeo, networkMat);
    contactGroup.add(networkMesh);

    // Initial state
    const allGroups = [homeGroup, aboutGroup, skillsGroup, educationGroup, projectsGroup, contactGroup];
    let currentGroup = homeGroup;
    allGroups.forEach(g => { if(g !== currentGroup) g.visible = false; });

    // Intersection Observer for Sections
    const sections = ['home', 'about', 'services', 'skills', 'projects', 'contact'];
    const groupMapping = {
        'home': homeGroup,
        'about': aboutGroup,
        'services': skillsGroup,
        'skills': educationGroup, // Maps specifically to the octohedrons
        'projects': projectsGroup,
        'contact': contactGroup
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                const newGroup = groupMapping[targetId] || homeGroup;
                if (newGroup !== currentGroup) {
                    currentGroup.visible = false;
                    newGroup.visible = true;
                    currentGroup = newGroup;
                }
            }
        });
    }, { threshold: 0.25 });

    sections.forEach(id => {
        const el = document.getElementById(id);
        if(el) observer.observe(el);
    });

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Animation loop
    const clock = new THREE.Clock();
    
    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        const targetX = mouseX * 0.001;
        const targetY = mouseY * 0.001;

        // Animate based on active group
        if (currentGroup === homeGroup) {
            particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
            particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);
            particlesMesh.rotation.z = -0.1 * elapsedTime;
            particlesMesh.position.y = Math.sin(elapsedTime * 0.5) * 2;
        }

        if (currentGroup === aboutGroup) {
            torusMesh.rotation.x += 0.005;
            torusMesh.rotation.y += 0.01;
            torusMesh.position.y = Math.sin(elapsedTime) * 2;
        }

        if (currentGroup === skillsGroup) {
            skillsGroup.children.forEach((box, i) => {
                box.rotation.x += 0.005 * (i % 2 === 0 ? 1 : -1);
                box.rotation.y += 0.01;
            });
            skillsGroup.rotation.y += 0.01 * (targetX - skillsGroup.rotation.y);
        }
        
        if (currentGroup === educationGroup) {
            educationGroup.children.forEach((oct, i) => {
                oct.rotation.x += 0.005 * (i % 2 === 0 ? -1 : 1);
                oct.rotation.y += 0.008;
            });
            educationGroup.rotation.x += 0.01 * (targetY - educationGroup.rotation.x);
        }

        if (currentGroup === projectsGroup) {
            const positions = waveGeometry.attributes.position;
            for(let i=0; i<positions.count; i++) {
                const u = i % 31;
                const v = Math.floor(i / 31);
                positions.setZ(i, Math.sin(u * 0.5 + elapsedTime * 2) * 2 + Math.cos(v * 0.5 + elapsedTime * 2) * 2);
            }
            positions.needsUpdate = true;
            waveMesh.rotation.z = targetX * 0.5;
        }

        if (currentGroup === contactGroup) {
            networkMesh.rotation.y = elapsedTime * 0.1;
            networkMesh.position.x += 0.05 * (targetX * 10 - networkMesh.position.x);
            networkMesh.position.y += 0.05 * (-targetY * 10 - networkMesh.position.y);
        }

        renderer.render(scene, camera);
    }
    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
