// 设置 rem 函数
export function setRem() {
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  const htmlHeight = document.documentElement.clientHeight || document.body.clientHeight;
  const htmlDom = document.getElementsByTagName('html')[0];
  if (htmlWidth >= htmlHeight) {
    // 将屏幕宽度32等分
    // 如 1920的设计稿 32等分后html根元素字体为 60px，此时1rem === 60px
    // 无论屏幕宽度怎么变化 1rem始终占1/32的视口宽度
    htmlDom.style.fontSize = htmlWidth / 32 + 'px';
  }
  window.console.log(`web-window-screen:width-${htmlWidth}|height-${htmlHeight}`);
}
// 获取html的font-size
const getFontSize = () => {
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
};

export const setFontSize = (val: number) => {
  return (val / 60) * getFontSize();
};
