//Maya ASCII 2010 scene
//Name: RockC.ma
//Last modified: Mon, Aug 30, 2010 12:39:21 AM
//Codeset: 1252
requires maya "2010";
requires "stereoCamera" "10.0";
currentUnit -l centimeter -a degree -t film;
fileInfo "application" "maya";
fileInfo "product" "Maya Unlimited 2010";
fileInfo "version" "2010";
fileInfo "cutIdentifier" "200907280007-756013";
fileInfo "osv" "Microsoft Windows XP Service Pack 3 (Build 2600)\n";
createNode transform -n "RockC_1";
createNode mesh -n "RockC_1Shape" -p "RockC_1";
	setAttr -k off ".v";
	setAttr ".uvst[0].uvsn" -type "string" "map1";
	setAttr -s 81 ".uvst[0].uvsp[0:80]" -type "float2" 0.52773798 0.58560097 
		0.59733999 0.55915397 0.62884998 0.623959 0.51796198 0.66892999 0.626737 0.880611 
		0.57700402 0.89621198 0.53442299 0.81110299 0.64116299 0.77585602 0.45030099 0.85858202 
		0.467518 0.76257002 0.31947899 0.76135099 0.36888301 0.70295101 0.1917 0.739344 0.28215599 
		0.65728402 0.126781 0.59114802 0.23524 0.56781399 0.16428199 0.52471501 0.23856901 
		0.48473099 0.159852 0.38700101 0.243048 0.38644201 0.21639501 0.278339 0.28766301 
		0.30919501 0.326379 0.22328 0.36983201 0.28140199 0.37529901 0.168613 0.43954101 
		0.212136 0.41599 0.098746002 0.46566901 0.167716 0.56500298 0.122328 0.56557399 0.184075 
		0.75486499 0.26863199 0.68941301 0.280788 0.878932 0.40215001 0.76971197 0.388616 
		0.81948501 0.56605202 0.76090699 0.50535798 0.77418 0.656596 0.70008898 0.60450703 
		0.71826798 0.764229 0.65858001 0.69960898 0.558981 0.73715103 0.61837399 0.71585202 
		0.42901 0.62331599 0.35698101 0.58926499 0.32232201 0.52555501 0.309912 0.45122701 
		0.31895101 0.37844601 0.34569401 0.32009199 0.48955801 0.203291 0.54931003 0.23605999 
		0.62187302 0.292741 0.69917899 0.38267899 0.69598901 0.46749699 0.631455 0.534455 
		0.493954 0.54415298 0.42910799 0.53076899 0.389099 0.48952001 0.39197201 0.441396 
		0.38792101 0.387532 0.417577 0.35375601 0.48496801 0.32251501 0.49554199 0.27003399 
		0.62987602 0.392977 0.57765901 0.339129 0.63945299 0.46869001 0.59138697 0.50309598 
		0.459324 0.49165499 0.46725899 0.46354899 0.49794301 0.474231 0.49901 0.436232 0.44411299 
		0.43852401 0.57471001 0.450333 0.43209299 0.409713 0.45300001 0.38650301 0.50211102 
		0.387133 0.565072 0.38834801 0.58576298 0.41122901 0.50458902 0.236718 0.53638798 
		0.238873 0.56328702 0.27213699 0.558424 0.419774;
	setAttr ".cuvs" -type "string" "map1";
	setAttr ".dcc" -type "string" "Ambient+Diffuse";
	setAttr -s 81 ".pt[0:80]" -type "float3"  29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 
		0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436 29.16507 0 17.106436;
	setAttr -s 81 ".vt[0:80]"  -34.988403 -1.280145 -7.8270779 -34.080364 
		-1.2884541 -7.0840468 -31.180227 -1.544927 -7.865849 -28.373014 -1.411688 -10.487935 
		-26.585279 -1.5543571 -9.5249968 -23.685715 -1.335704 -13.135428 -23.534243 -1.373504 
		-15.266968 -21.443764 -1.373504 -18.23053 -21.931492 -1.373504 -20.708199 -24.711946 
		-1.4158649 -21.794834 -25.614443 -1.444732 -23.447048 -26.366524 -1.300823 -26.192354 
		-30.021664 -1.349759 -26.333071 -32.636974 -1.363755 -21.77931 -36.119556 -1.028899 
		-19.539988 -35.918407 -1.290845 -16.059826 -37.181019 -1.385729 -14.274017 -34.7495 
		-1.290419 -11.445164 -33.58474 -0.76027399 -9.9490194 -32.781006 -0.81467497 -9.2097454 
		-30.541452 -0.54868603 -10.1392 -28.550234 -0.54258299 -11.569498 -26.934383 -0.45246699 
		-11.270202 -24.933928 -0.326092 -13.571553 -24.08473 -0.40470499 -15.72326 -22.100027 
		-0.339113 -18.509373 -22.786964 -0.44183099 -20.259911 -25.794615 -0.54813898 -20.603142 
		-26.618999 -0.433108 -21.700684 -26.868311 -0.692258 -24.780527 -29.905998 -0.77685797 
		-24.738522 -32.665684 -0.591757 -21.559332 -34.925751 -0.16570701 -19.787785 -34.574017 
		-0.158701 -16.753454 -35.103596 -0.223344 -15.184253 -35.294331 -0.20883299 -12.517913 
		-33.366665 0.094416 -11.493258 -32.067764 0.084416002 -10.573417 -30.557285 0.383811 
		-12.040896 -28.989445 0.33832401 -13.058131 -27.771734 0.42835701 -12.643455 -25.475529 
		0.039193999 -15.060972 -25.633833 -0.208809 -16.21999 -23.982016 -0.054667 -18.589457 
		-24.561447 -0.26795 -19.837662 -27.527779 -0.272679 -22.930267 -30.410471 -0.43682799 
		-22.794596 -30.974615 -0.17058399 -20.31469 -31.947378 0.037078999 -19.680525 -32.955524 
		0.39271399 -17.471531 -32.178528 0.387815 -16.290279 -33.206985 0.43059 -13.583963 
		-30.797621 1.051592 -13.644898 -29.606955 1.286661 -14.636043 -28.158806 1.192976 
		-13.531331 -26.444649 0.99409997 -15.262824 -26.201138 0.469037 -16.464619 -25.713848 
		0.98236299 -17.78537 -26.19866 0.81588697 -19.16597 -27.583582 0.82820398 -19.239721 
		-27.318495 0.568308 -20.785688 -30.172934 1.167309 -19.477961 -31.475674 1.491123 
		-19.270454 -31.962246 1.507988 -16.870102 -31.023533 1.460492 -15.9996 -31.469118 
		1.347571 -14.721392 -28.617264 2.350554 -16.253014 -30.531443 2.332864 -16.960285 
		-27.994759 1.841565 -15.210364 -27.06547 1.604298 -15.831937 -27.136978 1.647405 
		-16.981762 -27.136978 1.647405 -16.981762 -27.901707 2.0863571 -18.396145 -27.901707 
		2.0863571 -18.396145 -29.238634 2.2467599 -19.026829 -30.659224 2.3645921 -18.652603 
		-28.130257 0.25268 -22.123411 -29.461596 0.41075701 -22.069616 -29.91468 0.67924702 
		-20.587685 -28.150734 2.632798 -17.33005 -29.616735 2.7367311 -17.964672;
	setAttr -s 164 ".ed[0:163]"  52 65 0 65 51 0 
		51 38 0 38 52 0 0 1 0 1 19 0 
		19 18 0 18 0 0 1 2 0 2 19 0 
		2 20 0 20 19 0 2 3 0 3 21 0 
		21 20 0 3 4 0 4 22 0 22 21 0 
		4 5 0 5 23 0 23 22 0 5 6 0 
		6 24 0 24 23 0 6 7 0 7 25 0 
		25 24 0 7 8 0 8 26 0 26 25 0 
		8 9 0 9 27 0 27 26 0 9 10 0 
		10 28 0 28 27 0 10 11 0 11 29 0 
		29 28 0 11 12 0 12 30 0 30 29 0 
		12 13 0 13 31 0 31 30 0 13 14 0 
		14 32 0 32 31 0 14 15 0 15 33 0 
		33 32 0 15 16 0 16 34 0 34 33 0 
		16 17 0 17 35 0 35 34 0 18 17 0 
		17 0 0 18 35 0 19 37 0 37 36 0 
		36 18 0 20 38 0 38 37 0 21 39 0 
		39 38 0 22 40 0 40 39 0 23 41 0 
		41 40 0 24 42 0 42 41 0 25 43 0 
		43 42 0 26 44 0 44 43 0 27 44 0 
		29 45 0 45 28 0 30 46 0 46 45 0 
		31 47 0 47 46 0 32 48 0 48 47 0 
		33 49 0 49 48 0 34 50 0 50 49 0 
		34 51 0 51 50 0 35 36 0 36 51 0 
		51 35 0 39 53 0 53 52 0 40 54 0 
		54 53 0 41 55 0 55 54 0 42 56 0 
		56 55 0 43 57 0 57 56 0 44 58 0 
		58 57 0 27 59 0 59 58 0 28 60 0 
		60 59 0 48 62 0 62 61 0 61 47 0 
		49 63 0 63 62 0 50 63 0 50 64 0 
		64 63 0 65 50 0 65 64 0 68 69 0 
		69 66 0 66 68 0 69 79 0 79 66 0 
		69 70 0 70 79 0 64 53 0 53 66 0 
		66 67 0 67 64 0 54 68 0 55 69 0 
		56 70 0 57 71 0 71 70 0 58 72 0 
		72 71 0 59 73 0 73 72 0 59 61 0 
		61 74 0 74 73 0 62 75 0 75 74 0 
		63 67 0 67 75 0 45 76 0 76 60 0 
		46 77 0 77 76 0 47 78 0 78 46 0 
		61 78 0 78 77 0 60 78 0 67 80 0 
		80 75 0 79 80 0 73 71 0 73 70 0 
		73 79 0 74 80 0;
	setAttr -s 310 ".n";
	setAttr ".n[0:165]" -type "float3"  1e+020 1e+020 1e+020 1e+020 1e+020 1e+020 
		1e+020 1e+020 1e+020 1e+020 1e+020 1e+020 -0.248208 0.96629 0.068378001 0.031117 
		0.97040701 0.23946001 0.0047510001 0.92755097 0.373665 -0.43304399 0.834198 0.34144801 
		0.031117 0.97040701 0.23946001 0.209852 0.88738298 0.410505 0.0047510001 0.92755097 
		0.373665 0.0047510001 0.92755097 0.373665 0.209852 0.88738298 0.410505 0.240398 0.85325402 
		0.46278 0.209852 0.88738298 0.410505 0.096725002 0.82099599 0.56268001 0.074693002 
		0.83888 0.53916699 0.240398 0.85325402 0.46278 0.096725002 0.82099599 0.56268001 
		0.133524 0.83331603 0.53642899 0.100308 0.86888701 0.48474199 0.074693002 0.83888 
		0.53916699 0.133524 0.83331603 0.53642899 0.58814597 0.755279 0.28920099 0.45649201 
		0.866799 0.200683 0.100308 0.86888701 0.48474199 0.58814597 0.755279 0.28920099 0.692725 
		0.64834702 0.315878 0.473001 0.86025101 0.190364 0.45649201 0.866799 0.200683 0.692725 
		0.64834702 0.315878 0.76332599 0.63193101 0.134151 0.463826 0.88366097 0.063308999 
		0.473001 0.86025101 0.190364 0.76332599 0.63193101 0.134151 0.48932901 0.73148102 
		-0.47486001 0.276389 0.88528198 -0.37401101 0.463826 0.88366097 0.063308999 0.48932901 
		0.73148102 -0.47486001 0.29806101 0.83424097 -0.463898 0.27656201 0.85562497 -0.43751499 
		0.276389 0.88528198 -0.37401101 0.29806101 0.83424097 -0.463898 0.52087897 0.83368701 
		-0.183442 0.48732799 0.84940898 -0.202525 0.27656201 0.85562497 -0.43751499 0.52087897 
		0.83368701 -0.183442 0.31228301 0.91420001 -0.25829899 0.221891 0.95233703 -0.20933001 
		0.48732799 0.84940898 -0.202525 0.31228301 0.91420001 -0.25829899 -0.33766299 0.835989 
		-0.432558 -0.221242 0.92341202 -0.313629 0.221891 0.95233703 -0.20933001 -0.33766299 
		0.835989 -0.432558 -0.58005601 0.50903302 -0.63594103 -0.36579001 0.80239701 -0.47154799 
		-0.221242 0.92341202 -0.313629 -0.58005601 0.50903302 -0.63594103 -0.63368702 0.65796 
		-0.40685201 -0.37317801 0.87354499 -0.312502 -0.36579001 0.80239701 -0.47154799 -0.63368702 
		0.65796 -0.40685201 -0.62250602 0.77474201 -0.110725 -0.42274299 0.90369397 -0.068016 
		-0.37317801 0.87354499 -0.312502 -0.62250602 0.77474201 -0.110725 -0.67648399 0.73619002 
		-0.019835001 -0.43456301 0.900249 -0.026582001 -0.42274299 0.90369397 -0.068016 -0.67648399 
		0.73619002 -0.019835001 -0.77929503 0.448228 0.43794 -0.52267998 0.79791498 0.30023 
		-0.43456301 0.900249 -0.026582001 -0.248208 0.96629 0.068378001 -0.43304399 0.834198 
		0.34144801 -0.38410199 0.922867 -0.027983001 -0.77929503 0.448228 0.43794 -0.43304399 
		0.834198 0.34144801 -0.52267998 0.79791498 0.30023 -0.43304399 0.834198 0.34144801 
		0.0047510001 0.92755097 0.373665 -0.061324 0.92667699 0.37082201 -0.243147 0.92775398 
		0.28311101 0.0047510001 0.92755097 0.373665 0.240398 0.85325402 0.46278 0.088381 
		0.91947597 0.383084 -0.061324 0.92667699 0.37082201 0.240398 0.85325402 0.46278 0.074693002 
		0.83888 0.53916699 -0.0077960002 0.84903502 0.52827901 0.088381 0.91947597 0.383084 
		0.074693002 0.83888 0.53916699 0.100308 0.86888701 0.48474199 0.088751003 0.85272902 
		0.514759 -0.0077960002 0.84903502 0.52827901 0.100308 0.86888701 0.48474199 0.45649201 
		0.866799 0.200683 0.50445497 0.85488999 0.121193 0.088751003 0.85272902 0.514759 
		0.45649201 0.866799 0.200683 0.473001 0.86025101 0.190364 0.47198099 0.87589097 0.100246 
		0.50445497 0.85488999 0.121193 0.473001 0.86025101 0.190364 0.463826 0.88366097 0.063308999 
		0.33523101 0.94128799 0.039949 0.47198099 0.87589097 0.100246 0.463826 0.88366097 
		0.063308999 0.276389 0.88528198 -0.37401101 0.172723 0.90992302 -0.377103 0.33523101 
		0.94128799 0.039949 0.276389 0.88528198 -0.37401101 0.27656201 0.85562497 -0.43751499 
		0.172723 0.90992302 -0.377103 0.48732799 0.84940898 -0.202525 0.221891 0.95233703 
		-0.20933001 0.18398499 0.917184 -0.35344499 0.221891 0.95233703 -0.20933001 -0.221242 
		0.92341202 -0.313629 -0.29212099 0.89689499 -0.332032 0.18398499 0.917184 -0.35344499 
		-0.221242 0.92341202 -0.313629 -0.36579001 0.80239701 -0.47154799 -0.366128 0.82356697 
		-0.43323001 -0.29212099 0.89689499 -0.332032 -0.36579001 0.80239701 -0.47154799 -0.37317801 
		0.87354499 -0.312502 -0.33572799 0.83548999 -0.43502101 -0.366128 0.82356697 -0.43323001 
		-0.37317801 0.87354499 -0.312502 -0.42274299 0.90369397 -0.068016 -0.55299401 0.83189702 
		0.046308 -0.33572799 0.83548999 -0.43502101 -0.42274299 0.90369397 -0.068016 -0.43456301 
		0.900249 -0.026582001 -0.56928599 0.81116402 0.13388801 -0.55299401 0.83189702 0.046308 
		-0.43456301 0.900249 -0.026582001 -0.28184301 0.95794201 0.053959999 -0.56928599 
		0.81116402 0.13388801 -0.52267998 0.79791498 0.30023 -0.243147 0.92775398 0.28311101 
		-0.28184301 0.95794201 0.053959999 -0.28184301 0.95794201 0.053959999 -0.243147 0.92775398 
		0.28311101 -0.061324 0.92667699 0.37082201 0.088381 0.91947597 0.383084 0.088381 
		0.91947597 0.383084 -0.0077960002 0.84903502 0.52827901 -0.11013 0.89517701 0.43189201 
		0.0099360002 0.94513297 0.32653499 -0.0077960002 0.84903502 0.52827901 0.088751003 
		0.85272902 0.514759 0.134451 0.854123 0.50239003 -0.11013 0.89517701 0.43189201 0.088751003 
		0.85272902 0.514759 0.50445497 0.85488999 0.121193 0.662857 0.73525 0.141516 0.134451 
		0.854123 0.50239003 0.50445497 0.85488999 0.121193 0.47198099 0.87589097 0.100246 
		0.70845699 0.682679 0.17898899 0.662857 0.73525 0.141516 0.47198099 0.87589097 0.100246 
		0.33523101 0.94128799 0.039949;
	setAttr ".n[166:309]" -type "float3"  0.55542803 0.81985098 0.139079 0.70845699 
		0.682679 0.17898899 0.33523101 0.94128799 0.039949 0.172723 0.90992302 -0.377103 
		0.28734699 0.81122798 -0.50925499 0.55542803 0.81985098 0.139079 0.172723 0.90992302 
		-0.377103 0.27656201 0.85562497 -0.43751499 0.242827 0.75676501 -0.60691202 0.28734699 
		0.81122798 -0.50925499 0.27656201 0.85562497 -0.43751499 0.48732799 0.84940898 -0.202525 
		0.311308 0.91473401 -0.25758201 0.242827 0.75676501 -0.60691202 -0.366128 0.82356697 
		-0.43323001 -0.33572799 0.83548999 -0.43502101 -0.46983799 0.67009503 -0.57465303 
		-0.132119 0.677495 -0.72356403 -0.33572799 0.83548999 -0.43502101 -0.55299401 0.83189702 
		0.046308 -0.692393 0.66122901 0.288735 -0.46983799 0.67009503 -0.57465303 -0.55299401 
		0.83189702 0.046308 -0.56928599 0.81116402 0.13388801 -0.692393 0.66122901 0.288735 
		-0.692393 0.66122901 0.288735 -0.56928599 0.81116402 0.13388801 -0.41581801 0.834867 
		0.36068299 -0.28184301 0.95794201 0.053959999 -0.38193899 0.92296797 0.047456998 
		-0.56928599 0.81116402 0.13388801 -0.56928599 0.81116402 0.13388801 -0.38193899 0.92296797 
		0.047456998 -0.41581801 0.834867 0.36068299 0.232723 0.90965599 0.34404501 0.54646498 
		0.81826502 0.178377 0.040066 0.93138599 0.361821 0.040066 0.93138599 0.361821 0.54646498 
		0.81826502 0.178377 0.41967201 0.90753597 0.015954999 0.41967201 0.90753597 0.015954999 
		0.54646498 0.81826502 0.178377 0.71693403 0.69512397 0.052995998 -0.41581801 0.834867 
		0.36068299 -0.11013 0.89517701 0.43189201 0.040066 0.93138599 0.361821 -0.35689199 
		0.89833498 0.25616801 -0.11013 0.89517701 0.43189201 0.134451 0.854123 0.50239003 
		0.232723 0.90965599 0.34404501 0.040066 0.93138599 0.361821 0.134451 0.854123 0.50239003 
		0.662857 0.73525 0.141516 0.54646498 0.81826502 0.178377 0.232723 0.90965599 0.34404501 
		0.662857 0.73525 0.141516 0.70845699 0.682679 0.17898899 0.71693403 0.69512397 0.052995998 
		0.54646498 0.81826502 0.178377 0.70845699 0.682679 0.17898899 0.55542803 0.81985098 
		0.139079 0.55571699 0.81123298 0.18188 0.71693403 0.69512397 0.052995998 0.55542803 
		0.81985098 0.139079 0.28734699 0.81122798 -0.50925499 0.29102999 0.79749298 -0.52849501 
		0.55571699 0.81123298 0.18188 0.28734699 0.81122798 -0.50925499 0.242827 0.75676501 
		-0.60691202 0.347931 0.70507401 -0.61791199 0.29102999 0.79749298 -0.52849501 0.242827 
		0.75676501 -0.60691202 -0.132119 0.677495 -0.72356403 0.097755 0.73685801 -0.66894299 
		0.347931 0.70507401 -0.61791199 -0.132119 0.677495 -0.72356403 -0.46983799 0.67009503 
		-0.57465303 -0.30271399 0.884826 -0.35418499 0.097755 0.73685801 -0.66894299 -0.46983799 
		0.67009503 -0.57465303 -0.692393 0.66122901 0.288735 -0.35689199 0.89833498 0.25616801 
		-0.30271399 0.884826 -0.35418499 -0.692393 0.66122901 0.288735 -0.41581801 0.834867 
		0.36068299 -0.35689199 0.89833498 0.25616801 0.48732799 0.84940898 -0.202525 0.18398499 
		0.917184 -0.35344499 0.171395 0.88551497 -0.431842 0.311308 0.91473401 -0.25758201 
		0.18398499 0.917184 -0.35344499 -0.29212099 0.89689499 -0.332032 -0.167639 0.89502901 
		-0.413304 0.171395 0.88551497 -0.431842 -0.29212099 0.89689499 -0.332032 -0.366128 
		0.82356697 -0.43323001 -0.350068 0.88591498 -0.304315 -0.366128 0.82356697 -0.43323001 
		-0.132119 0.677495 -0.72356403 -0.350068 0.88591498 -0.304315 -0.29212099 0.89689499 
		-0.332032 -0.350068 0.88591498 -0.304315 -0.167639 0.89502901 -0.413304 -0.132119 
		0.677495 -0.72356403 0.242827 0.75676501 -0.60691202 0.311308 0.91473401 -0.25758201 
		-0.350068 0.88591498 -0.304315 -0.35689199 0.89833498 0.25616801 -0.062077999 0.98956603 
		-0.130024 -0.30271399 0.884826 -0.35418499 -0.35689199 0.89833498 0.25616801 0.040066 
		0.93138599 0.361821 0.41967201 0.90753597 0.015954999 -0.062077999 0.98956603 -0.130024 
		0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.347931 0.70507401 -0.61791199 0.41967201 0.90753597 
		0.015954999 0.71693403 0.69512397 0.052995998 -0.062077999 0.98956603 -0.130024 0.41967201 
		0.90753597 0.015954999 0.347931 0.70507401 -0.61791199 0.097755 0.73685801 -0.66894299 
		-0.30271399 0.884826 -0.35418499 -0.062077999 0.98956603 -0.130024 0.097755 0.73685801 
		-0.66894299 -0.38193899 0.92296797 0.047456998 0.0099360002 0.94513297 0.32653499 
		-0.11013 0.89517701 0.43189201 -0.41581801 0.834867 0.36068299 -0.350068 0.88591498 
		-0.304315 0.311308 0.91473401 -0.25758201 0.171395 0.88551497 -0.431842 -0.167639 
		0.89502901 -0.413304 -0.43456301 0.900249 -0.026582001 -0.52267998 0.79791498 0.30023 
		-0.28184301 0.95794201 0.053959999 -0.52267998 0.79791498 0.30023 -0.43304399 0.834198 
		0.34144801 -0.243147 0.92775398 0.28311101;
	setAttr -s 84 ".fc[0:83]" -type "polyFaces" 
		f 4 0 1 2 3 
		mu 0 4 0 1 2 3 
		f 4 4 5 6 7 
		mu 0 4 4 5 6 7 
		f 3 8 9 -6 
		mu 0 3 5 8 6 
		f 3 -10 10 11 
		mu 0 3 6 8 9 
		f 4 12 13 14 -11 
		mu 0 4 8 10 11 9 
		f 4 15 16 17 -14 
		mu 0 4 10 12 13 11 
		f 4 18 19 20 -17 
		mu 0 4 12 14 15 13 
		f 4 21 22 23 -20 
		mu 0 4 14 16 17 15 
		f 4 24 25 26 -23 
		mu 0 4 16 18 19 17 
		f 4 27 28 29 -26 
		mu 0 4 18 20 21 19 
		f 4 30 31 32 -29 
		mu 0 4 20 22 23 21 
		f 4 33 34 35 -32 
		mu 0 4 22 24 25 23 
		f 4 36 37 38 -35 
		mu 0 4 24 26 27 25 
		f 4 39 40 41 -38 
		mu 0 4 26 28 29 27 
		f 4 42 43 44 -41 
		mu 0 4 28 30 31 29 
		f 4 45 46 47 -44 
		mu 0 4 30 32 33 31 
		f 4 48 49 50 -47 
		mu 0 4 32 34 35 33 
		f 4 51 52 53 -50 
		mu 0 4 34 36 37 35 
		f 4 54 55 56 -53 
		mu 0 4 36 38 39 37 
		f 3 -8 57 58 
		mu 0 3 4 7 38 
		f 3 -58 59 -56 
		mu 0 3 38 7 39 
		f 4 -7 60 61 62 
		mu 0 4 7 6 40 41 
		f 4 -12 63 64 -61 
		mu 0 4 6 9 3 40 
		f 4 -15 65 66 -64 
		mu 0 4 9 11 42 3 
		f 4 -18 67 68 -66 
		mu 0 4 11 13 43 42 
		f 4 -21 69 70 -68 
		mu 0 4 13 15 44 43 
		f 4 -24 71 72 -70 
		mu 0 4 15 17 45 44 
		f 4 -27 73 74 -72 
		mu 0 4 17 19 46 45 
		f 4 -30 75 76 -74 
		mu 0 4 19 21 47 46 
		f 3 -33 77 -76 
		mu 0 3 21 23 47 
		f 3 -39 78 79 
		mu 0 3 25 27 48 
		f 4 -42 80 81 -79 
		mu 0 4 27 29 49 48 
		f 4 -45 82 83 -81 
		mu 0 4 29 31 50 49 
		f 4 -48 84 85 -83 
		mu 0 4 31 33 51 50 
		f 4 -51 86 87 -85 
		mu 0 4 33 35 52 51 
		f 4 -54 88 89 -87 
		mu 0 4 35 37 53 52 
		f 3 90 91 -89 
		mu 0 3 37 2 53 
		f 3 92 93 94 
		mu 0 3 39 41 2 
		f 4 -94 -62 -65 -3 
		mu 0 4 2 41 40 3 
		f 4 -67 95 96 -4 
		mu 0 4 3 42 54 0 
		f 4 -69 97 98 -96 
		mu 0 4 42 43 55 54 
		f 4 -71 99 100 -98 
		mu 0 4 43 44 56 55 
		f 4 -73 101 102 -100 
		mu 0 4 44 45 57 56 
		f 4 -75 103 104 -102 
		mu 0 4 45 46 58 57 
		f 4 -77 105 106 -104 
		mu 0 4 46 47 59 58 
		f 4 -78 107 108 -106 
		mu 0 4 47 23 60 59 
		f 4 -36 109 110 -108 
		mu 0 4 23 25 61 60 
		f 4 -86 111 112 113 
		mu 0 4 50 51 62 63 
		f 4 -88 114 115 -112 
		mu 0 4 51 52 64 62 
		f 3 -90 116 -115 
		mu 0 3 52 53 64 
		f 3 -117 117 118 
		mu 0 3 64 53 65 
		f 3 -2 119 -92 
		mu 0 3 2 1 53 
		f 3 -120 120 -118 
		mu 0 3 53 1 65 
		f 3 121 122 123 
		mu 0 3 66 67 68 
		f 3 -123 124 125 
		mu 0 3 68 67 69 
		f 3 -125 126 127 
		mu 0 3 69 67 70 
		f 4 128 129 130 131 
		mu 0 4 65 54 68 71 
		f 4 -99 132 -124 -130 
		mu 0 4 54 55 66 68 
		f 4 -101 133 -122 -133 
		mu 0 4 55 56 67 66 
		f 4 -103 134 -127 -134 
		mu 0 4 56 57 70 67 
		f 4 -105 135 136 -135 
		mu 0 4 57 58 72 70 
		f 4 -107 137 138 -136 
		mu 0 4 58 59 73 72 
		f 4 -109 139 140 -138 
		mu 0 4 59 60 74 73 
		f 4 141 142 143 -140 
		mu 0 4 60 63 75 74 
		f 4 -113 144 145 -143 
		mu 0 4 63 62 76 75 
		f 4 -116 146 147 -145 
		mu 0 4 62 64 71 76 
		f 3 -119 -132 -147 
		mu 0 3 64 65 71 
		f 4 -80 148 149 -110 
		mu 0 4 25 48 77 61 
		f 4 -82 150 151 -149 
		mu 0 4 48 49 78 77 
		f 3 -84 152 153 
		mu 0 3 49 50 79 
		f 3 -114 154 -153 
		mu 0 3 50 63 79 
		f 3 -154 155 -151 
		mu 0 3 49 79 78 
		f 4 -142 -111 156 -155 
		mu 0 4 63 60 61 79 
		f 3 157 158 -148 
		mu 0 3 71 80 76 
		f 4 -131 -126 159 -158 
		mu 0 4 71 68 69 80 
		f 3 -141 160 -139 
		mu 0 3 73 74 72 
		f 3 -161 161 -137 
		mu 0 3 72 74 70 
		f 3 162 -128 -162 
		mu 0 3 74 69 70 
		f 4 -160 -163 -144 163 
		mu 0 4 80 69 74 75 
		f 3 -159 -164 -146 
		mu 0 3 76 80 75 
		f 4 -1 -97 -129 -121 
		mu 0 4 1 0 54 65 
		f 4 -157 -150 -152 -156 
		mu 0 4 79 61 77 78 
		f 3 -57 -95 -91 
		mu 0 3 37 39 2 
		f 3 -60 -63 -93 
		mu 0 3 39 7 41 ;
	setAttr ".cd" -type "dataPolyComponent" Index_Data Edge 0 ;
	setAttr ".cvd" -type "dataPolyComponent" Index_Data Vertex 0 ;
