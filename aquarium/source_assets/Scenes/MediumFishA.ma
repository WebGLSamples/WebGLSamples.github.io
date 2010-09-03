//Maya ASCII 2010 scene
//Name: MediumFishA.ma
//Last modified: Sun, Aug 29, 2010 10:25:20 PM
//Codeset: 1252
requires maya "2010";
requires "stereoCamera" "10.0";
currentUnit -l centimeter -a degree -t film;
fileInfo "application" "maya";
fileInfo "product" "Maya Unlimited 2010";
fileInfo "version" "2010";
fileInfo "cutIdentifier" "200907280007-756013";
fileInfo "osv" "Microsoft Windows XP Service Pack 3 (Build 2600)\n";
createNode transform -s -n "persp";
	setAttr ".v" no;
	setAttr ".t" -type "double3" 4.712650049308734 3.6511788496051052 -5.4123459665354963 ;
	setAttr ".r" -type "double3" -29.87686266226887 133.80000000000098 0 ;
createNode camera -s -n "perspShape" -p "persp";
	setAttr -k off ".v" no;
	setAttr ".fl" 34.999999999999986;
	setAttr ".coi" 8.5555196735643797;
	setAttr ".imn" -type "string" "persp";
	setAttr ".den" -type "string" "persp_depth";
	setAttr ".man" -type "string" "persp_mask";
	setAttr ".tp" -type "double3" 0 0.051907479763031006 -0.048000454902648926 ;
	setAttr ".hc" -type "string" "viewSet -p %camera";
createNode transform -s -n "top";
	setAttr ".v" no;
	setAttr ".t" -type "double3" 0 100.1 0 ;
	setAttr ".r" -type "double3" -89.999999999999986 0 0 ;
createNode camera -s -n "topShape" -p "top";
	setAttr -k off ".v" no;
	setAttr ".rnd" no;
	setAttr ".coi" 100.1;
	setAttr ".ow" 30;
	setAttr ".imn" -type "string" "top";
	setAttr ".den" -type "string" "top_depth";
	setAttr ".man" -type "string" "top_mask";
	setAttr ".hc" -type "string" "viewSet -t %camera";
	setAttr ".o" yes;
createNode transform -s -n "front";
	setAttr ".v" no;
	setAttr ".t" -type "double3" 0 0 100.1 ;
createNode camera -s -n "frontShape" -p "front";
	setAttr -k off ".v" no;
	setAttr ".rnd" no;
	setAttr ".coi" 100.1;
	setAttr ".ow" 30;
	setAttr ".imn" -type "string" "front";
	setAttr ".den" -type "string" "front_depth";
	setAttr ".man" -type "string" "front_mask";
	setAttr ".hc" -type "string" "viewSet -f %camera";
	setAttr ".o" yes;
createNode transform -s -n "side";
	setAttr ".v" no;
	setAttr ".t" -type "double3" 100.1 0 0 ;
	setAttr ".r" -type "double3" 0 89.999999999999986 0 ;
createNode camera -s -n "sideShape" -p "side";
	setAttr -k off ".v" no;
	setAttr ".rnd" no;
	setAttr ".coi" 100.1;
	setAttr ".ow" 30;
	setAttr ".imn" -type "string" "side";
	setAttr ".den" -type "string" "side_depth";
	setAttr ".man" -type "string" "side_mask";
	setAttr ".hc" -type "string" "viewSet -s %camera";
	setAttr ".o" yes;
createNode transform -n "MediumFishA_001";
createNode mesh -n "MediumFishA_001Shape" -p "MediumFishA_001";
	setAttr -k off ".v";
	setAttr ".uvst[0].uvsn" -type "string" "map1";
	setAttr ".cuvs" -type "string" "map1";
	setAttr ".dcc" -type "string" "Ambient+Diffuse";
