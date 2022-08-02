import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskCorreo } from '../../interface/task';
import { TaskService } from '../../services/task.service';
import { Observable, Subscriber } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-pelis',
  templateUrl: './form-pelis.component.html',
})
export class FormPelisComponent  {

  constructor(private taskService:TaskService , private router: Router, private activedRoute:ActivatedRoute) { }
  
  correoCuerpo: TaskCorreo = {
    filename: '',
    subject: '',
    text: '',
    toemails: '',
    fileb: ''
  };


  onSubmit(){
    this.taskService.createTaskCorreo(this.correoCuerpo)
    .subscribe(
      {
        next: (response) => {
          let objetoAJson = JSON.stringify(response)
          console.log(objetoAJson);
          alert('Enviado de manera correcta');
          Swal.fire('Correo enviado de manera correcta')
        },
        error: (error) => {
          console.log(error);
          this.correoCuerpo.filename = ``;
          Swal.fire('Error en el envio, intenta de nuevo');
        },
      }
    );
  }

    capturarFile(event: any){
      const archivoCapurado = event.target.files[0];
      this.convertBase64(archivoCapurado);
      console.log(event.target.files);      
    }
  
    convertBase64(file:File){
      const observable = new Observable((subscriber:Subscriber<any>)=>{
       this.readFile(file,subscriber);
      });
      observable.subscribe((d)=>{
        this.correoCuerpo.filename = `${this.correoCuerpo.filename}${file.name}`;
        if (file.name.includes('pdf')|| file.name.includes('rtf')) {
            const newStr = d.slice(28);
           this.correoCuerpo.fileb = newStr;
        }else if(file.name.includes('jpg')||file.name.includes('txt')){
            const newStr = d.slice(23);
           this.correoCuerpo.fileb = newStr;
        }else if(file.name.includes('mp4')||file.name.includes('gif')||file.name.includes('png')){
          const newStr = d.slice(22);
           this.correoCuerpo.fileb = newStr;
        }else if(file.name.includes('svg')){
          const newStr = d.slice(26);
          this.correoCuerpo.fileb = newStr;
        }else if(file.name.includes('xlsx')){
          const newStr = d.slice(78);
          this.correoCuerpo.fileb = newStr;
        }else if(file.name.includes('docx')){
          const newStr = d.slice(37);
          this.correoCuerpo.fileb = newStr;
        }else{
          Swal.fire('formato invalido');
          this.correoCuerpo.fileb = '';
        }
        console.log(this.correoCuerpo.filename);         
      })
    }
    readFile(file:File, subscriber: Subscriber<any>){
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload=()=>{
        subscriber.next(fileReader.result);
        subscriber.complete();
      };
      fileReader.onerror = (error) =>{
        subscriber.error(error);
        subscriber.complete();
      };
    }

}
