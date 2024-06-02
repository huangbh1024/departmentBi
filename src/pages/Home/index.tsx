import { WrapComp } from '@/components/Wrap';
import { StandardProjectComp, MajorProjectComp } from './components';
import 'swiper/css';

export const HomePage = defineComponent({
  setup() {
    return () => (
      <div class='flex flex-wrap justify-between items-start content-start h-full p-14px'>
        <div class='flex flex-col justify-between items-center h-89vh w-[calc(100%/3-10px)]'>
          <WrapComp title='重大项目进展'>
            <MajorProjectComp />
          </WrapComp>
        </div>
        <div class='flex flex-col justify-between items-center h-89vh w-[calc(100%/3-10px)]'>
          <WrapComp title='标准品项目进展'>
            <StandardProjectComp />
          </WrapComp>
        </div>
        <div class='flex flex-col justify-between items-center h-89vh w-[calc(100%/3-10px)]'>
          <WrapComp title='人员加班时长'></WrapComp>
        </div>
      </div>
    );
  },
});
