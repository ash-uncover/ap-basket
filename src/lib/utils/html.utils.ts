export const injectCss = (id: string, href: string) => {
  return new Promise<void>((resolve, reject) => {
    const current = document.getElementById(id);
    current && current.setAttribute('id', `${id}-old`);

    const styleSheet = document.createElement('link');
    styleSheet.setAttribute('id', id);
    styleSheet.setAttribute('rel', 'stylesheet')
    styleSheet.setAttribute('href', href)
    styleSheet.addEventListener('load', () => {
      current && current.parentNode.removeChild(current)
      resolve()
    });
    styleSheet.addEventListener('error', () => {
      current && current.parentNode.removeChild(current)
      reject()
    });

    document.head.appendChild(styleSheet);
  })
}