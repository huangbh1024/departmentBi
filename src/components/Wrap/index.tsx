import type { CSSProperties } from 'vue';
import CardWrapBg from '@/assets/images/cardWrap.png';

export const WrapComp = defineComponent({
  props: { title: { type: String, default: '' } },
  setup(props, { slots }) {
    const { title } = toRefs(props);
    const wrapperStyle: CSSProperties = { background: `url(${CardWrapBg}) no-repeat`, backgroundSize: '100% 100%' };
    return () => (
      <div class='w-full flex flex-wrap flex-col items-center justify-center h-full' style={wrapperStyle}>
        <div class='flex items-center justify-center text-white text-0.45rem h-9%'>
          <span>{title.value}</span>
        </div>
        <div class='w-full h-91% flex flex-col items-center justify-between p-24px'>{slots.default?.()}</div>
      </div>
    );
  },
});