createNode transform -s -n "persp";
	setAttr ".v" no;
	setAttr ".t" -type "double3" 6.5776792795043759 24.520387843288223 26.070236649344476 ;
	setAttr ".r" -type "double3" -44.876862662289618 16.199999999999942 -8.2801613946400086e-016 ;
createNode camera -s -n "perspShape" -p "persp";
	setAttr -k off ".v" no;
	setAttr ".fl" 34.999999999999993;
	setAttr ".coi" 36.538585957627873;
	setAttr ".imn" -type "string" "persp";
	setAttr ".den" -type "string" "persp_depth";
	setAttr ".man" -type "string" "persp_mask";
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
createNode materialInfo -n "materialInfo18";
createNode shadingEngine -n "RockSG";
	setAttr ".ihi" 0;
	setAttr ".ro" yes;
createNode phongE -n "Rock";
createNode file -n "file1";
	setAttr ".ftn" -type "string" "D:/Project/MyProject//sourceimages/Aquarium/PNGs/Rock01_DM.jpg";
createNode place2dTexture -n "place2dTexture1";
createNode lightLinker -n "lightLinker1";
	setAttr -s 3 ".lnk";
	setAttr -s 3 ".slnk";
createNode displayLayerManager -n "layerManager";
createNode displayLayer -n "defaultLayer";
createNode renderLayerManager -n "renderLayerManager";
createNode renderLayer -n "defaultRenderLayer";
	setAttr ".g" yes;
