//Maya ASCII 2010 scene
//Name: GlobeInner.ma
//Last modified: Sun, Aug 29, 2010 11:16:36 PM
//Codeset: 1252
requires maya "2010";
requires "stereoCamera" "10.0";
currentUnit -l centimeter -a degree -t film;
fileInfo "application" "maya";
fileInfo "product" "Maya Unlimited 2010";
fileInfo "version" "2010";
fileInfo "cutIdentifier" "200907280007-756013";
fileInfo "osv" "Microsoft Windows XP Service Pack 3 (Build 2600)\n";
createNode transform -n "GlobeInner";
createNode mesh -n "GlobeInnerShape" -p "GlobeInner";
	setAttr -k off ".v";
	setAttr ".iog[0].og[0].gcl" -type "componentList" 1 "f[0:95]";
	setAttr ".pv" -type "double2" 0.49564599990844727 0.4982614993059542 ;
	setAttr ".uvst[0].uvsn" -type "string" "map1";
	setAttr -s 116 ".uvst[0].uvsp[0:115]" -type "float2" -0.37177199 0.99719 
		-0.25077099 0.88315201 -0.49863699 0.88315201 -0.25077099 0.71652299 -0.49863699 
		0.71652299 -0.25077099 0.55715001 -0.49863699 0.55715001 1.866734 0.99719 1.988842 
		0.88315201 1.746472 0.88315201 -0.25077099 0.105626 0.00027600001 0.105626 0.00027600001 
		-0.00066700001 -0.25077099 -0.00066700001 -0.25077099 0.21969301 0.00027600001 0.21969301 
		-0.25077099 0.33375999 0.00027600001 0.33375999 -0.25077099 0.44005299 0.00027600001 
		0.44005299 0.00027600001 0.55715001 0.00027600001 0.71652299 0.00027600001 0.88315201 
		-0.127701 0.99719 -0.49863699 0.44005299 -0.49863699 0.33375999 -0.49863699 0.21969301 
		1.988842 0.71652299 1.746472 0.71652299 0.249733 0.105626 0.249733 -0.00066700001 
		0.249733 0.21969301 0.249733 0.33375999 0.249733 0.44005299 0.249733 0.55715001 0.249733 
		0.71652299 0.249733 0.88315201 0.124505 0.99719 -0.49863699 0.105626 -0.49863699 
		-0.00066700001 1.988842 0.55715001 1.746472 0.55715001 1.988842 0.44005299 1.746472 
		0.44005299 0.49918899 0.105626 0.49918899 -0.00066700001 0.49918899 0.21969301 0.49918899 
		0.33375999 0.49918899 0.44005299 0.49918899 0.55715001 0.49918899 0.71652299 0.49918899 
		0.88315201 0.36748001 0.99719 -0.61764598 0.99719 -0.74809301 0.88315201 -0.74809301 
		0.71652299 -0.74809301 0.55715001 1.988842 0.33375999 1.746472 0.33375999 0.74864602 
		0.105626 0.74864602 -0.00066700001 0.74864602 0.21969301 0.74864602 0.33375999 0.74864602 
		0.44005299 0.74864602 0.55715001 0.74864602 0.71652299 0.74864602 0.88315201 0.63033599 
		0.99719 -0.74809301 0.44005299 -0.74809301 0.33375999 -0.74809301 0.21969301 1.988842 
		0.21969301 1.746472 0.21969301 0.99810201 0.105626 0.99810201 -0.00066700001 0.99810201 
		0.21969301 0.99810201 0.33375999 0.99810201 0.44005299 0.99810201 0.55715001 0.99810201 
		0.71652299 0.99810201 0.88315201 0.87903601 0.99719 -0.74809301 0.105626 -0.74809301 
		-0.00066700001 1.988842 0.105626 1.746472 0.105626 1.988842 -0.00066700001 1.746472 
		-0.00066700001 1.242962 0.105626 1.242962 -0.00066700001 1.242962 0.21969301 1.242962 
		0.33375999 1.242962 0.44005299 1.242962 0.55715001 1.242962 0.71652299 1.242962 0.88315201 
		1.1206321 0.99719 -0.859487 0.99719 -0.99755001 0.88315201 -0.99755001 0.71652299 
		-0.99755001 0.55715001 -0.99755001 0.105626 -0.99755001 -0.00066700001 1.497015 0.105626 
		1.497015 -0.00066700001 1.497015 0.21969301 1.497015 0.33375999 1.497015 0.44005299 
		1.497015 0.55715001 1.497015 0.71652299 1.497015 0.88315201 1.355121 0.99719 -0.99755001 
		0.44005299 -0.99755001 0.33375999 -0.99755001 0.21969301 1.620402 0.99719;
	setAttr ".cuvs" -type "string" "map1";
	setAttr ".dcc" -type "string" "Ambient+Diffuse";
	setAttr -s 97 ".vt[0:96]"  -16.590424 107.38692 -9.5784864 0 109.90899 
		0 -32.05024 99.992607 -18.504213 -45.325882 88.22995 -26.168909 0 72.900558 -64.100479 
		-64.100479 -1.116294 0 -71.494789 16.735163 0 -74.016853 35.892132 0 -71.494789 55.049103 
		0 -64.100479 72.900558 0 -52.337818 88.22995 0 -37.008427 99.992607 0 -19.156971 
		107.38692 0 -55.512642 72.900558 -32.05024 -61.916306 55.049103 -35.747395 0 55.049103 
		-71.494789 -55.512642 -1.116294 32.05024 -61.916306 16.735163 35.747395 -64.100479 
		35.892132 37.008427 -61.916306 55.049103 35.747395 -55.512642 72.900558 32.05024 
		-45.325882 88.22995 26.168909 -32.05024 99.992607 18.504213 -16.590424 107.38692 
		9.5784864 -64.100479 35.892132 -37.008427 -61.916306 16.735163 -35.747395 0 35.892132 
		-74.016853 -32.05024 -1.116294 55.512642 -35.747395 16.735163 61.916306 -37.008427 
		35.892132 64.100479 -35.747395 55.049103 61.916306 -32.05024 72.900558 55.512642 
		-26.168909 88.22995 45.325882 -18.504213 99.992607 32.05024 -9.5784864 107.38692 
		16.590424 -55.512642 -1.116294 -32.05024 0 16.735163 -71.494789 0 -1.116294 -64.100479 
		0 -1.116294 64.100479 0 16.735163 71.494789 0 35.892132 74.016853 0 55.049103 71.494789 
		0 72.900558 64.100479 0 88.22995 52.337818 0 99.992607 37.008427 0 107.38692 19.156971 
		-9.5784864 107.38692 -16.590424 -18.504213 99.992607 -32.05024 0 88.22995 -52.337818 
		32.05024 -1.116294 55.512642 35.747395 16.735163 61.916306 37.008427 35.892132 64.100479 
		35.747395 55.049103 61.916306 32.05024 72.900558 55.512642 26.168909 88.22995 45.325882 
		18.504213 99.992607 32.05024 9.5784864 107.38692 16.590424 -26.168909 88.22995 -45.325882 
		-32.05024 72.900558 -55.512642 0 99.992607 -37.008427 55.512642 -1.116294 32.05024 
		61.916306 16.735163 35.747395 64.100479 35.892132 37.008427 61.916306 55.049103 35.747395 
		55.512642 72.900558 32.05024 45.325882 88.22995 26.168909 32.05024 99.992607 18.504213 
		16.590424 107.38692 9.5784864 -35.747395 55.049103 -61.916306 -37.008427 35.892132 
		-64.100479 9.5784864 107.38692 -16.590424 64.100479 -1.116294 0 71.494789 16.735163 
		0 74.016853 35.892132 0 71.494789 55.049103 0 64.100479 72.900558 0 52.337818 88.22995 
		0 37.008427 99.992607 0 19.156971 107.38692 0 -35.747395 16.735163 -61.916306 -32.05024 
		-1.116294 -55.512642 18.504213 99.992607 -32.05024 55.512642 -1.116294 -32.05024 
		61.916306 16.735163 -35.747395 64.100479 35.892132 -37.008427 61.916306 55.049103 
		-35.747395 55.512642 72.900558 -32.05024 45.325882 88.22995 -26.168909 32.05024 99.992607 
		-18.504213 16.590424 107.38692 -9.5784864 26.168909 88.22995 -45.325882 0 107.38692 
		-19.156971 32.05024 72.900558 -55.512642 32.05024 -1.116294 -55.512642 35.747395 
		16.735163 -61.916306 37.008427 35.892132 -64.100479 35.747395 55.049103 -61.916306;
	setAttr -s 192 ".ed";
	setAttr ".ed[0:165]"  1 12 0 12 0 0 0 1 
		0 12 11 0 11 2 0 2 0 0 11 10 
		0 10 3 0 3 2 0 1 91 0 91 70 
		0 70 1 0 6 17 0 17 16 0 16 5 
		0 5 6 0 7 18 0 18 17 0 6 7 
		0 8 19 0 19 18 0 7 8 0 9 20 
		0 20 19 0 8 9 0 10 21 0 21 20 
		0 9 10 0 11 22 0 22 21 0 12 23 
		0 23 22 0 1 23 0 9 13 0 13 3 
		0 8 14 0 14 13 0 7 24 0 24 14 
		0 91 59 0 59 81 0 81 70 0 17 28 
		0 28 27 0 27 16 0 18 29 0 29 28 
		0 19 30 0 30 29 0 20 31 0 31 30 
		0 21 32 0 32 31 0 22 33 0 33 32 
		0 23 34 0 34 33 0 1 34 0 6 25 
		0 25 24 0 5 35 0 35 25 0 59 48 
		0 48 90 0 90 81 0 48 4 0 4 92 
		0 92 90 0 28 39 0 39 38 0 38 27 
		0 29 40 0 40 39 0 30 41 0 41 40 
		0 31 42 0 42 41 0 32 43 0 43 42 
		0 33 44 0 44 43 0 34 45 0 45 44 
		0 1 45 0 0 46 0 46 1 0 2 47 
		0 47 46 0 3 57 0 57 47 0 4 15 
		0 15 96 0 96 92 0 39 50 0 50 49 
		0 49 38 0 40 51 0 51 50 0 41 52 
		0 52 51 0 42 53 0 53 52 0 43 54 
		0 54 53 0 44 55 0 55 54 0 45 56 
		0 56 55 0 1 56 0 13 58 0 58 57 
		0 14 68 0 68 58 0 24 69 0 69 68 
		0 15 26 0 26 95 0 95 96 0 50 61 
		0 61 60 0 60 49 0 51 62 0 62 61 
		0 52 63 0 63 62 0 53 64 0 64 63 
		0 54 65 0 65 64 0 55 66 0 66 65 
		0 56 67 0 67 66 0 1 67 0 25 79 
		0 79 69 0 35 80 0 80 79 0 26 36 
		0 36 94 0 94 95 0 36 37 0 37 93 
		0 93 94 0 61 72 0 72 71 0 71 60 
		0 62 73 0 73 72 0 63 74 0 74 73 
		0 64 75 0 75 74 0 65 76 0 76 75 
		0 66 77 0 77 76 0 67 78 0 78 77 
		0 1 78 0 46 91 0 47 59 0 57 48 
		0 36 79 0 80 37 0 72 83 0;
	setAttr ".ed[166:191]" 83 82 0 82 71 0 73 84 
		0 84 83 0 74 85 0 85 84 0 75 86 
		0 86 85 0 76 87 0 87 86 0 77 88 
		0 88 87 0 78 89 0 89 88 0 1 89 
		0 58 4 0 68 15 0 69 26 0 83 94 
		0 93 82 0 84 95 0 85 96 0 86 92 
		0 87 90 0 88 81 0 89 70 0;
	setAttr -s 372 ".n";
	setAttr ".n[0:165]" -type "float3"  0 -1 0 0.25852501 -0.96600401 0 0.22389001 
		-0.96600401 0.129263 0.22389001 -0.96600401 0.129263 0.25852501 -0.96600401 0 0.49955001 
		-0.86628503 0 0.432623 -0.86628503 0.24977501 0.432623 -0.86628503 0.24977501 0.49955001 
		-0.86628503 0 0.706689 -0.707524 0 0.61201102 -0.707524 0.35334501 0 -1 0 0 -0.96600401 
		0.25852501 -0.129263 -0.96600401 0.22389001 0.96585202 0.259096 0 0.83645201 0.259096 
		-0.48292601 0.80010301 0.38268301 -0.46193999 0.92387998 0.38268301 0 1 0 0 0.86602497 
		0 -0.5 0.83645201 0.259096 -0.48292601 0.96585202 0.259096 0 0.96585202 -0.259096 
		0 0.83645201 -0.259096 -0.48292601 0.86602497 0 -0.5 1 0 0 0.86577398 -0.50043499 
		0 0.74978203 -0.50043499 -0.43288699 0.83645201 -0.259096 -0.48292601 0.96585202 
		-0.259096 0 0.706689 -0.707524 0 0.61201102 -0.707524 -0.35334501 0.74978203 -0.50043499 
		-0.43288699 0.86577398 -0.50043499 0 0.49955001 -0.86628503 0 0.432623 -0.86628503 
		-0.24977501 0.61201102 -0.707524 -0.35334501 0.706689 -0.707524 0 0.25852501 -0.96600401 
		0 0.22389001 -0.96600401 -0.129263 0.432623 -0.86628503 -0.24977501 0.49955001 -0.86628503 
		0 0 -1 0 0.22389001 -0.96600401 -0.129263 0.25852501 -0.96600401 0 0.61201102 -0.707524 
		0.35334501 0.706689 -0.707524 0 0.86577398 -0.50043499 0 0.74978203 -0.50043499 0.43288699 
		0.74978203 -0.50043499 0.43288699 0.86577398 -0.50043499 0 0.96585202 -0.259096 0 
		0.83645201 -0.259096 0.48292601 0.83645201 -0.259096 0.48292601 0.96585202 -0.259096 
		0 1 0 0 0.86602497 0 0.5 -0.129263 -0.96600401 0.22389001 0 -0.96600401 0.25852501 
		0 -0.86628503 0.49955001 -0.24977501 -0.86628503 0.432623 0.83645201 0.259096 -0.48292601 
		0.48292601 0.259096 -0.83645201 0.46193999 0.38268301 -0.80010301 0.80010301 0.38268301 
		-0.46193999 0.86602497 0 -0.5 0.5 0 -0.86602497 0.48292601 0.259096 -0.83645201 0.83645201 
		0.259096 -0.48292601 0.83645201 -0.259096 -0.48292601 0.48292601 -0.259096 -0.83645201 
		0.5 0 -0.86602497 0.86602497 0 -0.5 0.74978203 -0.50043499 -0.43288699 0.43288699 
		-0.50043499 -0.74978203 0.48292601 -0.259096 -0.83645201 0.83645201 -0.259096 -0.48292601 
		0.61201102 -0.707524 -0.35334501 0.35334501 -0.707524 -0.61201102 0.43288699 -0.50043499 
		-0.74978203 0.74978203 -0.50043499 -0.43288699 0.432623 -0.86628503 -0.24977501 0.24977501 
		-0.86628503 -0.432623 0.35334501 -0.707524 -0.61201102 0.61201102 -0.707524 -0.35334501 
		0.22389001 -0.96600401 -0.129263 0.129263 -0.96600401 -0.22389001 0.24977501 -0.86628503 
		-0.432623 0.432623 -0.86628503 -0.24977501 0 -1 0 0.129263 -0.96600401 -0.22389001 
		0.22389001 -0.96600401 -0.129263 0.86602497 0 0.5 1 0 0 0.96585202 0.259096 0 0.83645201 
		0.259096 0.48292601 0.83645201 0.259096 0.48292601 0.96585202 0.259096 0 0.92387998 
		0.38268301 0 0.80010301 0.38268301 0.46193999 -0.24977501 -0.86628503 0.432623 0 
		-0.86628503 0.49955001 0 -0.707524 0.706689 -0.35334501 -0.707524 0.61201102 -0.35334501 
		-0.707524 0.61201102 0 -0.707524 0.706689 0 -0.50043499 0.86577398 -0.43288699 -0.50043499 
		0.74978203 0.48292601 0.259096 -0.83645201 0 0.259096 -0.96585202 0 0.38268301 -0.92387998 
		0.46193999 0.38268301 -0.80010301 0.5 0 -0.86602497 0 0 -1 0 0.259096 -0.96585202 
		0.48292601 0.259096 -0.83645201 0.48292601 -0.259096 -0.83645201 0 -0.259096 -0.96585202 
		0 0 -1 0.5 0 -0.86602497 0.43288699 -0.50043499 -0.74978203 0 -0.50043499 -0.86577398 
		0 -0.259096 -0.96585202 0.48292601 -0.259096 -0.83645201 0.35334501 -0.707524 -0.61201102 
		0 -0.707524 -0.706689 0 -0.50043499 -0.86577398 0.43288699 -0.50043499 -0.74978203 
		0.24977501 -0.86628503 -0.432623 0 -0.86628503 -0.49955001 0 -0.707524 -0.706689 
		0.35334501 -0.707524 -0.61201102 0.129263 -0.96600401 -0.22389001 0 -0.96600401 -0.25852501 
		0 -0.86628503 -0.49955001 0.24977501 -0.86628503 -0.432623 0 -1 0 0 -0.96600401 -0.25852501 
		0.129263 -0.96600401 -0.22389001 0 -1 0 0.22389001 -0.96600401 0.129263 0.129263 
		-0.96600401 0.22389001 0.129263 -0.96600401 0.22389001 0.22389001 -0.96600401 0.129263 
		0.432623 -0.86628503 0.24977501 0.24977501 -0.86628503 0.432623 0.24977501 -0.86628503 
		0.432623 0.432623 -0.86628503 0.24977501 0.61201102 -0.707524 0.35334501 0.35334501 
		-0.707524 0.61201102 -0.43288699 -0.50043499 0.74978203 0 -0.50043499 0.86577398 
		0 -0.259096 0.96585202 -0.48292601 -0.259096 0.83645201 0 0.259096 -0.96585202 -0.48292601 
		0.259096 -0.83645201 -0.46193999 0.38268301 -0.80010301 0 0.38268301 -0.92387998 
		0 0 -1 -0.5 0 -0.86602497 -0.48292601 0.259096 -0.83645201 0 0.259096 -0.96585202 
		0 -0.259096 -0.96585202 -0.48292601 -0.259096 -0.83645201 -0.5 0 -0.86602497 0 0 
		-1;
	setAttr ".n[166:331]" -type "float3"  0 -0.50043499 -0.86577398 -0.43288699 
		-0.50043499 -0.74978203 -0.48292601 -0.259096 -0.83645201 0 -0.259096 -0.96585202 
		0 -0.707524 -0.706689 -0.35334501 -0.707524 -0.61201102 -0.43288699 -0.50043499 -0.74978203 
		0 -0.50043499 -0.86577398 0 -0.86628503 -0.49955001 -0.24977501 -0.86628503 -0.432623 
		-0.35334501 -0.707524 -0.61201102 0 -0.707524 -0.706689 0 -0.96600401 -0.25852501 
		-0.129263 -0.96600401 -0.22389001 -0.24977501 -0.86628503 -0.432623 0 -0.86628503 
		-0.49955001 0 -1 0 -0.129263 -0.96600401 -0.22389001 0 -0.96600401 -0.25852501 0.35334501 
		-0.707524 0.61201102 0.61201102 -0.707524 0.35334501 0.74978203 -0.50043499 0.43288699 
		0.43288699 -0.50043499 0.74978203 0.43288699 -0.50043499 0.74978203 0.74978203 -0.50043499 
		0.43288699 0.83645201 -0.259096 0.48292601 0.48292601 -0.259096 0.83645201 0.48292601 
		-0.259096 0.83645201 0.83645201 -0.259096 0.48292601 0.86602497 0 0.5 0.5 0 0.86602497 
		-0.48292601 -0.259096 0.83645201 0 -0.259096 0.96585202 0 0 1 -0.5 0 0.86602497 -0.48292601 
		0.259096 -0.83645201 -0.83645201 0.259096 -0.48292601 -0.80010301 0.38268301 -0.46193999 
		-0.46193999 0.38268301 -0.80010301 -0.5 0 -0.86602497 -0.86602497 0 -0.5 -0.83645201 
		0.259096 -0.48292601 -0.48292601 0.259096 -0.83645201 -0.48292601 -0.259096 -0.83645201 
		-0.83645201 -0.259096 -0.48292601 -0.86602497 0 -0.5 -0.5 0 -0.86602497 -0.43288699 
		-0.50043499 -0.74978203 -0.74978203 -0.50043499 -0.43288699 -0.83645201 -0.259096 
		-0.48292601 -0.48292601 -0.259096 -0.83645201 -0.35334501 -0.707524 -0.61201102 -0.61201102 
		-0.707524 -0.35334501 -0.74978203 -0.50043499 -0.43288699 -0.43288699 -0.50043499 
		-0.74978203 -0.24977501 -0.86628503 -0.432623 -0.432623 -0.86628503 -0.24977501 -0.61201102 
		-0.707524 -0.35334501 -0.35334501 -0.707524 -0.61201102 -0.129263 -0.96600401 -0.22389001 
		-0.22389001 -0.96600401 -0.129263 -0.432623 -0.86628503 -0.24977501 -0.24977501 -0.86628503 
		-0.432623 0 -1 0 -0.22389001 -0.96600401 -0.129263 -0.129263 -0.96600401 -0.22389001 
		0.5 0 0.86602497 0.86602497 0 0.5 0.83645201 0.259096 0.48292601 0.48292601 0.259096 
		0.83645201 0.48292601 0.259096 0.83645201 0.83645201 0.259096 0.48292601 0.80010301 
		0.38268301 0.46193999 0.46193999 0.38268301 0.80010301 -0.5 0 0.86602497 0 0 1 0 
		0.259096 0.96585202 -0.48292601 0.259096 0.83645201 -0.48292601 0.259096 0.83645201 
		0 0.259096 0.96585202 0 0.38268301 0.92387998 -0.46193999 0.38268301 0.80010301 -0.83645201 
		0.259096 -0.48292601 -0.96585202 0.259096 0 -0.92387998 0.38268301 0 -0.80010301 
		0.38268301 -0.46193999 -0.86602497 0 -0.5 -1 0 0 -0.96585202 0.259096 0 -0.83645201 
		0.259096 -0.48292601 -0.83645201 -0.259096 -0.48292601 -0.96585202 -0.259096 0 -1 
		0 0 -0.86602497 0 -0.5 -0.74978203 -0.50043499 -0.43288699 -0.86577398 -0.50043499 
		0 -0.96585202 -0.259096 0 -0.83645201 -0.259096 -0.48292601 -0.61201102 -0.707524 
		-0.35334501 -0.706689 -0.707524 0 -0.86577398 -0.50043499 0 -0.74978203 -0.50043499 
		-0.43288699 -0.432623 -0.86628503 -0.24977501 -0.49955001 -0.86628503 0 -0.706689 
		-0.707524 0 -0.61201102 -0.707524 -0.35334501 -0.22389001 -0.96600401 -0.129263 -0.25852501 
		-0.96600401 0 -0.49955001 -0.86628503 0 -0.432623 -0.86628503 -0.24977501 0 -1 0 
		-0.25852501 -0.96600401 0 -0.22389001 -0.96600401 -0.129263 0 -1 0 0.129263 -0.96600401 
		0.22389001 0 -0.96600401 0.25852501 0 -0.96600401 0.25852501 0.129263 -0.96600401 
		0.22389001 0.24977501 -0.86628503 0.432623 0 -0.86628503 0.49955001 0 -0.86628503 
		0.49955001 0.24977501 -0.86628503 0.432623 0.35334501 -0.707524 0.61201102 0 -0.707524 
		0.706689 0 0.259096 0.96585202 0.48292601 0.259096 0.83645201 0.46193999 0.38268301 
		0.80010301 0 0.38268301 0.92387998 -0.96585202 0.259096 0 -0.83645201 0.259096 0.48292601 
		-0.80010301 0.38268301 0.46193999 -0.92387998 0.38268301 0 -1 0 0 -0.86602497 0 0.5 
		-0.83645201 0.259096 0.48292601 -0.96585202 0.259096 0 -0.96585202 -0.259096 0 -0.83645201 
		-0.259096 0.48292601 -0.86602497 0 0.5 -1 0 0 -0.86577398 -0.50043499 0 -0.74978203 
		-0.50043499 0.43288699 -0.83645201 -0.259096 0.48292601 -0.96585202 -0.259096 0 -0.706689 
		-0.707524 0 -0.61201102 -0.707524 0.35334501 -0.74978203 -0.50043499 0.43288699 -0.86577398 
		-0.50043499 0 -0.49955001 -0.86628503 0 -0.432623 -0.86628503 0.24977501 -0.61201102 
		-0.707524 0.35334501 -0.706689 -0.707524 0 -0.25852501 -0.96600401 0 -0.22389001 
		-0.96600401 0.129263 -0.432623 -0.86628503 0.24977501 -0.49955001 -0.86628503 0 0 
		-1 0 -0.22389001 -0.96600401 0.129263 -0.25852501 -0.96600401 0 0 -0.707524 0.706689 
		0.35334501 -0.707524 0.61201102 0.43288699 -0.50043499 0.74978203 0 -0.50043499 0.86577398 
		0 -0.50043499 0.86577398 0.43288699 -0.50043499 0.74978203 0.48292601 -0.259096 0.83645201;
	setAttr ".n[332:371]" -type "float3"  0 -0.259096 0.96585202 0 -0.259096 0.96585202 
		0.48292601 -0.259096 0.83645201 0.5 0 0.86602497 0 0 1 0 0 1 0.5 0 0.86602497 0.48292601 
		0.259096 0.83645201 0 0.259096 0.96585202 -0.83645201 0.259096 0.48292601 -0.48292601 
		0.259096 0.83645201 -0.46193999 0.38268301 0.80010301 -0.80010301 0.38268301 0.46193999 
		-0.86602497 0 0.5 -0.5 0 0.86602497 -0.48292601 0.259096 0.83645201 -0.83645201 0.259096 
		0.48292601 -0.83645201 -0.259096 0.48292601 -0.48292601 -0.259096 0.83645201 -0.5 
		0 0.86602497 -0.86602497 0 0.5 -0.74978203 -0.50043499 0.43288699 -0.43288699 -0.50043499 
		0.74978203 -0.48292601 -0.259096 0.83645201 -0.83645201 -0.259096 0.48292601 -0.61201102 
		-0.707524 0.35334501 -0.35334501 -0.707524 0.61201102 -0.43288699 -0.50043499 0.74978203 
		-0.74978203 -0.50043499 0.43288699 -0.432623 -0.86628503 0.24977501 -0.24977501 -0.86628503 
		0.432623 -0.35334501 -0.707524 0.61201102 -0.61201102 -0.707524 0.35334501 -0.22389001 
		-0.96600401 0.129263 -0.129263 -0.96600401 0.22389001 -0.24977501 -0.86628503 0.432623 
		-0.432623 -0.86628503 0.24977501 0 -1 0 -0.129263 -0.96600401 0.22389001 -0.22389001 
		-0.96600401 0.129263;
	setAttr -s 96 ".fc[0:95]" -type "polyFaces" 
		f 3 0 1 2 
		mu 0 3 0 1 2 
		f 4 -2 3 4 5 
		mu 0 4 2 1 3 4 
		f 4 -5 6 7 8 
		mu 0 4 4 3 5 6 
		f 3 9 10 11 
		mu 0 3 7 8 9 
		f 4 12 13 14 15 
		mu 0 4 10 11 12 13 
		f 4 16 17 -13 18 
		mu 0 4 14 15 11 10 
		f 4 19 20 -17 21 
		mu 0 4 16 17 15 14 
		f 4 22 23 -20 24 
		mu 0 4 18 19 17 16 
		f 4 25 26 -23 27 
		mu 0 4 5 20 19 18 
		f 4 28 29 -26 -7 
		mu 0 4 3 21 20 5 
		f 4 30 31 -29 -4 
		mu 0 4 1 22 21 3 
		f 3 32 -31 -1 
		mu 0 3 23 22 1 
		f 4 -8 -28 33 34 
		mu 0 4 6 5 18 24 
		f 4 -34 -25 35 36 
		mu 0 4 24 18 16 25 
		f 4 -36 -22 37 38 
		mu 0 4 25 16 14 26 
		f 4 -11 39 40 41 
		mu 0 4 9 8 27 28 
		f 4 42 43 44 -14 
		mu 0 4 11 29 30 12 
		f 4 45 46 -43 -18 
		mu 0 4 15 31 29 11 
		f 4 47 48 -46 -21 
		mu 0 4 17 32 31 15 
		f 4 49 50 -48 -24 
		mu 0 4 19 33 32 17 
		f 4 51 52 -50 -27 
		mu 0 4 20 34 33 19 
		f 4 53 54 -52 -30 
		mu 0 4 21 35 34 20 
		f 4 55 56 -54 -32 
		mu 0 4 22 36 35 21 
		f 3 57 -56 -33 
		mu 0 3 37 36 22 
		f 4 -38 -19 58 59 
		mu 0 4 26 14 10 38 
		f 4 -59 -16 60 61 
		mu 0 4 38 10 13 39 
		f 4 -41 62 63 64 
		mu 0 4 28 27 40 41 
		f 4 -64 65 66 67 
		mu 0 4 41 40 42 43 
		f 4 68 69 70 -44 
		mu 0 4 29 44 45 30 
		f 4 71 72 -69 -47 
		mu 0 4 31 46 44 29 
		f 4 73 74 -72 -49 
		mu 0 4 32 47 46 31 
		f 4 75 76 -74 -51 
		mu 0 4 33 48 47 32 
		f 4 77 78 -76 -53 
		mu 0 4 34 49 48 33 
		f 4 79 80 -78 -55 
		mu 0 4 35 50 49 34 
		f 4 81 82 -80 -57 
		mu 0 4 36 51 50 35 
		f 3 83 -82 -58 
		mu 0 3 52 51 36 
		f 3 -3 84 85 
		mu 0 3 53 2 54 
		f 4 -85 -6 86 87 
		mu 0 4 54 2 4 55 
		f 4 -87 -9 88 89 
		mu 0 4 55 4 6 56 
		f 4 -67 90 91 92 
		mu 0 4 43 42 57 58 
		f 4 93 94 95 -70 
		mu 0 4 44 59 60 45 
		f 4 96 97 -94 -73 
		mu 0 4 46 61 59 44 
		f 4 98 99 -97 -75 
		mu 0 4 47 62 61 46 
		f 4 100 101 -99 -77 
		mu 0 4 48 63 62 47 
		f 4 102 103 -101 -79 
		mu 0 4 49 64 63 48 
		f 4 104 105 -103 -81 
		mu 0 4 50 65 64 49 
		f 4 106 107 -105 -83 
		mu 0 4 51 66 65 50 
		f 3 108 -107 -84 
		mu 0 3 67 66 51 
		f 4 -89 -35 109 110 
		mu 0 4 56 6 24 68 
		f 4 -110 -37 111 112 
		mu 0 4 68 24 25 69 
		f 4 -112 -39 113 114 
		mu 0 4 69 25 26 70 
		f 4 -92 115 116 117 
		mu 0 4 58 57 71 72 
		f 4 118 119 120 -95 
		mu 0 4 59 73 74 60 
		f 4 121 122 -119 -98 
		mu 0 4 61 75 73 59 
		f 4 123 124 -122 -100 
		mu 0 4 62 76 75 61 
		f 4 125 126 -124 -102 
		mu 0 4 63 77 76 62 
		f 4 127 128 -126 -104 
		mu 0 4 64 78 77 63 
		f 4 129 130 -128 -106 
		mu 0 4 65 79 78 64 
		f 4 131 132 -130 -108 
		mu 0 4 66 80 79 65 
		f 3 133 -132 -109 
		mu 0 3 81 80 66 
		f 4 -114 -60 134 135 
		mu 0 4 70 26 38 82 
		f 4 -135 -62 136 137 
		mu 0 4 82 38 39 83 
		f 4 -117 138 139 140 
		mu 0 4 72 71 84 85 
		f 4 -140 141 142 143 
		mu 0 4 85 84 86 87 
		f 4 144 145 146 -120 
		mu 0 4 73 88 89 74 
		f 4 147 148 -145 -123 
		mu 0 4 75 90 88 73 
		f 4 149 150 -148 -125 
		mu 0 4 76 91 90 75 
		f 4 151 152 -150 -127 
		mu 0 4 77 92 91 76 
		f 4 153 154 -152 -129 
		mu 0 4 78 93 92 77 
		f 4 155 156 -154 -131 
		mu 0 4 79 94 93 78 
		f 4 157 158 -156 -133 
		mu 0 4 80 95 94 79 
		f 3 159 -158 -134 
		mu 0 3 96 95 80 
		f 3 -86 160 -10 
		mu 0 3 97 54 98 
		f 4 -161 -88 161 -40 
		mu 0 4 98 54 55 99 
		f 4 -162 -90 162 -63 
		mu 0 4 99 55 56 100 
		f 4 163 -138 164 -142 
		mu 0 4 101 82 83 102 
		f 4 165 166 167 -146 
		mu 0 4 88 103 104 89 
		f 4 168 169 -166 -149 
		mu 0 4 90 105 103 88 
		f 4 170 171 -169 -151 
		mu 0 4 91 106 105 90 
		f 4 172 173 -171 -153 
		mu 0 4 92 107 106 91 
		f 4 174 175 -173 -155 
		mu 0 4 93 108 107 92 
		f 4 176 177 -175 -157 
		mu 0 4 94 109 108 93 
		f 4 178 179 -177 -159 
		mu 0 4 95 110 109 94 
		f 3 180 -179 -160 
		mu 0 3 111 110 95 
		f 4 -163 -111 181 -66 
		mu 0 4 100 56 68 112 
		f 4 -182 -113 182 -91 
		mu 0 4 112 68 69 113 
		f 4 -183 -115 183 -116 
		mu 0 4 113 69 70 114 
		f 4 -184 -136 -164 -139 
		mu 0 4 114 70 82 101 
		f 4 184 -144 185 -167 
		mu 0 4 103 85 87 104 
		f 4 186 -141 -185 -170 
		mu 0 4 105 72 85 103 
		f 4 187 -118 -187 -172 
		mu 0 4 106 58 72 105 
		f 4 188 -93 -188 -174 
		mu 0 4 107 43 58 106 
		f 4 189 -68 -189 -176 
		mu 0 4 108 41 43 107 
		f 4 190 -65 -190 -178 
		mu 0 4 109 28 41 108 
		f 4 191 -42 -191 -180 
		mu 0 4 110 9 28 109 
		f 3 -12 -192 -181 
		mu 0 3 115 9 110 ;
	setAttr ".cd" -type "dataPolyComponent" Index_Data Edge 0 ;
	setAttr ".cvd" -type "dataPolyComponent" Index_Data Vertex 0 ;
