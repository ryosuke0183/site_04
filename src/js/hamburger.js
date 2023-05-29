export default function (hamburgerNode, targetNode) {
    try {
        const HAMBURGER = hamburgerNode;
        const TARGET = targetNode;

        HAMBURGER.addEventListener('click', function () {
            TARGET.classList.toggle('js-clicked');
        });
    } catch (error) {
        console.log(error);
    }
}
