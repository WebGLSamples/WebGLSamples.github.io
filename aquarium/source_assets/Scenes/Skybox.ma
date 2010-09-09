//Maya ASCII 2010 scene
//Name: Skybox.ma
//Last modified: Wed, Sep 08, 2010 06:59:35 PM
//Codeset: 1252
requires maya "2010";
requires "stereoCamera" "10.0";
currentUnit -l centimeter -a degree -t film;
fileInfo "application" "maya";
fileInfo "product" "Maya Unlimited 2010";
fileInfo "version" "2010";
fileInfo "cutIdentifier" "200907280007-756013";
fileInfo "osv" "Microsoft Windows XP Service Pack 3 (Build 2600)\n";
createNode transform -n "Skybox";
createNode mesh -n "SkyboxShape" -p "Skybox";
	setAttr -k off ".v";
	setAttr ".uvst[0].uvsn" -type "string" "map1";
	setAttr -s 18 ".uvst[0].uvsp[0:17]" -type "float2" 0.75 1 0.625 1 0.625 
		0 0.75 0 0.5 1 0.5 0 0.375 1 0.375 0 0.25 1 0.25 0 0.125 1 0.125 0 0 1 0 0 1 1 0.875 
		1 0.875 0 1 0;
	setAttr ".cuvs" -type "string" "map1";
	setAttr ".dcc" -type "string" "Ambient+Diffuse";
	setAttr -s 16 ".vt[0:15]"  -363.52277 37.744267 0 -363.52277 229.84583 
		0 -257.04941 37.744267 257.04941 -257.04941 229.84583 257.04941 0 37.744267 363.52277 
		0 229.84583 363.52277 257.04941 37.744267 257.04941 257.04941 229.84583 257.04941 
		363.52277 37.744267 0 363.52277 229.84583 0 257.04941 37.744267 -257.04941 257.04941 
		229.84583 -257.04941 0 37.744267 -363.52277 0 229.84583 -363.52277 -257.04941 37.744267 
		-257.04941 -257.04941 229.84583 -257.04941;
	setAttr -s 24 ".ed[0:23]"  1 3 0 3 2 1 
		2 0 0 0 1 1 3 5 0 5 4 1 
		4 2 0 5 7 0 7 6 1 6 4 0 
		7 9 0 9 8 1 8 6 0 9 11 0 
		11 10 1 10 8 0 11 13 0 13 12 1 
		12 10 0 13 15 0 15 14 1 14 12 0 
		15 1 0 0 14 0;
	setAttr -s 16 ".n[0:15]" -type "float3"  1e+020 1e+020 1e+020 1e+020 
		1e+020 1e+020 1e+020 1e+020 1e+020 1e+020 1e+020 1e+020 0 0 -1 0 0 -1 -0.70710701 
		0 -0.70710701 -0.70710701 0 -0.70710701 -1 0 0 -1 0 0 -0.70710701 0 0.70710701 -0.70710701 
		0 0.70710701 0 0 1 0 0 1 0.70710701 0 0.70710701 0.70710701 0 0.70710701;
	setAttr -s 8 ".fc[0:7]" -type "polyFaces" 
		f 4 0 1 2 3 
		mu 0 4 0 1 2 3 
		f 4 4 5 6 -2 
		mu 0 4 1 4 5 2 
		f 4 7 8 9 -6 
		mu 0 4 4 6 7 5 
		f 4 10 11 12 -9 
		mu 0 4 6 8 9 7 
		f 4 13 14 15 -12 
		mu 0 4 8 10 11 9 
		f 4 16 17 18 -15 
		mu 0 4 10 12 13 11 
		f 4 19 20 21 -18 
		mu 0 4 14 15 16 17 
		f 4 22 -4 23 -21 
		mu 0 4 15 0 3 16 ;
	setAttr ".cd" -type "dataPolyComponent" Index_Data Edge 0 ;
	setAttr ".cvd" -type "dataPolyComponent" Index_Data Vertex 0 ;
createNode materialInfo -n "materialInfo9";
createNode shadingEngine -n "SkyboxSG";
	setAttr ".ihi" 0;
	setAttr ".ro" yes;