createNode transform -s -n "persp";
	setAttr ".v" no;
	setAttr ".t" -type "double3" -15.175123389239292 -35.537480620628834 137.58438174555934 ;
	setAttr ".r" -type "double3" 28.323137337731097 -4.6000000000003576 -1.9942704634686483e-016 ;
createNode camera -s -n "perspShape" -p "persp";
	setAttr -k off ".v" no;
	setAttr ".fl" 34.999999999999986;
	setAttr ".coi" 150.18040982989024;
	setAttr ".imn" -type "string" "persp";
	setAttr ".den" -type "string" "persp_depth";
	setAttr ".man" -type "string" "persp_mask";
	setAttr ".tp" -type "double3" 0 54.396347463130951 0 ;
	setAttr ".hc" -type "string" "viewSet -p %camera";
createNode transform -s -n "top";
	setAttr ".v" no;
	setAttr ".t" -type "double3" 0 110.00898895263671 0 ;
	setAttr ".r" -type "double3" -89.999999999999986 0 0 ;
createNode camera -s -n "topShape" -p "top";
	setAttr -k off ".v" no;
	setAttr ".rnd" no;
	setAttr ".coi" 110.00898895263671;
	setAttr ".ow" 30;
	setAttr ".imn" -type "string" "top";
	setAttr ".den" -type "string" "top_depth";
	setAttr ".man" -type "string" "top_mask";
	setAttr ".hc" -type "string" "viewSet -t %camera";
	setAttr ".o" yes;
