class Camara {
    constructor(videoNode){
        this.videoNode = videoNode;
        console.log('camara init');
    }

    encender(){
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {width: 300, height:250}
        }).then(stream=>{
            this.videoNode.srcObject = stream;
            this.stream = stream;
        });
    }

    apagar(){
        this.videoNode.pause();

        if(this.stream){
            this.stream.getTracks()[0].stop();
        }
    }

    tomarFoto(){
        //crear un elemento canvas para renderizar la foto
        let canvas = document.createElement('canvas');

        //colocar las dimensiones igual al elemento del video
        canvas.setAttribute('width', 300);
        canvas.setAttribute('height', 250);

        //obtener el contcto
        let context =canvas.getContext('2d'); //una simple imagen
        
        //dibujar imagen en el canvas
        context.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);

        this.foto = context.canvas.toDataURL();

        //limpieza
        canvas = null;
        context = null;

        return this.foto;
    }
}