createNode phongE -n "SkyboxM";
	setAttr ".ambc" -type "float3" 0.30000001 0.30000001 0.30000001 ;
	setAttr ".sc" -type "float3" 0 0 0 ;
createNode file -n "file18";
	setAttr ".ftn" -type "string" "D:/Project/MyProject//sourceimages/Aquarium/PNGs/GlobeOuter_Sky.jpg";
createNode place2dTexture -n "place2dTexture18";
createNode lightLinker -n "lightLinker1";
	setAttr -s 13 ".lnk";
	setAttr -s 13 ".slnk";
select -ne :time1;
	setAttr ".o" 1;
select -ne :renderPartition;
	setAttr -s 11 ".st";
select -ne :renderGlobalsList1;
select -ne :defaultShaderList1;
	setAttr -s 11 ".s";
select -ne :postProcessList1;
	setAttr -s 2 ".p";
select -ne :defaultRenderUtilityList1;
	setAttr -s 14 ".u";
select -ne :lightList1;
select -ne :defaultTextureList1;
	setAttr -s 13 ".tx";
select -ne :initialShadingGroup;
	setAttr ".ro" yes;
select -ne :initialParticleSE;
	setAttr ".ro" yes;
select -ne :defaultResolution;
	setAttr ".pa" 1;
select -ne :defaultLightSet;
select -ne :hardwareRenderGlobals;
	setAttr ".ctrs" 256;
	setAttr ".btrs" 512;
select -ne :defaultHardwareRenderGlobals;
	setAttr ".fn" -type "string" "im";
	setAttr ".res" -type "string" "ntsc_4d 646 485 1.333";
connectAttr "SkyboxSG.msg" "materialInfo9.sg";
connectAttr "SkyboxM.msg" "materialInfo9.m";
connectAttr "file18.msg" "materialInfo9.t" -na;
connectAttr "SkyboxM.oc" "SkyboxSG.ss";
connectAttr "SkyboxShape.iog" "SkyboxSG.dsm" -na;
connectAttr "file18.oc" "SkyboxM.c";
connectAttr "place2dTexture18.c" "file18.c";
connectAttr "place2dTexture18.tf" "file18.tf";
connectAttr "place2dTexture18.rf" "file18.rf";
connectAttr "place2dTexture18.mu" "file18.mu";
connectAttr "place2dTexture18.mv" "file18.mv";
connectAttr "place2dTexture18.s" "file18.s";
connectAttr "place2dTexture18.wu" "file18.wu";
connectAttr "place2dTexture18.wv" "file18.wv";
connectAttr "place2dTexture18.re" "file18.re";
connectAttr "place2dTexture18.of" "file18.of";
connectAttr "place2dTexture18.r" "file18.ro";
connectAttr "place2dTexture18.n" "file18.n";
connectAttr "place2dTexture18.vt1" "file18.vt1";
connectAttr "place2dTexture18.vt2" "file18.vt2";
connectAttr "place2dTexture18.vt3" "file18.vt3";
connectAttr "place2dTexture18.vc1" "file18.vc1";
connectAttr "place2dTexture18.o" "file18.uv";
connectAttr "place2dTexture18.ofs" "file18.fs";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[0].llnk";
connectAttr ":initialShadingGroup.msg" "lightLinker1.lnk[0].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[1].llnk";
connectAttr ":initialParticleSE.msg" "lightLinker1.lnk[1].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[11].llnk";
connectAttr "SkyboxSG.msg" "lightLinker1.lnk[11].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[0].sllk";
connectAttr ":initialShadingGroup.msg" "lightLinker1.slnk[0].solk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[1].sllk";
connectAttr ":initialParticleSE.msg" "lightLinker1.slnk[1].solk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[11].sllk";
connectAttr "SkyboxSG.msg" "lightLinker1.slnk[11].solk";
connectAttr "SkyboxSG.pa" ":renderPartition.st" -na;
connectAttr "SkyboxM.msg" ":defaultShaderList1.s" -na;
connectAttr "place2dTexture18.msg" ":defaultRenderUtilityList1.u" -na;
connectAttr "lightLinker1.msg" ":lightList1.ln" -na;
connectAttr "file18.msg" ":defaultTextureList1.tx" -na;
// End of Skybox.ma
