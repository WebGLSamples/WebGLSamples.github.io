//Maya ASCII 2010 scene
//Name: TreasureChest.ma
//Last modified: Mon, Aug 30, 2010 12:10:06 AM
//Codeset: 1252
requires maya "2010";
requires "stereoCamera" "10.0";
currentUnit -l centimeter -a degree -t film;
fileInfo "application" "maya";
fileInfo "product" "Maya Unlimited 2010";
fileInfo "version" "2010";
fileInfo "cutIdentifier" "200907280007-756013";
fileInfo "osv" "Microsoft Windows XP Service Pack 3 (Build 2600)\n";
createNode transform -n "TreasureChest_1";
createNode mesh -n "TreasureChest_1Shape" -p "TreasureChest_1";
	setAttr -k off ".v";
	setAttr ".uvst[0].uvsn" -type "string" "map1";
	setAttr -s 40 ".uvst[0].uvsp[0:39]" -type "float2" 0.40000001 0.494735 
		0.40000001 0.71601599 1 0.71601599 1 0.494735 0.40000001 0.85384101 1 0.85384101 
		0.40000001 1 1 1 0.40000001 0.85384101 1 0.85384101 0.40000001 0.71601599 1 0.71601599 
		0.40000001 0.494735 1 0.494735 0.30596599 0.643287 0.097393997 0.643287 0.20168 0.686813 
		0.097393997 0.643287 0.30596599 0.643287 0.20168 0.686813 0.39715499 0.412386 0.38230801 
		0.52437198 0.021051999 0.52437198 0.0050579999 0.412386 0.021051999 0.52437198 0.38230801 
		0.52437198 0.39715499 0.412386 0.0050579999 0.412386 0.40000001 0 1 0 1 0 0.40000001 
		0 0.45176601 0.056942001 0.95107698 0.056942001 0.95107698 0.428155 0.45176601 0.428155 
		0.0061300001 0 0.394934 0 0.394934 0 0.0061300001 0;
	setAttr ".cuvs" -type "string" "map1";
	setAttr ".dcc" -type "string" "Ambient+Diffuse";
	setAttr -s 18 ".pt[0:17]" -type "float3"  32.687805 0 -6.6622686 32.687805 
		0 -6.6622686 32.687805 0 -6.6622686 32.687805 0 -6.6622686 32.687805 0 -6.6622686 
		32.687805 0 -6.6622686 32.687805 0 -6.6622686 32.687805 0 -6.6622686 32.687805 0 
		-6.6622686 32.687805 0 -6.6622686 32.687805 0 -6.6622686 32.687805 0 -6.6622686 32.687805 
		0 -6.6622686 32.687805 0 -6.6622686 32.687805 0 -6.6622686 32.687805 0 -6.6622686 
		32.687805 0 -6.6622686 32.687805 0 -6.6622686;
	setAttr -s 18 ".vt[0:17]"  -33.581902 0.98512697 6.065393 -33.58543 
		1.371332 6.1107368 -33.58543 1.604501 6.3439069 -33.58543 1.6898479 6.6624231 -33.58543 
		1.604501 6.9809389 -33.58543 1.371332 7.2141099 -33.581902 0.98512697 7.262959 -31.797262 
		0.98512697 6.065393 -31.793732 1.371332 6.1107368 -31.793732 1.604501 6.3439069 -31.793732 
		1.6898479 6.6624231 -31.793732 1.604501 6.9809389 -31.793732 1.371332 7.2141099 -31.797262 
		0.98512697 7.262959 -33.578369 -0.001926 7.2596841 -31.800793 -0.001926 7.2596841 
		-33.578369 -0.001926 6.0721741 -31.800793 -0.001926 6.0721741;
	setAttr -s 33 ".ed[0:32]"  0 1 0 1 8 0 
		8 7 0 7 0 0 1 2 0 2 9 0 
		9 8 0 2 3 0 3 10 0 10 9 0 
		3 4 0 4 11 0 11 10 0 4 5 0 
		5 12 0 12 11 0 5 6 0 6 13 0 
		13 12 0 2 4 0 11 9 0 8 12 0 
		13 7 0 1 5 0 0 6 0 14 15 0 
		15 13 0 6 14 0 7 17 0 17 16 0 
		16 0 0 17 15 0 14 16 0;
	setAttr -s 66 ".n[0:65]" -type "float3"  1e+020 1e+020 1e+020 1e+020 
		1e+020 1e+020 1e+020 1e+020 1e+020 1e+020 1e+020 1e+020 0 0.43599001 -0.89995098 
		0 0.86602598 -0.5 0 0.86602598 -0.5 0 0.43599001 -0.89995098 0 0.86602598 -0.5 0 
		1 0 0 1 0 0 0.86602598 -0.5 0 1 0 0 0.86602598 0.5 0 0.86602598 0.5 0 1 0 0 0.86602598 
		0.5 0 0.44001001 0.89799303 0 0.44001001 0.89799303 0 0.86602598 0.5 0 0.44001001 
		0.89799303 0 0.061211001 0.99812502 0 0.061211001 0.99812502 0 0.44001001 0.89799303 
		-1 0 0 -1 0 0 -1 0 0 1 0 0 1 0 0 1 0 0 0.99997997 -0.0063590002 0 0.99998999 -0.0045710001 
		0 0.99998999 -0.0045710001 0 0.99997997 -0.0063590002 0 0.99998999 -0.0045710001 
		0 0.99998999 -0.0045710001 0 1 0 0 1 0 0 -0.99998999 -0.0045710001 0 -1 0 0 -1 0 
		0 -0.99998999 -0.0045710001 0 -0.99998999 -0.0045710001 0 -0.99998999 -0.0045710001 
		0 -0.99997997 -0.0063590002 0 -0.99997997 -0.0063590002 0 0 -0.0033179999 0.99999499 
		0 -0.0033179999 0.99999499 0 0.061211001 0.99812502 0 0.061211001 0.99812502 0 0.054974001 
		-0.99848801 0 0.054974001 -0.99848801 0 -0.0068700002 -0.99997598 0 -0.0068700002 
		-0.99997598 0 -1 0 0 -1 0 0 -1 0 0 -1 0 0.99999398 -0.003577 0 0.99999398 -0.003577 
		0 0.99997997 -0.0063590002 0 0.99997997 -0.0063590002 0 -0.99999398 -0.003577 0 -0.99999398 
		-0.003577 0 -0.99997997 -0.0063590002 0 -0.99997997 -0.0063590002 0;
	setAttr -s 17 ".fc[0:16]" -type "polyFaces" 
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
		f 3 19 -11 -8 
		mu 0 3 14 15 16 
		f 3 20 -10 -13 
		mu 0 3 17 18 19 
		f 4 -3 21 -19 22 
		mu 0 4 20 21 22 23 
		f 4 -22 -7 -21 -16 
		mu 0 4 22 21 18 17 
		f 4 -14 -20 -5 23 
		mu 0 4 24 15 14 25 
		f 4 -24 -1 24 -17 
		mu 0 4 24 25 26 27 
		f 4 25 26 -18 27 
		mu 0 4 28 29 13 12 
		f 4 -4 28 29 30 
		mu 0 4 0 3 30 31 
		f 4 -30 31 -26 32 
		mu 0 4 32 33 34 35 
		f 4 -32 -29 -23 -27 
		mu 0 4 36 37 20 23 
		f 4 -33 -28 -25 -31 
		mu 0 4 38 39 27 26 ;
	setAttr ".cd" -type "dataPolyComponent" Index_Data Edge 0 ;
	setAttr ".cvd" -type "dataPolyComponent" Index_Data Vertex 0 ;
