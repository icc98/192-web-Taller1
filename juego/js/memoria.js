console.log("memoria");

//variables globales para el juego
var iTiempoTranscurrido=iPuntosObtenidos=0, iTiempoLimite=30, objPrimero;
var blnJuegoFinalizado=false;

$(document).ready(function(){
	//establecer la cantidad de figuras distintas que tenemos
	//y cuantas veces debemos iterar para dibujar la cuadricula correctamente
	var strCuadros=[1,2,3,4], iRepeticiones=4;
	
	//evento al hacer clic en los items de la lista
	$('ul li').live('click',function(){
		var pingPong = new Tone.PingPongDelay("4n", 0.2).toMaster();
		var drum = new Tone.MembraneSynth().connect(pingPong);
		drum.triggerAttackRelease("C4", "32n");
		if(!blnJuegoFinalizado && $(this).css('opacity')!=0){
			var strImagen='img/elementos/'+$(this).attr('rel')+'.png';
			if(objPrimero==undefined){
				objPrimero=$(this);
				objPrimero.stop(true,true).animate({opacity:.9}).css('background-image','url('+strImagen+')');
			}else{
				var objSegundo=$(this);
				objSegundo.stop(true,true).animate({opacity:.9}).css('background-image','url('+strImagen+')');
			
				//nos aseguramos que no se este clickeando sobre el mismo elemento
				if(objPrimero.index()!=objSegundo.index()){
					//el usuario encontro una pareja (los dos elementos coinciden)
					if(objPrimero.attr('rel')==objSegundo.attr('rel')){
						//aumentamos los puntos en 1
						iPuntosObtenidos++;
						//ocultamos la pareja para que no aparezca mas
						$(objPrimero).stop(true,true).animate({opacity: 1}).delay(500).animate({opacity: 0});
						$(objSegundo).stop(true,true).animate({opacity: 1}).delay(500).animate({opacity: 0});
						
						//finalizamos el juego porque ya encontro todas las parejas
						if(iPuntosObtenidos==$('ul li').length/2) $.fntFinalizarJuego();
					}else{
						//el usuario no encontro una pareja, no coinciden los elementos
						//borramos el contenido de los elementos seleccionados por el usuario
						$(objPrimero).stop(true,true).animate({opacity: 1},500,function(){$(this).css('background-image','none');});
						$(objSegundo).stop(true,true).animate({opacity: 1},500,function(){$(this).css('background-image','none');});
					}
				}else{
					//se esta clickeando sobre el mismo elemento, entonces le devolvemos su opacidad original
					$(this).stop(true,true).animate({opacity: 1},1000,function(){$(this).html('&nbsp;');});
				}
				//limpiamos la variable que contiene al primer elemento
				objPrimero=undefined;
			}
		}else{
			//el juego finalizo o el elemento clickeado ya fue descubierto
		}
	});
	
	//funcion para contar el tiempo
	$.fntTiempo=function(){
		if(!blnJuegoFinalizado){
			if(iTiempoTranscurrido>=iTiempoLimite){
				//finalizar el juego por tiempo
				$.fntFinalizarJuego();
			}else{
				//volvemos a llamar a esta funcion un segundo despues
				setTimeout('$.fntTiempo()',1000);
				//mostrar el estado del juego
				$('#divContador').find('p').html('<strong>Descuento obtenido: </strong>'+ (iPuntosObtenidos * 5)+ '%' + 
				' &bull; <strong>Tiempo restante: </strong>'+(iTiempoLimite-iTiempoTranscurrido)+' segundos');
				//aumentamos el contador de tiempo transcurido
				iTiempoTranscurrido++;
			}
		}
	};
	
	//funcion para finalizar el juego
	$.fntFinalizarJuego=function(){
		$('#divContenedor ul').html('');
		//finalizar el juego
		blnJuegoFinalizado=true;
		//mostrar el estado final
		$('#divContador').find('p').html('<strong>Descuento obtenido: </strong>'+ (iPuntosObtenidos * 5)+ '%' +
		' &bull; <strong>Tiempo empleado: </strong>'+iTiempoTranscurrido+' segundos');
		//mostramos la capa inicial
		/*$('#divInicio').stop(true,true).fadeIn(1000,function(){
			//$('ul li').stop(true,true).css('opacity',1).html('&nbsp;');
			$('#btnJugar').hide();

			$('#divInicio').html('Ganaste' + (iPuntosObtenidos * 5)+ '%');
		});*/
		
		$('#divInicio').show();
		$('#divInicio').css('background','none');
		if (iPuntosObtenidos > 0){			
			$('#divInicio').html('<div style="color: #333;font-size: 60px;padding: 50px;"> <p>Ganaste ' + (iPuntosObtenidos * 5)+ ' %</p><br><p>Utiliza el código: DFGTDSD</p><br><br><div id="divInferior" ><input type="button" value="Regresar" id="btnRegresar2" ></div></div>');
		}else{
			$('#divInicio').html('<div style="color: #333;font-size: 60px;padding: 50px;"> <p>Sigue intentando en otra ocación</p><br><br><div id="divInferior" ><input type="button" value="Regresar" id="btnRegresar2" ></div></div>');
		}

		$('#btnRegresar2').on('click',function(){
		//iniciamos el juego
		window.history.back();
	});
	};
	
	//funcion para iniciar el juego
	$.fntIniciarJuego=function(){
		//mostramos el estado del juego
		$('#divContador').find('p').html('Cargando...');
		
		//creamos la cuadricula
		for(var iCont=0;iCont<iRepeticiones;iCont++){
			//desordenamos el array
			strCuadros=strCuadros.sort(function(){
				return Math.random() - 0.5
			});
			
			//agregamos los items a la lista (inicialmente vacios)
			for(var iCuadros=0;iCuadros<strCuadros.length;iCuadros++){
				$('#divContenedor ul').append('<li rel="'+strCuadros[iCuadros]+'">&nbsp;</li>');
			}
		}
		
		//reseteamos todas las variables globales
		iTiempoTranscurrido=iPuntosObtenidos=0, objPrimero=undefined;
		//ocultamos la capa inicial
		$('#divInicio').stop(true,true).fadeOut(1500,function(){
			//iniciamos el conteo de tiempo
			blnJuegoFinalizado=false;
			$.fntTiempo();
		});
	};
	
	//clic en el boton jugar
	$('#btnJugar').on('click',function(){
		//iniciamos el juego
		$.fntIniciarJuego();
	});

	//clic en el boton jugar
	$('#btnRegresar').on('click',function(){
		//iniciamos el juego
		window.history.back();
	});

});

