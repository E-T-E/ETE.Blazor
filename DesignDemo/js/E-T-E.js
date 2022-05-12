var container;
var camera, scene, renderer;
var orbitControls, clock, delta;
let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

main();
sphere();
onWindowResize();
animate();

function main(){
    container = document.getElementById("canvasT");
    //创建一个新场景
    scene = new THREE.Scene();
    //给场景添加光源
    scene.add(new THREE.AmbientLight(0xbbbbbb, 0.3));

    //设置场景背景颜色
    scene.background = new THREE.Color(0x040d21);

    //添加一个透视相机
    camera = new THREE.PerspectiveCamera(30,
                  window.innerWidth/window.innerHeight, 1, 1000);

    var dLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dLight.position.set(-800, 2000, 400);
    camera.add(dLight);
    
    var dLight1 = new THREE.DirectionalLight(0x7982f6, 1);
    dLight1.position.set(-200, 500, 200);
    camera.add(dLight1);
    
    var dLight2 = new THREE.PointLight(0x8566cc, 0.5);
    dLight2.position.set(-200, 500, 200);
    camera.add(dLight2);

    camera.position.set(0, 0, 400);//设置相机位置
    camera.lookAt(new THREE.Vector3(0,0,400));//让相机指向原点
    scene.add(camera);

    //添加雾特效
    scene.fog = new THREE.Fog(0x535ef3, 400, 2000);

    //渲染
    //antialias:true增加抗锯齿效果
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);//设置窗口尺寸
    //将renderer关联到container，这个过程类似于获取canvas元素
    container.appendChild(renderer.domElement);
    //添加轨道控制器
    //新建一个轨道控制器
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    //添加阻尼感
    orbitControls.enableDamping = true;
    orbitControls.dynamicDampingFactor = 0.01;
    //禁用摄像机平移
    orbitControls.enablePan = false;
    //配置缩放范围
    orbitControls.minDistance = 200;
    orbitControls.maxDistance = 500;
    //旋转速度
    orbitControls.rotateSpeed = 0.08;
    //缩放速度
    orbitControls.zoomSpeed = 1;
    //关闭自动旋转
    orbitControls.autoRotate = false;    
    //垂直旋转的角度的上\下限
    orbitControls.minPolarAngle = Math.PI / 3.5;
    orbitControls.maxPolarAngle = Math.PI - Math.PI / 3;

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener("mousemove", onMouseMove);
}

//创建一个球
function sphere(){
    //创建球体
    var sphereGeo = new THREE.SphereGeometry(60, 40, 40);

    //创建材质
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('https://cdn.binla.site/world.jpg');
    var sphereMat = new THREE.MeshLambertMaterial({
        map: texture,
        overdraw: .5,
        transparent: true,
        side: THREE.DoubleSide
    });

    var sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);//创建球体网格模型
    sphereMesh.position.set(0, 0, 0);//设置球的坐标
    scene.add(sphereMesh);//将球体添加到场景
}

function onMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
    // console.log("x: " + mouseX + " y: " + mouseY);
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    windowHalfX = window.innerWidth / 1.5;
    windowHalfY = window.innerHeight / 1.5;
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate() {
    camera.position.x +=
      Math.abs(mouseX) <= windowHalfX / 2
        ? (mouseX / 2 - camera.position.x) * 0.005
        : 0;
    camera.position.y += (-mouseY / 2 - camera.position.y) * 0.005;
    camera.lookAt(scene.position);
    orbitControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}