createNode transform -s -n "front";
	setAttr ".v" no;
	setAttr ".t" -type "double3" 0 0 110.00898895263671 ;
createNode camera -s -n "frontShape" -p "front";
	setAttr -k off ".v" no;
	setAttr ".rnd" no;
	setAttr ".coi" 110.00898895263671;
	setAttr ".ow" 30;
	setAttr ".imn" -type "string" "front";
	setAttr ".den" -type "string" "front_depth";
	setAttr ".man" -type "string" "front_mask";
	setAttr ".hc" -type "string" "viewSet -f %camera";
	setAttr ".o" yes;
createNode transform -s -n "side";
	setAttr ".v" no;
	setAttr ".t" -type "double3" 128.94014338716352 54.396347463130951 2.8643754035329039e-014 ;
	setAttr ".r" -type "double3" 0 89.999999999999986 0 ;
createNode camera -s -n "sideShape" -p "side";
	setAttr -k off ".v" no;
	setAttr ".rnd" no;
	setAttr ".coi" 110.00898895263671;
	setAttr ".ow" 204.77580196527833;
	setAttr ".imn" -type "string" "side";
	setAttr ".den" -type "string" "side_depth";
	setAttr ".man" -type "string" "side_mask";
	setAttr ".hc" -type "string" "viewSet -s %camera";
	setAttr ".o" yes;
createNode transform -n "directionalLight1";
	setAttr ".t" -type "double3" 0 26.381294403717853 -3.1568159595401033 ;
	setAttr ".r" -type "double3" -270.99999999999989 0 0 ;
	setAttr ".s" -type "double3" 30.500674011782696 30.500674011782696 30.500674011782696 ;
createNode directionalLight -n "directionalLightShape1" -p "directionalLight1";
	setAttr -k off ".v";
	setAttr ".cl" -type "float3" 0.301 1 1 ;
	setAttr ".in" 2;
	setAttr ".phi" 8000;
createNode shadingEngine -n "GlobeInnerSG";
	setAttr ".ihi" 0;
	setAttr ".ro" yes;
createNode materialInfo -n "materialInfo1";
createNode groupId -n "groupId1";
	setAttr ".ihi" 0;
createNode phong -n "GlobeInner1";
	setAttr ".ambc" -type "float3" 0.264368 0.49599999 0.49599999 ;
	setAttr ".cp" 39.257999420166016;
createNode file -n "GlobeInnerT";
	setAttr ".ftn" -type "string" "D:/Project/MyProject//sourceimages/Aquarium/PNGs/GlobeInner_DM.tga";
