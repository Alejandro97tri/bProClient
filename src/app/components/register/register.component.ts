import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  deporte: string = '';
  username: any;
  password1: any;
  password2: any;
  nombre: any;
  apellidos: any;
  fecha_nacimiento: any;
  email: any;
  genero: string = "";
  rol: string = '';
  peso: any;
  altura: any;

  
  // Errores
  successAlert: boolean = false;
  errorAlert: boolean = false;
  numeroErrores: number = 0;
  erroresNoVacios: any = {};
  errores = {
    usernameVacio: '',
    password1Vacio: '',
    password2Vacio: '',
    passwordNoCoinciden: '',
    nombreVacio: '',
    nombreFormato: '',
    apellidosVacio: '',
    apellidosFormato: '',
    fecha_nacimientoVacio: '',
    fecha_nacimientoFormato: '',
    emailVacio: '',
    emailFormato: '',
    generoVacio: '',
    rolVacio: '',
    pesoVacio: '',
    pesoNoEsNumero:'',
    alturaVacio: '',
    alturaNoEsNumero:'',
    deporteVacio: '',
  }


  listaDeportes: any;

  constructor(private renderer: Renderer2, private router: Router) { }
  ngOnInit(): void {
    this.getListaDeportes();
  }

  async getListaDeportes() {
    const response = await fetch('https://btop.es/server/listaDeportes.php', { method: 'POST' });
    this.listaDeportes = await response.json();
    console.log(this.listaDeportes);
    
  }
  

  registro() {

    fetch('https://btop.es/server/registro.php', {
      method: 'POST', body: JSON.stringify({
        username: this.username,
        password: this.password1,
        nombre: this.nombre,
        apellidos: this.apellidos,
        fecha_nacimiento: this.formatDateModificar(this.fecha_nacimiento),
        email: this.email,
        genero: this.genero,
        rol: this.rol,
        peso: this.peso,
        altura: this.altura,
      })
    });
    this.successAlert = true;
    this.router.navigate(['/login']);
  }

  enviar(){
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0);
    this.renderer.setProperty(document.body, 'scrollTop', 0);
    this.formError();
    this.errorAlert = false; 
    if(this.numeroErrores == 0){
      this.registro();
    }else{
      setTimeout(() => {
      this.errorAlert = true;
      }, 500)
    }
  }

  formatDateModificar(fecha: string): string {
    const partes = fecha.split('-');
    const dia = partes[0];
    const mes = partes[1];
    const year = partes[2];

    // Formatear la fecha en el nuevo formato
    const nuevaFecha = `${year}-${mes}-${dia}`;

    return nuevaFecha;
  }

  formError(){

    const regexEntero = /^-?\d+$/;
    const regexLetras = /^[a-zA-Z\u00C0-\u017F]+$/;
    const regexFecha = /^(0[1-9]|1\d|2\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    this.numeroErrores=0;

    this.errores = {
      usernameVacio: '',
      password1Vacio: '',
      password2Vacio: '',
      passwordNoCoinciden: '',
      nombreVacio: '',
      nombreFormato: '',
      apellidosVacio: '',
      apellidosFormato: '',
      fecha_nacimientoVacio: '',
      fecha_nacimientoFormato: '',
      emailVacio: '',
      emailFormato: '',
      generoVacio: '',
      rolVacio: '',
      pesoVacio: '',
      pesoNoEsNumero:'',
      alturaVacio: '',
      alturaNoEsNumero:'',
      deporteVacio: '',
    }

    // Comprobación username
    if(this.username == undefined || this.username == ""){
      this.errores.usernameVacio = "El usuario no puede estar vacío";
      this.numeroErrores++;
    }

    // Comprobación password1
    if(this.password1 == undefined || this.password1 == ""){
      this.errores.password1Vacio = "La contraseña 1 no puede estar vacía";
      this.numeroErrores++;
    }
    // Comprobación password2
    if(this.password2 == undefined || this.password2 == ""){
      this.errores.password2Vacio = "La contraseña 2 no puede estar vacía";
      this.numeroErrores++;
    }

    // Comprobación nombre
    if(this.nombre == undefined || this.nombre == ""){
      this.errores.nombreVacio = "El nombre no puede estar vacío";
      this.numeroErrores++;
    }

    if (!this.errores.nombreVacio && !regexLetras.test(this.nombre)) {
      this.errores.nombreFormato = 'El nombre solo puede contener letras';
      this.numeroErrores++;
    }
    
    // Comprobación apellidos
    if(this.apellidos == undefined || this.apellidos == ""){
      this.errores.apellidosVacio = "Los apellidos no pueden estar vacíos";
      this.numeroErrores++;
    }
    if (!this.errores.apellidosVacio && !regexLetras.test(this.apellidos)) {
      this.errores.apellidosFormato = 'Los apellidos solo pueden contener letras';
      this.numeroErrores++;
    }

    // Comprobación fecha_nacimiento
    if(this.fecha_nacimiento == undefined || this.fecha_nacimiento == ""){
      this.errores.fecha_nacimientoVacio = "La fecha de nacimiento no puede estar vacía";
      this.numeroErrores++;
    }

    if (!this.errores.fecha_nacimientoVacio && !regexFecha.test(this.fecha_nacimiento)) {
      this.errores.fecha_nacimientoFormato = 'La fecha debe tener formato dd-mm-yyyy (Ej. 31-12-2022)';
      this.numeroErrores++;
    }

    // Comprobación email
    if(this.email == undefined || this.email == ""){
      this.errores.emailVacio = "El email no puede estar vacío";
      this.numeroErrores++;
    }
    if (!this.errores.emailVacio && !regexEmail.test(this.email)) {
      this.errores.emailFormato = 'El email debe tener formato valido (Ej. you@example.com)';
      this.numeroErrores++;
    }

    // Comprobación genero
    if(this.genero == undefined || this.genero == "Selecciona un género" || this.genero == "" ){
      this.errores.generoVacio = "El género no puede estar vacío";
      this.numeroErrores++;
    }

    // Comprobación rol
    if(this.rol == undefined || this.rol == "Selecciona un rol" || this.rol == ""){
      this.errores.rolVacio = "El rol no puede estar vacío";
      this.numeroErrores++;
    }

    // Comprobación peso
    if(this.peso == undefined || this.peso == ""){
      this.errores.pesoVacio = "El peso no puede estar vacío";
      this.numeroErrores++;
    }

    if(!this.errores.pesoVacio && !regexEntero.test(this.peso)){
      this.errores.pesoNoEsNumero = 'El peso debe ser un numero entero';
      this.numeroErrores++;
    }
    
    // Comprobación altura
    if(this.altura == undefined || this.altura == ""){
      this.errores.alturaVacio = "La altura no puede estar vacía";
      this.numeroErrores++;
    }

    if(!this.errores.alturaVacio && !regexEntero.test(this.altura)){
      this.errores.alturaNoEsNumero = 'La altura debe ser un numero entero';
      this.numeroErrores++;
    }

    // Comprobación deporte
    if(this.deporte == undefined || this.deporte == "" || this.deporte == "Selecciona un deporte"){
      this.errores.deporteVacio = "El deporte no puede estar vacío";
      this.numeroErrores++;
    }

    // Comprobación password1 y password2
    if(this.password1 != this.password2 ){
      this.errores.passwordNoCoinciden = "Las contraseñas no coinciden";
      this.numeroErrores++;
    }
    this.erroresNoVacios = Object.values(this.errores).filter(error => error !== '');
  }
}
