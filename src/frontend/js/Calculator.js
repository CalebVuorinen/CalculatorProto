angular.module("Calculator", ['base64']).controller("CalculatorController", function CalculatorController($base64, $scope, $http, $templateCache) {
		$scope.displayValue = 0;
		$scope.memory = null;
		$scope.result = 0;
		$scope.coded_result = " - ";
		$scope.decoded_result = " - ";
		$scope.calculationString = "";
		$scope.operation = null;
		$scope.method = 'GET';
    $scope.url = 'http-test.html';
		console.log('Starting application');
		$scope.responsedata = "";
		$scope.decodedresponse = "";

		//Make a post here, and return the value as base64 encoded and decode it here, send also a encoded msg
		$scope.SendData = function () {
		var httpRequest =	$http({
						method  : $scope.method, //needs to be modified to be a server / real answer
						url     : $scope.url,
						data    : $base64.encode($scope.calculationString), // pass in data as strings
						headers: {
        			'Content-Type': 'application/json',
        			'Accept': 'application/json'
    				}
					});
		httpRequest.success(function (data, status) {
			$scope.responsedata = $base64.encode($scope.calculationString); //should be inserted data, when it works
			$scope.decodedresponse = $base64.decode($scope.responsedata);
		});
		// httpRequest.error(function(data, status){ do something });
		};

		$scope.saveInMemory = function() {
			if ($scope.memory == null) {
				$scope.memory = parseFloat($scope.displayValue);
			}
			$scope.calculationString = $scope.calculationString + "" + $scope.displayValue;
		};
		$scope.onClickClear = function() {
			console.log('Clear all values');
			$scope.operation = null;
			$scope.memory = null;
			$scope.displayValue = 0;
			$scope.result = 0;
			$scope.calculationString = "";
			$scope.coded_result = $base64.encode("" + $scope.result);
			$scope.decoded_result = $base64.decode($scope.coded_result);
		};
		$scope.onClickSum = function() {
			$scope.saveInMemory();
			$scope.operation = "+";
			$scope.displayValue = 0;
		};
		$scope.onClickSubtract = function() {
			$scope.saveInMemory();
			$scope.operation = "-";
			$scope.displayValue = 0;
		};
		$scope.onClickMultiply = function() {
			$scope.saveInMemory();
			$scope.operation = "*";
			$scope.displayValue = 0;
		};
		$scope.onClickDivide = function() {
			$scope.saveInMemory();
			$scope.operation = "/";
			$scope.displayValue = 0;
		};
		$scope.onClickCalculate = function() {
			if ($scope.operation == "+"){
				$scope.result = parseFloat($scope.memory) + parseFloat($scope.displayValue);
				$scope.calculationString = $scope.calculationString + " + " + $scope.displayValue;
			}
			else if ($scope.operation == "-"){
				$scope.result = parseFloat($scope.memory) - parseFloat($scope.displayValue);
				$scope.calculationString = $scope.calculationString + " - " + $scope.displayValue;
			}
			else if ($scope.operation == "*"){
				$scope.result = parseFloat($scope.memory) * parseFloat($scope.displayValue);
				$scope.calculationString = $scope.calculationString + " * " + $scope.displayValue;
			}
			else if ($scope.operation == "/"){
				$scope.result = parseFloat($scope.memory) / parseFloat($scope.displayValue);
				$scope.calculationString = $scope.calculationString + " / " + $scope.displayValue;
			}

			$scope.memory = $scope.result;
			$scope.coded_result = $base64.encode("" + $scope.result);
			$scope.decoded_result = $base64.decode($scope.coded_result);
		};
	}
);
