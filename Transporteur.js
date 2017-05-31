
function creerObj3DTele(objgl, obj3DSol, intNoTexture,positionX,positionZ) {
    var obj3DTele = new Object();
    obj3DTele.fltProfondeur = 1;
    obj3DTele.fltLargeur = 1;
    obj3DTele.fltHauteur = 1;

    obj3DTele.vertex = creerVertexTele(objgl, obj3DTele.fltLargeur, obj3DTele.fltProfondeur, obj3DTele.fltHauteur);
    obj3DTele.couleurs = creerCouleursTele(objgl, [1, 1, 1, 1]);
  	obj3DTele.texels = creerTexelsTele(objgl, obj3DTele.fltLargeur, obj3DTele.fltProfondeur, obj3DTele.fltHauteur, intNoTexture);
  	obj3DTele.maillage = creerMaillageTele(objgl);

  	obj3DTele.transformations = creerTransformations();
  	setPositionsXYZ([positionX+.5, 0, positionZ+.5], obj3DTele.transformations);
    return obj3DTele;
}

function creerVertexTele(objgl, fltLargeur, fltProfondeur, fltHauteur) {
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

    var objTele = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTele);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objTele;
}

function creerCouleursTele(objgl, tabCouleur) {
    tabCouleurs = [];
    for (var i = 0; i < 16; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursTele = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursTele);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

	return objCouleursTele;
}

//Fonction inutile, jamais appelée....
function creerTexelsTele(objgl, fltLargeur, fltProfondeur, fltHauteur, intNoTexture) {
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

    var objTexelsTele = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsTele);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsTele.intNoTexture = intNoTexture; objTexelsTele.pcCouleurTexel = 1.0;

    return objTexelsTele;
  }

  function creerMaillageTele(objgl) {
       var tabMaillage =
            [10, 2, 3,
             10, 3, 8,
             10, 8, 7,
             10, 7, 2,
            ];

	    var objMaillageTele = objgl.createBuffer();
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageTele);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

        // Le nombre de triangles
        objMaillageTele.intNbTriangles = 4;
        // Le nombre de droites
        objMaillageTele.intNbDroites = 0;

        return objMaillageTele;
    }
