// src/serviceWorkerRegistration.js
export function register() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/service-worker.js`)
                .then(reg => console.log('SW registered:', reg))
                .catch(err => console.log('SW registration failed:', err));
        });
    }
}