createNode mesh -n "polySurfaceShape1" -p "MediumFishA_001";
	setAttr -k off ".v";
	setAttr ".io" yes;
	setAttr ".uvst[0].uvsn" -type "string" "map1";
	setAttr -s 96 ".uvst[0].uvsp[0:95]" -type "float2" 0.86752403 0.47491401 
		0.86698902 0.44000801 0.93504202 0.48149601 0.72905302 0.394667 0.72847903 0.340123 
		0.578282 0.32069999 0.582596 0.231153 0.42784399 0.284329 0.42695901 0.198851 0.283068 
		0.30755699 0.28446901 0.216382 0.126995 0.32696599 0.12837 0.29021201 0.044718001 
		0.40906999 0.042298999 0.38220099 0.012432 0.48256999 -0.003704 0.480838 0.047424 
		0.45199999 0.73055202 0.46131799 0.57693398 0.447133 0.425915 0.435754 0.28277701 
		0.441062 0.128179 0.44719201 0.42363399 0.73277599 0.36918199 0.82746601 0.30084401 
		0.72193497 0.86660701 0.50910598 0.73041999 0.543042 0.573946 0.60782498 0.425937 
		0.63418198 0.29234201 0.62843001 0.125351 0.58363402 0.038070999 0.526366 0.013652 
		0.50079799 0.72742099 0.61274302 0.36263001 1 0.57322598 0.706613 0.123833 0.63591802 
		0.035156 0.55195898 0.0049089999 0.51370502 0.54457098 0.73632199 0.42452899 0.77480102 
		0.57322598 0.706613 0.61132801 0.73018301 0.61637002 0.85586798 0.67315602 0.638919 
		0.61405998 0.26229799 0.66938299 0.23869801 0.66972798 0.114349 0.72886199 0.34162399 
		0.27696899 0.230106 0.32092401 0.034892 0.308525 0 0.34028801 0.212337 0.059987999 
		0.90246999 0.084941998 0.80009502 0.178845 0.917997 0.03125 0.87382799 0.87497598 
		0.47619 0.90916598 0.48055801 0.94738299 0.68197101 0.99236 0.761127 0.93670797 0.48404199 
		0.93836701 0.22372299 0.97673202 0.14193401 0.86752403 0.47491401 0.72905302 0.394667 
		0.578282 0.32069999 0.42784399 0.284329 0.283068 0.30755699 0.126995 0.32696599 0.042495999 
		0.406104 0.012432 0.48256999 0.047424 0.45199999 0.73055202 0.46131799 0.57693398 
		0.447133 0.425915 0.435754 0.28277701 0.441062 0.128179 0.44719201 0.36918199 0.82746601 
		0.42363399 0.73277599 0.73041999 0.543042 0.573946 0.60782498 0.425937 0.63418198 
		0.29234201 0.62843001 0.125351 0.58363402 0.038070999 0.526366 0.013652 0.50079799 
		0.57322598 0.706613 0.61405998 0.26229799 0.27696899 0.230106 0.178845 0.917997 0.084941998 
		0.80009502 0.059987999 0.90246999 0.03125 0.87382799 0.90916598 0.48055801;
	setAttr ".cuvs" -type "string" "map1";
	setAttr ".dcc" -type "string" "Ambient+Diffuse";
	setAttr -s 95 ".vt[0:94]"  0 0.89559603 -3.7466829 0 0.028329 3.650682 
		0 0.63984698 -3.413969 -0.026451999 -0.010908 -3.1312611 0.0080460003 -0.02502 -2.878346 
		0 -0.95462799 0.48682699 0 -0.86444598 1.546361 0 -0.64986497 2.701082 0 -0.34786201 
		3.3487439 0.085182004 -0.0044069998 3.558718 0.201665 -0.28841701 -1.742388 0.35269701 
		-0.52740002 -0.62707901 0.415658 -0.644912 0.485764 0.37551099 -0.56986398 1.556723 
		0.28892899 -0.50715601 2.711251 0.12579399 -0.25146499 3.3363259 0.07762 -0.029144 
		-2.823225 0.26365399 -0.073073 -1.753477 0.46431801 -0.118902 -0.61710799 0.56910402 
		-0.155669 0.50002998 0.52511901 -0.13851599 1.558875 0.404695 -0.11871 2.7024961 
		0.176808 -0.103179 3.2998691 -0.001343 0.94814903 0.50651401 0.189649 0.190975 -1.752503 
		0.346567 0.40028599 -0.59500301 0.40860501 0.48544201 0.49987301 0.389869 0.46685699 
		1.4881231 0.31538799 0.322124 2.7234161 0.147963 0.137095 3.3690541 -0.389869 0.46685699 
		1.4881231 0 0.368258 -1.730315 0 0.71946198 -0.58967698 0.037501 0.80673701 0.51690698 
		0 0.76896602 1.425231 0 0.49105099 2.734643 0 0.219785 3.390619 0 0.096185997 3.614367 
		0.078167997 0.054485999 3.5496931 0 1.66738 0.96817499 0.028072 1.109934 0.91970497 
		-0.461256 -0.010016 1.742929 0.020347999 0.71055698 -0.56998301 0 0.79561597 -0.87153703 
		-0.67361599 0.082525 1.530345 0 0.47797701 -1.325828 0.027391 -0.71609497 -0.89174402 
		0 -0.792346 -1.3009861 -0.479947 -0.24824101 1.345751 0 -0.45979601 -1.740975 0.027391 
		-0.82010502 1.601841 0 -1.45083 1.276688 -1.031801 0.13269401 0.65112001 0 -0.87751502 
		1.133449 0.479947 -0.24824101 1.345751 1.031801 0.13269401 0.65112001 0.67361599 
		0.082525 1.530345 0.461256 -0.010016 1.742929 -0.31538799 0.322124 2.7234161 -0.147963 
		0.137095 3.3690541 0 -1.563565 1.3684109 0 -1.104983 -3.631079 -0.027391 -0.82010502 
		1.601841 0 -0.840729 -3.3472741 0.026451999 -0.010908 -3.1312611 -0.07762 -0.029144 
		-2.823225 0 -0.141923 -2.8192649 0 0.000348 -3.3350041 -0.201665 -0.28841701 -1.742388 
		0 -0.464645 -1.7381459 -0.35269701 -0.52740002 -0.62707901 0 -0.81672102 -0.65899599 
		-0.415658 -0.644912 0.485764 0 -1.194109 -1.3035409 -0.37551099 -0.56986398 1.556723 
		-0.027391 -0.71609497 -0.89174402 -0.28892899 -0.50715601 2.711251 0 1.201699 -0.90883303 
		-0.12579399 -0.25146499 3.3363259 -0.020347999 0.71055698 -0.56998301 -0.085182004 
		-0.0044069998 3.558718 -0.078167997 0.054485999 3.5496931 -0.176808 -0.103179 3.2998691 
		-0.26365399 -0.073073 -1.753477 -0.46431801 -0.118902 -0.61710799 -0.56910402 -0.155669 
		0.50002998 -0.52511901 -0.13851599 1.558875 -0.404695 -0.11871 2.7024961 -0.037501 
		0.80673701 0.51690698 -0.028072 1.109934 0.91970497 0 0.81545103 -0.37771001 0.0080460003 
		0.081330001 -2.8164389 -0.189649 0.190975 -1.752503 -0.346567 0.40028599 -0.59500301 
		-0.40860501 0.48544201 0.49987301;
	setAttr -s 190 ".ed";
	setAttr ".ed[0:165]"  16 66 0 66 67 0 67 16 
		0 16 10 0 10 69 0 69 66 0 10 11 
		0 11 71 0 71 69 0 11 12 0 12 5 
		0 5 71 0 12 13 0 13 6 0 6 5 
		0 13 14 0 14 7 0 7 6 0 14 15 
		0 15 8 0 8 7 0 9 1 0 1 8 
		0 15 9 0 15 22 0 22 9 0 16 17 
		0 17 10 0 17 18 0 18 11 0 18 19 
		0 19 12 0 19 20 0 20 13 0 20 21 
		0 21 14 0 21 22 0 33 40 0 40 34 
		0 34 33 0 16 91 0 91 24 0 24 17 
		0 67 91 0 24 25 0 25 18 0 25 26 
		0 26 19 0 26 27 0 27 20 0 27 28 
		0 28 21 0 28 29 0 29 22 0 22 38 
		0 38 9 0 31 24 0 91 31 0 40 39 
		0 39 34 0 31 32 0 32 25 0 32 33 
		0 33 26 0 34 27 0 34 35 0 35 28 
		0 35 36 0 36 29 0 36 37 0 37 38 
		0 38 29 0 33 90 0 90 23 0 23 33 
		0 37 1 0 42 43 0 43 77 0 77 42 
		0 45 43 0 42 45 0 46 47 0 47 73 
		0 73 46 0 49 47 0 46 49 0 50 51 
		0 51 60 0 60 50 0 53 51 0 50 53 
		0 56 54 0 54 55 0 55 56 0 56 57 
		0 57 54 0 4 64 0 64 2 0 2 4 
		0 64 0 0 0 2 0 64 67 0 67 0 
		0 63 64 0 4 63 0 61 64 0 63 61 
		0 61 67 0 23 40 0 32 90 0 66 65 
		0 65 67 0 69 68 0 68 65 0 71 70 
		0 70 68 0 5 72 0 72 70 0 6 74 
		0 74 72 0 7 76 0 76 74 0 8 78 
		0 78 76 0 1 80 0 80 78 0 80 82 
		0 82 78 0 68 83 0 83 65 0 70 84 
		0 84 83 0 72 85 0 85 84 0 74 86 
		0 86 85 0 76 87 0 87 86 0 82 87 
		0 34 89 0 89 88 0 88 34 0 83 92 
		0 92 91 0 91 65 0 84 93 0 93 92 
		0 85 94 0 94 93 0 86 30 0 30 94 
		0 87 58 0 58 30 0 82 59 0 59 58 
		0 80 81 0 81 82 0 92 31 0 39 89 
		0 93 32 0 94 88 0 88 32 0 30 34 
		0 58 35 0 59 36 0 81 37 0;
	setAttr ".ed[166:189]" 59 81 0 90 88 0 88 23 
		0 43 79 0 79 77 0 45 79 0 47 75 
		0 75 73 0 49 75 0 51 62 0 62 60 
		0 53 62 0 52 48 0 48 44 0 44 52 
		0 41 44 0 48 41 0 2 3 0 3 4 
		0 0 3 0 67 3 0 3 63 0 3 61 
		0 89 23 0;
	setAttr -s 356 ".n";
	setAttr ".n[0:165]" -type "float3"  0.97099102 -0.146312 -0.189126 0.75742698 
		-0.62462401 -0.190129 0.811176 -0.56374502 -0.155514 0.75742698 -0.62462401 -0.190129 
		0.97099102 -0.146312 -0.189126 0.83430398 -0.50847697 -0.213046 0.665075 -0.70955098 
		-0.232838 0.665075 -0.70955098 -0.232838 0.83430398 -0.50847697 -0.213046 0.82529598 
		-0.54079503 -0.16256499 0.624183 -0.76160699 -0.174215 0.624183 -0.76160699 -0.174215 
		0.82529598 -0.54079503 -0.16256499 0.82130897 -0.570162 -0.019172 0.611902 -0.79076302 
		-0.016401 0.611902 -0.79076302 -0.016401 0.82130897 -0.570162 -0.019172 0.80177701 
		-0.590859 0.089662999 0.57454801 -0.81274903 0.096614003 0.57454801 -0.81274903 0.096614003 
		0.80177701 -0.590859 0.089662999 0.76726598 -0.58624101 0.26004699 0 -0.95131898 
		0.308209 0 -0.95131898 0.308209 0.76726598 -0.58624101 0.26004699 0.73275602 -0.476596 
		0.48572201 0 -0.77498901 0.631975 0.83637398 -0.089155003 0.54086101 0 -0.203403 
		0.97909498 0 -0.77498901 0.631975 0.73275602 -0.476596 0.48572201 0.73275602 -0.476596 
		0.48572201 0.93803298 -0.036116999 0.344659 0.83637398 -0.089155003 0.54086101 0.97099102 
		-0.146312 -0.189126 0.98343301 0.013141 -0.180795 0.83430398 -0.50847697 -0.213046 
		0.83430398 -0.50847697 -0.213046 0.98343301 0.013141 -0.180795 0.99084198 -0.018293999 
		-0.13378499 0.82529598 -0.54079503 -0.16256499 0.82529598 -0.54079503 -0.16256499 
		0.99084198 -0.018293999 -0.13378499 0.99919403 -0.032891002 -0.022992 0.82130897 
		-0.570162 -0.019172 0.82130897 -0.570162 -0.019172 0.99919403 -0.032891002 -0.022992 
		0.99655998 -0.045007002 0.069583997 0.80177701 -0.590859 0.089662999 0.80177701 -0.590859 
		0.089662999 0.99655998 -0.045007002 0.069583997 0.97393 -0.057718001 0.219381 0.76726598 
		-0.58624101 0.26004699 0.76726598 -0.58624101 0.26004699 0.97393 -0.057718001 0.219381 
		0.93803298 -0.036116999 0.344659 0.73275602 -0.476596 0.48572201 0.92656398 0.37348199 
		-0.044613 0.99572998 0.091248997 -0.013942 0.886576 0.453861 0.089401998 0.97099102 
		-0.146312 -0.189126 0.82100099 0.54977399 -0.15396801 0.826235 0.529387 -0.19257399 
		0.98343301 0.013141 -0.180795 0.83954298 0.53465003 -0.096520998 0.82100099 0.54977399 
		-0.15396801 0.97099102 -0.146312 -0.189126 0.98343301 0.013141 -0.180795 0.826235 
		0.529387 -0.19257399 0.849316 0.50761497 -0.144878 0.99084198 -0.018293999 -0.13378499 
		0.99084198 -0.018293999 -0.13378499 0.849316 0.50761497 -0.144878 0.85205501 0.52285701 
		-0.024961 0.99919403 -0.032891002 -0.022992 0.99919403 -0.032891002 -0.022992 0.85205501 
		0.52285701 -0.024961 0.833 0.546803 0.084365003 0.99655998 -0.045007002 0.069583997 
		0.99655998 -0.045007002 0.069583997 0.833 0.546803 0.084365003 0.80234402 0.54260498 
		0.248643 0.97393 -0.057718001 0.219381 0.97393 -0.057718001 0.219381 0.80234402 0.54260498 
		0.248643 0.79528999 0.45063901 0.40551099 0.93803298 -0.036116999 0.344659 0.93803298 
		-0.036116999 0.344659 0.838108 0.29846001 0.45661399 0.83637398 -0.089155003 0.54086101 
		0.65782899 0.72496301 -0.204179 0.826235 0.529387 -0.19257399 0.82100099 0.54977399 
		-0.15396801 0.886576 0.453861 0.089401998 0.99572998 0.091248997 -0.013942 0.99553198 
		0.042815 0.084159002 0.826235 0.529387 -0.19257399 0.65782899 0.72496301 -0.204179 
		0.82329798 0.55378699 -0.124501 0.849316 0.50761497 -0.144878 0.849316 0.50761497 
		-0.144878 0.82329798 0.55378699 -0.124501 0.92656398 0.37348199 -0.044613 0.85205501 
		0.52285701 -0.024961 0.85205501 0.52285701 -0.024961 0.92656398 0.37348199 -0.044613 
		0.886576 0.453861 0.089401998 0.833 0.546803 0.084365003 0.833 0.546803 0.084365003 
		0.886576 0.453861 0.089401998 0 0.95681101 0.29071 0.80234402 0.54260498 0.248643 
		0.80234402 0.54260498 0.248643 0 0.95681101 0.29071 0 0.88456798 0.46641099 0.79528999 
		0.45063901 0.40551099 0.79528999 0.45063901 0.40551099 0 0.88456798 0.46641099 0.66269201 
		0.49770901 0.55957597 0.838108 0.29846001 0.45661399 0.92656398 0.37348199 -0.044613 
		0.98345202 0.17681 -0.039501999 0.96114099 0.25651401 -0.102021 0.79528999 0.45063901 
		0.40551099 0.838108 0.29846001 0.45661399 0.93803298 -0.036116999 0.344659 0.66269201 
		0.49770901 0.55957597 0 -0.203403 0.97909498 0.83637398 -0.089155003 0.54086101 0.838108 
		0.29846001 0.45661399 0.99779898 0.031112 -0.058552001 0.99779898 0.031112 -0.058552001 
		0.99758899 -0.0063470001 -0.069104001 0.99649799 0.068522997 -0.047911 0.99779898 
		0.031112 -0.058552001 0.99779898 0.031112 -0.058552001 -0.99756497 0.035192002 0.060212001 
		-0.99756497 0.035192002 0.060212001 -0.99776202 -0.00042500001 0.066861004 -0.99605799 
		0.070762001 0.053482998 -0.99756497 0.035192002 0.060212001 -0.99756497 0.035192002 
		0.060212001 -0.99879497 0.020358 0.044649001 -0.99879497 0.020358 0.044649001 -0.99911398 
		0.026559999 0.032644998 -0.998294 0.014152 0.056644998 -0.99879497 0.020358 0.044649001 
		-0.99879497 0.020358 0.044649001 0.71670198 -0.60913497 0.33954799 0.71670198 -0.60913497 
		0.33954799 0.75550503 -0.59517503 0.27382201 0.71670198 -0.60913497 0.33954799 0.71670198 
		-0.60913497 0.33954799 0.67358398 -0.61942798 0.403229 0.997244 0.011889 0.073238 
		0.99998701 0.0026710001 -0.0044510001 0.99583101 0.067253001 0.061629999 0.99583101 
		0.067253001 0.061629999 0.99998701 0.0026710001 -0.0044510001 0.99908501 0.000119 
		-0.042768002 0.99908501 0.000119 -0.042768002 0.99998701 0.0026710001 -0.0044510001 
		0.991494 -0.013334 -0.129464 0.99745899 -0.045963001 0.054423999 0.99998701 0.0026710001 
		-0.0044510001 0.997244 0.011889 0.073238;
	setAttr ".n[166:331]" -type "float3"  0.99902099 -0.0040330002 -0.044043001 
		0.99998701 0.0026710001 -0.0044510001 0.99745899 -0.045963001 0.054423999 0.991494 
		-0.013334 -0.129464 0.99998701 0.0026710001 -0.0044510001 0.99902099 -0.0040330002 
		-0.044043001 0.96114099 0.25651401 -0.102021 0.99572998 0.091248997 -0.013942 0.92656398 
		0.37348199 -0.044613 0.82329798 0.55378699 -0.124501 0.98345202 0.17681 -0.039501999 
		0.92656398 0.37348199 -0.044613 -0.811176 -0.56374502 -0.155514 -0.75742698 -0.62462401 
		-0.190129 -0.97386903 -0.122733 -0.19109 -0.665075 -0.70955098 -0.232838 -0.83430398 
		-0.50847697 -0.213046 -0.97386903 -0.122733 -0.19109 -0.75742698 -0.62462401 -0.190129 
		-0.624183 -0.76160699 -0.174215 -0.82529598 -0.54079503 -0.16256499 -0.83430398 -0.50847697 
		-0.213046 -0.665075 -0.70955098 -0.232838 -0.611902 -0.79076302 -0.016401 -0.82130897 
		-0.570162 -0.019172 -0.82529598 -0.54079503 -0.16256499 -0.624183 -0.76160699 -0.174215 
		-0.57454801 -0.81274903 0.096614003 -0.80177701 -0.590859 0.089662999 -0.82130897 
		-0.570162 -0.019172 -0.611902 -0.79076302 -0.016401 0 -0.95131898 0.308209 -0.76726598 
		-0.58624101 0.26004699 -0.80177701 -0.590859 0.089662999 -0.57454801 -0.81274903 
		0.096614003 0 -0.77498901 0.631975 -0.73275602 -0.476596 0.48572201 -0.76726598 -0.58624101 
		0.26004699 0 -0.95131898 0.308209 -0.73275602 -0.476596 0.48572201 0 -0.77498901 
		0.631975 0 -0.203403 0.97909498 -0.83637398 -0.089155003 0.54086101 -0.83637398 -0.089155003 
		0.54086101 -0.93803298 -0.036116999 0.344659 -0.73275602 -0.476596 0.48572201 -0.83430398 
		-0.50847697 -0.213046 -0.98290598 0.021925 -0.182799 -0.97386903 -0.122733 -0.19109 
		-0.82529598 -0.54079503 -0.16256499 -0.99084198 -0.018293999 -0.13378499 -0.98290598 
		0.021925 -0.182799 -0.83430398 -0.50847697 -0.213046 -0.82130897 -0.570162 -0.019172 
		-0.99919403 -0.032891002 -0.022992 -0.99084198 -0.018293999 -0.13378499 -0.82529598 
		-0.54079503 -0.16256499 -0.80177701 -0.590859 0.089662999 -0.99655998 -0.045007002 
		0.069583997 -0.99919403 -0.032891002 -0.022992 -0.82130897 -0.570162 -0.019172 -0.76726598 
		-0.58624101 0.26004699 -0.97393 -0.057718001 0.219381 -0.99655998 -0.045007002 0.069583997 
		-0.80177701 -0.590859 0.089662999 -0.73275602 -0.476596 0.48572201 -0.93803298 -0.036116999 
		0.344659 -0.97393 -0.057718001 0.219381 -0.76726598 -0.58624101 0.26004699 -0.886576 
		0.453861 0.089401998 -0.99626201 0.085814998 -0.0098850001 -0.928922 0.36782101 -0.042569 
		-0.98290598 0.021925 -0.182799 -0.82054901 0.53688997 -0.19608501 -0.79514599 0.58645397 
		-0.154321 -0.97386903 -0.122733 -0.19109 -0.97386903 -0.122733 -0.19109 -0.79514599 
		0.58645397 -0.154321 -0.78497797 0.613846 -0.083682001 -0.99084198 -0.018293999 -0.13378499 
		-0.849316 0.50761497 -0.144878 -0.82054901 0.53688997 -0.19608501 -0.98290598 0.021925 
		-0.182799 -0.99919403 -0.032891002 -0.022992 -0.85205501 0.52285701 -0.024961 -0.849316 
		0.50761497 -0.144878 -0.99084198 -0.018293999 -0.13378499 -0.99655998 -0.045007002 
		0.069583997 -0.833 0.546803 0.084365003 -0.85205501 0.52285701 -0.024961 -0.99919403 
		-0.032891002 -0.022992 -0.97393 -0.057718001 0.219381 -0.80234402 0.54260498 0.248643 
		-0.833 0.546803 0.084365003 -0.99655998 -0.045007002 0.069583997 -0.93803298 -0.036116999 
		0.344659 -0.79528999 0.45063901 0.40551099 -0.80234402 0.54260498 0.248643 -0.97393 
		-0.057718001 0.219381 -0.83637398 -0.089155003 0.54086101 -0.838108 0.29846001 0.45661399 
		-0.93803298 -0.036116999 0.344659 -0.79514599 0.58645397 -0.154321 -0.82054901 0.53688997 
		-0.19608501 -0.65684301 0.72450298 -0.208932 -0.99553198 0.042815 0.084159002 -0.99626201 
		0.085814998 -0.0098850001 -0.886576 0.453861 0.089401998 -0.849316 0.50761497 -0.144878 
		-0.82329798 0.55378699 -0.124501 -0.65684301 0.72450298 -0.208932 -0.82054901 0.53688997 
		-0.19608501 -0.85205501 0.52285701 -0.024961 -0.928922 0.36782101 -0.042569 -0.82329798 
		0.55378699 -0.124501 -0.849316 0.50761497 -0.144878 -0.833 0.546803 0.084365003 -0.886576 
		0.453861 0.089401998 -0.928922 0.36782101 -0.042569 -0.85205501 0.52285701 -0.024961 
		-0.80234402 0.54260498 0.248643 0 0.95681101 0.29071 -0.886576 0.453861 0.089401998 
		-0.833 0.546803 0.084365003 -0.79528999 0.45063901 0.40551099 0 0.88456798 0.46641099 
		0 0.95681101 0.29071 -0.80234402 0.54260498 0.248643 -0.838108 0.29846001 0.45661399 
		-0.66269201 0.49770901 0.55957597 0 0.88456798 0.46641099 -0.79528999 0.45063901 
		0.40551099 -0.96601403 0.239934 -0.096166 -0.98497999 0.168056 -0.039652001 -0.928922 
		0.36782101 -0.042569 -0.93803298 -0.036116999 0.344659 -0.838108 0.29846001 0.45661399 
		-0.79528999 0.45063901 0.40551099 -0.838108 0.29846001 0.45661399 -0.83637398 -0.089155003 
		0.54086101 0 -0.203403 0.97909498 -0.66269201 0.49770901 0.55957597 -0.99758899 -0.0063470001 
		-0.069104001 -0.99779898 0.031112 -0.058552001 -0.99779898 0.031112 -0.058552001 
		-0.99779898 0.031112 -0.058552001 -0.99779898 0.031112 -0.058552001 -0.99649799 0.068522997 
		-0.047911 0.99776202 -0.00042500001 0.066861004 0.99756497 0.035192002 0.060212001 
		0.99756497 0.035192002 0.060212001 0.99756497 0.035192002 0.060212001 0.99756497 
		0.035192002 0.060212001 0.99605799 0.070762001 0.053482998 0.99911398 0.026559999 
		0.032644998 0.99879497 0.020358 0.044649001 0.99879497 0.020358 0.044649001 0.99879497 
		0.020358 0.044649001 0.99879497 0.020358 0.044649001 0.998294 0.014152 0.056644998 
		-0.75550503 -0.59517503 0.27382201 -0.71670198 -0.60913497 0.33954799 -0.71670198 
		-0.60913497 0.33954799 -0.67358398 -0.61942798 0.403229 -0.71670198 -0.60913497 0.33954799 
		-0.71670198 -0.60913497 0.33954799;
	setAttr ".n[332:355]" -type "float3"  -0.99232203 0.080955997 0.093501002 
		-0.999852 0.0045969998 0.016550001 -0.99053901 0.017638 0.136097 -0.99908501 0.000119 
		-0.042768002 -0.999852 0.0045969998 0.016550001 -0.99232203 0.080955997 0.093501002 
		-0.991494 -0.013334 -0.129464 -0.999852 0.0045969998 0.016550001 -0.99908501 0.000119 
		-0.042768002 -0.99053901 0.017638 0.136097 -0.999852 0.0045969998 0.016550001 -0.99489701 
		-0.053915001 0.085284002 -0.99489701 -0.053915001 0.085284002 -0.999852 0.0045969998 
		0.016550001 -0.99902099 -0.0040330002 -0.044043001 -0.99902099 -0.0040330002 -0.044043001 
		-0.999852 0.0045969998 0.016550001 -0.991494 -0.013334 -0.129464 -0.928922 0.36782101 
		-0.042569 -0.99626201 0.085814998 -0.0098850001 -0.96601403 0.239934 -0.096166 -0.928922 
		0.36782101 -0.042569 -0.98497999 0.168056 -0.039652001 -0.82329798 0.55378699 -0.124501;
	setAttr -s 102 ".fc[0:101]" -type "polyFaces" 
		f 3 0 1 2 
		mu 0 3 0 1 2 
		f 4 -1 3 4 5 
		mu 0 4 1 0 3 4 
		f 4 -5 6 7 8 
		mu 0 4 4 3 5 6 
		f 4 -8 9 10 11 
		mu 0 4 6 5 7 8 
		f 4 -11 12 13 14 
		mu 0 4 8 7 9 10 
		f 4 -14 15 16 17 
		mu 0 4 10 9 11 12 
		f 4 -17 18 19 20 
		mu 0 4 12 11 13 14 
		f 4 21 22 -20 23 
		mu 0 4 15 16 14 13 
		f 3 24 25 -24 
		mu 0 3 13 17 15 
		f 3 26 27 -4 
		mu 0 3 0 18 3 
		f 4 -28 28 29 -7 
		mu 0 4 3 18 19 5 
		f 4 -30 30 31 -10 
		mu 0 4 5 19 20 7 
		f 4 -32 32 33 -13 
		mu 0 4 7 20 21 9 
		f 4 -34 34 35 -16 
		mu 0 4 9 21 22 11 
		f 4 -36 36 -25 -19 
		mu 0 4 11 22 17 13 
		f 3 37 38 39 
		mu 0 3 23 24 25 
		f 4 40 41 42 -27 
		mu 0 4 0 26 27 18 
		f 3 43 -41 -3 
		mu 0 3 2 26 0 
		f 4 -43 44 45 -29 
		mu 0 4 18 27 28 19 
		f 4 -46 46 47 -31 
		mu 0 4 19 28 29 20 
		f 4 -48 48 49 -33 
		mu 0 4 20 29 30 21 
		f 4 -50 50 51 -35 
		mu 0 4 21 30 31 22 
		f 4 -52 52 53 -37 
		mu 0 4 22 31 32 17 
		f 3 54 55 -26 
		mu 0 3 17 33 15 
		f 3 56 -42 57 
		mu 0 3 34 27 26 
		f 3 -39 58 59 
		mu 0 3 25 24 35 
		f 4 -57 60 61 -45 
		mu 0 4 27 34 36 28 
		f 4 -62 62 63 -47 
		mu 0 4 28 36 23 29 
		f 4 -64 -40 64 -49 
		mu 0 4 29 23 25 30 
		f 4 -65 65 66 -51 
		mu 0 4 30 25 37 31 
		f 4 -67 67 68 -53 
		mu 0 4 31 37 38 32 
		f 4 -69 69 70 71 
		mu 0 4 32 38 39 33 
		f 3 72 73 74 
		mu 0 3 23 40 41 
		f 3 -72 -55 -54 
		mu 0 3 32 33 17 
		f 4 75 -22 -56 -71 
		mu 0 4 39 16 15 33 
		f 3 76 77 78 
		mu 0 3 42 43 44 
		f 3 79 -77 80 
		mu 0 3 45 43 42 
		f 3 81 82 83 
		mu 0 3 46 47 48 
		f 3 84 -82 85 
		mu 0 3 49 47 46 
		f 3 86 87 88 
		mu 0 3 50 51 52 
		f 3 89 -87 90 
		mu 0 3 53 51 50 
		f 3 91 92 93 
		mu 0 3 54 55 56 
		f 3 -92 94 95 
		mu 0 3 55 54 57 
		f 3 96 97 98 
		mu 0 3 58 59 60 
		f 3 -98 99 100 
		mu 0 3 60 59 61 
		f 3 -100 101 102 
		mu 0 3 61 59 62 
		f 3 103 -97 104 
		mu 0 3 63 59 58 
		f 3 105 -104 106 
		mu 0 3 64 59 63 
		f 3 -102 -106 107 
		mu 0 3 62 59 64 
		f 3 108 -38 -75 
		mu 0 3 41 24 23 
		f 3 109 -73 -63 
		mu 0 3 36 40 23 
		f 3 -2 110 111 
		mu 0 3 2 1 65 
		f 4 112 113 -111 -6 
		mu 0 4 4 66 65 1 
		f 4 114 115 -113 -9 
		mu 0 4 6 67 66 4 
		f 4 116 117 -115 -12 
		mu 0 4 8 68 67 6 
		f 4 118 119 -117 -15 
		mu 0 4 10 69 68 8 
		f 4 120 121 -119 -18 
		mu 0 4 12 70 69 10 
		f 4 122 123 -121 -21 
		mu 0 4 14 71 70 12 
		f 4 -123 -23 124 125 
		mu 0 4 71 14 16 72 
		f 3 126 127 -126 
		mu 0 3 72 73 71 
		f 3 128 129 -114 
		mu 0 3 66 74 65 
		f 4 130 131 -129 -116 
		mu 0 4 67 75 74 66 
		f 4 132 133 -131 -118 
		mu 0 4 68 76 75 67 
		f 4 134 135 -133 -120 
		mu 0 4 69 77 76 68 
		f 4 136 137 -135 -122 
		mu 0 4 70 78 77 69 
		f 4 -128 138 -137 -124 
		mu 0 4 71 73 78 70 
		f 3 139 140 141 
		mu 0 3 25 79 80 
		f 4 142 143 144 -130 
		mu 0 4 74 81 26 65 
		f 3 -145 -44 -112 
		mu 0 3 65 26 2 
		f 4 145 146 -143 -132 
		mu 0 4 75 82 81 74 
		f 4 147 148 -146 -134 
		mu 0 4 76 83 82 75 
		f 4 149 150 -148 -136 
		mu 0 4 77 84 83 76 
		f 4 151 152 -150 -138 
		mu 0 4 78 85 84 77 
		f 4 153 154 -152 -139 
		mu 0 4 73 86 85 78 
		f 3 155 156 -127 
		mu 0 3 72 87 73 
		f 3 -144 157 -58 
		mu 0 3 26 81 34 
		f 3 158 -140 -60 
		mu 0 3 35 79 25 
		f 4 159 -61 -158 -147 
		mu 0 4 82 36 34 81 
		f 4 160 161 -160 -149 
		mu 0 4 83 80 36 82 
		f 4 162 -142 -161 -151 
		mu 0 4 84 25 80 83 
		f 4 163 -66 -163 -153 
		mu 0 4 85 37 25 84 
		f 4 164 -68 -164 -155 
		mu 0 4 86 38 37 85 
		f 4 165 -70 -165 166 
		mu 0 4 87 39 38 86 
		f 3 -74 167 168 
		mu 0 3 41 40 80 
		f 3 -157 -167 -154 
		mu 0 3 73 87 86 
		f 4 -156 -125 -76 -166 
		mu 0 4 87 72 16 39 
		f 3 -78 169 170 
		mu 0 3 44 43 88 
		f 3 -170 -80 171 
		mu 0 3 88 43 45 
		f 3 -83 172 173 
		mu 0 3 48 47 89 
		f 3 -173 -85 174 
		mu 0 3 89 47 49 
		f 3 -88 175 176 
		mu 0 3 52 51 90 
		f 3 -176 -90 177 
		mu 0 3 90 51 53 
		f 3 178 179 180 
		mu 0 3 91 92 93 
		f 3 181 -180 182 
		mu 0 3 94 93 92 
		f 3 183 184 -99 
		mu 0 3 60 95 58 
		f 3 185 -184 -101 
		mu 0 3 61 95 60 
		f 3 186 -186 -103 
		mu 0 3 62 95 61 
		f 3 -185 187 -105 
		mu 0 3 58 95 63 
		f 3 -188 188 -107 
		mu 0 3 63 95 64 
		f 3 -189 -187 -108 
		mu 0 3 64 95 62 
		f 3 -141 189 -169 
		mu 0 3 80 79 41 
		f 3 -168 -110 -162 
		mu 0 3 80 40 36 ;
	setAttr ".cd" -type "dataPolyComponent" Index_Data Edge 0 ;
	setAttr ".cvd" -type "dataPolyComponent" Index_Data Vertex 0 ;
