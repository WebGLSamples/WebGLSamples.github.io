//Maya ASCII 2010 scene
//Name: EnvironmentBox.ma
//Last modified: Wed, Sep 08, 2010 07:00:12 PM
//Codeset: 1252
requires maya "2010";
requires "stereoCamera" "10.0";
currentUnit -l centimeter -a degree -t film;
fileInfo "application" "maya";
fileInfo "product" "Maya Unlimited 2010";
fileInfo "version" "2010";
fileInfo "cutIdentifier" "200907280007-756013";
fileInfo "osv" "Microsoft Windows XP Service Pack 3 (Build 2600)\n";
createNode transform -n "EnvironmentBox";
createNode transform -n "N_Y" -p "EnvironmentBox";
createNode mesh -n "N_YShape" -p "N_Y";
	setAttr -k off ".v";
	setAttr ".uvst[0].uvsn" -type "string" "map1";
	setAttr -s 4 ".uvst[0].uvsp[0:3]" -type "float2" 0 0 1 0 1 1 0 1;
	setAttr ".cuvs" -type "string" "map1";
	setAttr ".dcc" -type "string" "Ambient+Diffuse";
	setAttr -s 4 ".vt[0:3]"  -166.75085 -39.069214 -166.75085 166.75085 
		-39.069214 166.75085 166.75085 -39.069214 -166.75085 -166.75085 -39.069214 166.75085;
	setAttr -s 4 ".ed[0:3]"  3 1 0 1 2 0 
		2 0 0 0 3 0;
	setAttr -s 4 ".n[0:3]" -type "float3"  0 1 0 0 1 0 0 1 0 0 1 0;
	setAttr ".fc[0]" -type "polyFaces" 
		f 4 0 1 2 3 
		mu 0 4 0 1 2 3 ;
	setAttr ".cd" -type "dataPolyComponent" Index_Data Edge 0 ;
	setAttr ".cvd" -type "dataPolyComponent" Index_Data Vertex 0 ;
createNode transform -n "N_X" -p "EnvironmentBox";
createNode mesh -n "N_XShape" -p "N_X";
	setAttr -k off ".v";
	setAttr ".uvst[0].uvsn" -type "string" "map1";
	setAttr -s 10 ".uvst[0].uvsp[0:9]" -type "float2" 0 0 1 0 0.90112603 
		0.69507098 0 0.83674699 0 1 0 0.86201698 1 0.86201698 1 1 1 0.69507098 0.90112603 
		0.83674699;
	setAttr ".cuvs" -type "string" "map1";
	setAttr ".dcc" -type "string" "Ambient+Diffuse";
	setAttr -s 10 ".vt[0:9]"  -166.75085 -39.069214 -166.75085 -166.75085 
		157.15926 -166.75085 -166.75085 157.15926 166.75085 -166.75085 -39.069214 166.75085 
		-166.75085 130.08307 -166.75085 -166.75085 130.08307 166.75085 -166.75085 97.323456 
		-133.77605 -166.75085 125.12434 166.75085 -166.75085 97.323456 -166.75085 -166.75085 
		125.12434 -133.77605;
	setAttr -s 12 ".ed[0:11]"  3 0 0 0 6 0 
		6 7 0 7 3 0 2 5 0 5 4 0 
		4 1 0 1 2 0 8 6 0 0 8 0 
		6 9 0 9 7 0;
	setAttr -s 14 ".n[0:13]" -type "float3"  1e+020 1e+020 1e+020 1e+020 
		1e+020 1e+020 1e+020 1e+020 1e+020 1e+020 1e+020 1e+020 1 0 0 1 0 0 1 0 0 1 0 0 1 
		0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0;
	setAttr -s 4 ".fc[0:3]" -type "polyFaces" 
		f 4 0 1 2 3 
		mu 0 4 0 1 2 3 
		f 4 4 5 6 7 
		mu 0 4 4 5 6 7 
		f 3 8 -2 9 
		mu 0 3 8 2 1 
		f 3 -3 10 11 
		mu 0 3 3 2 9 ;
	setAttr ".cd" -type "dataPolyComponent" Index_Data Edge 0 ;
	setAttr ".cvd" -type "dataPolyComponent" Index_Data Vertex 0 ;
