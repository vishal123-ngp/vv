let highestZ = 1;
class Paper {
    holdingpaper = false;
    preMouseX = 0;
    preMouseY = 0;
    mouseX = 0;
    mouseY = 0;
    velocityX = 0;
    velocityY = 0;
    currentPaperX = 0;
    currentPaperY = 0;
    paperElem = null;

    init(paperElem) {
        this.paperElem = paperElem;
        paperElem.addEventListener("mousedown", (e) => {
            this.holdingpaper = true;
            paperElem.style.zIndex = highestZ;
            highestZ += 1;
            if (e.button === 0) {
                this.preMouseX = e.clientX;
                this.preMouseY = e.clientY;
                // Get current transform if any
                const style = window.getComputedStyle(paperElem);
                const matrix = new DOMMatrixReadOnly(style.transform);
                this.currentPaperX = matrix.m41;
                this.currentPaperY = matrix.m42;
            }
        });
        document.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("mouseup", this.handleMouseUp);
    }

    handleMouseMove = (e) => {
        if (this.holdingpaper) {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.velocityX = this.mouseX - this.preMouseX;
            this.velocityY = this.mouseY - this.preMouseY;
            this.currentPaperX += this.velocityX;
            this.currentPaperY += this.velocityY;
            this.paperElem.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
            this.preMouseX = this.mouseX;
            this.preMouseY = this.mouseY;
        }
    };

    handleMouseUp = (e) => {
        this.holdingpaper = false;
    };
}

const paperElements = document.querySelectorAll(".paper");
paperElements.forEach((elem) => {
    const p = new Paper();
    p.init(elem);
});