createNode unknown -n "__shaderListNode";
	addAttr -ci true -sn "slt" -ln "shaderlist" -dt "stringArray";
	addAttr -ci true -sn "hsh" -ln "shaderhashes" -dt "stringArray";
	setAttr ".slt" -type "stringArray" 1 "default"  ;
	setAttr ".hsh" -type "stringArray" 1 "0"  ;
createNode script -n "uiConfigurationScriptNode";
	setAttr ".b" -type "string" (
		"// Maya Mel UI Configuration File.\n//\n//  This script is machine generated.  Edit at your own risk.\n//\n//\n\nglobal string $gMainPane;\nif (`paneLayout -exists $gMainPane`) {\n\n\tglobal int $gUseScenePanelConfig;\n\tint    $useSceneConfig = $gUseScenePanelConfig;\n\tint    $menusOkayInPanels = `optionVar -q allowMenusInPanels`;\tint    $nVisPanes = `paneLayout -q -nvp $gMainPane`;\n\tint    $nPanes = 0;\n\tstring $editorName;\n\tstring $panelName;\n\tstring $itemFilterName;\n\tstring $panelConfig;\n\n\t//\n\t//  get current state of the UI\n\t//\n\tsceneUIReplacement -update $gMainPane;\n\n\t$panelName = `sceneUIReplacement -getNextPanel \"modelPanel\" (localizedPanelLabel(\"Top View\")) `;\n\tif (\"\" == $panelName) {\n\t\tif ($useSceneConfig) {\n\t\t\t$panelName = `modelPanel -unParent -l (localizedPanelLabel(\"Top View\")) -mbv $menusOkayInPanels `;\n\t\t\t$editorName = $panelName;\n            modelEditor -e \n                -camera \"top\" \n                -useInteractiveMode 0\n                -displayLights \"default\" \n                -displayAppearance \"smoothShaded\" \n"
		+ "                -activeOnly 0\n                -wireframeOnShaded 0\n                -headsUpDisplay 1\n                -selectionHiliteDisplay 1\n                -useDefaultMaterial 0\n                -bufferMode \"double\" \n                -twoSidedLighting 1\n                -backfaceCulling 0\n                -xray 0\n                -jointXray 0\n                -activeComponentsXray 0\n                -displayTextures 1\n                -smoothWireframe 0\n                -lineWidth 1\n                -textureAnisotropic 0\n                -textureHilight 1\n                -textureSampling 2\n                -textureDisplay \"modulate\" \n                -textureMaxSize 8192\n                -fogging 0\n                -fogSource \"fragment\" \n                -fogMode \"linear\" \n                -fogStart 0\n                -fogEnd 100\n                -fogDensity 0.1\n                -fogColor 0.5 0.5 0.5 1 \n                -maxConstantTransparency 1\n                -rendererName \"base_OpenGL_Renderer\" \n                -colorResolution 256 256 \n"
		+ "                -bumpResolution 512 512 \n                -textureCompression 0\n                -transparencyAlgorithm \"frontAndBackCull\" \n                -transpInShadows 0\n                -cullingOverride \"none\" \n                -lowQualityLighting 0\n                -maximumNumHardwareLights 1\n                -occlusionCulling 0\n                -shadingModel 0\n                -useBaseRenderer 0\n                -useReducedRenderer 0\n                -smallObjectCulling 0\n                -smallObjectThreshold -1 \n                -interactiveDisableShadows 0\n                -interactiveBackFaceCull 0\n                -sortTransparent 1\n                -nurbsCurves 1\n                -nurbsSurfaces 1\n                -polymeshes 1\n                -subdivSurfaces 1\n                -planes 1\n                -lights 1\n                -cameras 1\n                -controlVertices 1\n                -hulls 1\n                -grid 1\n                -joints 1\n                -ikHandles 1\n                -deformers 1\n                -dynamics 1\n"
		+ "                -fluids 1\n                -hairSystems 1\n                -follicles 1\n                -nCloths 1\n                -nParticles 1\n                -nRigids 1\n                -dynamicConstraints 1\n                -locators 1\n                -manipulators 1\n                -dimensions 1\n                -handles 1\n                -pivots 1\n                -textures 1\n                -strokes 1\n                -shadows 0\n                $editorName;\nmodelEditor -e -viewSelected 0 $editorName;\n\t\t}\n\t} else {\n\t\t$label = `panel -q -label $panelName`;\n\t\tmodelPanel -edit -l (localizedPanelLabel(\"Top View\")) -mbv $menusOkayInPanels  $panelName;\n\t\t$editorName = $panelName;\n        modelEditor -e \n            -camera \"top\" \n            -useInteractiveMode 0\n            -displayLights \"default\" \n            -displayAppearance \"smoothShaded\" \n            -activeOnly 0\n            -wireframeOnShaded 0\n            -headsUpDisplay 1\n            -selectionHiliteDisplay 1\n            -useDefaultMaterial 0\n            -bufferMode \"double\" \n"
		+ "            -twoSidedLighting 1\n            -backfaceCulling 0\n            -xray 0\n            -jointXray 0\n            -activeComponentsXray 0\n            -displayTextures 1\n            -smoothWireframe 0\n            -lineWidth 1\n            -textureAnisotropic 0\n            -textureHilight 1\n            -textureSampling 2\n            -textureDisplay \"modulate\" \n            -textureMaxSize 8192\n            -fogging 0\n            -fogSource \"fragment\" \n            -fogMode \"linear\" \n            -fogStart 0\n            -fogEnd 100\n            -fogDensity 0.1\n            -fogColor 0.5 0.5 0.5 1 \n            -maxConstantTransparency 1\n            -rendererName \"base_OpenGL_Renderer\" \n            -colorResolution 256 256 \n            -bumpResolution 512 512 \n            -textureCompression 0\n            -transparencyAlgorithm \"frontAndBackCull\" \n            -transpInShadows 0\n            -cullingOverride \"none\" \n            -lowQualityLighting 0\n            -maximumNumHardwareLights 1\n            -occlusionCulling 0\n"
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
connectAttr "RockSG.msg" "materialInfo18.sg";
connectAttr "Rock.msg" "materialInfo18.m";
connectAttr "file1.msg" "materialInfo18.t" -na;
connectAttr "Rock.oc" "RockSG.ss";
connectAttr "RockC_1Shape.iog" "RockSG.dsm" -na;
connectAttr "file1.oc" "Rock.c";
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
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[0].llnk";
connectAttr ":initialShadingGroup.msg" "lightLinker1.lnk[0].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[1].llnk";
connectAttr ":initialParticleSE.msg" "lightLinker1.lnk[1].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.lnk[21].llnk";
connectAttr "RockSG.msg" "lightLinker1.lnk[21].olnk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[0].sllk";
connectAttr ":initialShadingGroup.msg" "lightLinker1.slnk[0].solk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[1].sllk";
connectAttr ":initialParticleSE.msg" "lightLinker1.slnk[1].solk";
connectAttr ":defaultLightSet.msg" "lightLinker1.slnk[21].sllk";
connectAttr "RockSG.msg" "lightLinker1.slnk[21].solk";
connectAttr "layerManager.dli[0]" "defaultLayer.id";
connectAttr "renderLayerManager.rlmi[0]" "defaultRenderLayer.rlid";
connectAttr "RockSG.pa" ":renderPartition.st" -na;
connectAttr "Rock.msg" ":defaultShaderList1.s" -na;
connectAttr "place2dTexture1.msg" ":defaultRenderUtilityList1.u" -na;
connectAttr "lightLinker1.msg" ":lightList1.ln" -na;
connectAttr "file1.msg" ":defaultTextureList1.tx" -na;
// End of RockC.ma
