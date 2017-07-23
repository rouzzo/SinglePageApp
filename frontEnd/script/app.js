/*var app = angular.module('myApp',[])
		app.controller('myCtrl', function($scope){
			$scope.personList = [];
			$scope.infoDetails = angular.copy($scope.details);

	 $scope.details = {
							userId:"",
							password:"",
							name:"",
							phone: "",
							email:"",
							address:"",
							country:"",
							
						}

		$scope.addDetails = function(){
			console.log("its working")
			$scope.personList.push($scope.infoDetails)
			$scope.details = {}
			$('#addMovie').modal('hide');
		}
		$scope.setIndex = function(index){
			$scope.indexValue = index;
			$scope.personList.splice($scope.indexValue,1);
			console.log(index)
			//$scope.details = {}
		}
})*/

// Anugular JS Module : it is a container for the different parts of the application and also the controllers
//[] means you are creating a new module, it can also be used to define dependent modules
var app = angular.module('myApp',[])
app.controller('myCtrl', function($scope,$http){
	$scope.personList = [];
  	$scope.details = {};
	$scope.hostName = "http://localhost:8000/"
	$scope.addDetails = function(){
		$http.post($scope.hostName +'postInfo', $scope.details).success(function(response){
			$scope.details = {}
			$('#addMovie').modal('hide');
			$scope.getData();
		})
	}	
	$scope.getData = function(){
	 	$http.get($scope.hostName +'getInfo').success(function({data}){
			$scope.personList = data;
			console.log($scope.personList);
		});
	};
	$scope.setIndex = function(id){
		$http.delete($scope.hostName +'deleteInfo?id=' + id).success(function(data){
			$scope.getData();
		})
	}
/*
	$scope.editData = function(id){
		$http.put($scope.hostName +'editInfo' + id).success(function(data){
			$scope.edited
			$scope.getData();
		})
	}	
*/
})						

