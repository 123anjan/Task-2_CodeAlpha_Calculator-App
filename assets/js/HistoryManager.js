/**
 * HistoryManager Class - Handles calculation history state, LocalStorage, and DOM previews.
 */
export class HistoryManager {
    constructor(tooltipContainerId, modalContainerId) {
        this.storageKey = 'calc_history';
        this.history = JSON.parse(localStorage.getItem(this.storageKey)) || [];
        this.tooltipContainer = document.getElementById(tooltipContainerId);
        this.modalContainer = document.getElementById(modalContainerId);
    }

    addRecord(record) {
        if (!record) return;
        this.history.unshift(record);
        if (this.history.length > 20) this.history.pop();
        this.save();
        this.render();
    }

    clearHistory() {
        this.history = [];
        localStorage.removeItem(this.storageKey);
        this.render();
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.history));
    }

    render(onSelectHistoryItem = null) {
        // Render Hover Tooltip List (Top 3)
        if (this.tooltipContainer) {
            this.tooltipContainer.innerHTML = '';
            if (this.history.length === 0) {
                this.tooltipContainer.innerHTML = '<li class="empty-msg">No recent history</li>';
            } else {
                this.history.slice(0, 3).forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<span>${item.expression}</span> <strong>${item.result}</strong>`;
                    this.tooltipContainer.appendChild(li);
                });
            }
        }

        // Render Full Slide-out Modal History List
        if (this.modalContainer) {
            this.modalContainer.innerHTML = '';
            if (this.history.length === 0) {
                this.modalContainer.innerHTML = '<p style="color:var(--text-secondary); text-align:center;">History is empty</p>';
            } else {
                this.history.forEach((item) => {
                    const div = document.createElement('div');
                    div.className = 'history-item';
                    div.innerHTML = `<span>${item.expression} =</span> <strong>${item.result}</strong>`;
                    
                    if (onSelectHistoryItem) {
                        div.addEventListener('click', () => onSelectHistoryItem(item.result));
                    }
                    this.modalContainer.appendChild(div);
                });
            }
        }
    }
}