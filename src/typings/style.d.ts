declare module '*.scss' {
  type classNames = {
    [key: string]: string;
  }
  const styles: classNames;
  export default styles;
}