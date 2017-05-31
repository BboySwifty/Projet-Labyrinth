
function creerObj3DPyramide(objgl, obj3DSol, intNoTexture,positionX,positionZ) {
    var objet3DPyramide = new Object();
    objet3DPyramide.fltProfondeur = 1;
    objet3DPyramide.fltLargeur = 1;
    objet3DPyramide.fltHauteur = 1;

   // obj3DTransporteurs.vertex = creerVertexTransporteurs(objgl, obj3DTransporteurs.fltLargeur, obj3DTransporteurs.fltProfondeur, obj3DTransporteurs.fltHauteur);
  //  obj3DTransporteurs.couleurs = creerCouleursTransporteurs(objgl, [1, 1, 1, 1]);
  //	obj3DTransporteurs.texels = creerTexelsTransporteurs(objgl, obj3DTransporteurs.fltLargeur, obj3DTransporteurs.fltProfondeur, obj3DTransporteurs.fltHauteur, intNoTexture);
//  	obj3DTransporteurs.maillage = creerMaillageTransporteurs(objgl);


  	objet3DPyramide.vertex = creerPyramide(objgl);
  	objet3DPyramide.couleurs = creerCouleursPyramide(objgl);
  	objet3DPyramide.texels = creerTexelsTransporteur(objgl, objet3DPyramide.fltLargeur, objet3DPyramide.fltProfondeur, objet3DPyramide.fltHauteur, intNoTexture);
  	objet3DPyramide.maillage = null;
  	objet3DPyramide.transformations = creerTransformations();
  	setPositionsXYZ([positionX, 0, positionZ], objet3DPyramide.transformations); // A la gauche

  	return objet3DPyramide;
}

function creerPyramide(objgl) {
    var tabVertex = new Array();

    // Face avant pleine
    tabVertex[0] = [
               0.0, 1.0, 0.0,
               1.0, -1.0, 1.0,
              -1.0, -1.0, 1.0
         ];

    // Face gauche pleine
    tabVertex[1] = [
              0.0, 1.0, 0.0,
              -1.0, -1.0, 1.0,
             -1.0, -1.0, -1.0
             ];

    // Face arrière pleine
    tabVertex[2] = [
              0.0, 1.0, 0.0,
              -1.0, -1.0, -1.0,
             1.0, -1.0, -1.0
         ];

    // Face droite pleine
    tabVertex[3] = [
              0.0, 1.0, 0.0,
              1.0, -1.0, -1.0,
             1.0, -1.0, 1.0
         ];

    // Dessous
    tabVertex[4] = [
              1.0, -1.0, 1.0,
              -1.0, -1.0, 1.0,
               1.0, -1.0, -1.0,
              -1.0, -1.0, -1.0
         ];

    // Lignes
    tabVertex[5] = [
               0.0, 1.0, 0.0, 1.0, -1.0, 1.0,
               0.0, 1.0, 0.0, -1.0, -1.0, 1.0,
               0.0, 1.0, 0.0, -1.0, -1.0, -1.0,
               0.0, 1.0, 0.0, 1.0, -1.0, -1.0,

              1.0, -1.0, 1.0, 1.0, -1.0, -1.0,
              1.0, -1.0, -1.0, -1.0, -1.0, -1.0,
              -1.0, -1.0, -1.0, -1.0, -1.0, 1.0,
              -1.0, -1.0, 1.0, 1.0, -1.0, 1.0
         ];

    // Création des tampons
    var tabObjPyramide = new Array();
    for (var i = 0; i < 6; i++) {
        tabObjPyramide[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjPyramide[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex[i]), objgl.STATIC_DRAW);
        tabObjPyramide[i].typeDessin = (i < 4) ? objgl.TRIANGLES : ((i == 4) ? objgl.TRIANGLE_STRIP : objgl.LINES);
    }

    return tabObjPyramide;
}
function creerTexelsTransporteur(objgl, fltLargeur, fltProfondeur, fltHauteur, intNoTexture) {
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

    var objTexelsTransporteur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsTransporteur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsTransporteur.intNoTexture = intNoTexture; objTexelsTransporteur.pcCouleurTexel = 1.0;

    return objTexelsTransporteur;
}

function creerCouleursPyramide(objgl) {
    var tabCouleurs = new Array();

    // Couleurs face avant pleine
    tabCouleurs[0] = []; // 
    for (var i = 0; i < 3; i++)
        tabCouleurs[0] = tabCouleurs[0].concat([1.0, 0.0, 0.0, 1.0]); // Rouge

    // Couleurs face gauche pleine
    tabCouleurs[1] = []; // 
    for (var i = 0; i < 3; i++)
        tabCouleurs[1] = tabCouleurs[1].concat([0.0, 1.0, 0.0, 1.0]); // Vert

    // Couleurs face arrière pleine
    tabCouleurs[2] = []; // 
    for (var i = 0; i < 3; i++)
        tabCouleurs[2] = tabCouleurs[2].concat([0.0, 0.0, 1.0, 1.0]); // Bleu

    // Couleurs face droite pleine
    tabCouleurs[3] = []; // 
    for (var i = 0; i < 3; i++)
        tabCouleurs[3] = tabCouleurs[3].concat([1.0, 0.0, 1.0, 1.0]); // Magenta

    // Couleurs face droite pleine
    tabCouleurs[4] = []; // 
    for (var i = 0; i < 4; i++)
        tabCouleurs[4] = tabCouleurs[4].concat([0.0, 1.0, 1.0, 1.0]); // Cyan

    // Couleurs lignes
    tabCouleurs[5] = []; // 
    for (var i = 0; i < 16; i++)
        tabCouleurs[5] = tabCouleurs[5].concat([1.0, 1.0, 1.0, 1.0]); // Blanc

    // Création des tampons
    var tabObjCouleursPyramide = new Array();
    for (var i = 0; i < 6; i++) {
        tabObjCouleursPyramide[i] = objgl.createBuffer();
        objgl.bindBuffer(objgl.ARRAY_BUFFER, tabObjCouleursPyramide[i]);
        objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs[i]), objgl.STATIC_DRAW);
    }

    return tabObjCouleursPyramide;
}