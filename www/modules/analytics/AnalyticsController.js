app.controller('AnalyticsController', function(AnalyticsService, $scope, $state, $http, $ionicPopup, $ionicModal, $ionicLoading, $rootScope) {

	var vm = this;
	vm.packingList = getPackingList;
	vm.packingInProgress = getPackingInProgress;
	vm.packingListData = {};
	vm.packingInProgressData = {};
	$scope.shipmentData = [];

	getPackingList();
	getPackingInProgress();

	function xml2json(data) {
		var x2js = new X2JS();
    var aftCnv = x2js.xml_str2json(data);
    return aftCnv;
	}

	function getPackingList() {
		AnalyticsService.getInPackingList()
			.then(function(success){
				if(success.data){
					vm.packingListData = xml2json(success.data)
					$scope.shipmentData = vm.packingListData.ArrayOfShipmentHeader.ShipmentHeader;
					var countryList = getListOfCountries();
					console.log('CountryList: ', countryList)
					$scope.countryData = getCountyCounts(countryList);
					console.log('CountryData: ', $scope.countryData)
					loadGeoChartMap();
				} else {
					vm.packingList.value = "";
				}
			}, function(error){
				console.log(error);
			})
  }

	function getPackingInProgress() {
		AnalyticsService.getInProgressList()
			.then(function(success){
				if(success.data){
					vm.packingInProgressData = xml2json(success.data)
					if(vm.packingInProgressData.ArrayOfShipmentHeader.ShipmentHeader){
						$scope.shipmentInProgress = vm.packingInProgressData.ArrayOfShipmentHeader.ShipmentHeader;
					}else{
						$scope.shipmentInProgress = "";
					}
				} else {
					vm.packingInProgress.value = "";
				}
			}, function(error){
				console.log(error);
			})
	}

	function getCountyCounts(countryList){
		var i, len = $scope.shipmentData.length, out = [],  data = [], obj={};
	  for(i = 0; i<len; i++){
			data.push($scope.shipmentData[i].ship_address5);
	  }

	  for(i in countryList){
			var arrTmp = [], filterCount;

			function checkValue(data){
				return data == countryList[i];
			}

			if(i==0){
			  arrTmp.push("Country");
				arrTmp.push("Shipment");
				out.push(arrTmp);
				arrTmp = [];
				arrTmp.push(countryList[i]);
				filterCount = data.filter(checkValue);
				arrTmp.push(filterCount.length);
			}else{
				arrTmp.push(countryList[i]);
				filterCount = data.filter(checkValue);
				arrTmp.push(filterCount.length);
			}
			out.push(arrTmp);
	  }
	  return out;
	}

	function getListOfCountries(){
		var i, len = $scope.shipmentData.length, out = [], obj={};
	  for(i = 0; i<len; i++){
	    obj[$scope.shipmentData[i].ship_address5] = 0;
	  }
	  for(i in obj){
			if(i){
				out.push(i);
			}
	  }
	  return out;
	}

	function loadGeoChartMap(){
		google.charts.load('current', {
		        'packages':['geochart'],
		        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
		      });
	  google.charts.setOnLoadCallback(drawRegionsMap);

	  function drawRegionsMap() {
			var countryData = $scope.countryData;
	    var data = google.visualization.arrayToDataTable(countryData);

	    var options = {};

	    var chart = new google.visualization.GeoChart(document.getElementById('geoGlobalView_div'));

	    chart.draw(data, options);
	  }
	}


});