createNode transform -n "P_Z" -p "EnvironmentBox";
createNode mesh -n "P_ZShape" -p "P_Z";
	setAttr -k off ".v";
	setAttr ".uvst[0].uvsn" -type "string" "map1";
	setAttr -s 10 ".uvst[0].uvsp[0:9]" -type "float2" 1 0.83674699 0.094288997 
		0.69507098 0 0 1 0 0 1 0 0.86208701 1 0.86208701 1 1 0 0.69507098 0.094288997 0.83674699;
	setAttr ".cuvs" -type "string" "map1";
	setAttr ".dcc" -type "string" "Ambient+Diffuse";
	setAttr -s 10 ".vt[0:9]"  166.75085 -39.069214 -166.75085 166.75085 
		157.15926 -166.75085 -166.75085 157.15926 -166.75085 -166.75085 -39.069214 -166.75085 
		166.75085 130.09679 -166.75085 -166.75085 130.09679 -166.75085 166.75085 125.12434 
		-166.75085 -135.30542 97.323456 -166.75085 -135.30542 125.12434 -166.75085 -166.75085 
		97.323456 -166.75085;
	setAttr -s 12 ".ed[0:11]"  6 7 0 7 3 0 
		3 0 0 0 6 0 2 5 0 5 4 0 
		4 1 0 1 2 0 9 3 0 7 9 0 
		8 7 0 6 8 0;
	setAttr -s 14 ".n[0:13]" -type "float3"  1e+020 1e+020 1e+020 1e+020 
		1e+020 1e+020 1e+020 1e+020 1e+020 1e+020 1e+020 1e+020 0 0 1 0 0 1 0 0 1 0 0 1 0 
		0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1;
	setAttr -s 4 ".fc[0:3]" -type "polyFaces" 
		f 4 0 1 2 3 
		mu 0 4 0 1 2 3 
		f 4 4 5 6 7 
		mu 0 4 4 5 6 7 
		f 3 8 -2 9 
		mu 0 3 8 2 1 
		f 3 10 -1 11 
		mu 0 3 9 1 0 ;
	setAttr ".cd" -type "dataPolyComponent" Index_Data Edge 0 ;
	setAttr ".cvd" -type "dataPolyComponent" Index_Data Vertex 0 ;
createNode transform -n "P_X" -p "EnvironmentBox";
createNode mesh -n "P_XShape" -p "P_X";
	setAttr -k off ".v";
	setAttr ".uvst[0].uvsn" -type "string" "map1";
	setAttr -s 10 ".uvst[0].uvsp[0:9]" -type "float2" 0 0 1 0 0.902385 
		0.69507098 0 0.83674699 0 1 0 0.86208701 1 0.86208701 1 1 1 0.69507098 0.902385 0.83674699;
	setAttr ".cuvs" -type "string" "map1";
	setAttr ".dcc" -type "string" "Ambient+Diffuse";
	setAttr -s 10 ".vt[0:9]"  166.75085 157.15926 166.75085 166.75085 
		157.15926 -166.75085 166.75085 -39.069214 -166.75085 166.75085 -39.069214 166.75085 
		166.75085 130.09679 -166.75085 166.75085 130.09679 166.75085 166.75085 97.323456 
		134.19592 166.75085 125.12434 -166.75085 166.75085 97.323456 166.75085 166.75085 
		125.12434 134.19592;
	setAttr -s 12 ".ed[0:11]"  2 3 0 3 6 0 
		6 7 0 7 2 0 1 4 0 4 5 0 
		5 0 0 0 1 0 8 6 0 3 8 0 
		6 9 0 9 7 0;
	setAttr -s 14 ".n[0:13]" -type "float3"  1e+020 1e+020 1e+020 1e+020 
		1e+020 1e+020 1e+020 1e+020 1e+020 1e+020 1e+020 1e+020 -1 0 0 -1 0 0 -1 0 0 -1 0 
		0 -1 0 0 -1 0 0 -1 0 0 -1 0 0 -1 0 0 -1 0 0;
	setAttr -s 4 ".fc[0:3]" -type "polyFaces" 
		f 4 0 1 2 3 
		mu 0 4 0 1 2 3 
		f 4 4 5 6 7 
		mu 0 4 4 5 6 7 
		f 3 8 -2 9 
		mu 0 3 8 2 1 
		f 3 -3 10 11 
		mu 0 3 3 2 9 ;
	setAttr ".cd" -type "dataPolyComponent" Index_Data Edge 0 ;
	setAttr ".cvd" -type "dataPolyComponent" Index_Data Vertex 0 ;
