app.service('ShipmentService', function( $http, $q, $rootScope) {

	// Return public API.
	return({
	    getInPackingList: getInPackingList,
	});


	function getInPackingList() {
	    var request = $http({
	        method: "GET",
	        headers:{},
					url: "http://35.176.194.54/ERP.asmx/GetOpenShipmentHeadersInStatus",
	        params: {"sms_auto_key":"104"},
	        data: {}
	    });
	    return( request.then( handleSuccess, handleError ) );
	}


	function handleError( response ) {

	    // The API response from the server should be returned in a
	    // nomralized format. However, if the request was not handled by the
	    // server (or what not handles properly - ex. server error), then we
	    // may have to normalize it on our end, as best we can.
	    if (
	        ! angular.isObject( response ) ||
	        ! response
	        ) {
	        return( $q.reject( "An unknown error occurred." ) );
	    }
	    // Otherwise, use expected error message.
	    return( $q.reject( response ) );

	}

	function handleSuccess( response ) {

	    return( response );

	}


});
