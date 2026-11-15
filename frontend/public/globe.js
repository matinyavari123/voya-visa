/**
 * کره‌ی سه‌بعدی هیرو با نوار «VOYA VISA» دور آن.
 * اگر WebGL نباشد یا three بارگذاری نشود، عکس داخل ظرف سر جایش می‌ماند.
 */
(function () {
  "use strict";

  var SAGE = 0xc9d3a0;
  var ROSE = "#C21A6B";
  var ROSE_LIGHT = "#F06AA8";

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  /** بافت نوار: گرادیان سرخابی با نوشته‌ی VOYA VISA */
  function ribbonTexture(THREE) {
    var c = document.createElement("canvas");
    c.width = 1024;
    c.height = 192;
    var g = c.getContext("2d");

    var grad = g.createLinearGradient(0, 0, 0, c.height);
    grad.addColorStop(0, ROSE_LIGHT);
    grad.addColorStop(0.45, ROSE);
    grad.addColorStop(1, "#8E1150");
    g.fillStyle = grad;
    g.fillRect(0, 0, c.width, c.height);

    g.fillStyle = "rgba(255,255,255,0.25)";
    g.fillRect(0, 0, c.width, 8);
    g.fillStyle = "rgba(0,0,0,0.2)";
    g.fillRect(0, c.height - 9, c.width, 9);

    g.fillStyle = "#FFFFFF";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.letterSpacing = "10px";
    g.font = '700 72px "Helvetica Neue", Arial, sans-serif';
    g.fillText("VOYA VISA", c.width / 2, c.height / 2 + 2);

    var tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.repeat.x = 3;
    tex.anisotropy = 8;
    return tex;
  }

  function build(THREE, host, mapUrl) {
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (err) {
      return null;
    }
    if (!renderer.context && !renderer.getContext()) return null;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.domElement.style.cssText = "display:block;width:100%;height:100%";
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.setAttribute("aria-label", "کره‌ی زمین سه‌بعدی با نوار ویا ویزا");

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(34, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(0, 0.45, 5.1);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.68));
    var key = new THREE.DirectionalLight(0xffffff, 0.85);
    key.position.set(-3, 2.5, 4);
    scene.add(key);
    var rim = new THREE.DirectionalLight(0xf06aa8, 0.5);
    rim.position.set(3.5, -1, -2.5);
    scene.add(rim);

    var group = new THREE.Group();
    group.rotation.z = -0.22;
    // نمای اول روی اقیانوس اطلس: آمریکا و اروپا هر دو پیدا هستند
    group.rotation.y = -0.96;
    scene.add(group);

    // کره
    var earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 72, 54),
      new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 14, specular: 0x203c33 }),
    );
    group.add(earth);

    new THREE.TextureLoader().load(mapUrl, function (tex) {
      tex.anisotropy = 8;
      earth.material.map = tex;
      earth.material.color.setHex(0xffffff);
      earth.material.needsUpdate = true;
    });

    // هاله‌ی دور کره
    var halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.14, 48, 36),
      new THREE.MeshBasicMaterial({
        color: SAGE,
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    group.add(halo);

    // نوار دور کره: یک استوانه‌ی باز و ناقص، تا جا برای سرپیکان بماند
    var ARC = Math.PI * 1.58;
    var R = 1.12;
    var END = 0.95; // زاویه‌ای که سرپیکان آن‌جا تمام می‌شود: جلو، کمی سمت راست
    var START = END - ARC;
    var band = new THREE.Group();
    band.rotation.set(0.26, 0, 0.44);
    group.add(band);

    band.add(
      new THREE.Mesh(
        new THREE.CylinderGeometry(R, R, 0.34, 160, 1, true, START, ARC),
        new THREE.MeshPhongMaterial({
          map: ribbonTexture(THREE),
          side: THREE.DoubleSide,
          shininess: 30,
          specular: 0x552038,
        }),
      ),
    );

    // سرپیکان: یک مثلث تخت، در همان صفحه‌ی نوار و مماس بر انتهای آن
    var tip = new THREE.Vector3(Math.cos(END), 0, -Math.sin(END)).normalize();
    var base = new THREE.Vector3(Math.sin(END) * R, 0, Math.cos(END) * R);
    var up = new THREE.Vector3(0, 1, 0);
    var HALF = 0.3;
    var LEN = 0.44;
    var a = base.clone().addScaledVector(up, HALF);
    var bb = base.clone().addScaledVector(up, -HALF);
    var cc = base.clone().addScaledVector(tip, LEN);

    var arrow = new THREE.BufferGeometry();
    arrow.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([a.x, a.y, a.z, bb.x, bb.y, bb.z, cc.x, cc.y, cc.z], 3),
    );
    arrow.computeVertexNormals();
    band.add(
      new THREE.Mesh(
        arrow,
        new THREE.MeshPhongMaterial({
          color: 0xd41f78,
          side: THREE.DoubleSide,
          shininess: 26,
          specular: 0x552038,
        }),
      ),
    );

    // پرچم کشورهای پرطرفدار، روی سطح کره
    var markers = [];
    try {
      markers = JSON.parse(host.getAttribute("data-markers") || "[]");
    } catch (err) {
      markers = [];
    }

    function latLonToVec3(lat, lon, r) {
      var phi = ((90 - lat) * Math.PI) / 180;
      var theta = ((lon + 180) * Math.PI) / 180;
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta),
      );
    }

    var loader = new THREE.TextureLoader();
    var pins = []; // برای محو شدن تدریجی در لبه‌ی کره
    markers.forEach(function (m) {
      var surface = latLonToVec3(m.lat, m.lon, 1.005);
      // کشورهایی که کنار هم‌اند با ارتفاع متفاوت از هم جدا می‌شوند
      var top = latLonToVec3(m.lat, m.lon, 1.17 + (m.lift || 0));

      var dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 12, 10),
        new THREE.MeshBasicMaterial({ color: 0xc21a6b, transparent: true }),
      );
      dot.position.copy(surface);
      group.add(dot);

      var line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([surface, top]),
        new THREE.LineBasicMaterial({ color: 0xf06aa8, transparent: true, opacity: 0.8 }),
      );
      group.add(line);

      var entry = { normal: surface.clone().normalize(), parts: [dot.material, line.material] };
      pins.push(entry);

      loader.load(m.flag, function (tex) {
        tex.anisotropy = 8;
        var flag = new THREE.Sprite(
          new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: true }),
        );
        flag.scale.set(0.22, 0.147, 1);
        flag.position.copy(top).addScaledVector(entry.normal, 0.075);
        group.add(flag);
        entry.parts.push(flag.material);
      });
    });

    var worldNormal = new THREE.Vector3();
    function fadePins() {
      for (var i = 0; i < pins.length; i++) {
        worldNormal.copy(pins[i].normal).applyQuaternion(group.quaternion);
        // ۱ یعنی رو به دوربین، ۰ یعنی پشت کره
        var facing = THREE.MathUtils.smoothstep(worldNormal.z, -0.15, 0.3);
        for (var j = 0; j < pins[i].parts.length; j++) {
          pins[i].parts[j].opacity = facing;
          pins[i].parts[j].visible = facing > 0.02;
        }
      }
    }

    host.appendChild(renderer.domElement);

    var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var spin = 0.0042;
    var dragging = false;
    var lastX = 0;
    var velocity = 0;

    renderer.domElement.style.touchAction = "pan-y";
    renderer.domElement.addEventListener("pointerdown", function (e) {
      dragging = true;
      lastX = e.clientX;
      renderer.domElement.setPointerCapture(e.pointerId);
    });
    renderer.domElement.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      velocity = (e.clientX - lastX) * 0.005;
      group.rotation.y += velocity;
      lastX = e.clientX;
    });
    ["pointerup", "pointercancel"].forEach(function (ev) {
      renderer.domElement.addEventListener(ev, function () {
        dragging = false;
      });
    });

    var visible = true;
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
      }).observe(host);
    }

    function resize() {
      var w = host.clientWidth;
      var h = host.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", resize);
    resize();

    function frame() {
      requestAnimationFrame(frame);
      if (!visible) return;
      if (!dragging) {
        if (Math.abs(velocity) > 0.0005) {
          group.rotation.y += velocity;
          velocity *= 0.94;
        } else if (!still) {
          group.rotation.y += spin;
        }
      }
      fadePins();
      renderer.render(scene, camera);
    }
    frame();
    return renderer;
  }

  ready(function () {
    var host = document.getElementById("voya-globe");
    if (!host || !window.THREE) return;
    var mapUrl = host.getAttribute("data-map");
    if (!mapUrl) return;
    var fallback = host.querySelector("[data-globe-fallback]");
    var ok = build(window.THREE, host, mapUrl);
    if (ok && fallback) fallback.remove();
  });
})();
