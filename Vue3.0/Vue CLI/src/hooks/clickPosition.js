import { reactive, onMounted, onBeforeUnmount } from 'vue';

export default function() {
    const position = reactive({
        x: 0,
        y: 0
    });

    function savePosition(event) {
        position.x = event.pageX;
        position.y = event.pageY;
    }

    onMounted(() => {
        window.addEventListener("click", savePosition);
    })

    onBeforeUnmount(() => {
        window.removeEventListener("click", savePosition);
    })

    return position;
}