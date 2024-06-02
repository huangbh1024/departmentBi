import { CardComp } from '@/components/Card';
import { debounce } from 'lodash-es';
import { NAvatar } from 'naive-ui';
import { queryMostOverTimeUser } from '@/apis';
import type { User } from '@/types';

export const WorkOvertimeComp = defineComponent({
  setup(_, { expose }) {
    const overtimeList = ref<User[]>([]);
    const init = () => {
      queryMostOverTimeUser({ limit: 9999, overTimeSort: '1' }).then(res => {
        const { data } = res;
        overtimeList.value = data;
        nextTick(() => {
          scrollTop.value = 0;
          if (contentRef.value && wrapperRef.value) {
            const wrapperHeight = wrapperRef.value.clientHeight;
            const contentHeight = contentRef.value.clientHeight;

            if (contentHeight > wrapperHeight) {
              // 开启滚动 停留1.5s
              setTimeout(() => {
                requestID.value = window.requestAnimationFrame(autoScroll);
              }, 1000);
            }
          }
        });
      });
    };
    onMounted(init);
    expose({ init });

    const wrapperRef = ref<HTMLDivElement | null>(null);
    const contentRef = ref<HTMLDivElement | null>(null);
    const scrollTop = ref(0);
    const requestID = ref(0);
    const autoScroll = () => {
      // 调整滚动速度
      const scrollSpeed = 0.3; // 可以根据需要调整这个值
      if (wrapperRef.value && contentRef.value) {
        if (scrollTop.value >= contentRef.value.clientHeight - wrapperRef.value.clientHeight) {
          isScroll.value = false;
          setTimeout(() => {
            scrollTop.value = 0;
            wrapperRef.value && (wrapperRef.value.scrollTop = scrollTop.value);
            startScroll();
          }, 1000);
        }
        wrapperRef.value.scrollTop = scrollTop.value;
      }
      scrollTop.value += scrollSpeed;
      isScroll.value && (requestID.value = requestAnimationFrame(autoScroll));
    };
    const isScroll = ref(true);
    const startScroll = debounce(() => {
      if (wrapperRef.value) scrollTop.value = wrapperRef.value.scrollTop;
      isScroll.value = true;
    }, 1000);
    const onWheel = () => {
      // 兼容pc
      isScroll.value = false;
      startScroll();
    };
    const onTouchStart = () => {
      isScroll.value = false;
    };
    const onTouchEnd = () => {
      // 1s后重新开启滚动
      startScroll();
      if (wrapperRef.value) scrollTop.value = wrapperRef.value.scrollTop;
    };
    watch(isScroll, val => {
      if (val) {
        requestID.value = window.requestAnimationFrame(autoScroll);
      }
    });

    return () => (
      <div
        class='w-90% h-full overflow-auto'
        ref={wrapperRef}
        onWheel={onWheel}
        onTouchstart={onTouchStart}
        onTouchend={onTouchEnd}
      >
        <div class='w-full' ref={contentRef}>
          {overtimeList.value.map((item, index) => (
            <CardComp class='w-100% h-85px mb-12px last:mb-0 ' key={index}>
              <div class='px-18px text-white text-24px w-full h-full flex items-center'>
                <div class='w-10% text-align-left'>
                  <span>{index + 1}</span>
                </div>
                <div class='w-50px h-50px rounded-50% overflow-hidden'>
                  <NAvatar src={item.userAvatar} class='w-full h-full' />
                </div>
                <div class='ml-14px'>
                  <span>{item.userName}</span>
                </div>
                <div class='ml-auto'>
                  <span>{item.userOverTimeNumber}小时</span>
                </div>
              </div>
            </CardComp>
          ))}
        </div>
      </div>
    );
  },
});
