import { HeaderComp } from './components/Header';
import { WrapComp } from './components/Wrap';
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
        <div class='flex flex-wrap justify-between items-start content-start h-full p-14px'>
          <div class='flex flex-col justify-between items-center h-89vh w-[calc(100%/3-10px)]'>
            <WrapComp title='重大项目进展' />
          </div>
          <div class='flex flex-col justify-between items-center h-89vh w-[calc(100%/3-10px)]'>
            <WrapComp title='标准品项目进展' />
          </div>
          <div class='flex flex-col justify-between items-center h-89vh w-[calc(100%/3-10px)]'>
            <WrapComp title='人员加班时长' />
          </div>
        </div>
      </div>
    );
  },
});
