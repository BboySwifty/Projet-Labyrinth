
function creerObj3DMurs(objgl, obj3DSol, intNoTexture, positionX, positionZ) {
    var obj3DMurs = new Object();
    obj3DMurs.fltProfondeur = 1;
    obj3DMurs.fltLargeur = 1;
    obj3DMurs.fltHauteur = 2;

    obj3DMurs.vertex = creerVertexMurs(objgl, obj3DMurs.fltLargeur, obj3DMurs.fltProfondeur, obj3DMurs.fltHauteur);
    obj3DMurs.couleurs = creerCouleursMurs(objgl, [1, 1, 1, 1]);
    obj3DMurs.texels = creerTexelsMurs(objgl, obj3DMurs.fltLargeur, obj3DMurs.fltProfondeur, obj3DMurs.fltHauteur, intNoTexture);
    obj3DMurs.maillage = creerMaillageMurs(objgl);

    obj3DMurs.transformations = creerTransformations();
    setPositionsXYZ([positionX, 0, positionZ], obj3DMurs.transformations);
    return obj3DMurs;
}

function creerVertexMurs(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    var tabVertex = [/*
    // Mur nord
             0, fltHauteur, 0,
             fltLargeur, fltHauteur, 0,
             0, 0, 0,
             fltLargeur, 0, 0,
    // Mur sud
			       fltLargeur, fltHauteur, fltProfondeur,
             0, fltHauteur, fltProfondeur,
             fltLargeur, 0, fltProfondeur,
             0, 0, fltProfondeur,
    // Mur est
             fltLargeur, fltHauteur, 0,
             fltLargeur, fltHauteur, fltProfondeur,
             fltLargeur, 0, 0,
             fltLargeur, 0, fltProfondeur,
    // Mur ouest
             0, fltHauteur, fltProfondeur,
             0, fltHauteur, 0,
             0, 0, fltProfondeur,
             0, 0, 0*/
             0.5, 1.0, 1.0,   // 0: Centre
             1.0, 2.0, 1.0,   // 1: Coin haut droit
             1.0, 0.0, 1.0,  // 2: Coin bas droit
             0.0, 0.0, 1.0,  // 3: Coin bas gauche
             0.0, 2.0, 1.0,  // 4: Coin haut gauche

             0.5, 1.0, 0.0,   // 5: Centre
             1.0, 2.0, 0.0,   // 6: Coin haut droit
             1.0, 0.0, 0.0,  // 7: Coin bas droit
             0.0, 0.0, 0.0,  // 8: Coin bas gauche
             0.0, 2.0, 0.0,  // 9: Coin haut gauche

              1.0, 1.0, 0.5,   //10: Centre de droite
              0.0, 1.0, 0.5,  //11: Centre de gauche
              0.5, 2.0, 0.5,   //12: Centre de dessus
        ];

    var objMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objMurs;
}

function creerCouleursMurs(objgl, tabCouleur) {
    /*tabCouleurs = [];
    for (var i = 0; i < 16; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursMurs;*/
    var objCouleursCube = objgl.createBuffer();

    // Face avant
    tabCouleurs = [1.0, 1.0, 1.0, 1.0]; // Blanc
    for (var i = 1; i <= 4; i++)
        tabCouleurs = tabCouleurs.concat([1.0, 0.0, 0.0, 1.0]); // Rouge

    // Face arri�re
    tabCouleurs = tabCouleurs.concat([1.0, 1.0, 1.0, 1.0]); // Blanc
    for (var i = 1; i <= 4; i++)
        tabCouleurs = tabCouleurs.concat([0.0, 1.0, 0.0, 1.0]); // Vert

    // Face arri�re
    tabCouleurs = tabCouleurs.concat([1.0, 1.0, 1.0, 1.0]); // Blanc
    for (var i = 1; i <= 4; i++)
        tabCouleurs = tabCouleurs.concat([1.0, 1.0, 1.0, 1.0]); // Vert

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursCube);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursCube;
}

function creerTexelsMurs(objgl, fltLargeur, fltProfondeur, fltHauteur, intNoTexture) {
    var tabTexels = [
  /*  // Mur nord
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
             fltProfondeur, fltHauteur*/
             0.5, 0.5,  // 0: Centre
             1.0, 0.0,  // 1: Coin haut droit
             1.0, 1.0,  // 2: Coin bas droit
             0.0, 1.0,  // 3: Coin bas gauche
             0.0, 0.0,  // 4: Coin haut gauche

             // Texels de la face arri�re
             0.5, 0.5,  // 5: Centre
             0.0, 0.0,  // 6: Coin haut droit
             0.0, 1.0,  // 7: Coin bas droit
             1.0, 1.0,  // 8: Coin bas gauche
             1.0, 0.0,  // 9: Coin haut gauche

             0.5, 0.5,   //10: Centre de droite
             0.5, 0.5,  //11: Centre de gauche
             0.5, 0.5,    //12: Centre de dessus

        ];


    var objTexelsMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsMurs.intNoTexture = intNoTexture; objTexelsMurs.pcCouleurTexel = 1.0;

    return objTexelsMurs;
}

function creerMaillageMurs(objgl) {
    var tabMaillage =
            [ // Les 2 triangles du mur nord
            /* 0, 1, 2,
             1, 2, 3,
    // Les 2 triangles du mur sud
			 4, 5, 6,
             5, 6, 7,
    // Les 2 triangles du mur est
			 8, 9, 10,
             9, 10, 11,
    // Les 2 triangles du mur ouest
			 12, 13, 14,
             13, 14, 15*/
             0, 1, 2,
             0, 2, 3,
             0, 3, 4,
             0, 4, 1,
             // Les 4 triangles de la face arri�re
             5, 6, 7,
             5, 7, 8,
             5, 8, 9,
             5, 9, 6,

             // Les 16 triangles

             10, 1, 6,
             10, 6, 7,
             10, 7, 2,
             10, 2, 1,

             11, 4, 9,
             11, 9, 8,
             11, 8, 3,
             11, 3, 4,

             12, 1, 6,
             12, 6, 9,
             12, 9, 4,
             12, 4, 1
            ];

    var objMaillageMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageMurs);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageMurs.intNbTriangles = 20;
    // Le nombre de droites
    objMaillageMurs.intNbDroites = 0;

    return objMaillageMurs;
}
