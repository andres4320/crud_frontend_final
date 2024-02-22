export class ServiceObject {
    constructor(public data?: any) {
      this.data = data;
      this.status = false;
      this.message = ''; 
    }
  
    status: boolean;
    message: string;
}