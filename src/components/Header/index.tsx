import HeaderBg from '@/assets/images/headerBg.png';
import Logo from '@/assets/images/dnake-logo.jpg';
import Speaker from '@/assets/images/speaker.png';
import type { CSSProperties } from 'vue';
import { NImage, NDivider } from 'naive-ui';
import dayjs from 'dayjs';
import styles from './index.module.css';

/**
 * 获取星期
 * @param day
 */
const getWeek = (day: number): string => {
  return '日一二三四五六'.charAt(day);
};

/**
 * 设置定时器
 * @param timer 定时器
 * @param callback 回调函数
 * @param delay 延迟
 */
const setTimer = (timer: Ref<number | null>, callback: () => void, delay: number) => {
  clearTimer(timer);
  timer.value = setInterval(() => {
    callback();
  }, delay);
};
/**
 * 清理定时器
 * @param timer 定时器
 */
const clearTimer = (timer: Ref<number | null>) => {
  clearInterval(timer.value);
  timer.value = null;
};

interface Announce {
  id: number;
  sysBulletinBoard: string;
}

export const HeaderComp = defineComponent({
  setup() {
    const headerBgStyle: CSSProperties = { background: `url(${HeaderBg}) no-repeat`, backgroundSize: '100% 100%' };

    const dateTimer = ref<number | null>(null);
    const dateAndTime = reactive({
      time: dayjs().format('HH:mm'),
      date: dayjs().format('YYYY年MM月DD日'),
      week: '星期' + getWeek(dayjs().day()),
    });

    /**
     * 定时设置时间
     */
    const setDateInterval = () => {
      setTimer(
        dateTimer,
        () => {
          dateAndTime.time = dayjs().format('HH:mm');
          dateAndTime.date = dayjs().format('YYYY年MM月DD日');
          dateAndTime.week = '星期' + getWeek(dayjs().day());
        },
        5000,
      );
    };

    const announceDataTimer = ref<number | null>(null);
    const announce = computed(() => announceList[index.value]?.sysBulletinBoard ?? '');
    const announceList: Announce[] = reactive([]);
    /**
     * 定时获取通知
     */
    const queryAnnounceDataInterval = () => {
      setTimer(
        announceDataTimer,
        () => {
          // axios暂未封装
        },
        30000,
      );
    };

    const switchTimer = ref<number | null>(null);
    const index = ref(0);
    /**
     * 多条数据切换
     */
    const switchAnnounceDataInteval = () => {
      setTimer(
        switchTimer,
        () => {
          index.value === announceList.length - 1 ? (index.value = 0) : index.value++;
        },
        27000,
      );
    };

    onMounted(() => {
      setDateInterval();
      queryAnnounceDataInterval();
      switchAnnounceDataInteval();
    });
    onUnmounted(() => {
      clearTimer(dateTimer);
      clearTimer(announceDataTimer);
      clearTimer(switchTimer);
    });

    return () => (
      <div class='w-full h-8vh flex items-center justify-start' style={headerBgStyle}>
        <NImage class='h-80% w-6% ml-3% mb-14px' objectFit='contain' previewDisabled src={Logo} />
        <NDivider vertical class='ml-2%!' />
        <div class='h-80% mb-14px text-white font-bold text-0.6rem flex items-center w-20% ml-1%'>专业对讲数字管理</div>
        <div class='ml-2% h-80% mt-14px flex items-center w-50% round-10px text-ellipsis text-nowrap'>
          <NImage src={Speaker} objectFit='cover' class='w-5%' />
          <div class='ml-14px text-white w-90% overflow-hidden text-0.35rem'>
            <p class={{ [styles['text-animation']]: announce.value.length > 40 }}>{announce.value}</p>
          </div>
        </div>
        <div class='w-20% h-full flex flex-col items-center justify-center text-white mt-14px'>
          <div class='text-0.35rem flex justify-center items-center'>
            <div>{dateAndTime.time}</div>
            <div class='ml-14px'>{dateAndTime.week}</div>
          </div>
          <div class='text-0.4rem'>{dateAndTime.date}</div>
        </div>
      </div>
    );
  },
});
