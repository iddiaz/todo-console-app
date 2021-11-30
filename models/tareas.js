
const Tarea = require("./tarea");


// _listado:
//    {'uuid-1237134-23245667-2: {id:12, desc:dcdsc, completadoEn:92313}'}



class Tareas {
  
   _listado = {
      'abc': 123
   };

  

   get listadoArr() {     
      const listado = [];
      Object.keys(this._listado).forEach( key => {
         const tarea = this._listado[key];
         listado.push( tarea );
      })
      return listado;
   }
   
   constructor() {

      this._listado = {};

   }

   borrarTarea( id=''){
      if(this._listado[id]){
         delete this._listado[id];
      }
   }

   cargarTareasFromArray( tareas = [] ){

      tareas.forEach( tarea => {
         this._listado[tarea.id] = tarea;
      })

   }

   crearTarea( desc = '' ){

      const tarea = new Tarea( desc );
      this._listado[tarea.id] = tarea;

   }

   lisadoCompleto(){
      // console.log('el listado',this._listado);
      // console.log('el listado arr',this.listadoArr);
      this.listadoArr.forEach( (tarea, i) => {
         
         const idx = `${i + 1}`.green;
         const { desc, completadoEn } = tarea;        
         const estado = completadoEn !== null ? 'Completada'.green : 'Pendiente'.red;

         console.log(`${idx} ${desc} :: ${estado}`);

      })     


   }

   listarPendientesCompletadas( completadas = true ){
      
      const listaTareas = [];
      let indice = 0;
      
      this.listadoArr.forEach( (tarea, i) => {         

         const { desc, completadoEn } = tarea; 
         const estado = completadoEn !== null ? 'Completada'.green : 'Pendiente'.red;

         if( completadas ) {
              // mostrar completadas
            if( completadoEn ){
               indice += 1;
               console.log(`${indice.toString().green}, ${desc} :: ${completadoEn.toString().green}`);
            }
            
              
            
         } else {

            // mostrar pendientes
            if( !completadoEn ){

               indice += 1;
               console.log(`${indice.toString().green}, ${desc} :: ${estado}`);

            }
           
            
         }      
         

      } )

   }

   toggleCompletadas ( ids = [] ){
      
      ids.forEach( id => {
         const tarea = this._listado[id];
         if( !tarea.completadoEn ) {
            tarea.completadoEn = new Date().toISOString()
         }
      });

      this.listadoArr.forEach( tarea => {

         if ( !ids.includes(tarea.id) ){

            this._listado[tarea.id].completadoEn = null;

         }
      })



   }

   

}

module.exports = Tareas;