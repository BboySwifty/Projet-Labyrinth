//Cube.js
var TEX_TRANSPARENT = 0
var TEX_METAL = 1;
var TEX_WEBGL = 2;

function creerObj3DNiveau(objgl, intNoTexture) {
    var obj3DNiveau = new Object();
    obj3DNiveau.fltProfondeur = 1;
    obj3DNiveau.fltLargeur = 1;
    obj3DNiveau.fltHauteur = 2;

    obj3DNiveau.vertex = creerCube(objgl);
    obj3DNiveau.couleurs = creerCouleursCube(objgl);
    obj3DNiveau.maillage = creerMaillageCube(objgl);
    obj3DNiveau.texels = creerTexelsCube(objgl);

    obj3DNiveau.transformations = creerTransformations();
    setPositionsXYZ([j, 1, i], objet3D.transformations);
    tabObjets3D.push(objet3D);

    obj3DMurs.vertex = creerVertexMurs(objgl, obj3DMurs.fltLargeur, obj3DMurs.fltProfondeur, obj3DMurs.fltHauteur);
    obj3DMurs.couleurs = creerCouleursMurs(objgl, [1, 1, 1, 1]);
  	obj3DMurs.texels = creerTexelsMurs(objgl, obj3DMurs.fltLargeur, obj3DMurs.fltProfondeur, obj3DMurs.fltHauteur, intNoTexture);
  	obj3DMurs.maillage = creerMaillageMurs(objgl);

    obj3DMurs.transformations = creerTransformations();
    return obj3DMurs;
}

function creerCube(objgl) {
    var objCube = objgl.createBuffer();

    tabVertex = [
         // Face avant (Z=1)
          0.5, 0.0, 1.0,   // 0: Centre
          1.0, 1.0, 1.0,   // 1: Coin haut droit
          1.0, -1.0, 1.0,  // 2: Coin bas droit
          0.0, -1.0, 1.0,  // 3: Coin bas gauche
          0.0, 1.0, 1.0,  // 4: Coin haut gauche

          // Face arri�re (Z=-1)
          0.5, 0.0, 0.0,   // 5: Centre
          1.0, 1.0, 0.0,   // 6: Coin haut droit
          1.0, -1.0, 0.0,  // 7: Coin bas droit
          0.0, -1.0, 0.0,  // 8: Coin bas gauche
          0.0, 1.0, 0.0,  // 9: Coin haut gauche

           1.0, 0.0, 0.5,   //10: Centre de droite
           0.0, 0.0, 0.5,  //11: Centre de gauche
           0.5, 1.0, 0.5,   //12: Centre de dessus
          // 0.5, -1.0, 0.5   //13: Centre de dessous

    ];

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCube);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objCube;
}

function creerCouleursCube(objgl) {
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

// Relier un texel � un vertex
function creerTexelsCube(objgl) {
    var objTexelsCube = objgl.createBuffer();

    tabTexels = [  // Texels de la face avant
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
                    // 0.5, 0.5  //13: Centre de dessous

    ];

    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsCube);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    // 100% de la texture est utilis�e
    objTexelsCube.intNoTexture = TEX_WEBGL; objTexelsCube.pcCouleurTexel = 1.00;

    return objTexelsCube;
}

function creerMaillageCube(objgl) {
    var objMaillageCube = objgl.createBuffer();
    // Le maillage
    tabMaillageCube =
        [ // Les 4 triangles de la face avant
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

        /* 12, 1, 6,
         12, 6, 9,
         12, 9, 4,
         12, 4, 1*/
        ];

    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageCube);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageCube), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageCube.intNbTriangles = 16;
    // Le nombre de droites
    objMaillageCube.intNbDroites = 0;

    return objMaillageCube;
}
