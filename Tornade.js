
function creerObj3DTornade(objgl, obj3DMurs, obj3DCreneaux, intNoTexture) {
    var obj3DTornade = new Object();  
    obj3DTornade.fltProfondeur = 0.6;
    obj3DTornade.fltLargeur = 0.6;
    obj3DTornade.fltHauteur = obj3DMurs.fltHauteur + obj3DCreneaux.fltHauteur;
   
    obj3DTornade.intNbCirconvolutions = 20;
    obj3DTornade.vertex = creerVertexTornade(objgl, obj3DTornade.intNbCirconvolutions,
                                             obj3DTornade.fltHauteur + 0.1, obj3DTornade.fltLargeur, obj3DTornade.fltProfondeur);
 
                                                
    obj3DTornade.tabCouleurDebut = [0.5, 0.4, 0.1];    // Couleur sable à la base
    obj3DTornade.tabCouleurMilieu = [0.9, 0.9, 0.9];   // Gris pâle presque blanc au 3/4
    obj3DTornade.tabCouleurFin = [0.2, 0.2, 0.2];      // Gris foncé au sommet
    obj3DTornade.fltPosCouleurMilieu = 0.75;           // Couleur du milieu au 3/4 de la base
    obj3DTornade.couleurs = creerCouleursTornade(objgl, obj3DTornade.intNbCirconvolutions,
                                obj3DTornade.tabCouleurDebut, obj3DTornade.tabCouleurMilieu, obj3DTornade.tabCouleurFin,
                                obj3DTornade.fltPosCouleurMilieu);

    obj3DTornade.texels = creerTexelsTornade(objgl, obj3DTornade.intNbCirconvolutions, intNoTexture);
    obj3DTornade.maillage = creerMaillageTornade(objgl, obj3DTornade.intNbCirconvolutions)
    obj3DTornade.transformations = creerTransformations();
   
    return obj3DTornade;
}

function creerVertexTornade(objgl, intNbCirconvolutions, fltHauteur, fltLargeur, fltProfondeur) {
    var fltDistRayon = 1 / (180 * intNbCirconvolutions);
 
    // Créer 4 vrilles imbriquées l'une dans l'autre 
    var tabVertex = [];
    for (j = 0; j < 4; j++) {
        var fltRayon = 0.0;
        for (var i = j * 90; i < 360 * intNbCirconvolutions + j * 90; i+=2) {
            fltRayon += fltDistRayon;
            tabVertex = tabVertex.concat([Math.cos(i * Math.PI / 180) * fltRayon * fltLargeur,
                                          fltHauteur * fltRayon,
                                          Math.sin(i * Math.PI / 180) * fltRayon * fltProfondeur]);
        }
    }

    var objTornade = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTornade);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);
    
    return objTornade;
}

function creerCouleursTornade(objgl, intNbCirconvolutions, tabCouleurDebut, tabCouleurMilieu, tabCouleurFin, fltPosCouleurMilieu) {
    var intNbCoups = [Math.round(180 * intNbCirconvolutions * fltPosCouleurMilieu),
                      Math.round(180 * intNbCirconvolutions * (1-fltPosCouleurMilieu))];

    var fltDistRouge = [(tabCouleurMilieu[0] - tabCouleurDebut[0]) / intNbCoups[0], 
                        (tabCouleurFin[0] - tabCouleurMilieu[0]) / intNbCoups[1]];
    var fltDistVert = [(tabCouleurMilieu[1] - tabCouleurDebut[1]) / intNbCoups[0],
                       (tabCouleurFin[1] - tabCouleurMilieu[1]) / intNbCoups[1]];
    var fltDistBleu = [(tabCouleurMilieu[2] - tabCouleurDebut[2]) / intNbCoups[0], 
                      (tabCouleurFin[2] - tabCouleurMilieu[2]) / intNbCoups[1]];

    // Créer des dégradés de couleurs de la couleur du milieu jusqu'à la couleur de la fin
    var tabCouleurs = [];
    var fltRouge = tabCouleurDebut[0];
    var fltVert = tabCouleurDebut[1];
    var fltBleu = tabCouleurDebut[2];

    for (j = 0; j < 2; j++) {
        for (var i = 0; i < intNbCoups[j]; i++) {
            var tabCouleur = [fltRouge, fltVert, fltBleu, 1];
            tabCouleurs = tabCouleurs.concat(tabCouleur);
            fltRouge += fltDistRouge[j];
            fltVert += fltDistVert[j];
            fltBleu += fltDistBleu[j];
        } 
    }
    
    // Les dégradés de couleurs sont les mêmes pour les 4 vrilles
    tabCouleurs = tabCouleurs.concat(tabCouleurs).concat(tabCouleurs).concat(tabCouleurs);

    var objCouleursTornade = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursTornade);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);
 
    return objCouleursTornade;
}

function creerTexelsTornade(objgl, intNbCirconvolutions, intNoTexture) {
    var tabTexels = []; 
    for (var i = 0; i < 4 * intNbCirconvolutions * 180; i++)
        tabTexels = tabTexels.concat([0,0]);

   var objTexelsTornade = objgl.createBuffer();
   objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsTornade);
   objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

   objTexelsTornade.intNoTexture = intNoTexture; objTexelsTornade.pcCouleurTexel = 0.0;
    
   return objTexelsTornade;
}

function creerMaillageTornade(objgl, intNbCirconvolutions) {
    var noVertex = 0;
    var tabMaillage = [];
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < intNbCirconvolutions * 180 - 1; i++)
        {     
            tabMaillage = tabMaillage.concat([noVertex, noVertex + 1]);
            noVertex++;
        }
        noVertex++;
    }

    var objMaillageTornade = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageTornade);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageTornade.intNbTriangles = 0;
    // Le nombre de droites
    objMaillageTornade.intNbDroites = 4 * (intNbCirconvolutions * 180 - 1);

    return objMaillageTornade;
}
