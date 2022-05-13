var container;
var camera, scene, renderer;

var sphereMesh;

var mouse = new THREE.Vector2;

var me = false
var isStop = false;
var we = true;

var viewX = 0;
var be = 0;
var x = 500;
var j = 1e3;

var PI_HALF = Math.PI / 2;

var pos = {
    x: 0,
    y: 0
};
var rotation = {
    x: 0,
    y: 0
};
var target = {
  x: 2.1 * Math.PI,
  y: Math.PI / 4.5
};
var p = {
    x: 0,
    y: 0
};

main();
sphere();
var a = 6.98;
addSharp(a, a, 15 * a, 0, 0, "Binla");
var b = 15;
addSharp(100, 0, 0, 180, 90, "Test");

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

    var dLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dLight.position.set(-1000, 100, 100);
    camera.add(dLight);
    
    var dLight1 = new THREE.DirectionalLight(0x7982f6, 1.5);
    dLight1.position.set(-2000, 2500, 1500);
    camera.add(dLight1);
    
    var dLight2 = new THREE.PointLight(0x8566cc, 0.05);
    dLight2.position.set(-200, 500, 200);
    camera.add(dLight2);

    camera.position.set(0, 0, 400);//设置相机位置
    camera.lookAt(new THREE.Vector3(0,0,0));//让相机指向原点
    scene.add(camera);

    //添加雾特效
    scene.fog = new THREE.Fog(0x535ef3, 400, 2000);

    //渲染
    //antialias:true增加抗锯齿效果
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);//设置窗口尺寸
    //将renderer关联到container，这个过程类似于获取canvas元素
    container.appendChild(renderer.domElement);

    container.addEventListener("mousedown", onMouseDown, false);
    container.addEventListener("mouseleave", onMouseOut, false);
    container.addEventListener("mousemove", onMouseMove, false);
    container.addEventListener("touchmove", move, false);
    window.addEventListener('resize', onWindowResize, false);
}

//创建一个球
function sphere(){
    //创建球体
    var sphereGeo = new THREE.SphereGeometry(100, 40, 40);
    //创建材质
    var sphereMat = new THREE.MeshLambertMaterial({color: 0x3b1066});
    sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);//创建球体网格模型
    sphereMesh.position.set(0, 0, 0);//设置球的坐标
    scene.add(sphereMesh);//将球体添加到场景
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseDown(event) {
    event.preventDefault();
    me = true;
    container.addEventListener("mouseup", onMouseUp, false);
    pos.x = -event.clientX;
    pos.y = event.clientY;
    p.x = target.x;
    p.y = target.y;
    container.style.cursor = "move";
}
var onMouseOut = function () {
    onMouseUp();
};
function onMouseUp() {
    me = false;
    container.removeEventListener("mouseup", onMouseUp, false);
    container.style.cursor = "auto";
}
function onMouseMove(event) {
    if (me) {
      mouse.x = -event.clientX;
      mouse.y = event.clientY;
      var t = j / 1e3;
      target.x = p.x + .005 * (mouse.x - pos.x) * t;
      target.y = p.y + .005 * (mouse.y - pos.y) * t;
      target.y = target.y > PI_HALF ? PI_HALF : target.y;
      target.y = target.y < -PI_HALF ? -PI_HALF : target.y;
    } else {
      update(event);
    }
}
function update(event) {
}
function move(event) {
    if (event.preventDefault(), me) {
      var touches = event.changedTouches;
      var i = 0;
      for (; i < touches.length; i++) {
        mouse.x = -touches[ i ].pageX;
        mouse.y = touches[ i ].pageY;
      }
      var t = j / 1e3;
      target.x = p.x + .005 * (mouse.x - pos.x) * t;
      target.y = p.y + .005 * (mouse.y - pos.y) * t;
      target.y = target.y > PI_HALF ? PI_HALF : target.y;
      target.y = target.y < -PI_HALF ? -PI_HALF : target.y;
    }
    return false;
}

function applyForEach(viewX) {
    x = x - viewX;
    x = x > 1e3 ? 1e3 : x;
    x = x < 350 ? 350 : x;
}

function animate() {
    if (!isStop) {
        applyForEach(viewX);
        if (we) {
            if (be === target.x + target.y) {
              target.x -= .005;
            } else {
              be = target.x + target.y;
            }
            rotation.x += .1 * (target.x - rotation.x);
            rotation.y += .1 * (target.y - rotation.y);
            j = j + .3 * (x - j);
            camera.position.x = j * Math.sin(rotation.x) * Math.cos(rotation.y);
            camera.position.y = j * Math.sin(rotation.y);
            camera.position.z = j * Math.cos(rotation.x) * Math.cos(rotation.y);
        }
        camera.lookAt(sphereMesh.position);
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
}

function addSharp(xPosition, yPosition, zPosition, rotationX, rotationY, title) {
    const x = 0, y = 0;

    const heartShape = new THREE.Shape();
    heartShape.moveTo( x + 5, y + 5 );
    heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
    heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
    heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
    heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
    heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
    heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

    const geometry = new THREE.ShapeGeometry( heartShape );
    const material = new THREE.MeshBasicMaterial( { color: 0xe13304 } );
    
    var r = new THREE.Mesh(geometry, material);
    r.position.set(xPosition, yPosition, zPosition);
    r.rotation.x = THREE.Math.degToRad(rotationX);
    r.rotation.y = THREE.Math.degToRad(rotationY);
    r.name = "destory-area target=" + title;
    scene.add(r);
  }