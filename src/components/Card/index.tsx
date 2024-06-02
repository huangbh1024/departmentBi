import type { CSSProperties } from 'vue';

export const CardComp = defineComponent({
  props: {
    beautifulBorder: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    const { beautifulBorder } = toRefs(props);
    const movingElStyle: CSSProperties = {
      animation: 'animation: moveAround 8s linear infinite',
      backgroundImage: 'radial-gradient(#cbacf9 40%, transparent 80%)',
    };
    return () => (
      <div class='relative w-full h-full rounded-30px overflow-hidden p-1px'>
        {beautifulBorder.value && (
          <div
            class='absolute top-0 left-40px w-80px h-80px rounded-40px transform-translate--40px'
            style={movingElStyle}
          ></div>
        )}
        <div class='bg-#09090b/38 absolute w-full h-full rounded-30px border-1px border-solid border-#1e293b'></div>
        <div class='w-full h-full absolute top-0 left-0 box-border p-0.3rem flex flex-col'>{slots.default?.()}</div>
      </div>
    );
  },
});
