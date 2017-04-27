var main=function() {
	var CANVAS = document.getElementById("your_canvas");

	CANVAS.width=window.innerWidth;
	CANVAS.height=window.innerHeight;

	/*=========================== GET WEBGL CONTEXT =================================*/
	var gl;
	try {
		gl = CANVAS.getContext("webgl");
	} catch (e) {
		alert("You are not webgl compatible :(");
		return false;
	}

	/*========================== SHADERS ============================================*/

	var vertexShaderSource = document.getElementById("2d-vertex-shader").text;
	var fragmentShaderSource = document.getElementById("2d-fragment-shader").text;

	var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

	var program = createProgram(gl, vertexShader, fragmentShader);

	var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

	var colorAttribureLocation = gl.getAttribLocation(program, "a_color");

	var positionBuffer = gl.createBuffer();

	var colorBuffer = gl.createBuffer();

	var colors = [
		0, 1, 0, 1,
		0, 1, 0, 1,
		0, 1, 0, 1,
	  0, 1, 0, 1,
	  0, 1, 0, 1];	

	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

	var colorBuffer2 = gl.createBuffer();

	var colors2 = [
		0, 0, 0, 1,
		0, 0, 0, 1,
		0, 0, 0, 1,
	  0, 0, 0, 1,
	  0, 0, 0, 1];	

	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer2);

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors2), gl.STATIC_DRAW);


	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	var positions = [];

	for( var i = 0; i < 5;i++){
		positions.push(Math.sin(i*72*Math.PI/180));
		positions.push(Math.cos(i*72*Math.PI/180));
	}

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	var indexBuffer = gl.createBuffer();

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

	var indices = [0, 1, 2, 3, 4];

	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	var indexBuffer2 = gl.createBuffer();

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer2);

	var indices2 = [0, 2, 4, 1, 3];

	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices2), gl.STATIC_DRAW);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	//Clear the canvas
	gl.clearColor(0, 0, 0, 0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.useProgram(program);


	gl.enableVertexAttribArray(colorAttribureLocation);

	//Bind the position buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

	//Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
	var size = 4;
	var type = gl.FLOAT;
	var normalize = false;
	var stride = 0;
	var offset = 0;
	gl.vertexAttribPointer(
		colorAttribureLocation, size, type, normalize, stride, offset);

	gl.enableVertexAttribArray(positionAttributeLocation);


	//Bind the position buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

	//Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
	size = 2;
	type = gl.FLOAT;
	normalize = false;
	stride = 0;
	offset = 0;
	gl.vertexAttribPointer(
		positionAttributeLocation, size, type, normalize, stride, offset);

	var primitiveType = gl.LINE_LOOP;
	offset = 0;
	var count = indices.length;
	gl.drawElements(primitiveType, count, gl.UNSIGNED_SHORT, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	//Bind the position buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer2);

	//Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
	size = 4;
	type = gl.FLOAT;
	normalize = false;
	stride = 0;
	offset = 0;
	gl.vertexAttribPointer(
		colorAttribureLocation, size, type, normalize, stride, offset);

	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer2);

	//Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
	size = 2;
	type = gl.FLOAT;
	normalize = false;
	stride = 0;
	offset = 0;
	gl.vertexAttribPointer(
		positionAttributeLocation, size, type, normalize, stride, offset);


	gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

  count = indices2.length;


	gl.drawElements(primitiveType, count, gl.UNSIGNED_SHORT, 0);

};

function createShader(gl, type, source) {
	var shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader, source);
	var sucess = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (sucess) {
		return shader;
	}

	console.log("ERROR IN "+"SHADER :" + gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);
}


function createProgram(gl, vertexShader, fragmentShader) {
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	var sucess = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (sucess) {
		return program;
	}

	console.log(gl.getProgramInfoLog(program));
	gl.deleteProgram(program);
}