createNode transform -n "N_Z" -p "EnvironmentBox";
createNode mesh -n "N_ZShape" -p "N_Z";
	setAttr -k off ".v";
	setAttr ".uvst[0].uvsn" -type "string" "map1";
	setAttr -s 10 ".uvst[0].uvsp[0:9]" -type "float2" 0 0 0.097248003 
		0.69507098 0 0.69507098 0 1 0 0.86208701 1 0.86208701 1 1 1 0 1 0.83674699 0.097248003 
		0.83674699;
	setAttr ".cuvs" -type "string" "map1";
	setAttr ".dcc" -type "string" "Ambient+Diffuse";
	setAttr -s 10 ".vt[0:9]"  166.75085 -39.069214 166.75085 -166.75085 
		-39.069214 166.75085 -166.75085 157.15926 166.75085 166.75085 157.15926 166.75085 
		-166.75085 130.09679 166.75085 166.75085 130.09679 166.75085 -166.75085 125.12434 
		166.75085 134.31842 97.323456 166.75085 166.75085 97.323456 166.75085 134.31842 125.12434 
		166.75085;
	setAttr -s 12 ".ed[0:11]"  0 7 0 7 8 0 
		8 0 0 3 5 0 5 4 0 4 2 0 
		2 3 0 1 6 0 6 7 0 0 1 0 
		9 7 0 6 9 0;
	setAttr -s 14 ".n[0:13]" -type "float3"  1e+020 1e+020 1e+020 1e+020 
		1e+020 1e+020 1e+020 1e+020 1e+020 0 0 -1 0 0 -1 0 0 -1 0 0 -1 0 0 -1 0 0 -1 0 0 
		-1 0 0 -1 0 0 -1 0 0 -1 0 0 -1;
	setAttr -s 4 ".fc[0:3]" -type "polyFaces" 
		f 3 0 1 2 
		mu 0 3 0 1 2 
		f 4 3 4 5 6 
		mu 0 4 3 4 5 6 
		f 4 7 8 -1 9 
		mu 0 4 7 8 1 0 
		f 3 10 -9 11 
		mu 0 3 9 1 8 ;
	setAttr ".cd" -type "dataPolyComponent" Index_Data Edge 0 ;
	setAttr ".cvd" -type "dataPolyComponent" Index_Data Vertex 0 ;
