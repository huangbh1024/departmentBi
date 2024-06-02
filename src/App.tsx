import { HeaderComp } from './components/Header';
import { useWindowResize } from './utils/ui';
export const App = defineComponent({
  setup() {
    const { screenRef, calcRate, windowDraw, unWindowDraw } = useWindowResize();
    onMounted(() => {
      windowDraw();
      calcRate();
    });
    onUnmounted(unWindowDraw);
    return () => (
      <div ref={screenRef} class='h-full w-full'>
        <HeaderComp />
      </div>
    );
  },
});
