app.controller('ShipmentController', function(ShipmentService, $scope, $http, $state, $rootScope, $ionicModal, $sce, $ionicLoading, $ionicPopup, $ionicScrollDelegate) {

		var vm = this;
		vm.packingList = getPackingList;
		vm.packingListData = {};
		$scope.shipmentData = [];

		getPackingList();

		function xml2json(data) {
			var x2js = new X2JS();
	    var aftCnv = x2js.xml_str2json(data);
	    return aftCnv;
		}

		function getPackingList() {
			ShipmentService.getInPackingList()
				.then(function(success){
					if(success.data){
						vm.packingListData = xml2json(success.data)
						$scope.shipmentData = vm.packingListData.ArrayOfShipmentHeader.ShipmentHeader;
					} else {
						vm.packingList.value = "";
					}
				}, function(error){
					console.log(error);
				})
	  }


	$ionicModal.fromTemplateUrl('modules/shipment/ShipmentModalView.html', {
			scope: $scope,
			animation: 'slide-in-up',
			backdropClickToClose: false
	}).then(function(modal) {
			$scope.shipmentViewModal = modal;
	});
	$scope.openShipmentViewModal = function(shipment) {
			$scope.shipment = shipment;
			$scope.shipmentViewModal.show();
	};
	$scope.closeShipmentViewModal = function() {
			$scope.shipmentViewModal.hide();
	};

});