createNode materialInfo -n "materialInfo20";
createNode shadingEngine -n "TreasureChestSG";
	setAttr ".ihi" 0;
	setAttr ".ro" yes;
createNode phongE -n "TreasureChest";
createNode file -n "file3";
	setAttr ".ftn" -type "string" "D:/Project/MyProject//sourceimages/Aquarium/PNGs/Chest_DM.jpg";
createNode place2dTexture -n "place2dTexture3";
createNode lightLinker -n "lightLinker1";
	setAttr -s 11 ".lnk";
	setAttr -s 11 ".slnk";
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
	setAttr -s 9 ".u";
select -ne :lightList1;
select -ne :defaultTextureList1;
	setAttr -s 9 ".tx";
select -ne :initialShadingGroup;
	setAttr ".ro" yes;
select -ne :initialParticleSE;
	setAttr ".ro" yes;
select -ne :hardwareRenderGlobals;
	setAttr ".ctrs" 256;
	setAttr ".btrs" 512;
select -ne :defaultHardwareRenderGlobals;
	setAttr ".fn" -type "string" "im";
	setAttr ".res" -type "string" "ntsc_4d 646 485 1.333";
connectAttr "TreasureChestSG.msg" "materialInfo20.sg";
connectAttr "TreasureChest.msg" "materialInfo20.m";
connectAttr "file3.msg" "materialInfo20.t" -na;
connectAttr "TreasureChest.oc" "TreasureChestSG.ss";
connectAttr "TreasureChest_1Shape.iog" "TreasureChestSG.dsm" -na;
connectAttr "file3.oc" "TreasureChest.c";
connectAttr "place2dTexture3.c" "file3.c";
connectAttr "place2dTexture3.tf" "file3.tf";
connectAttr "place2dTexture3.rf" "file3.rf";
connectAttr "place2dTexture3.mu" "file3.mu";
connectAttr "place2dTexture3.mv" "file3.mv";
connectAttr "place2dTexture3.s" "file3.s";
connectAttr "place2dTexture3.wu" "file3.wu";
connectAttr "place2dTexture3.wv" "file3.wv";
connectAttr "place2dTexture3.re" "file3.re";
connectAttr "place2dTexture3.of" "file3.of";
connectAttr "place2dTexture3.r" "file3.ro";
connectAttr "place2dTexture3.n" "file3.n";
connectAttr "place2dTexture3.vt1" "file3.vt1";
connectAttr "place2dTexture3.vt2" "file3.vt2";
connectAttr "place2dTexture3.vt3" "file3.vt3";
connectAttr "place2dTexture3.vc1" "file3.vc1";
connectAttr "place2dTexture3.o" "file3.uv";
connectAttr "place2dTexture3.ofs" "file3.fs";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[0].llnk";
connectAttr ":initialShadingGroup.msg" "lightLinker1.lnk[0].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[1].llnk";
connectAttr ":initialParticleSE.msg" "lightLinker1.lnk[1].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[23].llnk";
connectAttr "TreasureChestSG.msg" "lightLinker1.lnk[23].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[0].sllk";
connectAttr ":initialShadingGroup.msg" "lightLinker1.slnk[0].solk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[1].sllk";
connectAttr ":initialParticleSE.msg" "lightLinker1.slnk[1].solk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[23].sllk";
connectAttr "TreasureChestSG.msg" "lightLinker1.slnk[23].solk";
connectAttr "TreasureChestSG.pa" ":renderPartition.st" -na;
connectAttr "TreasureChest.msg" ":defaultShaderList1.s" -na;
connectAttr "place2dTexture3.msg" ":defaultRenderUtilityList1.u" -na;
connectAttr "lightLinker1.msg" ":lightList1.ln" -na;
connectAttr "file3.msg" ":defaultTextureList1.tx" -na;
// End of TreasureChest.ma
