angular.module('raportApp').config(function($routeProvider) {
	$routeProvider.when('/rapor/list', {
		templateUrl : 'views/partials/rapor/listRapor.html',
		controller : 'RaporCtrl'
	}).when('/rapor/detail/:id', {
		templateUrl : 'views/partials/rapor/detailRapor.html',
		controller : 'RaporCtrl',
		resolve : {
			'id' : function($route) {
				return $route.current.params.id;
			}
		}
	}).when('/rapor/list/:idkelas/siswa', {
		templateUrl : 'views/partials/rapor/listSiswa.html',
		controller : 'RaporCtrl',
		resolve : {
			'idkelas' : function($route) {
				return $route.current.params.idkelas;
			}
		}
	}).when('/rapor/list/:idkelasraport/siswa/:idsiswaraport', {
		templateUrl : 'views/partials/rapor/rapor.html',
		controller : 'RaporCtrl',
		resolve : {
			'idkelasraport' : function($route) {
				return $route.current.params.idkelasraport;
			},
			'idsiswaraport' : function($route) {
				return $route.current.params.idsiswaraport;
			}
		}
	});
});

angular.module('raportApp').controller('RaporCtrl', function($scope, $http, $route, $resource, $stateParams, $mdDialog, $mdToast, $log, $state, $location, PenilaianService, RaportService){
	$scope.formData = {};
	$scope.search = "";
	
	/*
	 * Template toast
	 */
	
	var mdToast = function(message){
        $mdToast.show({
            template: '<md-toast class="md-toast">' + message + '</md-toast>',
            hideDelay: 7000,
            position: 'top right'
        });
    };
    
    /*
     * Get Iterable
     */
    
    $scope.kelas = [];
    var request = {
        		url : '/kelas/all',
        		method : 'GET'
        	};
        	var successHandler = function(response) {
        		$log.debug("Response data dari server : \n"
        				+ angular.toJson(response.data, true));
        		$scope.kelas = response.data;
        	};
        	var errorHandler = function(errors) {
        		$log.error(angular.toJson(errors, true));
        	};
        	$http(request).then(successHandler, errorHandler);
        
        $scope.kelas_siswa = [];
        var request = {
               		url : '/kelas/siswa/all',
               		method : 'GET'
               	};
               	var successHandler = function(response) {
               		$log.debug("Response data dari server : \n"
               				+ angular.toJson(response.data, true));
               		$scope.kelas_siswa = response.data;
               	};
               	var errorHandler = function(errors) {
               		$log.error(angular.toJson(errors, true));
               	};
               	$http(request).then(successHandler, errorHandler);
      
    /*
     * List Data
     */
    
    $scope.items = [];

	var url = '/kelas'

	$scope.query = {
		order : '',
		limit : 5,
		page : 1,
		total : 0
	};

	var getRapor = function(page, limit) {
		return $resource(url, {}, {
			get : {
				method : "GET",
				params : {
					page : page - 1,
					size : limit,
					search : $scope.search
				}
			}
		});
	}

	var getPage = function(page, limit) {
		getRapor(page, limit).get().$promise.then(
				function(response) {
					console.dir(response.content);
					$scope.items = response.content;
					$scope.query.limit = response.size;
					$scope.query.total = response.totalElements;
				}, function(errResponse) {
					console.log(errResponse);
					console.error('Error while fethcing data');
				}

		);

	}

	getPage($scope.query.page, $scope.query.limit);

	$scope.onPaginate = function(page, limit) {
		getPage(page, limit);
	}
	
	
	if($route.current.params.idkelas){
		$scope.itemsDetailSiswa = [];
		$scope.idKelas = $route.current.params.idkelas;

		/*
		* URL siwa berdasarkan @idkelas
		* */
		var url = '/rapor/:kelasid/siswa';

		$scope.queryDetailSiswa = {
			order : '',
			limit : 5,
			page : 1,
			total : 0
		};

		var getDetailSiswa = function(page, limit) {
			return $resource(url, {kelasid : $route.current.params.idkelas}, {
				get : {
					method : "GET",
					params : {
						page : page - 1,
						size : limit,
						search : $scope.search
					}
				}
			});
		}

		var getPageDetailSiswa = function(page, limit) {
			getDetailSiswa(page, limit).get().$promise.then(
					function(response) {
						console.dir(response.content);
						$scope.itemsDetailSiswa = response.content;
						$scope.queryDetailSiswa.limit = response.size;
						$scope.queryDetailSiswa.total = response.totalElements;
					}, function(errResponse) {
						console.log(errResponse);
						console.error('Error while fethcing data');
					}
			);

		}

		getPageDetailSiswa($scope.queryDetailSiswa.page, $scope.queryDetailSiswa.limit);

		$scope.onPaginateDetailSiswa = function(page, limit) {
			getDetailSiswa(page, limit);
		}
		
		$scope.searchField = function(){
			getPage(1, 5);
		};
	};
	
	/*
	 * Search
	 */
	
	$scope.searchField = function(){
		getPage(1, 5)
	};
	
	
	
	/*
	 * Create Data
	 */
	
	$scope.save = function(){
		PenilaianService.create($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil ditambah');
				window.location = "/#/mata/pelajaran/list";
			},
			function(errResponse){
				$log.debug(errResponse);
				$scope.objectError = errResponse.data.fieldErrors;
				mdToast('Gagal menyimpan data, cek kembali input data');
			}
		);
	};
	
	/*
	 * Edit Data
	 */
	if($route.current.params.id){
		PenilaianService.get({id: $route.current.params.id}).$promise.then(
			function(response){
				$scope.formData = response;
			},
			function(errResponse){
				$log.debug(errResponse);
				mdToast('Data tidak ditemukan');
				window.location = "/#/mata/pelajaran/list";
			}
		);
	};
	
	/*
	 * Update Data
	 */
	
	$scope.update = function(){		
		PenilaianService.update($scope.formData).$promise.then(
			function(response){
				mdToast('Data berhasil diubah');
				window.location = "/#/mata/pelajaran/list";
			},
			
			function(errResponse){
				$log.debug(errResponse);
				$scope.objectError = errResponse.data.fieldErrors;
				mdToast('Data gagal diubah, cek kembali data input')
			}
		);
	};
	
	
	$scope.showConfirm = function(id){
		var confirm = $mdDialog.confirm()
			.title('Konfirmasi Hapus Data')
			.textContent('Apakah anda yakin untuk menghapus data?')
			.ok('Hapus')
			.cancel('Batal');
		$mdDialog.show(confirm).then(function(){
			PenilaianService.delete({id : id}).$promise.then(
				function(response){
					mdToast('Data berhasil dihapus');
					getPage($scope.query.page, $scope.query.limit);
				},
				function(errResponse){
					$log.debug(errResponse);
					mdToast('Data gagal dihapus, silahkan mencoba lagi');
				}
			);
		});
	};

	/*Hasil Akhir Raport
    * Dengan KelasId dan SiswaId Sebagai parameternya
    */
	if($route.current.params.idkelasraport && $route.current.params.idsiswaraport){
		/*QUERY FOR GET SISWA BY ID*/

		/*END QUERY FOR GET SISWA BY ID*/

		/*QUERY UNTUK NILAI MATPEL*/
		RaportService.get({idkelas : $route.current.params.idkelasraport, id : $route.current.params.idsiswaraport}).$promise.then(
			function(response){
				/*
				* Tampilkan response nilai(lihat di RaporController) di halaman raport
				* */
				$log.debug(response);
			},
			function(errResponse){
				$log.debug(errResponse);
			}
		);
		/*END QUERY UNTUK NILAI MATPEL*/
	}
});