createNode place2dTexture -n "globeinnersg1P2D";
createNode lightLinker -n "lightLinker1";
	setAttr -s 3 ".lnk";
	setAttr -s 3 ".slnk";
createNode displayLayerManager -n "layerManager";
createNode displayLayer -n "defaultLayer";
createNode renderLayerManager -n "renderLayerManager";
createNode renderLayer -n "defaultRenderLayer";
	setAttr ".g" yes;
createNode script -n "uiConfigurationScriptNode";
	setAttr ".b" -type "string" (
		"// Maya Mel UI Configuration File.\n//\n//  This script is machine generated.  Edit at your own risk.\n//\n//\n\nglobal string $gMainPane;\nif (`paneLayout -exists $gMainPane`) {\n\n\tglobal int $gUseScenePanelConfig;\n\tint    $useSceneConfig = $gUseScenePanelConfig;\n\tint    $menusOkayInPanels = `optionVar -q allowMenusInPanels`;\tint    $nVisPanes = `paneLayout -q -nvp $gMainPane`;\n\tint    $nPanes = 0;\n\tstring $editorName;\n\tstring $panelName;\n\tstring $itemFilterName;\n\tstring $panelConfig;\n\n\t//\n\t//  get current state of the UI\n\t//\n\tsceneUIReplacement -update $gMainPane;\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"modelPanel\" (localizedPanelLabel(\"Top View\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `modelPanel -unParent -l (localizedPanelLabel(\"Top View\")) -mbv $menusOkayInPanels `;\n\t\t\t$editorName = $panelName;\n            modelEditor -e \n                -camera \"top\" \n                -useInteractiveMode 0\n                -displayLights \"default\" \n                -displayAppearance \"wireframe\" \n"
		+ "                -activeOnly 0\n                -wireframeOnShaded 0\n                -headsUpDisplay 1\n                -selectionHiliteDisplay 1\n                -useDefaultMaterial 0\n                -bufferMode \"double\" \n                -twoSidedLighting 1\n                -backfaceCulling 0\n                -xray 0\n                -jointXray 0\n                -activeComponentsXray 0\n                -displayTextures 0\n                -smoothWireframe 0\n                -lineWidth 1\n                -textureAnisotropic 1\n                -textureHilight 1\n                -textureSampling 2\n                -textureDisplay \"modulate\" \n                -textureMaxSize 8192\n                -fogging 0\n                -fogSource \"fragment\" \n                -fogMode \"linear\" \n                -fogStart 0\n                -fogEnd 100\n                -fogDensity 0.1\n                -fogColor 0.5 0.5 0.5 1 \n                -maxConstantTransparency 1\n                -rendererName \"base_OpenGL_Renderer\" \n                -colorResolution 256 256 \n"
		+ "                -bumpResolution 512 512 \n                -textureCompression 0\n                -transparencyAlgorithm \"frontAndBackCull\" \n                -transpInShadows 0\n                -cullingOverride \"none\" \n                -lowQualityLighting 0\n                -maximumNumHardwareLights 1\n                -occlusionCulling 0\n                -shadingModel 0\n                -useBaseRenderer 0\n                -useReducedRenderer 0\n                -smallObjectCulling 0\n                -smallObjectThreshold -1 \n                -interactiveDisableShadows 0\n                -interactiveBackFaceCull 0\n                -sortTransparent 1\n                -nurbsCurves 1\n                -nurbsSurfaces 1\n                -polymeshes 1\n                -subdivSurfaces 1\n                -planes 1\n                -lights 1\n                -cameras 1\n                -controlVertices 1\n                -hulls 1\n                -grid 1\n                -joints 1\n                -ikHandles 1\n                -deformers 1\n                -dynamics 1\n"
		+ "                -fluids 1\n                -hairSystems 1\n                -follicles 1\n                -nCloths 1\n                -nParticles 1\n                -nRigids 1\n                -dynamicConstraints 1\n                -locators 1\n                -manipulators 1\n                -dimensions 1\n                -handles 1\n                -pivots 1\n                -textures 1\n                -strokes 1\n                -shadows 0\n                $editorName;\nmodelEditor -e -viewSelected 0 $editorName;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tmodelPanel -edit -l (localizedPanelLabel(\"Top View\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        modelEditor -e \n            -camera \"top\" \n            -useInteractiveMode 0\n            -displayLights \"default\" \n            -displayAppearance \"wireframe\" \n            -activeOnly 0\n            -wireframeOnShaded 0\n            -headsUpDisplay 1\n            -selectionHiliteDisplay 1\n            -useDefaultMaterial 0\n            -bufferMode \"double\" \n"
		+ "            -twoSidedLighting 1\n            -backfaceCulling 0\n            -xray 0\n            -jointXray 0\n            -activeComponentsXray 0\n            -displayTextures 0\n            -smoothWireframe 0\n            -lineWidth 1\n            -textureAnisotropic 1\n            -textureHilight 1\n            -textureSampling 2\n            -textureDisplay \"modulate\" \n            -textureMaxSize 8192\n            -fogging 0\n            -fogSource \"fragment\" \n            -fogMode \"linear\" \n            -fogStart 0\n            -fogEnd 100\n            -fogDensity 0.1\n            -fogColor 0.5 0.5 0.5 1 \n            -maxConstantTransparency 1\n            -rendererName \"base_OpenGL_Renderer\" \n            -colorResolution 256 256 \n            -bumpResolution 512 512 \n            -textureCompression 0\n            -transparencyAlgorithm \"frontAndBackCull\" \n            -transpInShadows 0\n            -cullingOverride \"none\" \n            -lowQualityLighting 0\n            -maximumNumHardwareLights 1\n            -occlusionCulling 0\n"
		+ "            -shadingModel 0\n            -useBaseRenderer 0\n            -useReducedRenderer 0\n            -smallObjectCulling 0\n            -smallObjectThreshold -1 \n            -interactiveDisableShadows 0\n            -interactiveBackFaceCull 0\n            -sortTransparent 1\n            -nurbsCurves 1\n            -nurbsSurfaces 1\n            -polymeshes 1\n            -subdivSurfaces 1\n            -planes 1\n            -lights 1\n            -cameras 1\n            -controlVertices 1\n            -hulls 1\n            -grid 1\n            -joints 1\n            -ikHandles 1\n            -deformers 1\n            -dynamics 1\n            -fluids 1\n            -hairSystems 1\n            -follicles 1\n            -nCloths 1\n            -nParticles 1\n            -nRigids 1\n            -dynamicConstraints 1\n            -locators 1\n            -manipulators 1\n            -dimensions 1\n            -handles 1\n            -pivots 1\n            -textures 1\n            -strokes 1\n            -shadows 0\n            $editorName;\nmodelEditor -e -viewSelected 0 $editorName;\n"
		+ "\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"modelPanel\" (localizedPanelLabel(\"Side View\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `modelPanel -unParent -l (localizedPanelLabel(\"Side View\")) -mbv $menusOkayInPanels `;\n\t\t\t$editorName = $panelName;\n            modelEditor -e \n                -camera \"side\" \n                -useInteractiveMode 0\n                -displayLights \"default\" \n                -displayAppearance \"wireframe\" \n                -activeOnly 0\n                -wireframeOnShaded 0\n                -headsUpDisplay 1\n                -selectionHiliteDisplay 1\n                -useDefaultMaterial 0\n                -bufferMode \"double\" \n                -twoSidedLighting 1\n                -backfaceCulling 0\n                -xray 0\n                -jointXray 0\n                -activeComponentsXray 0\n                -displayTextures 0\n                -smoothWireframe 0\n                -lineWidth 1\n                -textureAnisotropic 1\n"
		+ "                -textureHilight 1\n                -textureSampling 2\n                -textureDisplay \"modulate\" \n                -textureMaxSize 8192\n                -fogging 0\n                -fogSource \"fragment\" \n                -fogMode \"linear\" \n                -fogStart 0\n                -fogEnd 100\n                -fogDensity 0.1\n                -fogColor 0.5 0.5 0.5 1 \n                -maxConstantTransparency 1\n                -rendererName \"base_OpenGL_Renderer\" \n                -colorResolution 256 256 \n                -bumpResolution 512 512 \n                -textureCompression 0\n                -transparencyAlgorithm \"frontAndBackCull\" \n                -transpInShadows 0\n                -cullingOverride \"none\" \n                -lowQualityLighting 0\n                -maximumNumHardwareLights 1\n                -occlusionCulling 0\n                -shadingModel 0\n                -useBaseRenderer 0\n                -useReducedRenderer 0\n                -smallObjectCulling 0\n                -smallObjectThreshold -1 \n"
		+ "                -interactiveDisableShadows 0\n                -interactiveBackFaceCull 0\n                -sortTransparent 1\n                -nurbsCurves 1\n                -nurbsSurfaces 1\n                -polymeshes 1\n                -subdivSurfaces 1\n                -planes 1\n                -lights 1\n                -cameras 1\n                -controlVertices 1\n                -hulls 1\n                -grid 1\n                -joints 1\n                -ikHandles 1\n                -deformers 1\n                -dynamics 1\n                -fluids 1\n                -hairSystems 1\n                -follicles 1\n                -nCloths 1\n                -nParticles 1\n                -nRigids 1\n                -dynamicConstraints 1\n                -locators 1\n                -manipulators 1\n                -dimensions 1\n                -handles 1\n                -pivots 1\n                -textures 1\n                -strokes 1\n                -shadows 0\n                $editorName;\nmodelEditor -e -viewSelected 0 $editorName;\n"
		+ "\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tmodelPanel -edit -l (localizedPanelLabel(\"Side View\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        modelEditor -e \n            -camera \"side\" \n            -useInteractiveMode 0\n            -displayLights \"default\" \n            -displayAppearance \"wireframe\" \n            -activeOnly 0\n            -wireframeOnShaded 0\n            -headsUpDisplay 1\n            -selectionHiliteDisplay 1\n            -useDefaultMaterial 0\n            -bufferMode \"double\" \n            -twoSidedLighting 1\n            -backfaceCulling 0\n            -xray 0\n            -jointXray 0\n            -activeComponentsXray 0\n            -displayTextures 0\n            -smoothWireframe 0\n            -lineWidth 1\n            -textureAnisotropic 1\n            -textureHilight 1\n            -textureSampling 2\n            -textureDisplay \"modulate\" \n            -textureMaxSize 8192\n            -fogging 0\n            -fogSource \"fragment\" \n            -fogMode \"linear\" \n"
		+ "            -fogStart 0\n            -fogEnd 100\n            -fogDensity 0.1\n            -fogColor 0.5 0.5 0.5 1 \n            -maxConstantTransparency 1\n            -rendererName \"base_OpenGL_Renderer\" \n            -colorResolution 256 256 \n            -bumpResolution 512 512 \n            -textureCompression 0\n            -transparencyAlgorithm \"frontAndBackCull\" \n            -transpInShadows 0\n            -cullingOverride \"none\" \n            -lowQualityLighting 0\n            -maximumNumHardwareLights 1\n            -occlusionCulling 0\n            -shadingModel 0\n            -useBaseRenderer 0\n            -useReducedRenderer 0\n            -smallObjectCulling 0\n            -smallObjectThreshold -1 \n            -interactiveDisableShadows 0\n            -interactiveBackFaceCull 0\n            -sortTransparent 1\n            -nurbsCurves 1\n            -nurbsSurfaces 1\n            -polymeshes 1\n            -subdivSurfaces 1\n            -planes 1\n            -lights 1\n            -cameras 1\n            -controlVertices 1\n"
		+ "            -hulls 1\n            -grid 1\n            -joints 1\n            -ikHandles 1\n            -deformers 1\n            -dynamics 1\n            -fluids 1\n            -hairSystems 1\n            -follicles 1\n            -nCloths 1\n            -nParticles 1\n            -nRigids 1\n            -dynamicConstraints 1\n            -locators 1\n            -manipulators 1\n            -dimensions 1\n            -handles 1\n            -pivots 1\n            -textures 1\n            -strokes 1\n            -shadows 0\n            $editorName;\nmodelEditor -e -viewSelected 0 $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"modelPanel\" (localizedPanelLabel(\"Front View\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `modelPanel -unParent -l (localizedPanelLabel(\"Front View\")) -mbv $menusOkayInPanels `;\n\t\t\t$editorName = $panelName;\n            modelEditor -e \n                -camera \"side\" \n                -useInteractiveMode 0\n"
		+ "                -displayLights \"default\" \n                -displayAppearance \"wireframe\" \n                -activeOnly 0\n                -wireframeOnShaded 0\n                -headsUpDisplay 1\n                -selectionHiliteDisplay 1\n                -useDefaultMaterial 0\n                -bufferMode \"double\" \n                -twoSidedLighting 1\n                -backfaceCulling 0\n                -xray 0\n                -jointXray 0\n                -activeComponentsXray 0\n                -displayTextures 0\n                -smoothWireframe 0\n                -lineWidth 1\n                -textureAnisotropic 1\n                -textureHilight 1\n                -textureSampling 2\n                -textureDisplay \"modulate\" \n                -textureMaxSize 8192\n                -fogging 0\n                -fogSource \"fragment\" \n                -fogMode \"linear\" \n                -fogStart 0\n                -fogEnd 100\n                -fogDensity 0.1\n                -fogColor 0.5 0.5 0.5 1 \n                -maxConstantTransparency 1\n"
		+ "                -rendererName \"base_OpenGL_Renderer\" \n                -colorResolution 256 256 \n                -bumpResolution 512 512 \n                -textureCompression 0\n                -transparencyAlgorithm \"frontAndBackCull\" \n                -transpInShadows 0\n                -cullingOverride \"none\" \n                -lowQualityLighting 0\n                -maximumNumHardwareLights 1\n                -occlusionCulling 0\n                -shadingModel 0\n                -useBaseRenderer 0\n                -useReducedRenderer 0\n                -smallObjectCulling 0\n                -smallObjectThreshold -1 \n                -interactiveDisableShadows 0\n                -interactiveBackFaceCull 0\n                -sortTransparent 1\n                -nurbsCurves 1\n                -nurbsSurfaces 1\n                -polymeshes 1\n                -subdivSurfaces 1\n                -planes 1\n                -lights 1\n                -cameras 1\n                -controlVertices 1\n                -hulls 1\n                -grid 1\n"
		+ "                -joints 1\n                -ikHandles 1\n                -deformers 1\n                -dynamics 1\n                -fluids 1\n                -hairSystems 1\n                -follicles 1\n                -nCloths 1\n                -nParticles 1\n                -nRigids 1\n                -dynamicConstraints 1\n                -locators 1\n                -manipulators 1\n                -dimensions 1\n                -handles 1\n                -pivots 1\n                -textures 1\n                -strokes 1\n                -shadows 0\n                $editorName;\nmodelEditor -e -viewSelected 0 $editorName;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tmodelPanel -edit -l (localizedPanelLabel(\"Front View\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        modelEditor -e \n            -camera \"side\" \n            -useInteractiveMode 0\n            -displayLights \"default\" \n            -displayAppearance \"wireframe\" \n            -activeOnly 0\n            -wireframeOnShaded 0\n            -headsUpDisplay 1\n"
		+ "            -selectionHiliteDisplay 1\n            -useDefaultMaterial 0\n            -bufferMode \"double\" \n            -twoSidedLighting 1\n            -backfaceCulling 0\n            -xray 0\n            -jointXray 0\n            -activeComponentsXray 0\n            -displayTextures 0\n            -smoothWireframe 0\n            -lineWidth 1\n            -textureAnisotropic 1\n            -textureHilight 1\n            -textureSampling 2\n            -textureDisplay \"modulate\" \n            -textureMaxSize 8192\n            -fogging 0\n            -fogSource \"fragment\" \n            -fogMode \"linear\" \n            -fogStart 0\n            -fogEnd 100\n            -fogDensity 0.1\n            -fogColor 0.5 0.5 0.5 1 \n            -maxConstantTransparency 1\n            -rendererName \"base_OpenGL_Renderer\" \n            -colorResolution 256 256 \n            -bumpResolution 512 512 \n            -textureCompression 0\n            -transparencyAlgorithm \"frontAndBackCull\" \n            -transpInShadows 0\n            -cullingOverride \"none\" \n"
		+ "            -lowQualityLighting 0\n            -maximumNumHardwareLights 1\n            -occlusionCulling 0\n            -shadingModel 0\n            -useBaseRenderer 0\n            -useReducedRenderer 0\n            -smallObjectCulling 0\n            -smallObjectThreshold -1 \n            -interactiveDisableShadows 0\n            -interactiveBackFaceCull 0\n            -sortTransparent 1\n            -nurbsCurves 1\n            -nurbsSurfaces 1\n            -polymeshes 1\n            -subdivSurfaces 1\n            -planes 1\n            -lights 1\n            -cameras 1\n            -controlVertices 1\n            -hulls 1\n            -grid 1\n            -joints 1\n            -ikHandles 1\n            -deformers 1\n            -dynamics 1\n            -fluids 1\n            -hairSystems 1\n            -follicles 1\n            -nCloths 1\n            -nParticles 1\n            -nRigids 1\n            -dynamicConstraints 1\n            -locators 1\n            -manipulators 1\n            -dimensions 1\n            -handles 1\n            -pivots 1\n"
		+ "            -textures 1\n            -strokes 1\n            -shadows 0\n            $editorName;\nmodelEditor -e -viewSelected 0 $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"modelPanel\" (localizedPanelLabel(\"Persp View\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `modelPanel -unParent -l (localizedPanelLabel(\"Persp View\")) -mbv $menusOkayInPanels `;\n\t\t\t$editorName = $panelName;\n            modelEditor -e \n                -camera \"persp\" \n                -useInteractiveMode 0\n                -displayLights \"all\" \n                -displayAppearance \"smoothShaded\" \n                -activeOnly 0\n                -wireframeOnShaded 0\n                -headsUpDisplay 1\n                -selectionHiliteDisplay 1\n                -useDefaultMaterial 0\n                -bufferMode \"double\" \n                -twoSidedLighting 1\n                -backfaceCulling 1\n                -xray 0\n                -jointXray 0\n                -activeComponentsXray 0\n"
		+ "                -displayTextures 1\n                -smoothWireframe 0\n                -lineWidth 1\n                -textureAnisotropic 1\n                -textureHilight 1\n                -textureSampling 2\n                -textureDisplay \"modulate\" \n                -textureMaxSize 8192\n                -fogging 0\n                -fogSource \"fragment\" \n                -fogMode \"linear\" \n                -fogStart 0\n                -fogEnd 100\n                -fogDensity 0.1\n                -fogColor 0.5 0.5 0.5 1 \n                -maxConstantTransparency 1\n                -rendererName \"hwRender_OpenGL_Renderer\" \n                -colorResolution 256 256 \n                -bumpResolution 512 512 \n                -textureCompression 0\n                -transparencyAlgorithm \"perPolygonSort\" \n                -transpInShadows 0\n                -cullingOverride \"singleSided\" \n                -lowQualityLighting 0\n                -maximumNumHardwareLights 1\n                -occlusionCulling 1\n                -shadingModel 0\n"
		+ "                -useBaseRenderer 0\n                -useReducedRenderer 0\n                -smallObjectCulling 0\n                -smallObjectThreshold -1 \n                -interactiveDisableShadows 0\n                -interactiveBackFaceCull 0\n                -sortTransparent 1\n                -nurbsCurves 1\n                -nurbsSurfaces 1\n                -polymeshes 1\n                -subdivSurfaces 1\n                -planes 1\n                -lights 0\n                -cameras 1\n                -controlVertices 1\n                -hulls 1\n                -grid 0\n                -joints 1\n                -ikHandles 1\n                -deformers 1\n                -dynamics 1\n                -fluids 1\n                -hairSystems 1\n                -follicles 1\n                -nCloths 1\n                -nParticles 1\n                -nRigids 1\n                -dynamicConstraints 1\n                -locators 1\n                -manipulators 1\n                -dimensions 1\n                -handles 1\n                -pivots 1\n"
		+ "                -textures 1\n                -strokes 1\n                -shadows 0\n                $editorName;\nmodelEditor -e -viewSelected 0 $editorName;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tmodelPanel -edit -l (localizedPanelLabel(\"Persp View\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        modelEditor -e \n            -camera \"persp\" \n            -useInteractiveMode 0\n            -displayLights \"all\" \n            -displayAppearance \"smoothShaded\" \n            -activeOnly 0\n            -wireframeOnShaded 0\n            -headsUpDisplay 1\n            -selectionHiliteDisplay 1\n            -useDefaultMaterial 0\n            -bufferMode \"double\" \n            -twoSidedLighting 1\n            -backfaceCulling 1\n            -xray 0\n            -jointXray 0\n            -activeComponentsXray 0\n            -displayTextures 1\n            -smoothWireframe 0\n            -lineWidth 1\n            -textureAnisotropic 1\n            -textureHilight 1\n            -textureSampling 2\n            -textureDisplay \"modulate\" \n"
		+ "            -textureMaxSize 8192\n            -fogging 0\n            -fogSource \"fragment\" \n            -fogMode \"linear\" \n            -fogStart 0\n            -fogEnd 100\n            -fogDensity 0.1\n            -fogColor 0.5 0.5 0.5 1 \n            -maxConstantTransparency 1\n            -rendererName \"hwRender_OpenGL_Renderer\" \n            -colorResolution 256 256 \n            -bumpResolution 512 512 \n            -textureCompression 0\n            -transparencyAlgorithm \"perPolygonSort\" \n            -transpInShadows 0\n            -cullingOverride \"singleSided\" \n            -lowQualityLighting 0\n            -maximumNumHardwareLights 1\n            -occlusionCulling 1\n            -shadingModel 0\n            -useBaseRenderer 0\n            -useReducedRenderer 0\n            -smallObjectCulling 0\n            -smallObjectThreshold -1 \n            -interactiveDisableShadows 0\n            -interactiveBackFaceCull 0\n            -sortTransparent 1\n            -nurbsCurves 1\n            -nurbsSurfaces 1\n            -polymeshes 1\n"
		+ "            -subdivSurfaces 1\n            -planes 1\n            -lights 0\n            -cameras 1\n            -controlVertices 1\n            -hulls 1\n            -grid 0\n            -joints 1\n            -ikHandles 1\n            -deformers 1\n            -dynamics 1\n            -fluids 1\n            -hairSystems 1\n            -follicles 1\n            -nCloths 1\n            -nParticles 1\n            -nRigids 1\n            -dynamicConstraints 1\n            -locators 1\n            -manipulators 1\n            -dimensions 1\n            -handles 1\n            -pivots 1\n            -textures 1\n            -strokes 1\n            -shadows 0\n            $editorName;\nmodelEditor -e -viewSelected 0 $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"outlinerPanel\" (localizedPanelLabel(\"Outliner\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `outlinerPanel -unParent -l (localizedPanelLabel(\"Outliner\")) -mbv $menusOkayInPanels `;\n"
		+ "\t\t\t$editorName = $panelName;\n            outlinerEditor -e \n                -showShapes 0\n                -showAttributes 0\n                -showConnected 0\n                -showAnimCurvesOnly 0\n                -showMuteInfo 0\n                -organizeByLayer 1\n                -showAnimLayerWeight 1\n                -autoExpandLayers 1\n                -autoExpand 0\n                -showDagOnly 1\n                -showAssets 1\n                -showContainedOnly 1\n                -showPublishedAsConnected 0\n                -showContainerContents 1\n                -ignoreDagHierarchy 0\n                -expandConnections 0\n                -showUnitlessCurves 1\n                -showCompounds 1\n                -showLeafs 1\n                -showNumericAttrsOnly 0\n                -highlightActive 1\n                -autoSelectNewObjects 0\n                -doNotSelectNewObjects 0\n                -dropIsParent 1\n                -transmitFilters 0\n                -setFilter \"defaultSetFilter\" \n                -showSetMembers 1\n"
		+ "                -allowMultiSelection 1\n                -alwaysToggleSelect 0\n                -directSelect 0\n                -displayMode \"DAG\" \n                -expandObjects 0\n                -setsIgnoreFilters 1\n                -containersIgnoreFilters 0\n                -editAttrName 0\n                -showAttrValues 0\n                -highlightSecondary 0\n                -showUVAttrsOnly 0\n                -showTextureNodesOnly 0\n                -attrAlphaOrder \"default\" \n                -animLayerFilterOptions \"allAffecting\" \n                -sortOrder \"none\" \n                -longNames 0\n                -niceNames 1\n                -showNamespace 1\n                $editorName;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\toutlinerPanel -edit -l (localizedPanelLabel(\"Outliner\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        outlinerEditor -e \n            -showShapes 0\n            -showAttributes 0\n            -showConnected 0\n            -showAnimCurvesOnly 0\n            -showMuteInfo 0\n"
		+ "            -organizeByLayer 1\n            -showAnimLayerWeight 1\n            -autoExpandLayers 1\n            -autoExpand 0\n            -showDagOnly 1\n            -showAssets 1\n            -showContainedOnly 1\n            -showPublishedAsConnected 0\n            -showContainerContents 1\n            -ignoreDagHierarchy 0\n            -expandConnections 0\n            -showUnitlessCurves 1\n            -showCompounds 1\n            -showLeafs 1\n            -showNumericAttrsOnly 0\n            -highlightActive 1\n            -autoSelectNewObjects 0\n            -doNotSelectNewObjects 0\n            -dropIsParent 1\n            -transmitFilters 0\n            -setFilter \"defaultSetFilter\" \n            -showSetMembers 1\n            -allowMultiSelection 1\n            -alwaysToggleSelect 0\n            -directSelect 0\n            -displayMode \"DAG\" \n            -expandObjects 0\n            -setsIgnoreFilters 1\n            -containersIgnoreFilters 0\n            -editAttrName 0\n            -showAttrValues 0\n            -highlightSecondary 0\n"
		+ "            -showUVAttrsOnly 0\n            -showTextureNodesOnly 0\n            -attrAlphaOrder \"default\" \n            -animLayerFilterOptions \"allAffecting\" \n            -sortOrder \"none\" \n            -longNames 0\n            -niceNames 1\n            -showNamespace 1\n            $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"graphEditor\" (localizedPanelLabel(\"Graph Editor\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `scriptedPanel -unParent  -type \"graphEditor\" -l (localizedPanelLabel(\"Graph Editor\")) -mbv $menusOkayInPanels `;\n\n\t\t\t$editorName = ($panelName+\"OutlineEd\");\n            outlinerEditor -e \n                -showShapes 1\n                -showAttributes 1\n                -showConnected 1\n                -showAnimCurvesOnly 1\n                -showMuteInfo 0\n                -organizeByLayer 1\n                -showAnimLayerWeight 1\n                -autoExpandLayers 1\n                -autoExpand 1\n"
		+ "                -showDagOnly 0\n                -showAssets 1\n                -showContainedOnly 0\n                -showPublishedAsConnected 0\n                -showContainerContents 0\n                -ignoreDagHierarchy 0\n                -expandConnections 1\n                -showUnitlessCurves 1\n                -showCompounds 0\n                -showLeafs 1\n                -showNumericAttrsOnly 1\n                -highlightActive 0\n                -autoSelectNewObjects 1\n                -doNotSelectNewObjects 0\n                -dropIsParent 1\n                -transmitFilters 1\n                -setFilter \"0\" \n                -showSetMembers 0\n                -allowMultiSelection 1\n                -alwaysToggleSelect 0\n                -directSelect 0\n                -displayMode \"DAG\" \n                -expandObjects 0\n                -setsIgnoreFilters 1\n                -containersIgnoreFilters 0\n                -editAttrName 0\n                -showAttrValues 0\n                -highlightSecondary 0\n                -showUVAttrsOnly 0\n"
		+ "                -showTextureNodesOnly 0\n                -attrAlphaOrder \"default\" \n                -animLayerFilterOptions \"allAffecting\" \n                -sortOrder \"none\" \n                -longNames 0\n                -niceNames 1\n                -showNamespace 1\n                $editorName;\n\n\t\t\t$editorName = ($panelName+\"GraphEd\");\n            animCurveEditor -e \n                -displayKeys 1\n                -displayTangents 0\n                -displayActiveKeys 0\n                -displayActiveKeyTangents 1\n                -displayInfinities 0\n                -autoFit 0\n                -snapTime \"integer\" \n                -snapValue \"none\" \n                -showResults \"off\" \n                -showBufferCurves \"off\" \n                -smoothness \"fine\" \n                -resultSamples 1\n                -resultScreenSamples 0\n                -resultUpdate \"delayed\" \n                -constrainDrag 0\n                $editorName;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Graph Editor\")) -mbv $menusOkayInPanels  $panelName;\n"
		+ "\t\t\t$editorName = ($panelName+\"OutlineEd\");\n            outlinerEditor -e \n                -showShapes 1\n                -showAttributes 1\n                -showConnected 1\n                -showAnimCurvesOnly 1\n                -showMuteInfo 0\n                -organizeByLayer 1\n                -showAnimLayerWeight 1\n                -autoExpandLayers 1\n                -autoExpand 1\n                -showDagOnly 0\n                -showAssets 1\n                -showContainedOnly 0\n                -showPublishedAsConnected 0\n                -showContainerContents 0\n                -ignoreDagHierarchy 0\n                -expandConnections 1\n                -showUnitlessCurves 1\n                -showCompounds 0\n                -showLeafs 1\n                -showNumericAttrsOnly 1\n                -highlightActive 0\n                -autoSelectNewObjects 1\n                -doNotSelectNewObjects 0\n                -dropIsParent 1\n                -transmitFilters 1\n                -setFilter \"0\" \n                -showSetMembers 0\n"
		+ "                -allowMultiSelection 1\n                -alwaysToggleSelect 0\n                -directSelect 0\n                -displayMode \"DAG\" \n                -expandObjects 0\n                -setsIgnoreFilters 1\n                -containersIgnoreFilters 0\n                -editAttrName 0\n                -showAttrValues 0\n                -highlightSecondary 0\n                -showUVAttrsOnly 0\n                -showTextureNodesOnly 0\n                -attrAlphaOrder \"default\" \n                -animLayerFilterOptions \"allAffecting\" \n                -sortOrder \"none\" \n                -longNames 0\n                -niceNames 1\n                -showNamespace 1\n                $editorName;\n\n\t\t\t$editorName = ($panelName+\"GraphEd\");\n            animCurveEditor -e \n                -displayKeys 1\n                -displayTangents 0\n                -displayActiveKeys 0\n                -displayActiveKeyTangents 1\n                -displayInfinities 0\n                -autoFit 0\n                -snapTime \"integer\" \n                -snapValue \"none\" \n"
		+ "                -showResults \"off\" \n                -showBufferCurves \"off\" \n                -smoothness \"fine\" \n                -resultSamples 1\n                -resultScreenSamples 0\n                -resultUpdate \"delayed\" \n                -constrainDrag 0\n                $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"dopeSheetPanel\" (localizedPanelLabel(\"Dope Sheet\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `scriptedPanel -unParent  -type \"dopeSheetPanel\" -l (localizedPanelLabel(\"Dope Sheet\")) -mbv $menusOkayInPanels `;\n\n\t\t\t$editorName = ($panelName+\"OutlineEd\");\n            outlinerEditor -e \n                -showShapes 1\n                -showAttributes 1\n                -showConnected 1\n                -showAnimCurvesOnly 1\n                -showMuteInfo 0\n                -organizeByLayer 1\n                -showAnimLayerWeight 1\n                -autoExpandLayers 1\n                -autoExpand 0\n"
		+ "                -showDagOnly 0\n                -showAssets 1\n                -showContainedOnly 0\n                -showPublishedAsConnected 0\n                -showContainerContents 0\n                -ignoreDagHierarchy 0\n                -expandConnections 1\n                -showUnitlessCurves 0\n                -showCompounds 1\n                -showLeafs 1\n                -showNumericAttrsOnly 1\n                -highlightActive 0\n                -autoSelectNewObjects 0\n                -doNotSelectNewObjects 1\n                -dropIsParent 1\n                -transmitFilters 0\n                -setFilter \"0\" \n                -showSetMembers 0\n                -allowMultiSelection 1\n                -alwaysToggleSelect 0\n                -directSelect 0\n                -displayMode \"DAG\" \n                -expandObjects 0\n                -setsIgnoreFilters 1\n                -containersIgnoreFilters 0\n                -editAttrName 0\n                -showAttrValues 0\n                -highlightSecondary 0\n                -showUVAttrsOnly 0\n"
		+ "                -showTextureNodesOnly 0\n                -attrAlphaOrder \"default\" \n                -animLayerFilterOptions \"allAffecting\" \n                -sortOrder \"none\" \n                -longNames 0\n                -niceNames 1\n                -showNamespace 1\n                $editorName;\n\n\t\t\t$editorName = ($panelName+\"DopeSheetEd\");\n            dopeSheetEditor -e \n                -displayKeys 1\n                -displayTangents 0\n                -displayActiveKeys 0\n                -displayActiveKeyTangents 0\n                -displayInfinities 0\n                -autoFit 0\n                -snapTime \"integer\" \n                -snapValue \"none\" \n                -outliner \"dopeSheetPanel1OutlineEd\" \n                -showSummary 1\n                -showScene 0\n                -hierarchyBelow 0\n                -showTicks 1\n                -selectionWindow 0 0 0 0 \n                $editorName;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Dope Sheet\")) -mbv $menusOkayInPanels  $panelName;\n"
		+ "\t\t\t$editorName = ($panelName+\"OutlineEd\");\n            outlinerEditor -e \n                -showShapes 1\n                -showAttributes 1\n                -showConnected 1\n                -showAnimCurvesOnly 1\n                -showMuteInfo 0\n                -organizeByLayer 1\n                -showAnimLayerWeight 1\n                -autoExpandLayers 1\n                -autoExpand 0\n                -showDagOnly 0\n                -showAssets 1\n                -showContainedOnly 0\n                -showPublishedAsConnected 0\n                -showContainerContents 0\n                -ignoreDagHierarchy 0\n                -expandConnections 1\n                -showUnitlessCurves 0\n                -showCompounds 1\n                -showLeafs 1\n                -showNumericAttrsOnly 1\n                -highlightActive 0\n                -autoSelectNewObjects 0\n                -doNotSelectNewObjects 1\n                -dropIsParent 1\n                -transmitFilters 0\n                -setFilter \"0\" \n                -showSetMembers 0\n"
		+ "                -allowMultiSelection 1\n                -alwaysToggleSelect 0\n                -directSelect 0\n                -displayMode \"DAG\" \n                -expandObjects 0\n                -setsIgnoreFilters 1\n                -containersIgnoreFilters 0\n                -editAttrName 0\n                -showAttrValues 0\n                -highlightSecondary 0\n                -showUVAttrsOnly 0\n                -showTextureNodesOnly 0\n                -attrAlphaOrder \"default\" \n                -animLayerFilterOptions \"allAffecting\" \n                -sortOrder \"none\" \n                -longNames 0\n                -niceNames 1\n                -showNamespace 1\n                $editorName;\n\n\t\t\t$editorName = ($panelName+\"DopeSheetEd\");\n            dopeSheetEditor -e \n                -displayKeys 1\n                -displayTangents 0\n                -displayActiveKeys 0\n                -displayActiveKeyTangents 0\n                -displayInfinities 0\n                -autoFit 0\n                -snapTime \"integer\" \n                -snapValue \"none\" \n"
		+ "                -outliner \"dopeSheetPanel1OutlineEd\" \n                -showSummary 1\n                -showScene 0\n                -hierarchyBelow 0\n                -showTicks 1\n                -selectionWindow 0 0 0 0 \n                $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"clipEditorPanel\" (localizedPanelLabel(\"Trax Editor\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `scriptedPanel -unParent  -type \"clipEditorPanel\" -l (localizedPanelLabel(\"Trax Editor\")) -mbv $menusOkayInPanels `;\n\n\t\t\t$editorName = clipEditorNameFromPanel($panelName);\n            clipEditor -e \n                -displayKeys 0\n                -displayTangents 0\n                -displayActiveKeys 0\n                -displayActiveKeyTangents 0\n                -displayInfinities 0\n                -autoFit 0\n                -snapTime \"none\" \n                -snapValue \"none\" \n                $editorName;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n"
		+ "\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Trax Editor\")) -mbv $menusOkayInPanels  $panelName;\n\n\t\t\t$editorName = clipEditorNameFromPanel($panelName);\n            clipEditor -e \n                -displayKeys 0\n                -displayTangents 0\n                -displayActiveKeys 0\n                -displayActiveKeyTangents 0\n                -displayInfinities 0\n                -autoFit 0\n                -snapTime \"none\" \n                -snapValue \"none\" \n                $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"hyperGraphPanel\" (localizedPanelLabel(\"Hypergraph Hierarchy\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `scriptedPanel -unParent  -type \"hyperGraphPanel\" -l (localizedPanelLabel(\"Hypergraph Hierarchy\")) -mbv $menusOkayInPanels `;\n\n\t\t\t$editorName = ($panelName+\"HyperGraphEd\");\n            hyperGraph -e \n                -graphLayoutStyle \"hierarchicalLayout\" \n                -orientation \"horiz\" \n"
		+ "                -mergeConnections 0\n                -zoom 1\n                -animateTransition 0\n                -showRelationships 1\n                -showShapes 0\n                -showDeformers 0\n                -showExpressions 0\n                -showConstraints 0\n                -showUnderworld 0\n                -showInvisible 0\n                -transitionFrames 1\n                -opaqueContainers 0\n                -freeform 0\n                -imagePosition 0 0 \n                -imageScale 1\n                -imageEnabled 0\n                -graphType \"DAG\" \n                -heatMapDisplay 0\n                -updateSelection 1\n                -updateNodeAdded 1\n                -useDrawOverrideColor 0\n                -limitGraphTraversal -1\n                -range 0 0 \n                -iconSize \"smallIcons\" \n                -showCachedConnections 0\n                $editorName;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Hypergraph Hierarchy\")) -mbv $menusOkayInPanels  $panelName;\n"
		+ "\t\t\t$editorName = ($panelName+\"HyperGraphEd\");\n            hyperGraph -e \n                -graphLayoutStyle \"hierarchicalLayout\" \n                -orientation \"horiz\" \n                -mergeConnections 0\n                -zoom 1\n                -animateTransition 0\n                -showRelationships 1\n                -showShapes 0\n                -showDeformers 0\n                -showExpressions 0\n                -showConstraints 0\n                -showUnderworld 0\n                -showInvisible 0\n                -transitionFrames 1\n                -opaqueContainers 0\n                -freeform 0\n                -imagePosition 0 0 \n                -imageScale 1\n                -imageEnabled 0\n                -graphType \"DAG\" \n                -heatMapDisplay 0\n                -updateSelection 1\n                -updateNodeAdded 1\n                -useDrawOverrideColor 0\n                -limitGraphTraversal -1\n                -range 0 0 \n                -iconSize \"smallIcons\" \n                -showCachedConnections 0\n"
		+ "                $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"hyperShadePanel\" (localizedPanelLabel(\"Hypershade\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `scriptedPanel -unParent  -type \"hyperShadePanel\" -l (localizedPanelLabel(\"Hypershade\")) -mbv $menusOkayInPanels `;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Hypershade\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"visorPanel\" (localizedPanelLabel(\"Visor\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `scriptedPanel -unParent  -type \"visorPanel\" -l (localizedPanelLabel(\"Visor\")) -mbv $menusOkayInPanels `;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Visor\")) -mbv $menusOkayInPanels  $panelName;\n"
		+ "\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"polyTexturePlacementPanel\" (localizedPanelLabel(\"UV Texture Editor\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `scriptedPanel -unParent  -type \"polyTexturePlacementPanel\" -l (localizedPanelLabel(\"UV Texture Editor\")) -mbv $menusOkayInPanels `;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"UV Texture Editor\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"multiListerPanel\" (localizedPanelLabel(\"Multilister\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `scriptedPanel -unParent  -type \"multiListerPanel\" -l (localizedPanelLabel(\"Multilister\")) -mbv $menusOkayInPanels `;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Multilister\")) -mbv $menusOkayInPanels  $panelName;\n"
		+ "\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"renderWindowPanel\" (localizedPanelLabel(\"Render View\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `scriptedPanel -unParent  -type \"renderWindowPanel\" -l (localizedPanelLabel(\"Render View\")) -mbv $menusOkayInPanels `;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Render View\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"blendShapePanel\" (localizedPanelLabel(\"Blend Shape\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\tblendShapePanel -unParent -l (localizedPanelLabel(\"Blend Shape\")) -mbv $menusOkayInPanels ;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tblendShapePanel -edit -l (localizedPanelLabel(\"Blend Shape\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n"
		+ "\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"dynRelEdPanel\" (localizedPanelLabel(\"Dynamic Relationships\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `scriptedPanel -unParent  -type \"dynRelEdPanel\" -l (localizedPanelLabel(\"Dynamic Relationships\")) -mbv $menusOkayInPanels `;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Dynamic Relationships\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"devicePanel\" (localizedPanelLabel(\"Devices\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\tdevicePanel -unParent -l (localizedPanelLabel(\"Devices\")) -mbv $menusOkayInPanels ;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tdevicePanel -edit -l (localizedPanelLabel(\"Devices\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n"
		+ "\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"relationshipPanel\" (localizedPanelLabel(\"Relationship Editor\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `scriptedPanel -unParent  -type \"relationshipPanel\" -l (localizedPanelLabel(\"Relationship Editor\")) -mbv $menusOkayInPanels `;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Relationship Editor\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"referenceEditorPanel\" (localizedPanelLabel(\"Reference Editor\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `scriptedPanel -unParent  -type \"referenceEditorPanel\" -l (localizedPanelLabel(\"Reference Editor\")) -mbv $menusOkayInPanels `;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Reference Editor\")) -mbv $menusOkayInPanels  $panelName;\n"
		+ "\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"componentEditorPanel\" (localizedPanelLabel(\"Component Editor\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `scriptedPanel -unParent  -type \"componentEditorPanel\" -l (localizedPanelLabel(\"Component Editor\")) -mbv $menusOkayInPanels `;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Component Editor\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"dynPaintScriptedPanelType\" (localizedPanelLabel(\"Paint Effects\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `scriptedPanel -unParent  -type \"dynPaintScriptedPanelType\" -l (localizedPanelLabel(\"Paint Effects\")) -mbv $menusOkayInPanels `;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Paint Effects\")) -mbv $menusOkayInPanels  $panelName;\n"
		+ "\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"webBrowserPanel\" (localizedPanelLabel(\"Web Browser\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `scriptedPanel -unParent  -type \"webBrowserPanel\" -l (localizedPanelLabel(\"Web Browser\")) -mbv $menusOkayInPanels `;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Web Browser\")) -mbv $menusOkayInPanels  $panelName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"scriptEditorPanel\" (localizedPanelLabel(\"Script Editor\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `scriptedPanel -unParent  -type \"scriptEditorPanel\" -l (localizedPanelLabel(\"Script Editor\")) -mbv $menusOkayInPanels `;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Script Editor\")) -mbv $menusOkayInPanels  $panelName;\n"
		+ "\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextScriptedPanel \"Stereo\" (localizedPanelLabel(\"Stereo\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `scriptedPanel -unParent  -type \"Stereo\" -l (localizedPanelLabel(\"Stereo\")) -mbv $menusOkayInPanels `;\nstring $editorName = ($panelName+\"Editor\");\n            stereoCameraView -e \n                -camera \"persp\" \n                -useInteractiveMode 0\n                -displayLights \"default\" \n                -displayAppearance \"wireframe\" \n                -activeOnly 0\n                -wireframeOnShaded 0\n                -headsUpDisplay 1\n                -selectionHiliteDisplay 1\n                -useDefaultMaterial 0\n                -bufferMode \"double\" \n                -twoSidedLighting 1\n                -backfaceCulling 0\n                -xray 0\n                -jointXray 0\n                -activeComponentsXray 0\n                -displayTextures 0\n                -smoothWireframe 0\n"
		+ "                -lineWidth 1\n                -textureAnisotropic 1\n                -textureHilight 1\n                -textureSampling 2\n                -textureDisplay \"modulate\" \n                -textureMaxSize 8192\n                -fogging 0\n                -fogSource \"fragment\" \n                -fogMode \"linear\" \n                -fogStart 0\n                -fogEnd 100\n                -fogDensity 0.1\n                -fogColor 0.5 0.5 0.5 1 \n                -maxConstantTransparency 1\n                -colorResolution 4 4 \n                -bumpResolution 4 4 \n                -textureCompression 0\n                -transparencyAlgorithm \"frontAndBackCull\" \n                -transpInShadows 0\n                -cullingOverride \"none\" \n                -lowQualityLighting 0\n                -maximumNumHardwareLights 0\n                -occlusionCulling 0\n                -shadingModel 0\n                -useBaseRenderer 0\n                -useReducedRenderer 0\n                -smallObjectCulling 0\n                -smallObjectThreshold -1 \n"
		+ "                -interactiveDisableShadows 0\n                -interactiveBackFaceCull 0\n                -sortTransparent 1\n                -nurbsCurves 1\n                -nurbsSurfaces 1\n                -polymeshes 1\n                -subdivSurfaces 1\n                -planes 1\n                -lights 1\n                -cameras 1\n                -controlVertices 1\n                -hulls 1\n                -grid 1\n                -joints 1\n                -ikHandles 1\n                -deformers 1\n                -dynamics 1\n                -fluids 1\n                -hairSystems 1\n                -follicles 1\n                -nCloths 1\n                -nParticles 1\n                -nRigids 1\n                -dynamicConstraints 1\n                -locators 1\n                -manipulators 1\n                -dimensions 1\n                -handles 1\n                -pivots 1\n                -textures 1\n                -strokes 1\n                -shadows 0\n                -displayMode \"centerEye\" \n                -viewColor 0 0 0 1 \n"
		+ "                $editorName;\nstereoCameraView -e -viewSelected 0 $editorName;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Stereo\")) -mbv $menusOkayInPanels  $panelName;\nstring $editorName = ($panelName+\"Editor\");\n            stereoCameraView -e \n                -camera \"persp\" \n                -useInteractiveMode 0\n                -displayLights \"default\" \n                -displayAppearance \"wireframe\" \n                -activeOnly 0\n                -wireframeOnShaded 0\n                -headsUpDisplay 1\n                -selectionHiliteDisplay 1\n                -useDefaultMaterial 0\n                -bufferMode \"double\" \n                -twoSidedLighting 1\n                -backfaceCulling 0\n                -xray 0\n                -jointXray 0\n                -activeComponentsXray 0\n                -displayTextures 0\n                -smoothWireframe 0\n                -lineWidth 1\n                -textureAnisotropic 1\n                -textureHilight 1\n                -textureSampling 2\n"
		+ "                -textureDisplay \"modulate\" \n                -textureMaxSize 8192\n                -fogging 0\n                -fogSource \"fragment\" \n                -fogMode \"linear\" \n                -fogStart 0\n                -fogEnd 100\n                -fogDensity 0.1\n                -fogColor 0.5 0.5 0.5 1 \n                -maxConstantTransparency 1\n                -colorResolution 4 4 \n                -bumpResolution 4 4 \n                -textureCompression 0\n                -transparencyAlgorithm \"frontAndBackCull\" \n                -transpInShadows 0\n                -cullingOverride \"none\" \n                -lowQualityLighting 0\n                -maximumNumHardwareLights 0\n                -occlusionCulling 0\n                -shadingModel 0\n                -useBaseRenderer 0\n                -useReducedRenderer 0\n                -smallObjectCulling 0\n                -smallObjectThreshold -1 \n                -interactiveDisableShadows 0\n                -interactiveBackFaceCull 0\n                -sortTransparent 1\n"
		+ "                -nurbsCurves 1\n                -nurbsSurfaces 1\n                -polymeshes 1\n                -subdivSurfaces 1\n                -planes 1\n                -lights 1\n                -cameras 1\n                -controlVertices 1\n                -hulls 1\n                -grid 1\n                -joints 1\n                -ikHandles 1\n                -deformers 1\n                -dynamics 1\n                -fluids 1\n                -hairSystems 1\n                -follicles 1\n                -nCloths 1\n                -nParticles 1\n                -nRigids 1\n                -dynamicConstraints 1\n                -locators 1\n                -manipulators 1\n                -dimensions 1\n                -handles 1\n                -pivots 1\n                -textures 1\n                -strokes 1\n                -shadows 0\n                -displayMode \"centerEye\" \n                -viewColor 0 0 0 1 \n                $editorName;\nstereoCameraView -e -viewSelected 0 $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n"
		+ "\t\t}\n\t}\n\n\n\tif ($useSceneConfig) {\n        string $configName = `getPanel -cwl (localizedPanelLabel(\"Current Layout\"))`;\n        if (\"\" != $configName) {\n\t\t\tpanelConfiguration -edit -label (localizedPanelLabel(\"Current Layout\")) \n\t\t\t\t-defaultImage \"\"\n\t\t\t\t-image \"\"\n\t\t\t\t-sc false\n\t\t\t\t-configString \"global string $gMainPane; paneLayout -e -cn \\\"single\\\" -ps 1 100 100 $gMainPane;\"\n\t\t\t\t-removeAllPanels\n\t\t\t\t-ap true\n\t\t\t\t\t(localizedPanelLabel(\"Persp View\")) \n\t\t\t\t\t\"modelPanel\"\n"
		+ "\t\t\t\t\t\"$panelName = `modelPanel -unParent -l (localizedPanelLabel(\\\"Persp View\\\")) -mbv $menusOkayInPanels `;\\n$editorName = $panelName;\\nmodelEditor -e \\n    -cam `findStartUpCamera persp` \\n    -useInteractiveMode 0\\n    -displayLights \\\"all\\\" \\n    -displayAppearance \\\"smoothShaded\\\" \\n    -activeOnly 0\\n    -wireframeOnShaded 0\\n    -headsUpDisplay 1\\n    -selectionHiliteDisplay 1\\n    -useDefaultMaterial 0\\n    -bufferMode \\\"double\\\" \\n    -twoSidedLighting 1\\n    -backfaceCulling 1\\n    -xray 0\\n    -jointXray 0\\n    -activeComponentsXray 0\\n    -displayTextures 1\\n    -smoothWireframe 0\\n    -lineWidth 1\\n    -textureAnisotropic 1\\n    -textureHilight 1\\n    -textureSampling 2\\n    -textureDisplay \\\"modulate\\\" \\n    -textureMaxSize 8192\\n    -fogging 0\\n    -fogSource \\\"fragment\\\" \\n    -fogMode \\\"linear\\\" \\n    -fogStart 0\\n    -fogEnd 100\\n    -fogDensity 0.1\\n    -fogColor 0.5 0.5 0.5 1 \\n    -maxConstantTransparency 1\\n    -rendererName \\\"hwRender_OpenGL_Renderer\\\" \\n    -colorResolution 256 256 \\n    -bumpResolution 512 512 \\n    -textureCompression 0\\n    -transparencyAlgorithm \\\"perPolygonSort\\\" \\n    -transpInShadows 0\\n    -cullingOverride \\\"singleSided\\\" \\n    -lowQualityLighting 0\\n    -maximumNumHardwareLights 1\\n    -occlusionCulling 1\\n    -shadingModel 0\\n    -useBaseRenderer 0\\n    -useReducedRenderer 0\\n    -smallObjectCulling 0\\n    -smallObjectThreshold -1 \\n    -interactiveDisableShadows 0\\n    -interactiveBackFaceCull 0\\n    -sortTransparent 1\\n    -nurbsCurves 1\\n    -nurbsSurfaces 1\\n    -polymeshes 1\\n    -subdivSurfaces 1\\n    -planes 1\\n    -lights 0\\n    -cameras 1\\n    -controlVertices 1\\n    -hulls 1\\n    -grid 0\\n    -joints 1\\n    -ikHandles 1\\n    -deformers 1\\n    -dynamics 1\\n    -fluids 1\\n    -hairSystems 1\\n    -follicles 1\\n    -nCloths 1\\n    -nParticles 1\\n    -nRigids 1\\n    -dynamicConstraints 1\\n    -locators 1\\n    -manipulators 1\\n    -dimensions 1\\n    -handles 1\\n    -pivots 1\\n    -textures 1\\n    -strokes 1\\n    -shadows 0\\n    $editorName;\\nmodelEditor -e -viewSelected 0 $editorName\"\n"
		+ "\t\t\t\t\t\"modelPanel -edit -l (localizedPanelLabel(\\\"Persp View\\\")) -mbv $menusOkayInPanels  $panelName;\\n$editorName = $panelName;\\nmodelEditor -e \\n    -cam `findStartUpCamera persp` \\n    -useInteractiveMode 0\\n    -displayLights \\\"all\\\" \\n    -displayAppearance \\\"smoothShaded\\\" \\n    -activeOnly 0\\n    -wireframeOnShaded 0\\n    -headsUpDisplay 1\\n    -selectionHiliteDisplay 1\\n    -useDefaultMaterial 0\\n    -bufferMode \\\"double\\\" \\n    -twoSidedLighting 1\\n    -backfaceCulling 1\\n    -xray 0\\n    -jointXray 0\\n    -activeComponentsXray 0\\n    -displayTextures 1\\n    -smoothWireframe 0\\n    -lineWidth 1\\n    -textureAnisotropic 1\\n    -textureHilight 1\\n    -textureSampling 2\\n    -textureDisplay \\\"modulate\\\" \\n    -textureMaxSize 8192\\n    -fogging 0\\n    -fogSource \\\"fragment\\\" \\n    -fogMode \\\"linear\\\" \\n    -fogStart 0\\n    -fogEnd 100\\n    -fogDensity 0.1\\n    -fogColor 0.5 0.5 0.5 1 \\n    -maxConstantTransparency 1\\n    -rendererName \\\"hwRender_OpenGL_Renderer\\\" \\n    -colorResolution 256 256 \\n    -bumpResolution 512 512 \\n    -textureCompression 0\\n    -transparencyAlgorithm \\\"perPolygonSort\\\" \\n    -transpInShadows 0\\n    -cullingOverride \\\"singleSided\\\" \\n    -lowQualityLighting 0\\n    -maximumNumHardwareLights 1\\n    -occlusionCulling 1\\n    -shadingModel 0\\n    -useBaseRenderer 0\\n    -useReducedRenderer 0\\n    -smallObjectCulling 0\\n    -smallObjectThreshold -1 \\n    -interactiveDisableShadows 0\\n    -interactiveBackFaceCull 0\\n    -sortTransparent 1\\n    -nurbsCurves 1\\n    -nurbsSurfaces 1\\n    -polymeshes 1\\n    -subdivSurfaces 1\\n    -planes 1\\n    -lights 0\\n    -cameras 1\\n    -controlVertices 1\\n    -hulls 1\\n    -grid 0\\n    -joints 1\\n    -ikHandles 1\\n    -deformers 1\\n    -dynamics 1\\n    -fluids 1\\n    -hairSystems 1\\n    -follicles 1\\n    -nCloths 1\\n    -nParticles 1\\n    -nRigids 1\\n    -dynamicConstraints 1\\n    -locators 1\\n    -manipulators 1\\n    -dimensions 1\\n    -handles 1\\n    -pivots 1\\n    -textures 1\\n    -strokes 1\\n    -shadows 0\\n    $editorName;\\nmodelEditor -e -viewSelected 0 $editorName\"\n"
		+ "\t\t\t\t$configName;\n\n            setNamedPanelLayout (localizedPanelLabel(\"Current Layout\"));\n        }\n\n        panelHistory -e -clear mainPanelHistory;\n        setFocus `paneLayout -q -p1 $gMainPane`;\n        sceneUIReplacement -deleteRemaining;\n        sceneUIReplacement -clear;\n\t}\n\n\ngrid -spacing 5 -size 24 -divisions 5 -displayAxes yes -displayGridLines yes -displayDivisionLines yes -displayPerspectiveLabels no -displayOrthographicLabels no -displayAxesBold yes -perspectiveLabelPosition edge -orthographicLabelPosition edge;\nviewManip -drawCompass 0 -compassAngle 0 -frontParameters \"\" -homeParameters \"\" -selectionLockParameters \"\";\n}\n");
	setAttr ".st" 3;