createNode transform -n "P_Y" -p "EnvironmentBox";
createNode mesh -n "P_YShape" -p "P_Y";
	setAttr -k off ".v";
	setAttr ".uvst[0].uvsn" -type "string" "map1";
	setAttr -s 21 ".uvst[0].uvsp[0:20]" -type "float2" 0.80455798 0.195536 
		0.896797 0.33935499 0.5 0.50016898 0 0 0.069288999 0.50009501 0 1 0.5 0.069384001 
		0.66052502 0.103209 1 0 0.19544201 0.195536 0.33806801 0.103792 0.80455798 0.80465299 
		0.89380199 0.66806197 1 1 0.10577 0.333159 0.19544201 0.80465299 0.347132 0.90015203 
		0.93071097 0.50009501 0.100933 0.65535301 0.65861201 0.89777201 0.5 0.93080503;
	setAttr ".cuvs" -type "string" "map1";
	setAttr ".dcc" -type "string" "Ambient+Diffuse";
	setAttr -s 21 ".vt[0:20]"  -101.91505 166.48207 101.91505 0 213.64693 
		0 0 166.48207 144.12964 -167.31609 157.15926 167.31609 101.91505 166.48207 101.91505 
		167.31609 157.15926 167.31609 144.12964 166.48207 0 167.31609 157.15926 -167.31609 
		101.91505 166.48207 -101.91505 -167.31609 157.15926 -167.31609 -144.12964 166.48207 
		0 -101.91505 166.48207 -101.91505 0 166.48207 -144.12964 -54.187782 166.48207 -132.61551 
		53.07655 166.48207 133.07581 -51.154461 166.48207 133.87195 53.716835 166.48207 -132.81058 
		-131.92209 166.48207 -55.861866 131.77895 166.48207 56.207413 -133.54059 166.48207 
		51.954453 132.7809 166.48207 -53.788486;
	setAttr -s 56 ".ed[0:55]"  8 20 0 20 1 1 
		1 8 1 9 10 1 10 3 1 3 9 0 
		12 16 0 16 1 1 1 12 1 8 16 0 
		16 7 1 7 8 1 11 13 0 13 1 1 
		1 11 1 4 18 0 18 5 1 5 4 1 
		10 17 0 17 1 1 1 10 1 0 15 0 
		15 3 1 3 0 1 6 18 0 18 1 1 
		1 6 1 0 19 0 19 1 1 1 0 1 
		4 14 0 14 1 1 1 4 1 2 15 0 
		15 1 1 1 2 1 9 17 1 3 19 1 
		3 2 1 2 5 1 5 3 0 5 14 1 
		5 6 1 6 7 1 7 5 0 7 20 1 
		7 12 1 12 9 1 9 7 0 9 13 1 
		11 9 1 13 12 0 14 2 0 17 11 0 
		19 10 0 20 6 0;
	setAttr -s 37 ".n[0:36]" -type "float3"  1e+020 1e+020 1e+020 1e+020 
		1e+020 1e+020 1e+020 1e+020 1e+020 0.118863 -0.98569202 0.119514 0.23059499 -0.97305 
		0.00031900001 0.119878 -0.98548102 -0.120235 0.00027399999 -0.95040703 0.31101 -0.118597 
		-0.949848 0.28935 1e+020 1e+020 1e+020 -0.118597 -0.949848 0.28935 -0.119468 -0.98562002 
		0.119497 0.219246 -0.95040601 0.220589 0.119056 -0.94984603 0.28916699 -0.070514001 
		-0.99495798 -0.071315996 -0.119745 -0.99178803 -0.044918999 -0.11867 -0.98566699 
		-0.119905 0.23059499 -0.97305 0.00031900001 0.28849 -0.949848 0.120677 0.070822999 
		-0.99495798 -0.071006998 0.043671999 -0.99124199 -0.124631 -0.31101 -0.95040601 -0.0013539999 
		-0.119745 -0.99178803 -0.044918999 0.070822999 -0.99495798 -0.071006998 0.29001299 
		-0.94986099 -0.116863 -0.070514001 -0.99495798 -0.071315996 -0.117971 -0.94985098 
		-0.28959501 -0.001199 -0.95040601 -0.31101 0.043671999 -0.99124199 -0.124631 0.28849 
		-0.949848 0.120677 0.29001299 -0.94986099 -0.116863 -0.001199 -0.95040601 -0.31101 
		-0.117971 -0.94985098 -0.28959501 -0.31101 -0.95040601 -0.0013539999 1e+020 1e+020 
		1e+020 0.00027399999 -0.95040703 0.31101 0.119056 -0.94984603 0.28916699 0.219246 
		-0.95040601 0.220589;
	setAttr -s 36 ".fc[0:35]" -type "polyFaces" 
		f 3 0 1 2 
		mu 0 3 0 1 2 
		f 3 3 4 5 
		mu 0 3 3 4 5 
		f 3 6 7 8 
		mu 0 3 6 7 2 
		f 3 9 10 11 
		mu 0 3 0 7 8 
		f 3 12 13 14 
		mu 0 3 9 10 2 
		f 3 15 16 17 
		mu 0 3 11 12 13 
		f 3 18 19 20 
		mu 0 3 4 14 2 
		f 3 21 22 23 
		mu 0 3 15 16 5 
		f 3 24 25 26 
		mu 0 3 17 12 2 
		f 3 27 28 29 
		mu 0 3 15 18 2 
		f 3 30 31 32 
		mu 0 3 11 19 2 
		f 3 33 34 35 
		mu 0 3 20 16 2 
		f 3 -4 36 -19 
		mu 0 3 4 3 14 
		f 3 37 -28 -24 
		mu 0 3 5 18 15 
		f 3 38 39 40 
		mu 0 3 5 20 13 
		f 3 41 -31 -18 
		mu 0 3 13 19 11 
		f 3 42 43 44 
		mu 0 3 13 17 8 
		f 3 45 -1 -12 
		mu 0 3 8 1 0 
		f 3 46 47 48 
		mu 0 3 8 6 3 
		f 3 49 -13 50 
		mu 0 3 3 10 9 
		f 3 -9 -14 51 
		mu 0 3 6 2 10 
		f 3 -36 -32 52 
		mu 0 3 20 2 19 
		f 3 -30 -35 -22 
		mu 0 3 15 2 16 
		f 3 -3 -8 -10 
		mu 0 3 0 2 7 
		f 3 -15 -20 53 
		mu 0 3 9 2 14 
		f 3 -33 -26 -16 
		mu 0 3 11 2 12 
		f 3 -43 -17 -25 
		mu 0 3 17 13 12 
		f 3 -21 -29 54 
		mu 0 3 4 2 18 
		f 3 -27 -2 55 
		mu 0 3 17 2 1 
		f 3 -56 -46 -44 
		mu 0 3 17 1 8 
		f 3 -47 -11 -7 
		mu 0 3 6 8 7 
		f 3 -52 -50 -48 
		mu 0 3 6 10 3 
		f 3 -54 -37 -51 
		mu 0 3 9 14 3 
		f 3 -55 -38 -5 
		mu 0 3 4 18 5 
		f 3 -39 -23 -34 
		mu 0 3 20 5 16 
		f 3 -53 -42 -40 
		mu 0 3 20 19 13 ;
	setAttr ".cd" -type "dataPolyComponent" Index_Data Edge 0 ;
	setAttr ".cvd" -type "dataPolyComponent" Index_Data Vertex 0 ;