angular.module('raportApp').controller(
		'showAddMataPelajaranCtrl',
		function($scope, $mdDialog, $mdMedia) {
			$scope.status = '';
			$scope.showAddForm = function(ev) {
				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
						&& $scope.customFullscreen;
				$mdDialog.show({
					controller : DialogForm,
					templateUrl : 'views/partials/mataPelajaran/formMataPelajaran.html',
					parent : angular.element(document.body),
					targetEvent : ev,
					clickOutsideToClose : true,
					fullscreen : useFullScreen,
				});
			};
		});

angular.module('raportApp')
		.controller(
				'showDetailMataPelajaranCtrl',
				function($scope, $mdDialog, $mdMedia) {
					$scope.status = '';
					$scope.showDetailProvinsi = function(ev) {
						var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))
								&& $scope.customFullscreen;
						$mdDialog
								.show({
									controller : DialogForm,
									templateUrl : 'views/partials/mataPelajaran/detailMataPelajaran.html',
									parent : angular.element(document.body),
									targetEvent : ev,
									clickOutsideToClose : true,
									fullscreen : useFullScreen
								});
						$scope.ClickMeToRedirect = function() {
							var url = "/#/mata/pelajaran/list";
							$log.log(url);
							$window.location.href = url;
						}

					};
				});

function DialogForm($scope, $mdDialog) {
	$scope.hide = function() {
		$mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.answer = function(answer) {
		$mdDialog.hide(answer);
	};
}