createNode script -n "sceneConfigurationScriptNode";
	setAttr ".b" -type "string" "playbackOptions -min 1 -max 24 -ast 1 -aet 48 ";
	setAttr ".st" 6;
createNode file -n "file1";
	setAttr ".co" -type "float3" 0.17355999 0.17355999 0.17355999 ;
	setAttr ".ag" 1.685960054397583;
	setAttr ".ftn" -type "string" "D:/Project/MyProject//sourceimages/Aquarium/TGAs/GlobeInner_RM.tga";
createNode place2dTexture -n "place2dTexture1";
createNode file -n "file2";
	setAttr ".co" -type "float3" 0.14049999 0.14049999 0.14049999 ;
	setAttr ".ag" 1.1239999532699585;
	setAttr ".ftn" -type "string" "D:/Project/MyProject//sourceimages/Aquarium/TGAs/GlobeInner_SM.tga";
createNode place2dTexture -n "place2dTexture2";
createNode file -n "file3";
	setAttr ".cg" -type "float3" 0.34709999 0.34709999 0.34709999 ;
	setAttr ".ag" 0.20000000298023224;
	setAttr ".ftn" -type "string" "D:/Project/MyProject//sourceimages/Aquarium/TGAs/OceanFloor_DM.tga";
createNode place2dTexture -n "place2dTexture3";
createNode unknown -n "__shaderListNode";
	addAttr -ci true -sn "slt" -ln "shaderlist" -dt "stringArray";
	addAttr -ci true -sn "hsh" -ln "shaderhashes" -dt "stringArray";
	setAttr ".slt" -type "stringArray" 1 "default"  ;
	setAttr ".hsh" -type "stringArray" 1 "0"  ;
