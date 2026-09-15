export class ThemeManager {
    constructor(toggleElementId) {
        this.toggle = document.getElementById(toggleElementId);
        this.storageKey = 'calc_theme';
        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem(this.storageKey) || 'dark';
        this.applyTheme(savedTheme);

        if (this.toggle) {
            this.toggle.checked = savedTheme === 'dark';
            this.toggle.addEventListener('change', (e) => {
                const theme = e.target.checked ? 'dark' : 'light';
                this.applyTheme(theme);
            });
        }
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.storageKey, theme);
    }
}