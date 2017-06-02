
function creerObj3DTresor(objgl, obj3DSol, intNoTexture,positionX,positionZ) {
    var obj3DTresor = new Object();
    obj3DTresor.fltProfondeur = 1;
    obj3DTresor.fltLargeur = 1;
    obj3DTresor.fltHauteur = 1;

    obj3DTresor.vertex = creerVertexTresor(objgl, obj3DTresor.fltLargeur, obj3DTresor.fltProfondeur, obj3DTresor.fltHauteur);
    obj3DTresor.couleurs = creerCouleursTresor(objgl, [1, 1, 1, 1]);
  	obj3DTresor.texels = creerTexelsTresor(objgl, obj3DTresor.fltLargeur, obj3DTresor.fltProfondeur, obj3DTresor.fltHauteur, intNoTexture);
  	obj3DTresor.maillage = creerMaillageTresor(objgl);

  	obj3DTresor.transformations = creerTransformations();
  	setPositionsXYZ([positionX+.5, 0, positionZ+.5], obj3DTresor.transformations);
    return obj3DTresor;
}

function creerVertexTresor(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    var tabVertex = [
          0.0, 0.75, 0.0,
          0.25, 0.5, 0.0,
          0.0, 0.5, 0.25,
          -0.25, 0.5, 0.0,
          0.0, 0.5, -0.25,
          0.0, 0.25, 0.0
        ];

    var objTresor = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTresor);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objTresor;
}

function creerCouleursTresor(objgl, tabCouleur) {
    tabCouleurs = [];
    for (var i = 0; i < 6; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursTresor = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursTresor);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

	return objCouleursTresor;
}

//Fonction inutile, jamais appel�e....
function creerTexelsTresor(objgl, fltLargeur, fltProfondeur, fltHauteur, intNoTexture) {
    var tabTexels = [
          0.0, 0.5,
          1.0, 0.0,
          1.0, 1.0,
          1.0, 0.0,
          1.0, 1.0,
          0.0, 0.5
        ];

    var objTexelsTresor = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsTresor);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsTresor.intNoTexture = intNoTexture; objTexelsTresor.pcCouleurTexel = 1.0;

    return objTexelsTresor;
  }

  function creerMaillageTresor(objgl) {
       var tabMaillage =
            [
              0, 1, 2,
              0, 2, 3,
              0, 3, 4,
              0, 4, 1,

              5, 1, 2,
              5, 2, 3,
              5, 3, 4,
              5, 4, 1
            ];

	    var objMaillageTresor = objgl.createBuffer();
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageTresor);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

        // Le nombre de triangles
        objMaillageTresor.intNbTriangles = 8;
        // Le nombre de droites
        objMaillageTresor.intNbDroites = 0;

        return objMaillageTresor;
    }
