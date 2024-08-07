import { ProjectComp } from '../Project';
import { Project } from '@/types';
import { queryImportantProjectProgress } from '@/apis';
export const MajorProjectComp = defineComponent({
  setup(_, { expose }) {
    const projectList = reactive<{ first: Project[]; second: Project[] }>({ first: [], second: [] });
    const init = () => {
      queryImportantProjectProgress().then(res => {
        const { data } = res;
        const length = data.projectInfoList.length;
        const middleIndex = Math.ceil(length / 2);
        projectList.first = data.projectInfoList.slice(0, middleIndex);
        projectList.second = data.projectInfoList.slice(middleIndex);
      });
    };

    onMounted(init);
    expose({ init });
    return () => (
      <>
        <ProjectComp projectList={projectList.first} />
        <ProjectComp projectList={projectList.second} />
      </>
    );
  },
});
