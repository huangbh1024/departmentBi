import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectFlip } from 'swiper/modules';
import { CardComp } from '@/components/Card';
import 'swiper/css';
import 'swiper/css/effect-flip';
import { ProjectContentComp } from './components/Content';
import type { PropType } from 'vue';
import { Project } from '@/types';

export const ProjectComp = defineComponent({
  props: {
    projectList: { type: Array as PropType<Project[]>, required: true },
  },
  setup(props) {
    const swiperModule = reactive([EffectFlip]);
    const { projectList } = toRefs(props);
    return () => (
      <>
        <Swiper class='w-90% h-49%' modules={swiperModule} effect='flip'>
          {projectList.value.map((item, index) => (
            <SwiperSlide key={index} class='flex flex-col items-center justify-between'>
              <CardComp class='w-100% h-100%'>
                <ProjectContentComp index={index} data={item} />
              </CardComp>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    );
  },
});
