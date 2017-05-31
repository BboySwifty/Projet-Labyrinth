
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
    // Face avant (Z=1)
			  0.0, 0.0, 0.5,   // 0: Centre
              0.5, 0.5, 0.5,   // 1: Coin haut droit
              0.5, 0, 0.5,  // 2: Coin bas droit
             -0.5, 0, 0.5,  // 3: Coin bas gauche
              -0.5, 0.5, 0.5,  // 4: Coin haut gauche

    // Face arrière (Z=-1) 
              0.0, 0.0, -0.5,   // 5: Centre
              0.5, 0.5, -0.5,   // 6: Coin haut droit
             0.5, 0, -0.5,  // 7: Coin bas droit
             -0.5, 0, -0.5,  // 8: Coin bas gauche
              -0.5, 0.5, -0.5,  // 9: Coin haut gauche

              0.0, 0.5, 0.0,      // 10 : Centre du cube en haut
              0.0, 0.0, 0.0,      // 11: Centre du cube au milieu
              0.0, -0.5, 0.0,      // 12 : Centre du cube en bas
        ];

    var objTresor = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTresor);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objTresor;
}

function creerCouleursTresor(objgl, tabCouleur) {
    tabCouleurs = [];
    for (var i = 0; i < 16; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursTresor = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursTresor);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

	return objCouleursTresor;
}

//Fonction inutile, jamais appelée....
function creerTexelsTresor(objgl, fltLargeur, fltProfondeur, fltHauteur, intNoTexture) {
    var tabTexels = [
    // Mur nord
             0.0, 0.0,
             fltLargeur, 0.0,
             0.0, fltHauteur,
             fltLargeur, fltHauteur,
    // Mur sud
			 0.0, 0.0,
             fltLargeur, 0.0,
             0.0, fltHauteur,
             fltLargeur, fltHauteur,
    // Mur est
			 0.0, 0.0,
             fltProfondeur, 0.0,
             0.0, fltHauteur,
             fltProfondeur, fltHauteur,
    // Mur ouest
			 0.0, 0.0,
             fltProfondeur, 0.0,
             0.0, fltHauteur,
             fltProfondeur, fltHauteur
        ];

    var objTexelsTresor = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsTresor);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsTresor.intNoTexture = intNoTexture; objTexelsTresor.pcCouleurTexel = 1.0;

    return objTexelsTresor;
  }

  function creerMaillageTresor(objgl) {
       var tabMaillage =
            [10, 2, 3,
             10, 3, 8,
             10, 8, 7,
             10, 7, 2,
            ];

	    var objMaillageTresor = objgl.createBuffer();
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageTresor);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

        // Le nombre de triangles
        objMaillageTresor.intNbTriangles = 4;
        // Le nombre de droites
        objMaillageTresor.intNbDroites = 0;

        return objMaillageTresor;
    }