select -ne :time1;
	setAttr ".o" 0;
select -ne :renderPartition;
	setAttr -s 3 ".st";
select -ne :renderGlobalsList1;
select -ne :defaultShaderList1;
	setAttr -s 3 ".s";
select -ne :postProcessList1;
	setAttr -s 2 ".p";
select -ne :defaultRenderUtilityList1;
	setAttr -s 4 ".u";
select -ne :lightList1;
select -ne :defaultTextureList1;
	setAttr -s 4 ".tx";
select -ne :initialShadingGroup;
	setAttr ".ro" yes;
select -ne :initialParticleSE;
	setAttr ".ro" yes;
select -ne :defaultLightSet;
select -ne :defaultHardwareRenderGlobals;
	setAttr ".fn" -type "string" "im";
	setAttr ".res" -type "string" "ntsc_4d 646 485 1.333";
connectAttr "groupId1.id" "GlobeInnerShape.iog.og[0].gid";
connectAttr "GlobeInnerSG.mwc" "GlobeInnerShape.iog.og[0].gco";
connectAttr "GlobeInner1.oc" "GlobeInnerSG.ss";
connectAttr "groupId1.msg" "GlobeInnerSG.gn" -na;
connectAttr "GlobeInnerShape.iog.og[0]" "GlobeInnerSG.dsm" -na;
connectAttr "GlobeInnerSG.msg" "materialInfo1.sg";
connectAttr "GlobeInner1.msg" "materialInfo1.m";
connectAttr "GlobeInnerT.oc" "GlobeInner1.c";
connectAttr "GlobeInnerT.ot" "GlobeInner1.it";
connectAttr "file2.oc" "GlobeInner1.sc";
connectAttr "file1.oa" "GlobeInner1.rfl";
connectAttr "file3.oc" "GlobeInner1.rc";
connectAttr "globeinnersg1P2D.c" "GlobeInnerT.c";
connectAttr "globeinnersg1P2D.tf" "GlobeInnerT.tf";
connectAttr "globeinnersg1P2D.rf" "GlobeInnerT.rf";
connectAttr "globeinnersg1P2D.s" "GlobeInnerT.s";
connectAttr "globeinnersg1P2D.wu" "GlobeInnerT.wu";
connectAttr "globeinnersg1P2D.wv" "GlobeInnerT.wv";
connectAttr "globeinnersg1P2D.re" "GlobeInnerT.re";
connectAttr "globeinnersg1P2D.of" "GlobeInnerT.of";
connectAttr "globeinnersg1P2D.r" "GlobeInnerT.ro";
connectAttr "globeinnersg1P2D.o" "GlobeInnerT.uv";
connectAttr "globeinnersg1P2D.ofs" "GlobeInnerT.fs";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[0].llnk";
connectAttr "GlobeInnerSG.msg" "lightLinker1.lnk[0].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[1].llnk";
connectAttr ":initialShadingGroup.msg" "lightLinker1.lnk[1].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[2].llnk";
connectAttr ":initialParticleSE.msg" "lightLinker1.lnk[2].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[0].sllk";
connectAttr "GlobeInnerSG.msg" "lightLinker1.slnk[0].solk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[1].sllk";
connectAttr ":initialShadingGroup.msg" "lightLinker1.slnk[1].solk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[2].sllk";
connectAttr ":initialParticleSE.msg" "lightLinker1.slnk[2].solk";
connectAttr "layerManager.dli[0]" "defaultLayer.id";
connectAttr "renderLayerManager.rlmi[0]" "defaultRenderLayer.rlid";
connectAttr "place2dTexture1.c" "file1.c";
connectAttr "place2dTexture1.tf" "file1.tf";
connectAttr "place2dTexture1.rf" "file1.rf";
connectAttr "place2dTexture1.mu" "file1.mu";
connectAttr "place2dTexture1.mv" "file1.mv";
connectAttr "place2dTexture1.s" "file1.s";
connectAttr "place2dTexture1.wu" "file1.wu";
connectAttr "place2dTexture1.wv" "file1.wv";
connectAttr "place2dTexture1.re" "file1.re";
connectAttr "place2dTexture1.of" "file1.of";
connectAttr "place2dTexture1.r" "file1.ro";
connectAttr "place2dTexture1.n" "file1.n";
connectAttr "place2dTexture1.vt1" "file1.vt1";
connectAttr "place2dTexture1.vt2" "file1.vt2";
connectAttr "place2dTexture1.vt3" "file1.vt3";
connectAttr "place2dTexture1.vc1" "file1.vc1";
connectAttr "place2dTexture1.o" "file1.uv";
connectAttr "place2dTexture1.ofs" "file1.fs";
connectAttr "place2dTexture2.c" "file2.c";
connectAttr "place2dTexture2.tf" "file2.tf";
connectAttr "place2dTexture2.rf" "file2.rf";
connectAttr "place2dTexture2.mu" "file2.mu";
connectAttr "place2dTexture2.mv" "file2.mv";
connectAttr "place2dTexture2.s" "file2.s";
connectAttr "place2dTexture2.wu" "file2.wu";
connectAttr "place2dTexture2.wv" "file2.wv";
connectAttr "place2dTexture2.re" "file2.re";
connectAttr "place2dTexture2.of" "file2.of";
connectAttr "place2dTexture2.r" "file2.ro";
connectAttr "place2dTexture2.n" "file2.n";
connectAttr "place2dTexture2.vt1" "file2.vt1";
connectAttr "place2dTexture2.vt2" "file2.vt2";
connectAttr "place2dTexture2.vt3" "file2.vt3";
connectAttr "place2dTexture2.vc1" "file2.vc1";
connectAttr "place2dTexture2.o" "file2.uv";
connectAttr "place2dTexture2.ofs" "file2.fs";
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
connectAttr "GlobeInnerSG.pa" ":renderPartition.st" -na;
connectAttr "GlobeInner1.msg" ":defaultShaderList1.s" -na;
connectAttr "globeinnersg1P2D.msg" ":defaultRenderUtilityList1.u" -na;
connectAttr "place2dTexture1.msg" ":defaultRenderUtilityList1.u" -na;
connectAttr "place2dTexture2.msg" ":defaultRenderUtilityList1.u" -na;
connectAttr "place2dTexture3.msg" ":defaultRenderUtilityList1.u" -na;
connectAttr "lightLinker1.msg" ":lightList1.ln" -na;
connectAttr "directionalLightShape1.ltd" ":lightList1.l" -na;
connectAttr "GlobeInnerT.msg" ":defaultTextureList1.tx" -na;
connectAttr "file1.msg" ":defaultTextureList1.tx" -na;
connectAttr "file2.msg" ":defaultTextureList1.tx" -na;
connectAttr "file3.msg" ":defaultTextureList1.tx" -na;
connectAttr "directionalLight1.iog" ":defaultLightSet.dsm" -na;
// End of GlobeInner.ma
