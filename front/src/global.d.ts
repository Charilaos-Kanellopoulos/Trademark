declare module '@emailjs/browser' {
  export function send(serviceID: string, templateID: string, templateParams: any, publicKey?: string): Promise<any>;
  const defaultExport: {
    send: typeof send;
  };
  export default defaultExport;
}
declare module '*.css';
declare module '*.svg';
declare module '*.png';