createNode lightLinker -n "lightLinker1";
	setAttr -s 4 ".lnk";
	setAttr -s 4 ".slnk";
createNode displayLayerManager -n "layerManager";
createNode displayLayer -n "defaultLayer";
createNode renderLayerManager -n "renderLayerManager";
createNode renderLayer -n "defaultRenderLayer";
	setAttr ".g" yes;
createNode phongE -n "MediumFishA";
createNode shadingEngine -n "MediumFishASG";
	setAttr ".ihi" 0;
	setAttr ".ro" yes;
createNode materialInfo -n "materialInfo2";
createNode file -n "file1";
	setAttr ".ftn" -type "string" "D:/Project/MyProject//sourceimages/Aquarium/PNGs/MediumFishA_DM.jpg";
createNode place2dTexture -n "place2dTexture1";
createNode polyTriangulate -n "polyTriangulate1";
	setAttr ".ics" -type "componentList" 1 "f[*]";
createNode script -n "uiConfigurationScriptNode";
	setAttr ".b" -type "string" (
		"// Maya Mel UI Configuration File.\n//\n//  This script is machine generated.  Edit at your own risk.\n//\n//\n\nglobal string $gMainPane;\nif (`paneLayout -exists $gMainPane`) {\n\n\tglobal int $gUseScenePanelConfig;\n\tint    $useSceneConfig = $gUseScenePanelConfig;\n\tint    $menusOkayInPanels = `optionVar -q allowMenusInPanels`;\tint    $nVisPanes = `paneLayout -q -nvp $gMainPane`;\n\tint    $nPanes = 0;\n\tstring $editorName;\n\tstring $panelName;\n\tstring $itemFilterName;\n\tstring $panelConfig;\n\n\t//\n\t//  get current state of the UI\n\t//\n\tsceneUIReplacement -update $gMainPane;\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"modelPanel\" (localizedPanelLabel(\"Top View\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `modelPanel -unParent -l (localizedPanelLabel(\"Top View\")) -mbv $menusOkayInPanels `;\n\t\t\t$editorName = $panelName;\n            modelEditor -e \n                -camera \"top\" \n                -useInteractiveMode 0\n                -displayLights \"default\" \n                -displayAppearance \"wireframe\" \n"
		+ "                -activeOnly 0\n                -wireframeOnShaded 0\n                -headsUpDisplay 1\n                -selectionHiliteDisplay 1\n                -useDefaultMaterial 0\n                -bufferMode \"double\" \n                -twoSidedLighting 1\n                -backfaceCulling 0\n                -xray 0\n                -jointXray 0\n                -activeComponentsXray 0\n                -displayTextures 0\n                -smoothWireframe 0\n                -lineWidth 1\n                -textureAnisotropic 0\n                -textureHilight 1\n                -textureSampling 2\n                -textureDisplay \"modulate\" \n                -textureMaxSize 8192\n                -fogging 0\n                -fogSource \"fragment\" \n                -fogMode \"linear\" \n                -fogStart 0\n                -fogEnd 100\n                -fogDensity 0.1\n                -fogColor 0.5 0.5 0.5 1 \n                -maxConstantTransparency 1\n                -rendererName \"base_OpenGL_Renderer\" \n                -colorResolution 256 256 \n"
		+ "                -bumpResolution 512 512 \n                -textureCompression 0\n                -transparencyAlgorithm \"frontAndBackCull\" \n                -transpInShadows 0\n                -cullingOverride \"none\" \n                -lowQualityLighting 0\n                -maximumNumHardwareLights 1\n                -occlusionCulling 0\n                -shadingModel 0\n                -useBaseRenderer 0\n                -useReducedRenderer 0\n                -smallObjectCulling 0\n                -smallObjectThreshold -1 \n                -interactiveDisableShadows 0\n                -interactiveBackFaceCull 0\n                -sortTransparent 1\n                -nurbsCurves 1\n                -nurbsSurfaces 1\n                -polymeshes 1\n                -subdivSurfaces 1\n                -planes 1\n                -lights 1\n                -cameras 1\n                -controlVertices 1\n                -hulls 1\n                -grid 1\n                -joints 1\n                -ikHandles 1\n                -deformers 1\n                -dynamics 1\n"
		+ "                -fluids 1\n                -hairSystems 1\n                -follicles 1\n                -nCloths 1\n                -nParticles 1\n                -nRigids 1\n                -dynamicConstraints 1\n                -locators 1\n                -manipulators 1\n                -dimensions 1\n                -handles 1\n                -pivots 1\n                -textures 1\n                -strokes 1\n                -shadows 0\n                $editorName;\nmodelEditor -e -viewSelected 0 $editorName;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tmodelPanel -edit -l (localizedPanelLabel(\"Top View\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        modelEditor -e \n            -camera \"top\" \n            -useInteractiveMode 0\n            -displayLights \"default\" \n            -displayAppearance \"wireframe\" \n            -activeOnly 0\n            -wireframeOnShaded 0\n            -headsUpDisplay 1\n            -selectionHiliteDisplay 1\n            -useDefaultMaterial 0\n            -bufferMode \"double\" \n"
		+ "            -twoSidedLighting 1\n            -backfaceCulling 0\n            -xray 0\n            -jointXray 0\n            -activeComponentsXray 0\n            -displayTextures 0\n            -smoothWireframe 0\n            -lineWidth 1\n            -textureAnisotropic 0\n            -textureHilight 1\n            -textureSampling 2\n            -textureDisplay \"modulate\" \n            -textureMaxSize 8192\n            -fogging 0\n            -fogSource \"fragment\" \n            -fogMode \"linear\" \n            -fogStart 0\n            -fogEnd 100\n            -fogDensity 0.1\n            -fogColor 0.5 0.5 0.5 1 \n            -maxConstantTransparency 1\n            -rendererName \"base_OpenGL_Renderer\" \n            -colorResolution 256 256 \n            -bumpResolution 512 512 \n            -textureCompression 0\n            -transparencyAlgorithm \"frontAndBackCull\" \n            -transpInShadows 0\n            -cullingOverride \"none\" \n            -lowQualityLighting 0\n            -maximumNumHardwareLights 1\n            -occlusionCulling 0\n"
		+ "            -shadingModel 0\n            -useBaseRenderer 0\n            -useReducedRenderer 0\n            -smallObjectCulling 0\n            -smallObjectThreshold -1 \n            -interactiveDisableShadows 0\n            -interactiveBackFaceCull 0\n            -sortTransparent 1\n            -nurbsCurves 1\n            -nurbsSurfaces 1\n            -polymeshes 1\n            -subdivSurfaces 1\n            -planes 1\n            -lights 1\n            -cameras 1\n            -controlVertices 1\n            -hulls 1\n            -grid 1\n            -joints 1\n            -ikHandles 1\n            -deformers 1\n            -dynamics 1\n            -fluids 1\n            -hairSystems 1\n            -follicles 1\n            -nCloths 1\n            -nParticles 1\n            -nRigids 1\n            -dynamicConstraints 1\n            -locators 1\n            -manipulators 1\n            -dimensions 1\n            -handles 1\n            -pivots 1\n            -textures 1\n            -strokes 1\n            -shadows 0\n            $editorName;\nmodelEditor -e -viewSelected 0 $editorName;\n"
		+ "\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"modelPanel\" (localizedPanelLabel(\"Side View\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `modelPanel -unParent -l (localizedPanelLabel(\"Side View\")) -mbv $menusOkayInPanels `;\n\t\t\t$editorName = $panelName;\n            modelEditor -e \n                -camera \"side\" \n                -useInteractiveMode 0\n                -displayLights \"default\" \n                -displayAppearance \"wireframe\" \n                -activeOnly 0\n                -wireframeOnShaded 0\n                -headsUpDisplay 1\n                -selectionHiliteDisplay 1\n                -useDefaultMaterial 0\n                -bufferMode \"double\" \n                -twoSidedLighting 1\n                -backfaceCulling 0\n                -xray 0\n                -jointXray 0\n                -activeComponentsXray 0\n                -displayTextures 0\n                -smoothWireframe 0\n                -lineWidth 1\n                -textureAnisotropic 0\n"
		+ "                -textureHilight 1\n                -textureSampling 2\n                -textureDisplay \"modulate\" \n                -textureMaxSize 8192\n                -fogging 0\n                -fogSource \"fragment\" \n                -fogMode \"linear\" \n                -fogStart 0\n                -fogEnd 100\n                -fogDensity 0.1\n                -fogColor 0.5 0.5 0.5 1 \n                -maxConstantTransparency 1\n                -rendererName \"base_OpenGL_Renderer\" \n                -colorResolution 256 256 \n                -bumpResolution 512 512 \n                -textureCompression 0\n                -transparencyAlgorithm \"frontAndBackCull\" \n                -transpInShadows 0\n                -cullingOverride \"none\" \n                -lowQualityLighting 0\n                -maximumNumHardwareLights 1\n                -occlusionCulling 0\n                -shadingModel 0\n                -useBaseRenderer 0\n                -useReducedRenderer 0\n                -smallObjectCulling 0\n                -smallObjectThreshold -1 \n"
		+ "                -interactiveDisableShadows 0\n                -interactiveBackFaceCull 0\n                -sortTransparent 1\n                -nurbsCurves 1\n                -nurbsSurfaces 1\n                -polymeshes 1\n                -subdivSurfaces 1\n                -planes 1\n                -lights 1\n                -cameras 1\n                -controlVertices 1\n                -hulls 1\n                -grid 1\n                -joints 1\n                -ikHandles 1\n                -deformers 1\n                -dynamics 1\n                -fluids 1\n                -hairSystems 1\n                -follicles 1\n                -nCloths 1\n                -nParticles 1\n                -nRigids 1\n                -dynamicConstraints 1\n                -locators 1\n                -manipulators 1\n                -dimensions 1\n                -handles 1\n                -pivots 1\n                -textures 1\n                -strokes 1\n                -shadows 0\n                $editorName;\nmodelEditor -e -viewSelected 0 $editorName;\n"
		+ "\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tmodelPanel -edit -l (localizedPanelLabel(\"Side View\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        modelEditor -e \n            -camera \"side\" \n            -useInteractiveMode 0\n            -displayLights \"default\" \n            -displayAppearance \"wireframe\" \n            -activeOnly 0\n            -wireframeOnShaded 0\n            -headsUpDisplay 1\n            -selectionHiliteDisplay 1\n            -useDefaultMaterial 0\n            -bufferMode \"double\" \n            -twoSidedLighting 1\n            -backfaceCulling 0\n            -xray 0\n            -jointXray 0\n            -activeComponentsXray 0\n            -displayTextures 0\n            -smoothWireframe 0\n            -lineWidth 1\n            -textureAnisotropic 0\n            -textureHilight 1\n            -textureSampling 2\n            -textureDisplay \"modulate\" \n            -textureMaxSize 8192\n            -fogging 0\n            -fogSource \"fragment\" \n            -fogMode \"linear\" \n"
		+ "            -fogStart 0\n            -fogEnd 100\n            -fogDensity 0.1\n            -fogColor 0.5 0.5 0.5 1 \n            -maxConstantTransparency 1\n            -rendererName \"base_OpenGL_Renderer\" \n            -colorResolution 256 256 \n            -bumpResolution 512 512 \n            -textureCompression 0\n            -transparencyAlgorithm \"frontAndBackCull\" \n            -transpInShadows 0\n            -cullingOverride \"none\" \n            -lowQualityLighting 0\n            -maximumNumHardwareLights 1\n            -occlusionCulling 0\n            -shadingModel 0\n            -useBaseRenderer 0\n            -useReducedRenderer 0\n            -smallObjectCulling 0\n            -smallObjectThreshold -1 \n            -interactiveDisableShadows 0\n            -interactiveBackFaceCull 0\n            -sortTransparent 1\n            -nurbsCurves 1\n            -nurbsSurfaces 1\n            -polymeshes 1\n            -subdivSurfaces 1\n            -planes 1\n            -lights 1\n            -cameras 1\n            -controlVertices 1\n"
		+ "            -hulls 1\n            -grid 1\n            -joints 1\n            -ikHandles 1\n            -deformers 1\n            -dynamics 1\n            -fluids 1\n            -hairSystems 1\n            -follicles 1\n            -nCloths 1\n            -nParticles 1\n            -nRigids 1\n            -dynamicConstraints 1\n            -locators 1\n            -manipulators 1\n            -dimensions 1\n            -handles 1\n            -pivots 1\n            -textures 1\n            -strokes 1\n            -shadows 0\n            $editorName;\nmodelEditor -e -viewSelected 0 $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"modelPanel\" (localizedPanelLabel(\"Front View\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `modelPanel -unParent -l (localizedPanelLabel(\"Front View\")) -mbv $menusOkayInPanels `;\n\t\t\t$editorName = $panelName;\n            modelEditor -e \n                -camera \"front\" \n                -useInteractiveMode 0\n"
		+ "                -displayLights \"default\" \n                -displayAppearance \"wireframe\" \n                -activeOnly 0\n                -wireframeOnShaded 0\n                -headsUpDisplay 1\n                -selectionHiliteDisplay 1\n                -useDefaultMaterial 0\n                -bufferMode \"double\" \n                -twoSidedLighting 1\n                -backfaceCulling 0\n                -xray 0\n                -jointXray 0\n                -activeComponentsXray 0\n                -displayTextures 0\n                -smoothWireframe 0\n                -lineWidth 1\n                -textureAnisotropic 0\n                -textureHilight 1\n                -textureSampling 2\n                -textureDisplay \"modulate\" \n                -textureMaxSize 8192\n                -fogging 0\n                -fogSource \"fragment\" \n                -fogMode \"linear\" \n                -fogStart 0\n                -fogEnd 100\n                -fogDensity 0.1\n                -fogColor 0.5 0.5 0.5 1 \n                -maxConstantTransparency 1\n"
		+ "                -rendererName \"base_OpenGL_Renderer\" \n                -colorResolution 256 256 \n                -bumpResolution 512 512 \n                -textureCompression 0\n                -transparencyAlgorithm \"frontAndBackCull\" \n                -transpInShadows 0\n                -cullingOverride \"none\" \n                -lowQualityLighting 0\n                -maximumNumHardwareLights 1\n                -occlusionCulling 0\n                -shadingModel 0\n                -useBaseRenderer 0\n                -useReducedRenderer 0\n                -smallObjectCulling 0\n                -smallObjectThreshold -1 \n                -interactiveDisableShadows 0\n                -interactiveBackFaceCull 0\n                -sortTransparent 1\n                -nurbsCurves 1\n                -nurbsSurfaces 1\n                -polymeshes 1\n                -subdivSurfaces 1\n                -planes 1\n                -lights 1\n                -cameras 1\n                -controlVertices 1\n                -hulls 1\n                -grid 1\n"
		+ "                -joints 1\n                -ikHandles 1\n                -deformers 1\n                -dynamics 1\n                -fluids 1\n                -hairSystems 1\n                -follicles 1\n                -nCloths 1\n                -nParticles 1\n                -nRigids 1\n                -dynamicConstraints 1\n                -locators 1\n                -manipulators 1\n                -dimensions 1\n                -handles 1\n                -pivots 1\n                -textures 1\n                -strokes 1\n                -shadows 0\n                $editorName;\nmodelEditor -e -viewSelected 0 $editorName;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tmodelPanel -edit -l (localizedPanelLabel(\"Front View\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        modelEditor -e \n            -camera \"front\" \n            -useInteractiveMode 0\n            -displayLights \"default\" \n            -displayAppearance \"wireframe\" \n            -activeOnly 0\n            -wireframeOnShaded 0\n            -headsUpDisplay 1\n"
		+ "            -selectionHiliteDisplay 1\n            -useDefaultMaterial 0\n            -bufferMode \"double\" \n            -twoSidedLighting 1\n            -backfaceCulling 0\n            -xray 0\n            -jointXray 0\n            -activeComponentsXray 0\n            -displayTextures 0\n            -smoothWireframe 0\n            -lineWidth 1\n            -textureAnisotropic 0\n            -textureHilight 1\n            -textureSampling 2\n            -textureDisplay \"modulate\" \n            -textureMaxSize 8192\n            -fogging 0\n            -fogSource \"fragment\" \n            -fogMode \"linear\" \n            -fogStart 0\n            -fogEnd 100\n            -fogDensity 0.1\n            -fogColor 0.5 0.5 0.5 1 \n            -maxConstantTransparency 1\n            -rendererName \"base_OpenGL_Renderer\" \n            -colorResolution 256 256 \n            -bumpResolution 512 512 \n            -textureCompression 0\n            -transparencyAlgorithm \"frontAndBackCull\" \n            -transpInShadows 0\n            -cullingOverride \"none\" \n"
		+ "            -lowQualityLighting 0\n            -maximumNumHardwareLights 1\n            -occlusionCulling 0\n            -shadingModel 0\n            -useBaseRenderer 0\n            -useReducedRenderer 0\n            -smallObjectCulling 0\n            -smallObjectThreshold -1 \n            -interactiveDisableShadows 0\n            -interactiveBackFaceCull 0\n            -sortTransparent 1\n            -nurbsCurves 1\n            -nurbsSurfaces 1\n            -polymeshes 1\n            -subdivSurfaces 1\n            -planes 1\n            -lights 1\n            -cameras 1\n            -controlVertices 1\n            -hulls 1\n            -grid 1\n            -joints 1\n            -ikHandles 1\n            -deformers 1\n            -dynamics 1\n            -fluids 1\n            -hairSystems 1\n            -follicles 1\n            -nCloths 1\n            -nParticles 1\n            -nRigids 1\n            -dynamicConstraints 1\n            -locators 1\n            -manipulators 1\n            -dimensions 1\n            -handles 1\n            -pivots 1\n"
		+ "            -textures 1\n            -strokes 1\n            -shadows 0\n            $editorName;\nmodelEditor -e -viewSelected 0 $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"modelPanel\" (localizedPanelLabel(\"Persp View\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `modelPanel -unParent -l (localizedPanelLabel(\"Persp View\")) -mbv $menusOkayInPanels `;\n\t\t\t$editorName = $panelName;\n            modelEditor -e \n                -camera \"persp\" \n                -useInteractiveMode 0\n                -displayLights \"default\" \n                -displayAppearance \"smoothShaded\" \n                -activeOnly 0\n                -wireframeOnShaded 0\n                -headsUpDisplay 1\n                -selectionHiliteDisplay 1\n                -useDefaultMaterial 0\n                -bufferMode \"double\" \n                -twoSidedLighting 1\n                -backfaceCulling 0\n                -xray 0\n                -jointXray 0\n"
		+ "                -activeComponentsXray 0\n                -displayTextures 1\n                -smoothWireframe 0\n                -lineWidth 1\n                -textureAnisotropic 0\n                -textureHilight 1\n                -textureSampling 2\n                -textureDisplay \"modulate\" \n                -textureMaxSize 8192\n                -fogging 0\n                -fogSource \"fragment\" \n                -fogMode \"linear\" \n                -fogStart 0\n                -fogEnd 100\n                -fogDensity 0.1\n                -fogColor 0.5 0.5 0.5 1 \n                -maxConstantTransparency 1\n                -rendererName \"base_OpenGL_Renderer\" \n                -colorResolution 256 256 \n                -bumpResolution 512 512 \n                -textureCompression 0\n                -transparencyAlgorithm \"frontAndBackCull\" \n                -transpInShadows 0\n                -cullingOverride \"none\" \n                -lowQualityLighting 0\n                -maximumNumHardwareLights 1\n                -occlusionCulling 0\n"
		+ "                -shadingModel 0\n                -useBaseRenderer 0\n                -useReducedRenderer 0\n                -smallObjectCulling 0\n                -smallObjectThreshold -1 \n                -interactiveDisableShadows 0\n                -interactiveBackFaceCull 0\n                -sortTransparent 1\n                -nurbsCurves 1\n                -nurbsSurfaces 1\n                -polymeshes 1\n                -subdivSurfaces 1\n                -planes 1\n                -lights 1\n                -cameras 1\n                -controlVertices 1\n                -hulls 1\n                -grid 0\n                -joints 1\n                -ikHandles 1\n                -deformers 1\n                -dynamics 1\n                -fluids 1\n                -hairSystems 1\n                -follicles 1\n                -nCloths 1\n                -nParticles 1\n                -nRigids 1\n                -dynamicConstraints 1\n                -locators 1\n                -manipulators 1\n                -dimensions 1\n                -handles 1\n"
		+ "                -pivots 1\n                -textures 1\n                -strokes 1\n                -shadows 0\n                $editorName;\nmodelEditor -e -viewSelected 0 $editorName;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tmodelPanel -edit -l (localizedPanelLabel(\"Persp View\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        modelEditor -e \n            -camera \"persp\" \n            -useInteractiveMode 0\n            -displayLights \"default\" \n            -displayAppearance \"smoothShaded\" \n            -activeOnly 0\n            -wireframeOnShaded 0\n            -headsUpDisplay 1\n            -selectionHiliteDisplay 1\n            -useDefaultMaterial 0\n            -bufferMode \"double\" \n            -twoSidedLighting 1\n            -backfaceCulling 0\n            -xray 0\n            -jointXray 0\n            -activeComponentsXray 0\n            -displayTextures 1\n            -smoothWireframe 0\n            -lineWidth 1\n            -textureAnisotropic 0\n            -textureHilight 1\n            -textureSampling 2\n"
		+ "            -textureDisplay \"modulate\" \n            -textureMaxSize 8192\n            -fogging 0\n            -fogSource \"fragment\" \n            -fogMode \"linear\" \n            -fogStart 0\n            -fogEnd 100\n            -fogDensity 0.1\n            -fogColor 0.5 0.5 0.5 1 \n            -maxConstantTransparency 1\n            -rendererName \"base_OpenGL_Renderer\" \n            -colorResolution 256 256 \n            -bumpResolution 512 512 \n            -textureCompression 0\n            -transparencyAlgorithm \"frontAndBackCull\" \n            -transpInShadows 0\n            -cullingOverride \"none\" \n            -lowQualityLighting 0\n            -maximumNumHardwareLights 1\n            -occlusionCulling 0\n            -shadingModel 0\n            -useBaseRenderer 0\n            -useReducedRenderer 0\n            -smallObjectCulling 0\n            -smallObjectThreshold -1 \n            -interactiveDisableShadows 0\n            -interactiveBackFaceCull 0\n            -sortTransparent 1\n            -nurbsCurves 1\n            -nurbsSurfaces 1\n"
		+ "            -polymeshes 1\n            -subdivSurfaces 1\n            -planes 1\n            -lights 1\n            -cameras 1\n            -controlVertices 1\n            -hulls 1\n            -grid 0\n            -joints 1\n            -ikHandles 1\n            -deformers 1\n            -dynamics 1\n            -fluids 1\n            -hairSystems 1\n            -follicles 1\n            -nCloths 1\n            -nParticles 1\n            -nRigids 1\n            -dynamicConstraints 1\n            -locators 1\n            -manipulators 1\n            -dimensions 1\n            -handles 1\n            -pivots 1\n            -textures 1\n            -strokes 1\n            -shadows 0\n            $editorName;\nmodelEditor -e -viewSelected 0 $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n\t\t}\n\t}\n\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"outlinerPanel\" (localizedPanelLabel(\"Outliner\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `outlinerPanel -unParent -l (localizedPanelLabel(\"Outliner\")) -mbv $menusOkayInPanels `;\n"
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
		+ "                -lineWidth 1\n                -textureAnisotropic 0\n                -textureHilight 1\n                -textureSampling 2\n                -textureDisplay \"modulate\" \n                -textureMaxSize 8192\n                -fogging 0\n                -fogSource \"fragment\" \n                -fogMode \"linear\" \n                -fogStart 0\n                -fogEnd 100\n                -fogDensity 0.1\n                -fogColor 0.5 0.5 0.5 1 \n                -maxConstantTransparency 1\n                -colorResolution 4 4 \n                -bumpResolution 4 4 \n                -textureCompression 0\n                -transparencyAlgorithm \"frontAndBackCull\" \n                -transpInShadows 0\n                -cullingOverride \"none\" \n                -lowQualityLighting 0\n                -maximumNumHardwareLights 0\n                -occlusionCulling 0\n                -shadingModel 0\n                -useBaseRenderer 0\n                -useReducedRenderer 0\n                -smallObjectCulling 0\n                -smallObjectThreshold -1 \n"
		+ "                -interactiveDisableShadows 0\n                -interactiveBackFaceCull 0\n                -sortTransparent 1\n                -nurbsCurves 1\n                -nurbsSurfaces 1\n                -polymeshes 1\n                -subdivSurfaces 1\n                -planes 1\n                -lights 1\n                -cameras 1\n                -controlVertices 1\n                -hulls 1\n                -grid 1\n                -joints 1\n                -ikHandles 1\n                -deformers 1\n                -dynamics 1\n                -fluids 1\n                -hairSystems 1\n                -follicles 1\n                -nCloths 1\n                -nParticles 1\n                -nRigids 1\n                -dynamicConstraints 1\n                -locators 1\n                -manipulators 1\n                -dimensions 1\n                -handles 1\n                -pivots 1\n                -textures 1\n                -strokes 1\n                -shadows 0\n                -displayMode \"centerEye\" \n                -viewColor 0 0 0 1 \n"
		+ "                $editorName;\nstereoCameraView -e -viewSelected 0 $editorName;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tscriptedPanel -edit -l (localizedPanelLabel(\"Stereo\")) -mbv $menusOkayInPanels  $panelName;\nstring $editorName = ($panelName+\"Editor\");\n            stereoCameraView -e \n                -camera \"persp\" \n                -useInteractiveMode 0\n                -displayLights \"default\" \n                -displayAppearance \"wireframe\" \n                -activeOnly 0\n                -wireframeOnShaded 0\n                -headsUpDisplay 1\n                -selectionHiliteDisplay 1\n                -useDefaultMaterial 0\n                -bufferMode \"double\" \n                -twoSidedLighting 1\n                -backfaceCulling 0\n                -xray 0\n                -jointXray 0\n                -activeComponentsXray 0\n                -displayTextures 0\n                -smoothWireframe 0\n                -lineWidth 1\n                -textureAnisotropic 0\n                -textureHilight 1\n                -textureSampling 2\n"
		+ "                -textureDisplay \"modulate\" \n                -textureMaxSize 8192\n                -fogging 0\n                -fogSource \"fragment\" \n                -fogMode \"linear\" \n                -fogStart 0\n                -fogEnd 100\n                -fogDensity 0.1\n                -fogColor 0.5 0.5 0.5 1 \n                -maxConstantTransparency 1\n                -colorResolution 4 4 \n                -bumpResolution 4 4 \n                -textureCompression 0\n                -transparencyAlgorithm \"frontAndBackCull\" \n                -transpInShadows 0\n                -cullingOverride \"none\" \n                -lowQualityLighting 0\n                -maximumNumHardwareLights 0\n                -occlusionCulling 0\n                -shadingModel 0\n                -useBaseRenderer 0\n                -useReducedRenderer 0\n                -smallObjectCulling 0\n                -smallObjectThreshold -1 \n                -interactiveDisableShadows 0\n                -interactiveBackFaceCull 0\n                -sortTransparent 1\n"
		+ "                -nurbsCurves 1\n                -nurbsSurfaces 1\n                -polymeshes 1\n                -subdivSurfaces 1\n                -planes 1\n                -lights 1\n                -cameras 1\n                -controlVertices 1\n                -hulls 1\n                -grid 1\n                -joints 1\n                -ikHandles 1\n                -deformers 1\n                -dynamics 1\n                -fluids 1\n                -hairSystems 1\n                -follicles 1\n                -nCloths 1\n                -nParticles 1\n                -nRigids 1\n                -dynamicConstraints 1\n                -locators 1\n                -manipulators 1\n                -dimensions 1\n                -handles 1\n                -pivots 1\n                -textures 1\n                -strokes 1\n                -shadows 0\n                -displayMode \"centerEye\" \n                -viewColor 0 0 0 1 \n                $editorName;\nstereoCameraView -e -viewSelected 0 $editorName;\n\t\tif (!$useSceneConfig) {\n\t\t\tpanel -e -l $label $panelName;\n"
		+ "\t\t}\n\t}\n\n\n\tif ($useSceneConfig) {\n        string $configName = `getPanel -cwl (localizedPanelLabel(\"Current Layout\"))`;\n        if (\"\" != $configName) {\n\t\t\tpanelConfiguration -edit -label (localizedPanelLabel(\"Current Layout\")) \n\t\t\t\t-defaultImage \"\"\n\t\t\t\t-image \"\"\n\t\t\t\t-sc false\n\t\t\t\t-configString \"global string $gMainPane; paneLayout -e -cn \\\"single\\\" -ps 1 100 100 $gMainPane;\"\n\t\t\t\t-removeAllPanels\n\t\t\t\t-ap true\n\t\t\t\t\t(localizedPanelLabel(\"Persp View\")) \n\t\t\t\t\t\"modelPanel\"\n"
		+ "\t\t\t\t\t\"$panelName = `modelPanel -unParent -l (localizedPanelLabel(\\\"Persp View\\\")) -mbv $menusOkayInPanels `;\\n$editorName = $panelName;\\nmodelEditor -e \\n    -cam `findStartUpCamera persp` \\n    -useInteractiveMode 0\\n    -displayLights \\\"default\\\" \\n    -displayAppearance \\\"smoothShaded\\\" \\n    -activeOnly 0\\n    -wireframeOnShaded 0\\n    -headsUpDisplay 1\\n    -selectionHiliteDisplay 1\\n    -useDefaultMaterial 0\\n    -bufferMode \\\"double\\\" \\n    -twoSidedLighting 1\\n    -backfaceCulling 0\\n    -xray 0\\n    -jointXray 0\\n    -activeComponentsXray 0\\n    -displayTextures 1\\n    -smoothWireframe 0\\n    -lineWidth 1\\n    -textureAnisotropic 0\\n    -textureHilight 1\\n    -textureSampling 2\\n    -textureDisplay \\\"modulate\\\" \\n    -textureMaxSize 8192\\n    -fogging 0\\n    -fogSource \\\"fragment\\\" \\n    -fogMode \\\"linear\\\" \\n    -fogStart 0\\n    -fogEnd 100\\n    -fogDensity 0.1\\n    -fogColor 0.5 0.5 0.5 1 \\n    -maxConstantTransparency 1\\n    -rendererName \\\"base_OpenGL_Renderer\\\" \\n    -colorResolution 256 256 \\n    -bumpResolution 512 512 \\n    -textureCompression 0\\n    -transparencyAlgorithm \\\"frontAndBackCull\\\" \\n    -transpInShadows 0\\n    -cullingOverride \\\"none\\\" \\n    -lowQualityLighting 0\\n    -maximumNumHardwareLights 1\\n    -occlusionCulling 0\\n    -shadingModel 0\\n    -useBaseRenderer 0\\n    -useReducedRenderer 0\\n    -smallObjectCulling 0\\n    -smallObjectThreshold -1 \\n    -interactiveDisableShadows 0\\n    -interactiveBackFaceCull 0\\n    -sortTransparent 1\\n    -nurbsCurves 1\\n    -nurbsSurfaces 1\\n    -polymeshes 1\\n    -subdivSurfaces 1\\n    -planes 1\\n    -lights 1\\n    -cameras 1\\n    -controlVertices 1\\n    -hulls 1\\n    -grid 0\\n    -joints 1\\n    -ikHandles 1\\n    -deformers 1\\n    -dynamics 1\\n    -fluids 1\\n    -hairSystems 1\\n    -follicles 1\\n    -nCloths 1\\n    -nParticles 1\\n    -nRigids 1\\n    -dynamicConstraints 1\\n    -locators 1\\n    -manipulators 1\\n    -dimensions 1\\n    -handles 1\\n    -pivots 1\\n    -textures 1\\n    -strokes 1\\n    -shadows 0\\n    $editorName;\\nmodelEditor -e -viewSelected 0 $editorName\"\n"
		+ "\t\t\t\t\t\"modelPanel -edit -l (localizedPanelLabel(\\\"Persp View\\\")) -mbv $menusOkayInPanels  $panelName;\\n$editorName = $panelName;\\nmodelEditor -e \\n    -cam `findStartUpCamera persp` \\n    -useInteractiveMode 0\\n    -displayLights \\\"default\\\" \\n    -displayAppearance \\\"smoothShaded\\\" \\n    -activeOnly 0\\n    -wireframeOnShaded 0\\n    -headsUpDisplay 1\\n    -selectionHiliteDisplay 1\\n    -useDefaultMaterial 0\\n    -bufferMode \\\"double\\\" \\n    -twoSidedLighting 1\\n    -backfaceCulling 0\\n    -xray 0\\n    -jointXray 0\\n    -activeComponentsXray 0\\n    -displayTextures 1\\n    -smoothWireframe 0\\n    -lineWidth 1\\n    -textureAnisotropic 0\\n    -textureHilight 1\\n    -textureSampling 2\\n    -textureDisplay \\\"modulate\\\" \\n    -textureMaxSize 8192\\n    -fogging 0\\n    -fogSource \\\"fragment\\\" \\n    -fogMode \\\"linear\\\" \\n    -fogStart 0\\n    -fogEnd 100\\n    -fogDensity 0.1\\n    -fogColor 0.5 0.5 0.5 1 \\n    -maxConstantTransparency 1\\n    -rendererName \\\"base_OpenGL_Renderer\\\" \\n    -colorResolution 256 256 \\n    -bumpResolution 512 512 \\n    -textureCompression 0\\n    -transparencyAlgorithm \\\"frontAndBackCull\\\" \\n    -transpInShadows 0\\n    -cullingOverride \\\"none\\\" \\n    -lowQualityLighting 0\\n    -maximumNumHardwareLights 1\\n    -occlusionCulling 0\\n    -shadingModel 0\\n    -useBaseRenderer 0\\n    -useReducedRenderer 0\\n    -smallObjectCulling 0\\n    -smallObjectThreshold -1 \\n    -interactiveDisableShadows 0\\n    -interactiveBackFaceCull 0\\n    -sortTransparent 1\\n    -nurbsCurves 1\\n    -nurbsSurfaces 1\\n    -polymeshes 1\\n    -subdivSurfaces 1\\n    -planes 1\\n    -lights 1\\n    -cameras 1\\n    -controlVertices 1\\n    -hulls 1\\n    -grid 0\\n    -joints 1\\n    -ikHandles 1\\n    -deformers 1\\n    -dynamics 1\\n    -fluids 1\\n    -hairSystems 1\\n    -follicles 1\\n    -nCloths 1\\n    -nParticles 1\\n    -nRigids 1\\n    -dynamicConstraints 1\\n    -locators 1\\n    -manipulators 1\\n    -dimensions 1\\n    -handles 1\\n    -pivots 1\\n    -textures 1\\n    -strokes 1\\n    -shadows 0\\n    $editorName;\\nmodelEditor -e -viewSelected 0 $editorName\"\n"
		+ "\t\t\t\t$configName;\n\n            setNamedPanelLayout (localizedPanelLabel(\"Current Layout\"));\n        }\n\n        panelHistory -e -clear mainPanelHistory;\n        setFocus `paneLayout -q -p1 $gMainPane`;\n        sceneUIReplacement -deleteRemaining;\n        sceneUIReplacement -clear;\n\t}\n\n\ngrid -spacing 5 -size 24 -divisions 5 -displayAxes yes -displayGridLines yes -displayDivisionLines yes -displayPerspectiveLabels no -displayOrthographicLabels no -displayAxesBold yes -perspectiveLabelPosition edge -orthographicLabelPosition edge;\nviewManip -drawCompass 0 -compassAngle 0 -frontParameters \"\" -homeParameters \"\" -selectionLockParameters \"\";\n}\n");
	setAttr ".st" 3;
