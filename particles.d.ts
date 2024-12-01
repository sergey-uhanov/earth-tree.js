declare interface Window {
  particlesJS: (id: string, config: string | object, callback?: () => void) => void;
}
declare module "particles.js" {
  const particlesJS: (id: string, config: object) => void;
  export { particlesJS };
}

declare const particlesJS: (id: string, config: object) => void;