createNode materialInfo -n "materialInfo1";
createNode shadingEngine -n "N_YSG";
	setAttr ".ihi" 0;
	setAttr ".ro" yes;
createNode phongE -n "N_YM";
	setAttr ".sc" -type "float3" 0 0 0 ;
	setAttr ".rfl" 0;
createNode file -n "file11";
	setAttr ".ftn" -type "string" "D:/Project/MyProject//sourceimages/Aquarium/PNGs/GlobeOuter_EM_negative_y.jpg";
createNode place2dTexture -n "place2dTexture11";
createNode materialInfo -n "materialInfo3";
createNode shadingEngine -n "N_XSG";
	setAttr ".ihi" 0;
	setAttr ".ro" yes;
createNode phongE -n "N_XM";
	setAttr ".sc" -type "float3" 0 0 0 ;
createNode file -n "file12";
	setAttr ".ftn" -type "string" "D:/Project/MyProject//sourceimages/Aquarium/PNGs/GlobeOuter_EM_negative_x.jpg";
createNode place2dTexture -n "place2dTexture12";
createNode materialInfo -n "materialInfo4";
createNode shadingEngine -n "P_ZSG";
	setAttr ".ihi" 0;
	setAttr ".ro" yes;
createNode phongE -n "P_ZM";
	setAttr ".sc" -type "float3" 0 0 0 ;
createNode file -n "file13";
	setAttr ".ftn" -type "string" "D:/Project/MyProject//sourceimages/Aquarium/PNGs/GlobeOuter_EM_positive_z.jpg";
createNode place2dTexture -n "place2dTexture13";
createNode materialInfo -n "materialInfo5";
createNode shadingEngine -n "P_XSG";
	setAttr ".ihi" 0;
	setAttr ".ro" yes;
createNode phongE -n "P_XM";
	setAttr ".sc" -type "float3" 0 0 0 ;
createNode file -n "file14";
	setAttr ".ftn" -type "string" "D:/Project/MyProject//sourceimages/Aquarium/PNGs/GlobeOuter_EM_positive_x.jpg";
createNode place2dTexture -n "place2dTexture14";
createNode materialInfo -n "materialInfo6";
createNode shadingEngine -n "N_ZSG";
	setAttr ".ihi" 0;
	setAttr ".ro" yes;
createNode phongE -n "N_ZM";
	setAttr ".sc" -type "float3" 0 0 0 ;
createNode file -n "file15";
	setAttr ".ftn" -type "string" "D:/Project/MyProject//sourceimages/Aquarium/PNGs/GlobeOuter_EM_negative_z.jpg";
createNode place2dTexture -n "place2dTexture15";
createNode materialInfo -n "materialInfo7";
createNode shadingEngine -n "P_YSG";
	setAttr ".ihi" 0;
	setAttr ".ro" yes;
createNode phongE -n "P_YM";
	setAttr ".sc" -type "float3" 0 0 0 ;