createNode script -n "sceneConfigurationScriptNode";
	setAttr ".b" -type "string" "playbackOptions -min 1 -max 24 -ast 1 -aet 48 ";
	setAttr ".st" 6;
createNode unknown -n "__shaderListNode";
	addAttr -ci true -sn "slt" -ln "shaderlist" -dt "stringArray";
	addAttr -ci true -sn "hsh" -ln "shaderhashes" -dt "stringArray";
	setAttr ".slt" -type "stringArray" 1 "default"  ;
	setAttr ".hsh" -type "stringArray" 1 "0"  ;
select -ne :time1;
	setAttr ".o" 1;
select -ne :renderPartition;
	setAttr -s 3 ".st";
select -ne :renderGlobalsList1;
select -ne :defaultShaderList1;
	setAttr -s 3 ".s";
select -ne :postProcessList1;
	setAttr -s 2 ".p";
select -ne :defaultRenderUtilityList1;
select -ne :lightList1;
select -ne :defaultTextureList1;
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
connectAttr "polyTriangulate1.out" "MediumFishA_001Shape.i";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[0].llnk";
connectAttr ":initialShadingGroup.msg" "lightLinker1.lnk[0].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[1].llnk";
connectAttr ":initialParticleSE.msg" "lightLinker1.lnk[1].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[3].llnk";
connectAttr "MediumFishASG.msg" "lightLinker1.lnk[3].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[0].sllk";
connectAttr ":initialShadingGroup.msg" "lightLinker1.slnk[0].solk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[1].sllk";
connectAttr ":initialParticleSE.msg" "lightLinker1.slnk[1].solk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[3].sllk";
connectAttr "MediumFishASG.msg" "lightLinker1.slnk[3].solk";
connectAttr "layerManager.dli[0]" "defaultLayer.id";
connectAttr "renderLayerManager.rlmi[0]" "defaultRenderLayer.rlid";
connectAttr "file1.oc" "MediumFishA.c";
connectAttr "MediumFishA.oc" "MediumFishASG.ss";
connectAttr "MediumFishA_001Shape.iog" "MediumFishASG.dsm" -na;
connectAttr "MediumFishASG.msg" "materialInfo2.sg";
connectAttr "MediumFishA.msg" "materialInfo2.m";
connectAttr "file1.msg" "materialInfo2.t" -na;
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
connectAttr "polySurfaceShape1.o" "polyTriangulate1.ip";
connectAttr "MediumFishASG.pa" ":renderPartition.st" -na;
connectAttr "MediumFishA.msg" ":defaultShaderList1.s" -na;
connectAttr "place2dTexture1.msg" ":defaultRenderUtilityList1.u" -na;
connectAttr "lightLinker1.msg" ":lightList1.ln" -na;
connectAttr "file1.msg" ":defaultTextureList1.tx" -na;
// End of MediumFishA.ma
