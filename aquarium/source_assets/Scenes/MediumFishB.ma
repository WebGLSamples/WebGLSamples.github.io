//Maya ASCII 2010 scene
//Name: MediumFishB.ma
//Last modified: Sun, Aug 29, 2010 10:28:27 PM
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
	setAttr ".t" -type "double3" 3.1900904703753481 1.7170929978461982 -3.5343386954312748 ;
	setAttr ".r" -type "double3" -20.276862662266414 130.99999999999667 0 ;
createNode camera -s -n "perspShape" -p "persp";
	setAttr -k off ".v" no;
	setAttr ".fl" 34.999999999999986;
	setAttr ".coi" 5.2036131105108678;
	setAttr ".imn" -type "string" "persp";
	setAttr ".den" -type "string" "persp_depth";
	setAttr ".man" -type "string" "persp_mask";
	setAttr ".tp" -type "double3" 0 0.00095152854919433594 0.031914591789245605 ;
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
createNode transform -n "MediumFishB_001";
createNode mesh -n "MediumFishB_001Shape" -p "MediumFishB_001";
	setAttr -k off ".v";
	setAttr ".uvst[0].uvsn" -type "string" "map1";
	setAttr -s 77 ".uvst[0].uvsp[0:76]" -type "float2" 0.026523 0.86930001 
		0.061941002 0.76940501 0.26692101 0.93168002 0.12842999 0.74595797 0.350779 0.249304 
		0.30199999 0.249337 0.399517 0.20036601 0.39328799 0.0014900001 0.553698 0.277096 
		0.65688503 0.36530501 0.58025903 0.41640601 0.69244701 0.49990201 0.69548899 0.61829698 
		0.39583701 0.39712399 0.277684 0.40779901 0.399517 0.24456801 0.97880101 0.79411602 
		0.94921398 0.78429902 0.90618402 0.63111597 0.78824002 0.483134 0.85427701 0.47962499 
		0.77409399 0.57916898 0.50769401 0.39345199 0.561373 0.72997302 0.50955701 0.77221102 
		0.78866398 0.40744701 0.93701798 0.221522 0.91156501 0.386639 0.83976102 0.341878 
		0.69045001 0.40018699 0.138647 0.31920701 0.27631101 0.26175699 0.149523 0.41338199 
		0.406683 0.82481498 0.95826298 0.50470501 0.27589899 0.81303698 0.138734 0.67962199 
		0.30199999 0.249337 0.49315199 0.255088 0.97549701 0.208915 0.062153999 0.43992001 
		0.028215 0.514108 0.59850502 0.20706201 0.74512702 0.216766 0.82792097 0.62558001 
		0.049435999 0.38804001 0.0059270002 0.444269 0.59698403 0.69883502 0.711007 0.37515801 
		0.75660503 0.69565099 0.61348999 0.829862 0.56214601 0.83416301 0.51187801 0.89376599 
		0.403588 0.998465 0.31303301 0.91249102 0.399517 0.20036601 0.39328799 0.0014900001 
		0.58025903 0.41640601 0.65688503 0.36530501 0.69244701 0.49990201 0.277684 0.40779901 
		0.39583701 0.39712399 0.90618402 0.63111597 0.85427701 0.47962499 0.78824002 0.483134 
		0.50955701 0.77221102 0.561373 0.72997302 0.50769401 0.39345199 0.91156501 0.386639 
		0.149523 0.41338199 0.406683 0.82481498 0.062153999 0.43992001 0.59698403 0.69883502 
		0.26692101 0.93168002 0.061941002 0.76940501 0.026523 0.86930001 0.12842999 0.74595797;
	setAttr ".cuvs" -type "string" "map1";
	setAttr ".dcc" -type "string" "Ambient+Diffuse";
	setAttr -s 77 ".vt[0:76]"  0.31450301 -0.103465 0.93484801 0.24712101 
		-0.31973901 0.78148699 0.67651099 0.021367 -0.26438901 0.31899601 -0.370502 0.493586 
		0 -0.54340899 0.658988 0 0.896761 0.82616001 0.11943 -0.64968199 0.44312799 0.30546799 
		-1.081558 0.470716 0 -0.60373902 -1.937436 0 -0.27010599 -0.93644202 0.18337899 -0.12946901 
		1.937291 0.037349999 0.28573 -1.800872 0.044287998 0.50040501 -0.27372199 0.036307 
		0.432787 -0.43144199 0 1.083461 0.42509601 0 0.85609698 -0.054510999 0 0.72666401 
		-0.27714801 0 0.71732402 -0.504547 0 0.42587301 -1.1383981 0.057110999 -0.043246001 
		-1.57098 -0.036307 0.432787 -0.43144199 0 0.257893 -0.86771703 0.16064399 0.00078599999 
		-0.85424203 0 0.273707 -1.454249 0 -0.120025 2.1863191 0.039416 -0.291502 -0.69673997 
		0 0.618379 -1.991452 0 -0.215754 -0.84539801 0 0.172922 -1.215854 0 0.63969803 -2.1224899 
		0.048199002 0.59212899 -0.044232 0.261594 -0.230379 -0.035983 0 -0.24213199 1.99362 
		0 -0.63111597 -2.1078589 0.31023201 -0.222404 0.45942599 0.096042998 -0.035626002 
		-1.278505 0 -0.19998799 -1.280385 0.033137001 -0.24517401 -1.824706 0 -0.61406702 
		-1.087562 0.232674 -0.18053199 -0.35736701 0 -0.63514203 -0.438178 0 0.031637002 
		2.0876069 0.28131199 -0.199222 0.98272097 -0.18337899 -0.12946901 1.937291 0 0.011216 
		-2.0315289 0 -0.34237599 -1.506688 0.232674 -0.18709999 1.550337 0 -0.53084898 0.028424 
		0 -0.543338 0.87502497 0 0.39106399 1.59812 0 0.68078703 0.99062502 -0.056258999 
		0.70636302 0.41139099 0.056258999 0.70636302 0.41139099 -0.232674 -0.18709999 1.550337 
		0 -0.516366 0.988801 0 -0.39160901 1.598506 0 -0.543338 0.87502497 -0.11943 -0.64968199 
		0.44312799 -0.30546799 -1.081558 0.470716 0 -0.483055 -0.239731 -0.039416 -0.291502 
		-0.69673997 -0.232674 -0.18053199 -0.35736701 -0.16064399 0.00078599999 -0.85424203 
		-0.033137001 -0.24517401 -1.824706 -0.31023201 -0.222404 0.45942599 -0.28131199 -0.199222 
		0.98272097 0 -0.553693 0.44312799 -0.048199002 0.59212899 -0.044232 -0.044287998 
		0.50040501 -0.27372199 -0.037349999 0.28573 -1.800872 -0.096042998 -0.035626002 -1.278505 
		-0.057110999 -0.043246001 -1.57098 -0.261594 -0.230379 -0.035983 -0.31450301 -0.103465 
		0.93484801 -0.24712101 -0.31973901 0.78148699 -0.67651099 0.021367 -0.26438901 -0.31899601 
		-0.370502 0.493586;
	setAttr -s 191 ".ed";
	setAttr ".ed[0:165]"  0 1 0 1 2 0 2 0 
		0 3 2 0 1 3 0 4 56 0 56 6 
		0 6 4 0 7 6 0 56 7 0 59 25 
		0 25 39 0 39 59 0 22 21 0 21 39 
		0 39 22 0 34 42 0 42 66 0 66 34 
		0 29 26 0 26 11 0 11 29 0 35 19 
		0 19 28 0 28 35 0 31 12 0 12 30 
		0 30 31 0 35 36 0 36 19 0 8 37 
		0 37 45 0 45 8 0 25 27 0 27 22 
		0 22 25 0 30 34 0 34 31 0 55 54 
		0 54 46 0 46 55 0 34 52 0 52 42 
		0 44 29 0 11 44 0 46 50 0 50 49 
		0 49 46 0 48 42 0 42 54 0 54 48 
		0 34 47 0 47 31 0 39 31 0 31 59 
		0 8 33 0 33 37 0 28 22 0 22 35 
		0 10 49 0 49 41 0 41 10 0 40 38 
		0 38 25 0 25 40 0 23 28 0 19 23 
		0 32 55 0 55 10 0 10 32 0 36 45 
		0 45 19 0 47 59 0 26 23 0 23 11 
		0 19 11 0 41 24 0 24 10 0 24 32 
		0 13 12 0 12 39 0 39 13 0 33 44 
		0 44 37 0 66 47 0 37 19 0 30 52 
		0 59 40 0 22 36 0 9 25 0 38 9 
		0 19 44 0 28 21 0 27 36 0 10 46 
		0 42 50 0 46 42 0 52 50 0 48 66 
		0 21 13 0 21 18 0 18 17 0 17 13 
		0 17 16 0 16 12 0 16 15 0 15 30 
		0 15 14 0 14 52 0 14 5 0 5 50 
		0 57 56 0 4 57 0 57 58 0 58 56 
		0 61 60 0 60 59 0 59 61 0 61 21 
		0 21 62 0 62 61 0 66 65 0 65 64 
		0 64 66 0 69 26 0 29 69 0 28 71 
		0 71 70 0 70 28 0 67 68 0 68 72 
		0 72 67 0 71 36 0 36 70 0 45 63 
		0 63 8 0 62 27 0 27 60 0 60 62 
		0 64 67 0 72 64 0 53 54 0 55 53 
		0 65 51 0 51 64 0 44 69 0 50 53 
		0 53 49 0 54 65 0 65 48 0 47 64 
		0 72 47 0 59 72 0 72 61 0 63 33 
		0 62 28 0 70 62 0 49 43 0 43 41 
		0 60 38 0 40 60 0 23 71 0 43 55 
		0 32 43 0 71 45 0 69 23 0;
	setAttr ".ed[166:190]" 69 71 0 43 24 0 61 68 
		0 68 20 0 20 61 0 63 44 0 71 63 
		0 51 67 0 36 62 0 60 9 0 44 71 
		0 53 43 0 50 65 0 65 53 0 50 51 
		0 20 21 0 20 17 0 68 16 0 67 15 
		0 51 14 0 75 74 0 74 73 0 73 75 
		0 75 76 0 76 74 0;
	setAttr -s 364 ".n";
	setAttr ".n[0:165]" -type "float3"  0.87619799 -0.428886 0.21985 0.89789897 
		-0.361904 0.25060499 0.89789897 -0.361904 0.25060499 0.91429901 -0.292786 0.279881 
		0.89789897 -0.361904 0.25060499 0.89789897 -0.361904 0.25060499 0.66451001 0.74727899 
		-0.00024600001 0.804923 0.588265 0.077734999 0.804923 0.588265 0.077734999 0.90421897 
		0.39920199 0.15174501 0.804923 0.588265 0.077734999 0.804923 0.588265 0.077734999 
		0.84059298 -0.52946502 -0.114324 0.92782903 -0.32065001 -0.190569 0.98381197 -0.069415003 
		-0.165213 0.976493 -0.107348 -0.186919 0.93266302 0.352561 -0.076428004 0.98381197 
		-0.069415003 -0.165213 0.97043103 -0.239226 -0.032168999 0.953659 -0.28767899 0.088175997 
		0.74389702 -0.66810203 0.016055999 0.99692702 0.051821001 -0.058742002 0.98672003 
		0.148498 0.065816 0.99697101 0.077666 -0.004222 0.98977703 -0.02902 -0.13963901 0.99972099 
		-0.013452 -0.019392001 0.91177797 0.40015799 -0.092378996 0.96710902 -0.22704899 
		-0.114671 0.96920598 0.226978 -0.095500998 0.97112501 0.220011 -0.092262 0.98977703 
		-0.02902 -0.13963901 0.89282399 -0.44957799 -0.027302001 0.99972099 -0.013452 -0.019392001 
		0.993572 -0.10507 0.042137999 0.99734998 -0.068253003 -0.025192 0.98564798 -0.15191901 
		0.073615998 0.92782903 -0.32065001 -0.190569 0.77310401 -0.58368099 -0.248248 0.976493 
		-0.107348 -0.186919 0.96710902 -0.22704899 -0.114671 0.97112501 0.220011 -0.092262 
		0.97043103 -0.239226 -0.032168999 0.63687199 -0.74132198 0.211743 0.72031301 -0.68182498 
		0.127526 0.96632802 -0.213338 0.143867 0.97043103 -0.239226 -0.032168999 0.97500402 
		0.221613 0.01595 0.953659 -0.28767899 0.088175997 0.99148399 -1.6e-005 -0.130225 
		0.99692702 0.051821001 -0.058742002 0.99697101 0.077666 -0.004222 0.96632802 -0.213338 
		0.143867 0.95665199 0.27027801 0.108477 0.88359499 0.41984001 0.20735 0.758138 -0.64648402 
		0.085349001 0.953659 -0.28767899 0.088175997 0.72031301 -0.68182498 0.127526 0.96710902 
		-0.22704899 -0.114671 0.97043103 -0.239226 -0.032168999 0.73796999 -0.67087197 -0.073016003 
		0.98381197 -0.069415003 -0.165213 0.96710902 -0.22704899 -0.114671 0.84059298 -0.52946502 
		-0.114324 0.993572 -0.10507 0.042137999 0.99728 -0.040399998 -0.061645001 0.99734998 
		-0.068253003 -0.025192 0.98977703 -0.02902 -0.13963901 0.91177797 0.40015799 -0.092378996 
		0.976493 -0.107348 -0.186919 0.83965701 0.42471001 0.33852199 0.88359499 0.41984001 
		0.20735 0.76798499 0.439367 0.46599999 0.99517202 -0.094671004 0.025884001 0.996463 
		-0.024307 -0.080434002 0.92782903 -0.32065001 -0.190569 0.98330301 0.154726 0.095788002 
		0.91177797 0.40015799 -0.092378996 0.99972099 -0.013452 -0.019392001 0.56618202 -0.73741001 
		0.36832699 0.63687199 -0.74132198 0.211743 0.60372001 -0.734061 0.31092799 0.99972099 
		-0.013452 -0.019392001 0.89282399 -0.44957799 -0.027302001 0.98564798 -0.15191901 
		0.073615998 0.84059298 -0.52946502 -0.114324 0.96710902 -0.22704899 -0.114671 0.73796999 
		-0.67087197 -0.073016003 0.98672003 0.148498 0.065816 0.98330301 0.154726 0.095788002 
		0.99697101 0.077666 -0.004222 0.99972099 -0.013452 -0.019392001 0.99697101 0.077666 
		-0.004222 0.98330301 0.154726 0.095788002 0.83965701 0.42471001 0.33852199 0.76798499 
		0.439367 0.46599999 0.75914103 0.35508099 0.54554802 0.56421 -0.69740498 0.44192001 
		0.56618202 -0.73741001 0.36832699 0.60372001 -0.734061 0.31092799 0.97513902 0.188823 
		-0.115975 0.96920598 0.226978 -0.095500998 0.98381197 -0.069415003 -0.165213 0.99728 
		-0.040399998 -0.061645001 0.99148399 -1.6e-005 -0.130225 0.99734998 -0.068253003 
		-0.025192 0.74389702 -0.66810203 0.016055999 0.73796999 -0.67087197 -0.073016003 
		0.97043103 -0.239226 -0.032168999 0.98564798 -0.15191901 0.073615998 0.99734998 -0.068253003 
		-0.025192 0.99972099 -0.013452 -0.019392001 0.97500402 0.221613 0.01595 0.97043103 
		-0.239226 -0.032168999 0.97112501 0.220011 -0.092262 0.99517202 -0.094671004 0.025884001 
		0.92782903 -0.32065001 -0.190569 0.84059298 -0.52946502 -0.114324 0.98381197 -0.069415003 
		-0.165213 0.96920598 0.226978 -0.095500998 0.96710902 -0.22704899 -0.114671 0.98977703 
		-0.02902 -0.13963901 0.976493 -0.107348 -0.186919 0.89282399 -0.44957799 -0.027302001 
		0.98539197 0.068503 -0.155918 0.92782903 -0.32065001 -0.190569 0.996463 -0.024307 
		-0.080434002 0.99148399 -1.6e-005 -0.130225 0.99697101 0.077666 -0.004222 0.99972099 
		-0.013452 -0.019392001 0.93266302 0.352561 -0.076428004 0.976493 -0.107348 -0.186919 
		0.91177797 0.40015799 -0.092378996 0.976493 -0.107348 -0.186919 0.98381197 -0.069415003 
		-0.165213 0.92782903 -0.32065001 -0.190569 0.99148399 -1.6e-005 -0.130225 0.99972099 
		-0.013452 -0.019392001 0.99734998 -0.068253003 -0.025192 0.89282399 -0.44957799 -0.027302001 
		0.976493 -0.107348 -0.186919 0.77310401 -0.58368099 -0.248248 0.96632802 -0.213338 
		0.143867 0.88359499 0.41984001 0.20735 0.83965701 0.42471001 0.33852199 0.96632802 
		-0.213338 0.143867 0.60372001 -0.734061 0.31092799 0.63687199 -0.74132198 0.211743 
		0.953659 -0.28767899 0.088175997 0.95665199 0.27027801 0.108477 0.96632802 -0.213338 
		0.143867 0.953659 -0.28767899 0.088175997 0.96632802 -0.213338 0.143867 0.72031301 
		-0.68182498 0.127526 0.95665199 0.27027801 0.108477 0.953659 -0.28767899 0.088175997 
		0.97500402 0.221613 0.01595 0.74389702 -0.66810203 0.016055999 0.953659 -0.28767899 
		0.088175997 0.758138 -0.64648402 0.085349001 0.97513902 0.188823 -0.115975 0.98381197 
		-0.069415003 -0.165213 0.93266302 0.352561 -0.076428004 0.97513902 0.188823 -0.115975 
		0.93266302 0.352561 -0.076428004 0.99783099 0.040824 -0.051645 0.99419999 0.094715998 
		-0.050951;
	setAttr ".n[166:331]" -type "float3"  0.96920598 0.226978 -0.095500998 0.97513902 
		0.188823 -0.115975 0.99419999 0.094715998 -0.050951 0.98349899 0.165176 -0.073799998 
		0.97112501 0.220011 -0.092262 0.96920598 0.226978 -0.095500998 0.98349899 0.165176 
		-0.073799998 0.98175901 0.17137299 -0.082340002 0.97500402 0.221613 0.01595 0.97112501 
		0.220011 -0.092262 0.98175901 0.17137299 -0.082340002 0.99038303 0.13816001 0.0072349999 
		0.95665199 0.27027801 0.108477 0.97500402 0.221613 0.01595 0.99038303 0.13816001 
		0.0072349999 0.99004197 0.114671 0.081648998 -0.804923 0.588265 0.077734999 -0.804923 
		0.588265 0.077734999 -0.66451001 0.74727899 -0.00024600001 -0.804923 0.588265 0.077734999 
		-0.804923 0.588265 0.077734999 -0.90421897 0.39920199 0.15174501 -0.98381197 -0.069415003 
		-0.165213 -0.92782903 -0.32065001 -0.190569 -0.84059298 -0.52946502 -0.114324 -0.98381197 
		-0.069415003 -0.165213 -0.93266302 0.352561 -0.076428004 -0.976493 -0.107348 -0.186919 
		-0.74389702 -0.66810203 0.016055999 -0.953659 -0.28767899 0.088175997 -0.97043103 
		-0.239226 -0.032168999 -0.99697101 0.077666 -0.004222 -0.98672003 0.148498 0.065816 
		-0.99692702 0.051821001 -0.058742002 -0.91177797 0.40015799 -0.092378996 -0.99972099 
		-0.013452 -0.019392001 -0.98977703 -0.02902 -0.13963901 -0.97112501 0.220011 -0.092262 
		-0.96920598 0.226978 -0.095500998 -0.96710902 -0.22704899 -0.114671 -0.99972099 -0.013452 
		-0.019392001 -0.89282399 -0.44957799 -0.027302001 -0.98977703 -0.02902 -0.13963901 
		-0.98564798 -0.15191901 0.073615998 -0.99734998 -0.068253003 -0.025192 -0.993572 
		-0.10507 0.042137999 -0.976493 -0.107348 -0.186919 -0.77310401 -0.58368099 -0.248248 
		-0.92782903 -0.32065001 -0.190569 -0.97043103 -0.239226 -0.032168999 -0.97112501 
		0.220011 -0.092262 -0.96710902 -0.22704899 -0.114671 -0.96632802 -0.213338 0.143867 
		-0.72031301 -0.68182498 0.127526 -0.63687199 -0.74132198 0.211743 -0.953659 -0.28767899 
		0.088175997 -0.97500402 0.221613 0.01595 -0.97043103 -0.239226 -0.032168999 -0.99697101 
		0.077666 -0.004222 -0.99692702 0.051821001 -0.058742002 -0.99148399 -1.6e-005 -0.130225 
		-0.88359499 0.41984001 0.20735 -0.95665199 0.27027801 0.108477 -0.96632802 -0.213338 
		0.143867 -0.72031301 -0.68182498 0.127526 -0.953659 -0.28767899 0.088175997 -0.758138 
		-0.64648402 0.085349001 -0.73796999 -0.67087197 -0.073016003 -0.97043103 -0.239226 
		-0.032168999 -0.96710902 -0.22704899 -0.114671 -0.84059298 -0.52946502 -0.114324 
		-0.96710902 -0.22704899 -0.114671 -0.98381197 -0.069415003 -0.165213 -0.99734998 
		-0.068253003 -0.025192 -0.99728 -0.040399998 -0.061645001 -0.993572 -0.10507 0.042137999 
		-0.976493 -0.107348 -0.186919 -0.91177797 0.40015799 -0.092378996 -0.98977703 -0.02902 
		-0.13963901 -0.76798499 0.439367 0.46599999 -0.88359499 0.41984001 0.20735 -0.83965701 
		0.42471001 0.33852199 -0.92782903 -0.32065001 -0.190569 -0.996463 -0.024307 -0.080434002 
		-0.99517202 -0.094671004 0.025884001 -0.99972099 -0.013452 -0.019392001 -0.91177797 
		0.40015799 -0.092378996 -0.98330301 0.154726 0.095788002 -0.60372001 -0.734061 0.31092799 
		-0.63687199 -0.74132198 0.211743 -0.56618202 -0.73741001 0.36832699 -0.98564798 -0.15191901 
		0.073615998 -0.89282399 -0.44957799 -0.027302001 -0.99972099 -0.013452 -0.019392001 
		-0.73796999 -0.67087197 -0.073016003 -0.96710902 -0.22704899 -0.114671 -0.84059298 
		-0.52946502 -0.114324 -0.99697101 0.077666 -0.004222 -0.98330301 0.154726 0.095788002 
		-0.98672003 0.148498 0.065816 -0.98330301 0.154726 0.095788002 -0.99697101 0.077666 
		-0.004222 -0.99972099 -0.013452 -0.019392001 -0.75914103 0.35508099 0.54554802 -0.76798499 
		0.439367 0.46599999 -0.83965701 0.42471001 0.33852199 -0.60372001 -0.734061 0.31092799 
		-0.56618202 -0.73741001 0.36832699 -0.56421 -0.69740498 0.44192001 -0.98381197 -0.069415003 
		-0.165213 -0.96920598 0.226978 -0.095500998 -0.97513902 0.188823 -0.115975 -0.99734998 
		-0.068253003 -0.025192 -0.99148399 -1.6e-005 -0.130225 -0.99728 -0.040399998 -0.061645001 
		-0.97043103 -0.239226 -0.032168999 -0.73796999 -0.67087197 -0.073016003 -0.74389702 
		-0.66810203 0.016055999 -0.99972099 -0.013452 -0.019392001 -0.99734998 -0.068253003 
		-0.025192 -0.98564798 -0.15191901 0.073615998 -0.97112501 0.220011 -0.092262 -0.97043103 
		-0.239226 -0.032168999 -0.97500402 0.221613 0.01595 -0.84059298 -0.52946502 -0.114324 
		-0.92782903 -0.32065001 -0.190569 -0.99517202 -0.094671004 0.025884001 -0.96710902 
		-0.22704899 -0.114671 -0.96920598 0.226978 -0.095500998 -0.98381197 -0.069415003 
		-0.165213 -0.89282399 -0.44957799 -0.027302001 -0.976493 -0.107348 -0.186919 -0.98977703 
		-0.02902 -0.13963901 -0.996463 -0.024307 -0.080434002 -0.92782903 -0.32065001 -0.190569 
		-0.98539197 0.068503 -0.155918 -0.99972099 -0.013452 -0.019392001 -0.99697101 0.077666 
		-0.004222 -0.99148399 -1.6e-005 -0.130225 -0.91177797 0.40015799 -0.092378996 -0.976493 
		-0.107348 -0.186919 -0.93266302 0.352561 -0.076428004 -0.92782903 -0.32065001 -0.190569 
		-0.98381197 -0.069415003 -0.165213 -0.976493 -0.107348 -0.186919 -0.99734998 -0.068253003 
		-0.025192 -0.99972099 -0.013452 -0.019392001 -0.99148399 -1.6e-005 -0.130225 -0.77310401 
		-0.58368099 -0.248248 -0.976493 -0.107348 -0.186919 -0.89282399 -0.44957799 -0.027302001 
		-0.83965701 0.42471001 0.33852199 -0.88359499 0.41984001 0.20735 -0.96632802 -0.213338 
		0.143867 -0.63687199 -0.74132198 0.211743 -0.60372001 -0.734061 0.31092799 -0.96632802 
		-0.213338 0.143867 -0.96632802 -0.213338 0.143867 -0.95665199 0.27027801 0.108477 
		-0.953659 -0.28767899 0.088175997 -0.72031301 -0.68182498 0.127526 -0.96632802 -0.213338 
		0.143867 -0.953659 -0.28767899 0.088175997 -0.97500402 0.221613 0.01595 -0.953659 
		-0.28767899 0.088175997 -0.95665199 0.27027801 0.108477;
	setAttr ".n[332:363]" -type "float3"  -0.758138 -0.64648402 0.085349001 -0.953659 
		-0.28767899 0.088175997 -0.74389702 -0.66810203 0.016055999 -0.93266302 0.352561 
		-0.076428004 -0.98381197 -0.069415003 -0.165213 -0.97513902 0.188823 -0.115975 -0.99419999 
		0.094715998 -0.050951 -0.99783099 0.040824 -0.051645 -0.93266302 0.352561 -0.076428004 
		-0.97513902 0.188823 -0.115975 -0.98349899 0.165176 -0.073799998 -0.99419999 0.094715998 
		-0.050951 -0.97513902 0.188823 -0.115975 -0.96920598 0.226978 -0.095500998 -0.98175901 
		0.17137299 -0.082340002 -0.98349899 0.165176 -0.073799998 -0.96920598 0.226978 -0.095500998 
		-0.97112501 0.220011 -0.092262 -0.99038303 0.13816001 0.0072349999 -0.98175901 0.17137299 
		-0.082340002 -0.97112501 0.220011 -0.092262 -0.97500402 0.221613 0.01595 -0.99004197 
		0.114671 0.081648998 -0.99038303 0.13816001 0.0072349999 -0.97500402 0.221613 0.01595 
		-0.95665199 0.27027801 0.108477 -0.89789897 -0.361904 0.25060499 -0.89789897 -0.361904 
		0.25060499 -0.87619799 -0.428886 0.21985 -0.89789897 -0.361904 0.25060499 -0.89789897 
		-0.361904 0.25060499 -0.91429901 -0.292786 0.279881;
	setAttr -s 118 ".fc[0:117]" -type "polyFaces" 
		f 3 0 1 2 
		mu 0 3 0 1 2 
		f 3 3 -2 4 
		mu 0 3 3 2 1 
		f 3 5 6 7 
		mu 0 3 4 5 6 
		f 3 8 -7 9 
		mu 0 3 7 6 5 
		f 3 10 11 12 
		mu 0 3 8 9 10 
		f 3 13 14 15 
		mu 0 3 11 12 10 
		f 3 16 17 18 
		mu 0 3 13 14 15 
		f 3 19 20 21 
		mu 0 3 16 17 18 
		f 3 22 23 24 
		mu 0 3 19 20 21 
		f 3 25 26 27 
		mu 0 3 22 23 24 
		f 3 28 29 -23 
		mu 0 3 19 25 20 
		f 3 30 31 32 
		mu 0 3 26 27 28 
		f 3 33 34 35 
		mu 0 3 9 29 11 
		f 3 -28 36 37 
		mu 0 3 22 24 13 
		f 3 38 39 40 
		mu 0 3 30 31 32 
		f 3 41 42 -17 
		mu 0 3 13 33 14 
		f 3 43 -22 44 
		mu 0 3 34 16 18 
		f 3 45 46 47 
		mu 0 3 32 35 36 
		f 3 48 49 50 
		mu 0 3 37 14 31 
		f 3 -38 51 52 
		mu 0 3 22 13 38 
		f 3 53 54 -13 
		mu 0 3 10 22 8 
		f 3 55 56 -31 
		mu 0 3 26 39 27 
		f 3 -25 57 58 
		mu 0 3 19 21 11 
		f 3 59 60 61 
		mu 0 3 40 36 41 
		f 3 62 63 64 
		mu 0 3 42 43 9 
		f 3 65 -24 66 
		mu 0 3 44 21 20 
		f 3 67 68 69 
		mu 0 3 45 30 40 
		f 3 -30 70 71 
		mu 0 3 20 25 28 
		f 3 -55 -53 72 
		mu 0 3 8 22 38 
		f 3 73 74 -21 
		mu 0 3 17 44 18 
		f 3 75 -75 -67 
		mu 0 3 20 18 44 
		f 3 -62 76 77 
		mu 0 3 40 41 46 
		f 3 78 -70 -78 
		mu 0 3 46 45 40 
		f 3 79 80 81 
		mu 0 3 47 23 10 
		f 3 82 83 -57 
		mu 0 3 39 34 27 
		f 3 84 -52 -19 
		mu 0 3 15 38 13 
		f 3 -32 85 -72 
		mu 0 3 28 27 20 
		f 3 -42 -37 86 
		mu 0 3 33 13 24 
		f 3 -65 -11 87 
		mu 0 3 42 9 8 
		f 3 -81 -26 -54 
		mu 0 3 10 23 22 
		f 3 -59 88 -29 
		mu 0 3 19 11 25 
		f 3 89 -64 90 
		mu 0 3 48 9 43 
		f 3 -45 -76 91 
		mu 0 3 34 18 20 
		f 3 -14 -58 92 
		mu 0 3 12 11 21 
		f 3 -16 -12 -36 
		mu 0 3 11 10 9 
		f 3 -92 -86 -84 
		mu 0 3 34 20 27 
		f 3 -89 -35 93 
		mu 0 3 25 11 29 
		f 3 -48 -60 94 
		mu 0 3 32 36 40 
		f 3 -95 -69 -41 
		mu 0 3 32 40 30 
		f 3 95 -46 96 
		mu 0 3 14 35 32 
		f 3 -97 -40 -50 
		mu 0 3 14 32 31 
		f 3 -96 -43 97 
		mu 0 3 35 14 33 
		f 3 -18 -49 98 
		mu 0 3 15 14 37 
		f 3 -82 -15 99 
		mu 0 3 47 10 12 
		f 4 -100 100 101 102 
		mu 0 4 47 12 49 50 
		f 4 -80 -103 103 104 
		mu 0 4 23 47 50 51 
		f 4 -27 -105 105 106 
		mu 0 4 24 23 51 52 
		f 4 -87 -107 107 108 
		mu 0 4 33 24 52 53 
		f 4 -98 -109 109 110 
		mu 0 4 35 33 53 54 
		f 3 111 -6 112 
		mu 0 3 55 5 4 
		f 3 -112 113 114 
		mu 0 3 5 55 56 
		f 3 115 116 117 
		mu 0 3 57 58 8 
		f 3 118 119 120 
		mu 0 3 57 12 59 
		f 3 121 122 123 
		mu 0 3 15 60 61 
		f 3 124 -20 125 
		mu 0 3 62 17 16 
		f 3 126 127 128 
		mu 0 3 21 63 64 
		f 3 129 130 131 
		mu 0 3 65 66 67 
		f 3 132 133 -128 
		mu 0 3 63 25 64 
		f 3 134 135 -33 
		mu 0 3 28 68 26 
		f 3 136 137 138 
		mu 0 3 59 29 58 
		f 3 139 -132 140 
		mu 0 3 61 65 67 
		f 3 141 -39 142 
		mu 0 3 69 31 30 
		f 3 143 144 -123 
		mu 0 3 60 70 61 
		f 3 -126 -44 145 
		mu 0 3 62 16 34 
		f 3 -47 146 147 
		mu 0 3 36 35 69 
		f 3 148 149 -51 
		mu 0 3 31 60 37 
		f 3 150 -141 151 
		mu 0 3 38 61 67 
		f 3 152 153 -118 
		mu 0 3 8 67 57 
		f 3 154 -56 -136 
		mu 0 3 68 39 26 
		f 3 155 -129 156 
		mu 0 3 59 21 64 
		f 3 -61 157 158 
		mu 0 3 41 36 71 
		f 3 159 -63 160 
		mu 0 3 58 43 42 
		f 3 -127 -66 161 
		mu 0 3 63 21 44 
		f 3 162 -68 163 
		mu 0 3 71 30 45 
		f 3 -71 -133 164 
		mu 0 3 28 25 63 
		f 3 -152 -153 -73 
		mu 0 3 38 67 8 
		f 3 165 -74 -125 
		mu 0 3 62 44 17 
		f 3 -166 166 -162 
		mu 0 3 44 62 63 
		f 3 -77 -159 167 
		mu 0 3 46 41 71 
		f 3 -164 -79 -168 
		mu 0 3 71 45 46 
		f 3 168 169 170 
		mu 0 3 57 66 72 
		f 3 171 -83 -155 
		mu 0 3 68 34 39 
		f 3 -151 -85 -124 
		mu 0 3 61 38 15 
		f 3 172 -135 -165 
		mu 0 3 63 68 28 
		f 3 -140 -145 173 
		mu 0 3 65 61 70 
		f 3 -117 -161 -88 
		mu 0 3 8 58 42 
		f 3 -131 -169 -154 
		mu 0 3 67 66 57 
		f 3 174 -157 -134 
		mu 0 3 25 59 64 
		f 3 -160 175 -91 
		mu 0 3 43 58 48 
		f 3 -167 -146 176 
		mu 0 3 63 62 34 
		f 3 -156 -120 -93 
		mu 0 3 21 59 12 
		f 3 -116 -121 -139 
		mu 0 3 58 57 59 
		f 3 -173 -177 -172 
		mu 0 3 68 63 34 
		f 3 -137 -175 -94 
		mu 0 3 29 59 25 
		f 3 -158 -148 177 
		mu 0 3 71 36 69 
		f 3 -163 -178 -143 
		mu 0 3 30 71 69 
		f 3 -147 178 179 
		mu 0 3 69 35 60 
		f 3 -142 -180 -149 
		mu 0 3 31 69 60 
		f 3 -144 -179 180 
		mu 0 3 70 60 35 
		f 3 -150 -122 -99 
		mu 0 3 37 60 15 
		f 3 -119 -171 181 
		mu 0 3 12 57 72 
		f 4 -102 -101 -182 182 
		mu 0 4 50 49 12 72 
		f 4 -104 -183 -170 183 
		mu 0 4 51 50 72 66 
		f 4 -106 -184 -130 184 
		mu 0 4 52 51 66 65 
		f 4 -108 -185 -174 185 
		mu 0 4 53 52 65 70 
		f 4 -110 -186 -181 -111 
		mu 0 4 54 53 70 35 
		f 3 186 187 188 
		mu 0 3 73 74 75 
		f 3 -187 189 190 
		mu 0 3 74 73 76 ;
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
createNode phongE -n "MediumFishB";
createNode shadingEngine -n "MediumFishBSG";
	setAttr ".ihi" 0;
	setAttr ".ro" yes;
