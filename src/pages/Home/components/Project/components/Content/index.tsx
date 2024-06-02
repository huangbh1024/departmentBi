import { NProgress } from 'naive-ui';
import { useSwiper } from 'swiper/vue';
import type { PropType } from 'vue';
import { Project } from '@/types';
import { debounce } from 'lodash-es';

const defaultScrollCount = 3;
const sleep = (delay: number) =>
  new Promise(resolve => {
    setTimeout(resolve, delay);
  });

export const ProjectContentComp = defineComponent({
  props: {
    index: { type: Number, required: true },
    data: { type: Object as PropType<Project>, required: true },
  },
  setup(props) {
    const contentWrapRef = ref<HTMLDivElement | null>(null);
    const contentRef = ref<HTMLElement | null>(null);

    const slideChange = () => {
      if (props.index !== swiper.value.activeIndex) return;
      swiper.value.isEnd ? swiper.value.slideTo(0) : swiper.value.slideNext();
    };

    const swiper = useSwiper();
    const requestID = ref(0);
    const top = ref(0);
    const scrollCount = ref(defaultScrollCount);
    const swiperScrollDelay = ref(30000);
    const startTime = ref(0);
    const handleContentAutoScroll = async () => {
      if (!isScroll.value) return;
      const speed = 0.3;
      // 设置滚动位置
      top.value += speed;
      requestID.value = window.requestAnimationFrame(handleContentAutoScroll);
      if (contentRef.value && contentWrapRef.value) {
        contentWrapRef.value.scrollTo({ top: top.value });
        if (top.value >= contentWrapRef.value.scrollHeight - contentWrapRef.value.clientHeight) {
          window.cancelAnimationFrame(requestID.value);
          scrollCount.value--;
          await sleep(1000);
          top.value = 0;
          contentWrapRef.value.scrollTo({ top: top.value });
          await sleep(1000);
          if (scrollCount.value === 0) {
            if (new Date().getTime() - startTime.value <= swiperScrollDelay.value) {
              // 继续到30s
              scrollCount.value = 1;
              requestID.value = window.requestAnimationFrame(handleContentAutoScroll);
            } else {
              top.value = 0;
              slideChange();
              window.cancelAnimationFrame(requestID.value);
            }
            return;
          }
          requestID.value = window.requestAnimationFrame(handleContentAutoScroll);
        }
      }
    };
    const timer = ref<number | null>(null);
    watchEffect(async () => {
      if (swiper.value) {
        if (swiper.value.activeIndex === props.index) {
          startTime.value = new Date().getTime();
          scrollCount.value = defaultScrollCount;
          clearTimeout(timer.value);
          timer.value = null;
          if (contentRef.value && contentWrapRef.value) {
            const contentHeight = contentRef.value.clientHeight;
            const wrapperHeight = contentWrapRef.value.clientHeight;
            if (contentHeight > wrapperHeight) {
              // 延迟1s后执行
              await sleep(1000);
              requestID.value = window.requestAnimationFrame(handleContentAutoScroll);
            } else {
              // 延迟30s后切换
              timer.value = setTimeout(() => {
                slideChange();
              }, swiperScrollDelay.value);
            }
          }
        } else {
          window.cancelAnimationFrame(requestID.value);
          top.value = 0;
        }
      }
    });
    onUnmounted(() => {
      clearTimeout(timer.value);
      timer.value = null;
    });
    const restartAutoScroll = debounce(() => {
      isScroll.value = true;
      if (contentWrapRef.value) top.value = contentWrapRef.value.scrollTop;
      requestID.value = window.requestAnimationFrame(handleContentAutoScroll);
    }, 1500);
    const isScroll = ref(true);
    const onWheel = () => {
      isScroll.value = false;
      restartAutoScroll();
    };
    const onTouchStart = () => {
      isScroll.value = false;
    };
    const onTouchEnd = () => {
      restartAutoScroll();
    };
    return () => (
      <>
        <h2 class='text-white text-0.47rem m-0'>{props.data.taskName}</h2>
        <div class='flex my-0.3rem mx-0 h-0.59rem flex items-center'>
          <span class='bg-#f1eeff text-#6558d3 font-600 text-0.3rem px-0.2rem py-0.067rem rounded-0.1rem mr-0.2rem'>
            {props.data.taskStatus}
          </span>
          <NProgress
            percentage={isNaN(Number(props.data.taskAccomplishRate)) ? 0 : Number(props.data.taskAccomplishRate)}
            showIndicator={false}
            class='flex-1'
            height={25}
          />
        </div>
        <div
          class='flex-1 overflow-scroll'
          ref={contentWrapRef}
          onWheel={onWheel}
          onTouchend={onTouchEnd}
          onTouchstart={onTouchStart}
        >
          <p
            ref={contentRef}
            class='text-#a0a0a0 text-.4rem whitespace-pre-wrap m-0'
            v-html={props.data.taskProgress}
          ></p>
        </div>
      </>
    );
  },
});
