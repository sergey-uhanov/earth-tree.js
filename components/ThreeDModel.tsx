"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const ThreeDModel: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
// Загружаем particles.js только на клиенте
    import("particles.js").then(() => {
      const particlesId = "particles-js";
      const particlesContainer = document.createElement("div");
      particlesContainer.id = particlesId;
      if (!window.WebGLRenderingContext) {
  particlesContainer.innerHTML = "Your browser doesn't support WebGL";
  return;
}
      particlesContainer.style.position = "absolute";
      particlesContainer.style.top = "0";
      particlesContainer.style.left = "0";
      particlesContainer.style.width = "100vw";
      particlesContainer.style.height = "100vh";
      particlesContainer.style.zIndex = "-1"; // Помещаем частички на фон
      document.body.appendChild(particlesContainer);
      window.particlesJS(particlesId, {
  "particles": {
    "number": {
      "value": 400,
      "density": {
        "enable": true,
        "value_area": 563.026832250177
      }
    },
    "color": {
      "value": "#ededa7"
    },
    "shape": {
      "type": "triangle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 3
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 2, 
        "opacity_min": 0.3,
        "sync": false
      }
    },
    "size": {
      "value": 1,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 500,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 0,
      "direction": "bottom",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 240.5118091298284,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "bubble"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 0.5
        }
      },
      "bubble": {
        "distance": 400,
        "size": 4,
        "duration": 0.3,
        "opacity": 1,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}
);
    //   fetch("/particlesjs-config.json")
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`Failed to load particles.js config: ${response.statusText}`);
    //     }
    //     return response.json();
    //   })
    //   .then((config) => {
    //     // Инициализация particles.js с загруженным конфигом
    //     window.particlesJS(particlesId, config);
    //   })
    //   .catch((error) => {
    //     console.error("Ошибка загрузки particles.js конфигурации:", error);
    //   });
     });
   
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.9,
      1000
    );
    camera.position.set(0, 2, 7);
camera.lookAt(0, -2, 0)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 5, -3);
    scene.add(light);

    // Загружаем модель
let earth: THREE.Object3D | null = null;

    // const loader = new GLTFLoader();
    // loader.load(
    //   "/models/earth/earth.glb", // Путь к модели
    //   (gltf) => {
    //     console.log("Модель земли загружена:", gltf); 
    //      earth = gltf.scene;
    //     earth.scale.set(1, 1, 1); // Масштаб модели
    //       scene.add(earth);
    //   },
    //   undefined,
    //   (error) => {
    //     console.error("Ошибка загрузки модели:", error);
    //   }
    // );
    // let moon: THREE.Object3D | null = null;

    // const loaderMoon = new GLTFLoader();
    // loaderMoon.load(
    //   "/models/moon/moon.glb", // Путь к модели
    //   (gltf) => {
    //     console.log("Модель луны загружена:", gltf); 
    //      moon = gltf.scene;
    //     moon.scale.set(0.5, 0.5, 0.5); // Масштаб модели
    //     moon.position.set(3, 0, 0); // Позиция модели
    //       scene.add(moon);
    //   },
    //   undefined,
    //   (error) => {
    //     console.error("Ошибка загрузки модели:", error);
    //   }
    // );

 
// Масштабирование сцены
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      // Изменяем масштаб камеры
      camera.zoom += event.deltaY * -0.001; // Увеличиваем/уменьшаем масштаб
      camera.zoom = Math.max(0.5, Math.min(5, camera.zoom)); // Ограничиваем зум
      camera.updateProjectionMatrix(); // Обновляем матрицу проекции
    };

    // Вращение сцены мышкой
    let isDragging = false;
    let previousMousePosition = { x: 200, y: 200 };

    const handleMouseDown = () => {
      isDragging = true;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y,
      };

      const rotationSpeed = 0.005;
      scene.rotation.y += deltaMove.x * rotationSpeed;
      scene.rotation.x += deltaMove.y * rotationSpeed;

      previousMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    // Анимация
    const animate = () => {
      requestAnimationFrame(animate);
      // if (earth) {
      //    earth.rotation.y -= 0.005;
      // }
     
      // if (moon) {
      //   moon.position.z = Math.sin(Date.now() / 1000) * 5;
      //   moon.position.x = Math.cos(Date.now() / 1000) * 5;
      //    moon.rotation.y += 0.005;
      // }
      renderer.render(scene, camera);
    };

    // Обработчики событий
    mountRef.current.addEventListener("mousedown", handleMouseDown);
    mountRef.current.addEventListener("mouseup", handleMouseUp);
    mountRef.current.addEventListener("mousemove", handleMouseMove);
    mountRef.current.addEventListener("wheel", handleWheel, { passive: false });

     animate();
    

    
    // Очистка
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
        mountRef.current.removeEventListener("mousedown", handleMouseDown);
        mountRef.current.removeEventListener("mouseup", handleMouseUp);
        mountRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "50vh" }} />;
};

export default ThreeDModel;