createNode materialInfo -n "materialInfo2";
createNode file -n "file1";
	setAttr ".ftn" -type "string" "D:/Project/MyProject//sourceimages/Aquarium/PNGs/MediumFishB_DM.jpg";
createNode place2dTexture -n "place2dTexture1";
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
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[0].llnk";
connectAttr ":initialShadingGroup.msg" "lightLinker1.lnk[0].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[1].llnk";
connectAttr ":initialParticleSE.msg" "lightLinker1.lnk[1].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[3].llnk";
connectAttr "MediumFishBSG.msg" "lightLinker1.lnk[3].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[0].sllk";
connectAttr ":initialShadingGroup.msg" "lightLinker1.slnk[0].solk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[1].sllk";
connectAttr ":initialParticleSE.msg" "lightLinker1.slnk[1].solk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[3].sllk";
connectAttr "MediumFishBSG.msg" "lightLinker1.slnk[3].solk";
connectAttr "layerManager.dli[0]" "defaultLayer.id";
connectAttr "renderLayerManager.rlmi[0]" "defaultRenderLayer.rlid";
connectAttr "file1.oc" "MediumFishB.c";
connectAttr "MediumFishB.oc" "MediumFishBSG.ss";
connectAttr "MediumFishB_001Shape.iog" "MediumFishBSG.dsm" -na;
connectAttr "MediumFishBSG.msg" "materialInfo2.sg";
connectAttr "MediumFishB.msg" "materialInfo2.m";
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
connectAttr "MediumFishBSG.pa" ":renderPartition.st" -na;
connectAttr "MediumFishB.msg" ":defaultShaderList1.s" -na;
connectAttr "place2dTexture1.msg" ":defaultRenderUtilityList1.u" -na;
connectAttr "lightLinker1.msg" ":lightList1.ln" -na;
connectAttr "file1.msg" ":defaultTextureList1.tx" -na;
// End of MediumFishB.ma
