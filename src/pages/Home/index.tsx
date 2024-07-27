import { WrapComp } from '@/components/Wrap';
import { StandardProjectComp, MajorProjectComp, WorkOvertimeComp } from './components';
import type { HomeCompExpose } from '@/types';
import { doRefreshAllData } from '@/apis';

export const HomePage = defineComponent({
  setup() {
    const mjorProjectRef = ref<HomeCompExpose>(null);
    const standardProjectRef = ref<HomeCompExpose>(null);
    const workOvertimeRef = ref<HomeCompExpose>(null);

    const renderTimer = ref<number | null>(null);

    const refresh = () => {
      doRefreshAllData();
      mjorProjectRef.value?.init();
      standardProjectRef.value?.init();
      workOvertimeRef.value?.init();
    };
    onMounted(() => {
      clearInterval(renderTimer.value);
      renderTimer.value = null;
      renderTimer.value = setInterval(() => refresh, 3600000);
    });
    onUnmounted(() => {
      clearInterval(renderTimer.value);
      renderTimer.value = null;
    });

    const test = '1';
    window.console.log(test);

    return () => (
      <div class='flex flex-wrap justify-between items-start content-start h-full p-14px'>
        <div class='flex flex-col justify-between items-center h-89vh w-[calc(100%/3-10px)]'>
          <WrapComp title='重大项目进展'>
            <MajorProjectComp ref={mjorProjectRef} />
          </WrapComp>
        </div>
        <div class='flex flex-col justify-between items-center h-89vh w-[calc(100%/3-10px)]'>
          <WrapComp title='标准品项目进展'>
            <StandardProjectComp ref={standardProjectRef} />
          </WrapComp>
        </div>
        <div class='flex flex-col justify-between items-center h-89vh w-[calc(100%/3-10px)]'>
          <WrapComp title='人员加班时长'>
            <WorkOvertimeComp ref={workOvertimeRef} />
          </WrapComp>
        </div>
      </div>
    );
  },
});
