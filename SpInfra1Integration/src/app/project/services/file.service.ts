import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  public static async convertFileToBase64(file: File): Promise<string> {
    const BASE_64: Promise<string> = new Promise<string>((resolve, reject) => {
      const READER: FileReader = new FileReader();
      READER.onload = () => resolve(READER.result as string);
      READER.onerror = error => reject(error);
      READER.readAsDataURL(file);
    });

    return (await BASE_64).split('base64,')[1];
  }

  public static downloadBase64File(base64String: string, fileName: string): void {
    const byteCharacters = atob(base64String); // Converta a string base64 para um array de bytes

    // Converta os bytes para um array de números
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers); // Crie um array de bytes usando Uint8Array
    const blob = new Blob([byteArray], { type: 'application/octet-stream' }); // Crie um Blob a partir do array de bytes
    const blobUrl = URL.createObjectURL(blob); // Crie um URL temporário para o Blob

    // Crie um link <a> para iniciar o download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;

    document.body.appendChild(link); // Adicione o link ao corpo do documento (necessário para funcionar no Firefox)
    link.click(); // Dispare um evento de clique no link para iniciar o download
    document.body.removeChild(link); // Remova o link do corpo do documento após o download
    URL.revokeObjectURL(blobUrl); // Limpe o URL temporário
  }

}
