import { NProgress } from 'naive-ui';
import { useSwiper } from 'swiper/vue';
import type { CSSProperties, PropType } from 'vue';
import { Project } from '../../../interface';

const defaultScrollCount = 3;

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
    const transformStyle = computed<CSSProperties>(() => ({ transform: `translateY(${top.value}px)` }));
    const scrollCount = ref(defaultScrollCount);
    const swiperScrollDelay = ref(30000);
    const startTime = ref(0);
    const handleContentAutoScroll = () => {
      const speed = 0.3;
      // 设置滚动位置
      top.value -= speed;
      requestID.value = window.requestAnimationFrame(handleContentAutoScroll);
      if (contentRef.value && contentWrapRef.value) {
        if (Math.abs(top.value) >= contentRef.value.clientHeight) {
          top.value = contentWrapRef.value.clientHeight;
          scrollCount.value--;
          if (scrollCount.value === 0) {
            // 判断是否达到30s
            if (new Date().getTime() - startTime.value <= swiperScrollDelay.value) {
              // 继续到30s
              scrollCount.value = 1;
            } else {
              top.value = 0;
              slideChange();
              window.cancelAnimationFrame(requestID.value);
            }
          }
        }
      }
    };
    const timer = ref<number | null>(null);
    watchEffect(() => {
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
              timer.value = setTimeout(() => {
                requestID.value = window.requestAnimationFrame(handleContentAutoScroll);
              }, 1000);
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
        <div class='flex-1 overflow-hidden' ref={contentWrapRef}>
          <p
            ref={contentRef}
            class='text-#a0a0a0 text-.4rem whitespace-pre-wrap m-0'
            v-html={props.data.taskProgress}
            style={transformStyle.value}
          ></p>
        </div>
      </>
    );
  },
});