createNode file -n "file16";
	setAttr ".ftn" -type "string" "D:/Project/MyProject//sourceimages/Aquarium/PNGs/GlobeOuter_EM_positive_y.jpg";
createNode place2dTexture -n "place2dTexture16";
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
connectAttr "N_YSG.msg" "materialInfo1.sg";
connectAttr "N_YM.msg" "materialInfo1.m";
connectAttr "file11.msg" "materialInfo1.t" -na;
connectAttr "N_YM.oc" "N_YSG.ss";
connectAttr "N_YShape.iog" "N_YSG.dsm" -na;
connectAttr "file11.oc" "N_YM.c";
connectAttr "place2dTexture11.c" "file11.c";
connectAttr "place2dTexture11.tf" "file11.tf";
connectAttr "place2dTexture11.rf" "file11.rf";
connectAttr "place2dTexture11.mu" "file11.mu";
connectAttr "place2dTexture11.mv" "file11.mv";
connectAttr "place2dTexture11.s" "file11.s";
connectAttr "place2dTexture11.wu" "file11.wu";
connectAttr "place2dTexture11.wv" "file11.wv";
connectAttr "place2dTexture11.re" "file11.re";
connectAttr "place2dTexture11.of" "file11.of";
connectAttr "place2dTexture11.r" "file11.ro";
connectAttr "place2dTexture11.n" "file11.n";
connectAttr "place2dTexture11.vt1" "file11.vt1";
connectAttr "place2dTexture11.vt2" "file11.vt2";
connectAttr "place2dTexture11.vt3" "file11.vt3";
connectAttr "place2dTexture11.vc1" "file11.vc1";
connectAttr "place2dTexture11.o" "file11.uv";
connectAttr "place2dTexture11.ofs" "file11.fs";
connectAttr "N_XSG.msg" "materialInfo3.sg";
connectAttr "N_XM.msg" "materialInfo3.m";
connectAttr "file12.msg" "materialInfo3.t" -na;
connectAttr "N_XM.oc" "N_XSG.ss";
connectAttr "N_XShape.iog" "N_XSG.dsm" -na;
connectAttr "file12.oc" "N_XM.c";
connectAttr "place2dTexture12.c" "file12.c";
connectAttr "place2dTexture12.tf" "file12.tf";
connectAttr "place2dTexture12.rf" "file12.rf";
connectAttr "place2dTexture12.mu" "file12.mu";
connectAttr "place2dTexture12.mv" "file12.mv";
connectAttr "place2dTexture12.s" "file12.s";
connectAttr "place2dTexture12.wu" "file12.wu";
connectAttr "place2dTexture12.wv" "file12.wv";
connectAttr "place2dTexture12.re" "file12.re";
connectAttr "place2dTexture12.of" "file12.of";
connectAttr "place2dTexture12.r" "file12.ro";
connectAttr "place2dTexture12.n" "file12.n";
connectAttr "place2dTexture12.vt1" "file12.vt1";
connectAttr "place2dTexture12.vt2" "file12.vt2";
connectAttr "place2dTexture12.vt3" "file12.vt3";
connectAttr "place2dTexture12.vc1" "file12.vc1";
connectAttr "place2dTexture12.o" "file12.uv";
connectAttr "place2dTexture12.ofs" "file12.fs";
connectAttr "P_ZSG.msg" "materialInfo4.sg";
connectAttr "P_ZM.msg" "materialInfo4.m";
connectAttr "file13.msg" "materialInfo4.t" -na;
connectAttr "P_ZM.oc" "P_ZSG.ss";
connectAttr "P_ZShape.iog" "P_ZSG.dsm" -na;
connectAttr "file13.oc" "P_ZM.c";
connectAttr "place2dTexture13.c" "file13.c";
connectAttr "place2dTexture13.tf" "file13.tf";
connectAttr "place2dTexture13.rf" "file13.rf";
connectAttr "place2dTexture13.mu" "file13.mu";
connectAttr "place2dTexture13.mv" "file13.mv";
connectAttr "place2dTexture13.s" "file13.s";
connectAttr "place2dTexture13.wu" "file13.wu";
connectAttr "place2dTexture13.wv" "file13.wv";
connectAttr "place2dTexture13.re" "file13.re";
connectAttr "place2dTexture13.of" "file13.of";
connectAttr "place2dTexture13.r" "file13.ro";
connectAttr "place2dTexture13.n" "file13.n";
connectAttr "place2dTexture13.vt1" "file13.vt1";
connectAttr "place2dTexture13.vt2" "file13.vt2";
connectAttr "place2dTexture13.vt3" "file13.vt3";
connectAttr "place2dTexture13.vc1" "file13.vc1";
connectAttr "place2dTexture13.o" "file13.uv";
connectAttr "place2dTexture13.ofs" "file13.fs";
connectAttr "P_XSG.msg" "materialInfo5.sg";
connectAttr "P_XM.msg" "materialInfo5.m";
connectAttr "file14.msg" "materialInfo5.t" -na;
connectAttr "P_XM.oc" "P_XSG.ss";
connectAttr "P_XShape.iog" "P_XSG.dsm" -na;
connectAttr "file14.oc" "P_XM.c";
connectAttr "place2dTexture14.c" "file14.c";
connectAttr "place2dTexture14.tf" "file14.tf";
connectAttr "place2dTexture14.rf" "file14.rf";
connectAttr "place2dTexture14.mu" "file14.mu";
connectAttr "place2dTexture14.mv" "file14.mv";
connectAttr "place2dTexture14.s" "file14.s";
connectAttr "place2dTexture14.wu" "file14.wu";
connectAttr "place2dTexture14.wv" "file14.wv";
connectAttr "place2dTexture14.re" "file14.re";
connectAttr "place2dTexture14.of" "file14.of";
connectAttr "place2dTexture14.r" "file14.ro";
connectAttr "place2dTexture14.n" "file14.n";
connectAttr "place2dTexture14.vt1" "file14.vt1";
connectAttr "place2dTexture14.vt2" "file14.vt2";
connectAttr "place2dTexture14.vt3" "file14.vt3";
connectAttr "place2dTexture14.vc1" "file14.vc1";
connectAttr "place2dTexture14.o" "file14.uv";
connectAttr "place2dTexture14.ofs" "file14.fs";
connectAttr "N_ZSG.msg" "materialInfo6.sg";
connectAttr "N_ZM.msg" "materialInfo6.m";
connectAttr "file15.msg" "materialInfo6.t" -na;
connectAttr "N_ZM.oc" "N_ZSG.ss";
connectAttr "N_ZShape.iog" "N_ZSG.dsm" -na;
connectAttr "file15.oc" "N_ZM.c";
connectAttr "place2dTexture15.c" "file15.c";
connectAttr "place2dTexture15.tf" "file15.tf";
connectAttr "place2dTexture15.rf" "file15.rf";
connectAttr "place2dTexture15.mu" "file15.mu";
connectAttr "place2dTexture15.mv" "file15.mv";
connectAttr "place2dTexture15.s" "file15.s";
connectAttr "place2dTexture15.wu" "file15.wu";
connectAttr "place2dTexture15.wv" "file15.wv";
connectAttr "place2dTexture15.re" "file15.re";
connectAttr "place2dTexture15.of" "file15.of";
connectAttr "place2dTexture15.r" "file15.ro";
connectAttr "place2dTexture15.n" "file15.n";
connectAttr "place2dTexture15.vt1" "file15.vt1";
connectAttr "place2dTexture15.vt2" "file15.vt2";
connectAttr "place2dTexture15.vt3" "file15.vt3";
connectAttr "place2dTexture15.vc1" "file15.vc1";
connectAttr "place2dTexture15.o" "file15.uv";
connectAttr "place2dTexture15.ofs" "file15.fs";
connectAttr "P_YSG.msg" "materialInfo7.sg";
connectAttr "P_YM.msg" "materialInfo7.m";
connectAttr "file16.msg" "materialInfo7.t" -na;
connectAttr "P_YM.oc" "P_YSG.ss";
connectAttr "P_YShape.iog" "P_YSG.dsm" -na;
connectAttr "file16.oc" "P_YM.c";
connectAttr "place2dTexture16.c" "file16.c";
connectAttr "place2dTexture16.tf" "file16.tf";
connectAttr "place2dTexture16.rf" "file16.rf";
connectAttr "place2dTexture16.mu" "file16.mu";
connectAttr "place2dTexture16.mv" "file16.mv";
connectAttr "place2dTexture16.s" "file16.s";
connectAttr "place2dTexture16.wu" "file16.wu";
connectAttr "place2dTexture16.wv" "file16.wv";
connectAttr "place2dTexture16.re" "file16.re";
connectAttr "place2dTexture16.of" "file16.of";
connectAttr "place2dTexture16.r" "file16.ro";
connectAttr "place2dTexture16.n" "file16.n";
connectAttr "place2dTexture16.vt1" "file16.vt1";
connectAttr "place2dTexture16.vt2" "file16.vt2";
connectAttr "place2dTexture16.vt3" "file16.vt3";
connectAttr "place2dTexture16.vc1" "file16.vc1";
connectAttr "place2dTexture16.o" "file16.uv";
connectAttr "place2dTexture16.ofs" "file16.fs";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[0].llnk";
connectAttr ":initialShadingGroup.msg" "lightLinker1.lnk[0].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[1].llnk";
connectAttr ":initialParticleSE.msg" "lightLinker1.lnk[1].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[2].llnk";
connectAttr "N_YSG.msg" "lightLinker1.lnk[2].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[5].llnk";
connectAttr "N_XSG.msg" "lightLinker1.lnk[5].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[6].llnk";
connectAttr "P_ZSG.msg" "lightLinker1.lnk[6].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[7].llnk";
connectAttr "P_XSG.msg" "lightLinker1.lnk[7].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[8].llnk";
connectAttr "N_ZSG.msg" "lightLinker1.lnk[8].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[9].llnk";
connectAttr "P_YSG.msg" "lightLinker1.lnk[9].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[0].sllk";
connectAttr ":initialShadingGroup.msg" "lightLinker1.slnk[0].solk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[1].sllk";
connectAttr ":initialParticleSE.msg" "lightLinker1.slnk[1].solk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[2].sllk";
connectAttr "N_YSG.msg" "lightLinker1.slnk[2].solk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[5].sllk";
connectAttr "N_XSG.msg" "lightLinker1.slnk[5].solk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[6].sllk";
connectAttr "P_ZSG.msg" "lightLinker1.slnk[6].solk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[7].sllk";
connectAttr "P_XSG.msg" "lightLinker1.slnk[7].solk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[8].sllk";
connectAttr "N_ZSG.msg" "lightLinker1.slnk[8].solk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[9].sllk";
connectAttr "P_YSG.msg" "lightLinker1.slnk[9].solk";
connectAttr "N_YSG.pa" ":renderPartition.st" -na;
connectAttr "N_XSG.pa" ":renderPartition.st" -na;
connectAttr "P_ZSG.pa" ":renderPartition.st" -na;
connectAttr "P_XSG.pa" ":renderPartition.st" -na;
connectAttr "N_ZSG.pa" ":renderPartition.st" -na;
connectAttr "P_YSG.pa" ":renderPartition.st" -na;
connectAttr "N_YM.msg" ":defaultShaderList1.s" -na;
connectAttr "N_XM.msg" ":defaultShaderList1.s" -na;
connectAttr "P_ZM.msg" ":defaultShaderList1.s" -na;
connectAttr "P_XM.msg" ":defaultShaderList1.s" -na;
connectAttr "N_ZM.msg" ":defaultShaderList1.s" -na;
connectAttr "P_YM.msg" ":defaultShaderList1.s" -na;
connectAttr "place2dTexture11.msg" ":defaultRenderUtilityList1.u" -na;
connectAttr "place2dTexture12.msg" ":defaultRenderUtilityList1.u" -na;
connectAttr "place2dTexture13.msg" ":defaultRenderUtilityList1.u" -na;
connectAttr "place2dTexture14.msg" ":defaultRenderUtilityList1.u" -na;
connectAttr "place2dTexture15.msg" ":defaultRenderUtilityList1.u" -na;
connectAttr "place2dTexture16.msg" ":defaultRenderUtilityList1.u" -na;
connectAttr "lightLinker1.msg" ":lightList1.ln" -na;
connectAttr "file11.msg" ":defaultTextureList1.tx" -na;
connectAttr "file12.msg" ":defaultTextureList1.tx" -na;
connectAttr "file13.msg" ":defaultTextureList1.tx" -na;
connectAttr "file14.msg" ":defaultTextureList1.tx" -na;
connectAttr "file15.msg" ":defaultTextureList1.tx" -na;
connectAttr "file16.msg" ":defaultTextureList1.tx" -na;
// End of EnvironmentBox.ma
